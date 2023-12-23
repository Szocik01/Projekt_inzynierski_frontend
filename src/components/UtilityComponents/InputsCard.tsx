/** @jsxImportSource @emotion/react */

import { SelectChangeEvent, TextField } from "@mui/material";
import { FocusEvent, ChangeEvent, FC, useState } from "react";
import PhotoUpload from "./PhotoUpload";
import MuiSelectComponent from "./MuiSelectComponent";

type QuizDataCardProps = {
  cardId?: string;
  fileName?: string;
  imagePreviewUrl?: string;
  textField1Value?: string;
  textField2Value?: string;
  selectFieldValue?: string;
  multilineFieldValue?: string;
  selectFieldPlaceholder?: string;
  selectFieldLabel?: string;
  selectFieldValues?: { value: string; label: string }[];
  onSelectFieldChange?: (value: string) => void;
  fieldsLabel?: {
    textField1Label?: string;
    textField2Label?: string;
    multilineFieldLabel?: string;
  };
  onTextField1Change?: (text: string, cardId?: string) => void;
  onTextField2Change?: (text: string, cardId?: string) => void;
  onMultilineFieldChange?: (text: string, cardId?: string) => void;
  onFileChange?: (files: FileList, cardId?: string) => void;
  textField1Error?: string;
  textField2Error?: string;
  multilineFieldError?: string;
  photoError?: string;
  onImageDelete?: (cardId?: string) => void;
};

const QuizDataCard: FC<QuizDataCardProps> = (props) => {
  const [canDisplayValueError, setCanDisplayValueError] = useState({
    textField1: false,
    textField2: false,
    multilineField: false,
  });
  const {
    cardId,
    imagePreviewUrl,
    fileName,
    textField1Value,
    textField2Value,
    multilineFieldValue,
    fieldsLabel,
    onTextField1Change,
    onTextField2Change,
    onMultilineFieldChange,
    onFileChange,
    textField1Error,
    textField2Error,
    multilineFieldError,
    photoError,
    onImageDelete,
    selectFieldValue,
    selectFieldPlaceholder,
    selectFieldValues,
    onSelectFieldChange,
    selectFieldLabel
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

  function textField1ChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    if (onTextField1Change) {
      onTextField1Change(event.target.value, cardId);
    }
  }

  function textField2ChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    if (onTextField2Change) {
      onTextField2Change(event.target.value.trim(), cardId);
    }
  }

  function selectFieldChangeHandler(event: SelectChangeEvent<string>) {
    if (onSelectFieldChange) {
      onSelectFieldChange(event.target.value);
    }
  }

  function multilineFieldChangeHandler(
    event: ChangeEvent<HTMLTextAreaElement>
  ) {
    if (onMultilineFieldChange) {
      onMultilineFieldChange(event.target.value, cardId);
    }
  }

  function onFileChangeHandler(files: FileList) {
    if (onFileChange) {
      onFileChange(files, cardId);
    }
  }

  function onFileDeleteHandler() {
    if (onImageDelete) {
      onImageDelete(cardId);
    }
  }

  return (
    <>
      {textField1Value !== undefined && (
        <TextField
          fullWidth
          label={fieldsLabel?.textField1Label}
          value={textField1Value}
          onChange={textField1ChangeHandler}
          error={!!textField1Error && canDisplayValueError.textField1}
          helperText={
            canDisplayValueError.textField1 && textField1Error
              ? textField1Error
              : " "
          }
          onFocus={unsetErrorVisibilityHandler}
          onBlur={setErrorVisibilityHandler}
          name={"textField1"}
          className="text-field text-field-1"
        />
      )}
      {textField2Value !== undefined && (
        <TextField
          fullWidth
          label={fieldsLabel?.textField2Label}
          value={textField2Value}
          onChange={textField2ChangeHandler}
          error={!!textField2Error && canDisplayValueError.textField2}
          helperText={
            canDisplayValueError.textField2 && textField2Error
              ? textField2Error
              : " "
          }
          onFocus={unsetErrorVisibilityHandler}
          onBlur={setErrorVisibilityHandler}
          name={"textField2"}
          className="text-field text-field-2"
        />
      )}
      {selectFieldValues !== undefined &&
        selectFieldValues.length !== 0 &&
        selectFieldValue !== undefined && (
          <MuiSelectComponent
            value={selectFieldValue}
            placeholder={selectFieldPlaceholder}
            selectValues={selectFieldValues}
            onChange={selectFieldChangeHandler}
            label={selectFieldLabel}
            cssClass="select-field"
            enableBottomHelperText={true}
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
      {(imagePreviewUrl !== undefined || fileName !== undefined) &&
        onFileChange && (
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
