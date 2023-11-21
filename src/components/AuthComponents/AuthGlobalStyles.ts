/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { mediaUp } from "../../utils/mediaQueries";

export const authPanelStyles = css({
  width: "100%",
  borderRadius: "30px",
  boxShadow: "0px 4px 100px 0px rgba(0, 0, 0, 0.25)",
  overflowY: "hidden",
  display: "flex",
  flexDirection: "column-reverse",
  flexWrap: "nowrap",
  [mediaUp("md")]: {
    flexDirection: "row",
  },
});

export const customSingleColumnStyles = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "calc(100dvh - 6rem)",
  [mediaUp("lg")]: {
    padding: "0 1rem",
  },
  [mediaUp("xl")]: {
    padding: "0 3rem",
  },
  [mediaUp("xxl")]:{
    padding: "0 5rem",
  }
});

export const formStyles = css({
  backgroundColor: "white",
  position:"relative",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  padding: "2rem 1rem",
  width: "100%",
  gap: "0.8rem",
  flexShrink: 0,
  ".MuiInputLabel-root.Mui-focused":{
    color:"#00F800"
  },
  ".MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#00F800"
  },
  [mediaUp("md")]: {
    width: "60%",
    padding: "2rem 2rem",
  },
});

export const headerStyles = css({
  color: "#1E1E1E",
  textShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
  fontSize: "40px",
  marginBottom: "3rem",
  span: {
    color: "#7CF87C",
  },
});

export const descriptionPanelStyles = css({
  flexGrow: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  flexDirection: "column",
  gap: "1.2rem",
  padding: "2.5rem 1rem",
  background: "linear-gradient(180deg, #00FF7F 0%, #00ff7fb8 100%);",
  h2: {
    fontSize: "2.2rem",
  },
  p:{
    fontSize:"0.8rem"
  },
  [mediaUp("md")]:{
    background: "linear-gradient(180deg, #00FF7F 0%, rgba(98, 255, 98, 0.00) 100%)",
  }
});

export const buttonStyles ={
    borderRadius: "20px",
    background: "linear-gradient(179deg, #00964B 1.16%, rgba(255, 255, 255, 0.5) 176.09%)",
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
    color:"black",
    "&.Mui-disabled":{
        background: "rgba(0, 0, 0, 0.12)"
    },
    "&:hover":{
        backgroundColor:"#00964B"
    }
}

export const httpErrorStyles=css({
    color:"#d32f2f",
    fontSize:"0.75rem",
    height:"16.8px"
})

export const redirectionSectionStyle = css({
  display: "block",
  textAlign: "center",
  [mediaUp("md")]:{
    display: "none"
  }
})

export const serializedButtonStyles = css(buttonStyles);