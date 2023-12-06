/** @jsxImportSource @emotion/react */

import { FormEvent, useState } from "react";
import SingleColumn from "../components/LayoutComponents/SingleColumn";
import InputsCard from "../components/UtilityComponents/InputsCard";
import { css } from "@emotion/react";
import resolveLastWordColor from "../utils/ResolveLastWordColor";
import { Button } from "@mui/material";
import { baseButtonStyles } from "../GlobalStyles";
import useHttp from "../hooks/useHttp";
import { API_CALL_URL_BASE } from "../utils/Constants";
import { useSelector } from "react-redux";
import { ReduxAppState } from "../storage/redux";
import { AuthSliceState } from "../storage/authSlice";
import { mediaUp } from "../utils/mediaQueries";
import ContentContainer from "../components/UtilityComponents/ContentContainer";

const descriptionContainerStyles = css({
  color: "white",
  fontSize: "13px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

const titleStyles = css({
  width: "100%",
  fontSize: "2.5rem",
  textShadow: "6px 6px 5px rgba(0, 0, 0, 0.25)",
  textAlign: "center",
});

const descriptionStyles = css({
  display: "block",
  maxWidth: "32rem",
  width: "100%",
  textAlign: "center",
});

const addQuizFormStyles = css({
  position: "relative",
  width: "100%",
  display: "flex",
  padding: "1rem 1.2rem",
  flexDirection: "column",
  gap: "1.5rem",
  ".text-field": {
    ".MuiInputBase-root": {
      backgroundColor: "#FFFFFFcc",
    },
  },
  ".multiline-field": {
    ".MuiInputBase-root": {
      backgroundColor: "#FFFFFFcc",
    },
  },
  ".drop-zone": {
    label: {
      backgroundColor: "#FFFFFFcc",
    },
  },
  [mediaUp("sm")]: {
    display: "grid",
    gridTemplateColumns: "3fr 2fr",
    gridTemplateAreas: `
    "inlineinputssection imagesection"
    "buttonsection descriptionsection"
  `,
    ".text-field": {
      gridArea: "inlineinputssection",
    },
    ".multiline-field": {
      gridArea: "descriptionsection",
    },
    ".drop-zone": {
      gridArea: "imagesection",
    },
  },
});

const customButtonStyles = css({
  height: "fit-content",
  width: "fit-content",
});

const httpErrorStyles = css({
  color: "red",
  fontSize: "1rem",
  textAlign: "center",
  width: "100%",
});

const buttonGridContainerStyles = css({
  gridArea: "buttonsection",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  alignItems: "center",
  justifyContent: "flex-end",
});

const AddQuiz = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDesctiption] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [httpError, setHttpError] = useState("");

  const [addQuiz, isLoading] = useHttp(
    `${API_CALL_URL_BASE}/api/routers/http/controllers/quiz/add_quiz`
  );

  const { userId, token } = useSelector<ReduxAppState, AuthSliceState>(
    (state) => {
      return state.auth;
    }
  );

  function handleResponse(response: Response) {
    return response.json().then((data) => {
      if (data.status_code >= 400 && data.status_code <= 599) {
        throw new Error(data.message);
      }
    });
  }

  function handleError(error: Error) {
    setHttpError(error.message);
  }

  function addQuizHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHttpError("");
    const formData = new FormData();
    formData.append("name", title);
    formData.append("description", description);
    formData.append("user_id", userId);
    if (file !== null) {
      formData.append("image", file as Blob);
    }
    addQuiz(handleResponse, handleError, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: formData,
    });
  }

  function imageDeleteHandler() {
    setFile(null);
  }

  function fileChangeHandler(files: FileList) {
    const file = files[0];

    const allowedExtensionsRegex = /\.(jpg|jpeg|png|svg)$/i;
    if (!allowedExtensionsRegex.test(file.name)) {
      setPhotoError("Niedozwolone rozszerzenie pliku.");
      return;
    }

    if (file.name.includes(" ")) {
      setPhotoError("Nazwa pliku nie może zawierać spacji.");
      return;
    }

    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      setPhotoError("Plik przekracza dozwolony rozmiar (maksymalnie 5 MB).");
      return;
    }
    setPhotoError("");
    setFile(file);
  }

  function titleChangeHandler(text: string) {
    setTitle(text);
  }

  function descriptionChangeHansler(text: string) {
    setDesctiption(text);
  }

  function validateTitle(): string {
    if (title.trim().length <= 10 || title.trim().length >= 40) {
      return "Niepoprawna długość nazwy quizu";
    }
    return "";
  }

  function validateDescription(): string {
    if (description.trim().length <= 40 || description.trim().length >= 400) {
      return "Niepoprawna długość opisu quizu";
    }
    return "";
  }

  return (
    <SingleColumn customCss={css({ rowGap: "1.5rem" })}>
      <h1 css={titleStyles}>
        {resolveLastWordColor("Witaj w generatorze quizu")}
      </h1>
      <div css={descriptionContainerStyles}>
        <span css={descriptionStyles}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </span>
      </div>
      <ContentContainer title="Stwórz Quiz" isLoading={isLoading}>
        <form
          css={addQuizFormStyles}
          onSubmit={addQuizHandler}
        >
          <InputsCard
            textFieldValue={title}
            multilineFieldValue={description}
            fileName={file ? file.name : ""}
            imagePreviewUrl={file ? URL.createObjectURL(file) : ""}
            onTextFieldChange={titleChangeHandler}
            onMultilineFieldChange={descriptionChangeHansler}
            onFileChange={fileChangeHandler}
            fieldsLabel={{
              textFieldLabel: "Tytuł quizu",
              multilineFieldLabel: "Opis Quizu",
            }}
            textFieldError={validateTitle()}
            multilineFieldError={validateDescription()}
            photoError={photoError}
            onImageDelete={imageDeleteHandler}
          />
          <div css={buttonGridContainerStyles}>
            <Button
              disabled={!!validateTitle() || !!validateDescription()}
              type="submit"
              css={[baseButtonStyles, customButtonStyles]}
            >
              Stwórz Quiz
            </Button>
            <span css={httpErrorStyles}>{httpError}</span>
          </div>
        </form>
        </ContentContainer>
    </SingleColumn>
  );
};

export default AddQuiz;
