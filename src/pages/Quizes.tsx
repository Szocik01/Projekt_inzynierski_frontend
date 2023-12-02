/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import TwoColumns from "../components/LayoutComponents/TwoColumns";
import { useCallback, useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import { API_CALL_URL_BASE } from "../utils/Constants";

const formContainerStyles = css({
    borderRadius: "20px",
    background: "#FFFFFFbb",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  });
  
  const sectionHeaderStyles = css({
    color: "#000",
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    fontSize: "1.2rem",
    textDecoration: "capitalize",
    textAlign: "center",
    background: "#fff",
    padding: "0.4rem 0",
    width: "100%",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.2)",
  });

  const quizesContainerStyles = css({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1rem",
  });

const Quizes = () => {

    const [quizes, setQuizes] = useState([]);

    const [getQuizes,isLoading] = useHttp(`${API_CALL_URL_BASE}/api/routers/http/controllers/quiz/get_quiz`,true);

    const handleResponse = useCallback((response: Response) => {
        return response.json().then((data) => {
          if (data.status_code >= 400 && data.status_code <= 599) {
            throw new Error(data.message);
          }
          console.log(data);
        //   setQuizes(data);
        });
      },[])
    
     const handleError = useCallback((error: Error) => {
        console.warn(error.message);
      },[]);

      useEffect(() => {
        getQuizes(handleResponse,handleError);
      },[getQuizes,handleResponse,handleError]);


    return<TwoColumns>
        <div css={formContainerStyles}>
            <h2 css={sectionHeaderStyles}>Twoje Quizy</h2>
            <div css={quizesContainerStyles}></div>
        </div>
    </TwoColumns>
}

export default Quizes;