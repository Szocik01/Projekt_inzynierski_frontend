/** @jsxImportSource @emotion/react */

import { TextField } from "@mui/material";
import { FocusEvent, ChangeEvent, FC, useState } from "react";
import PhotoUpload from "./PhotoUpload";


type QuizDataCardProps = {
  cardId?: string;
  fileName?: string;
  imagePreviewUrl?: string;
  textFieldValue?: string;
  multilineFieldValue?: string;
  fieldsLabel?: {
    textFieldLabel?: string;
    multilineFieldLabel?: string;
  };
  onTextFieldChange?: (text: string, cardId?: string) => void;
  onMultilineFieldChange?: (text: string, cardId?: string) => void;
  onFileChange?: (files: FileList, cardId?: string) => void;
  textFieldError?: string;
  multilineFieldError?: string;
  photoError?: string;
  onImageDelete?: (cardId?: string) => void;
};

const QuizDataCard: FC<QuizDataCardProps> = (props) => {
  const [canDisplayValueError, setCanDisplayValueError] = useState({
    textField: false,
    multilineField: false,
  });
  const {
    cardId,
    imagePreviewUrl,
    fileName,
    textFieldValue,
    multilineFieldValue,
    fieldsLabel,
    onTextFieldChange,
    onMultilineFieldChange,
    onFileChange,
    textFieldError,
    multilineFieldError,
    photoError,
    onImageDelete,
  } = props;

  function unsetErrorVisibilityHandler(event: FocusEvent<HTMLInputElement>) {
    setCanDisplayValueError((prevValue) => {
      return { ...prevValue, ...{ [event.target.name]: false } };
    });
  }
  function setErrorVisibilityHandler(event: FocusEvent<HTMLInputElement>) {
    setCanDisplayValueError((prevValue) => {
      return { ...prevValue, ...{ [event.target.name]: true } };
    });
  }

  function textFieldChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    if(onTextFieldChange){
      onTextFieldChange(event.target.value, cardId);
    }
  }

  function multilineFieldChangeHandler(
    event: ChangeEvent<HTMLTextAreaElement>
  ) {
    if(onMultilineFieldChange){
      onMultilineFieldChange(event.target.value, cardId);
    }
  }

  function onFileChangeHandler(files: FileList) {
    if(onFileChange){
      onFileChange(files, cardId);
    }
  }

  function onFileDeleteHandler() {
    if(onImageDelete){
      onImageDelete(cardId);
    }
  }

  return (
    <>
      {textFieldValue !== undefined && (
        <TextField
          fullWidth
          label={fieldsLabel?.textFieldLabel}
          value={textFieldValue}
          onChange={textFieldChangeHandler}
          error={!!textFieldError && canDisplayValueError.textField}
          helperText={
            canDisplayValueError.textField && textFieldError
              ? textFieldError
              : " "
          }
          onFocus={unsetErrorVisibilityHandler}
          onBlur={setErrorVisibilityHandler}
          name={"textField"}
          className="text-field"
        />
      )}
      {multilineFieldValue !== undefined && (
        <TextField
          fullWidth
          label={fieldsLabel?.multilineFieldLabel}
          multiline={true}
          minRows={4}
          value={multilineFieldValue}
          onChange={multilineFieldChangeHandler}
          error={!!multilineFieldError && canDisplayValueError.multilineField}
          helperText={
            canDisplayValueError.multilineField && multilineFieldError
              ? multilineFieldError
              : " "
          }
          onFocus={unsetErrorVisibilityHandler}
          onBlur={setErrorVisibilityHandler}
          name={"multilineField"}
          className="multiline-field"
        />
      )}
      {((imagePreviewUrl !== undefined || fileName !== undefined) && onFileChange) && (
        <PhotoUpload
          text={fileName ? fileName : photoError}
          onChange={onFileChangeHandler}
          previewImageUrl={imagePreviewUrl}
          onImageDelete={onFileDeleteHandler}
        />
      )}
    </>
  );
};

export default QuizDataCard;
