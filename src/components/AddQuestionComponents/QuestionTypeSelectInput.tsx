/** @jsxImportSource @emotion/react */

import { SelectChangeEvent } from "@mui/material";
import MuiSelectComponent from "../UtilityComponents/MuiSelectComponent";
import { FC, useCallback, useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { API_CALL_URL_BASE } from "../../utils/Constants";

type QuestionTypeSelectInputProps = {
  onChange: (id: string, typeName?: string) => void;
  value: string;
};

type QuestionType = {
  description?: string;
  name?: string;
  id?: string;
  type?: string;
};

const QuestionTypeSelectInput: FC<QuestionTypeSelectInputProps> = (props) => {
  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>([]);

  const { onChange, value } = props;

  const [getTypes, isLoading] = useHttp(
    `${API_CALL_URL_BASE}/api/routers/http/controllers/type_question/get_types`,
    true
  );

  function questionTypeChangeHandler(event: SelectChangeEvent<string>) {
    onChange(
      event.target.value,
      questionTypes.find((item) => {
        return event.target.value === item.id;
      })?.type
    );
  }

  const handleResponse = useCallback((response: Response) => {
    return response.json().then((data) => {
      if (data.status_code >= 400 && data.status_code <= 599) {
        throw new Error(data.message);
      }
      setQuestionTypes(data);
      onChange(data[0].id ? data[0].id : "", data[0].type ? data[0].type : "");
    });
  }, []);

  const handleError = useCallback((error: Error) => {
    console.warn(error.message);
  }, []);

  useEffect(() => {
    getTypes(handleResponse, handleError, {
      headers: {
        "Content-Type": "application/json",
        Accpet: "application/json",
      },
    });
  }, [getTypes, handleResponse, handleError]);

  return (
    <MuiSelectComponent
      value={value}
      placeholder="Wybierz typ pytania"
      selectValues={[
        ...questionTypes.map((item) => {
          return {
            value: item.id ? item.id : "",
            label: item.name ? item.name : "",
          };
        }),
      ]}
      onChange={questionTypeChangeHandler}
      label="Typ pytania"
    />
  );
};

export default QuestionTypeSelectInput;
