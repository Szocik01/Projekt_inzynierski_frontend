/** @jsxImportSource @emotion/react */
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { css } from "@emotion/react";
import { ChangeEvent, DragEventHandler, FC, useRef, useState } from "react";

const dropZoneContainerStyles = css({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  position: "relative",
  borderRadius: "15px",
  overflow: "hidden",
});

const dropZoneStyles = css({
  width: "100%",
  height: "100%",
  border: "2px dashed black",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  borderRadius: "15px",
  cursor: "pointer",
  gap: "0.5rem",
  aspectRatio: "2/1",
});

const dropZoneDraggedStyles = css({
  border: "2px solid black",
});

const inputStyles = css({
  display: "none",
});

const errorInfoStyles = css({
  color: "red",
});

const imagePreviewStyles = css({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
  borderRadius: "15px",
  aspectRatio: "2/1",
});

type PhotoUploadProps = {
  text?: string;
  onChange: (file: FileList) => void;
  previewImageUrl?: string | null;
  onImageDelete?: () => void;
};

const PhotoUpload: FC<PhotoUploadProps> = (props) => {
  const [isDraggedOver, setDraggedOver] = useState(false);

  const dropZoneLabelRef = useRef<HTMLLabelElement>(null);
  const { text, onChange, previewImageUrl, onImageDelete } = props;

  const dragoverImageHandler: DragEventHandler<HTMLLabelElement> = (event) => {
    event.preventDefault();
    setDraggedOver(true);
  };

  const dragLeaveImageHandler: DragEventHandler<HTMLLabelElement> = (event) => {
    event.preventDefault();
    const relatedTarget = event.relatedTarget as HTMLElement | null;
    if (
      dropZoneLabelRef.current === null ||
      relatedTarget === null ||
      relatedTarget.closest("label") !== dropZoneLabelRef.current
    ) {
      setDraggedOver(false);
    }
  };

  const dropImageHandler: DragEventHandler<HTMLLabelElement> = (event) => {
    event.preventDefault();
    setDraggedOver(false);
    if (event.dataTransfer === null) {
      return;
    }
    const files = event.dataTransfer.files;
    onChange(files);
  };

  function setImageFileHandler(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files === null) {
      return;
    }
    const files = event.target.files;
    onChange(files);
  }

  return (
    <div css={dropZoneContainerStyles} className="drop-zone">
      {!previewImageUrl ? (
        <>
          <label
            css={[dropZoneStyles, isDraggedOver && dropZoneDraggedStyles]}
            onDragOver={dragoverImageHandler}
            onDrop={dropImageHandler}
            onDragLeave={dragLeaveImageHandler}
            ref={dropZoneLabelRef}
          >
            <ImageIcon sx={{ width: "40%", height: "40%" }} />
            <span>Dodaj zdjęcie</span>
            <input
              css={inputStyles}
              type="file"
              onChange={setImageFileHandler}
            />
          </label>
          {text && <span css={errorInfoStyles}>{text}</span>}
        </>
      ) : (
        <>
          {onImageDelete && (
            <Button
              type="button"
              variant="contained"
              color="error"
              sx={{
                minWidth: "auto",
                width: "1.7rem",
                height: "1.7rem",
                padding: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: "3px",
                right: "3px",
              }}
              onClick={onImageDelete}
            >
              <DeleteIcon
                sx={{ width: "90%", height: "90%", color: "white" }}
              />
            </Button>
          )}
          <img
            css={imagePreviewStyles}
            src={previewImageUrl}
            alt={text}
            loading="lazy"
          />
          {text && <span>{text}</span>}
        </>
      )}
    </div>
  );
};

export default PhotoUpload;
