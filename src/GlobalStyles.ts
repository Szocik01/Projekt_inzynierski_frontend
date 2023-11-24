/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const baseButtonStyles = {
    borderRadius: "20px",
    background: "linear-gradient(179deg, #00964B 1.16%, rgba(255, 255, 255, 0.5) 176.09%)",
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
    color:"black",
    "text-transform" : "none",
    "&.Mui-disabled":{
        background: "rgba(0, 0, 0, 0.12)"
    },
    "&:hover":{
        backgroundColor:"#00964B"
    }
}

export const serializedBaseButtonStyles = css(baseButtonStyles);