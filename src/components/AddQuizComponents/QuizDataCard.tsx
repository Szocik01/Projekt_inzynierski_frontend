/** @jsxImportSource @emotion/react */

import { TextField } from "@mui/material";
import { FocusEvent, ChangeEvent, FC, useState } from "react";
import PhotoUpload from "../UtilityComponents/PhotoUpload";


type QuizDataCardProps = {
  file?: File | null;
  textFieldValue?: string;
  multilineFieldValue?: string;
  fieldsLabel?: {
    textFieldLabel?: string;
    multilineFieldLabel?: string;
  };
  onTextFieldChange: (text: string) => void;
  onMultilineFieldChange: (text: string) => void;
  onFileChange: (files: FileList) => void;
  textFieldError?: string;
  multilineFieldError?: string;
  photoError?: string;
  onImageDelete?: () => void;
};

const QuizDataCard: FC<QuizDataCardProps> = (props) => {
  const [canDisplayValueError, setCanDisplayValueError] = useState({
    textField: false,
    multilineField: false,
  });
  const {
    file,
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
    onTextFieldChange(event.target.value);
  }

  function multilineFieldChangeHandler(
    event: ChangeEvent<HTMLTextAreaElement>
  ) {
    onMultilineFieldChange(event.target.value);
  }

  const previewImageUrl = file ? URL.createObjectURL(file) : null;

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
      {file !== undefined && (
        <PhotoUpload
          text={file ? file.name : photoError}
          onChange={onFileChange}
          previewImageUrl={previewImageUrl}
          onImageDelete={onImageDelete}
        />
      )}
    </>
  );
};

export default QuizDataCard;