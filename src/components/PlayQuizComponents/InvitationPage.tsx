/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { Button } from "@mui/material";
import { FC } from "react";
import { baseButtonStyles } from "../../GlobalStyles";

const dataContainerStyles=css({
    width:"100%",
    backgroundColor:"#FFFFFF",
    borderRadius:"20px",
    padding:"2rem",
    display:"flex",
    flexDirection:"column",
    gap:"1.5rem",
})

const headerStyles=css({
    fontSize:"2.1rem",
    fontWeight:"bold",
    textAlign:"center",
    width:"100%",
})

const imageDisplayStyles=css({
    width:"70%",
    aspectRatio:"16/9",
    height:"auto",
    borderRadius:"10px",
    marginBottom:"1rem",
    objectFit:"cover",
    objectPosition:"center",
    alignSelf:"center",
})

const descriptionStyles=css({
    fontSize:"1.1rem",
    color:"#000000cc",
    textAlign:"center",
    width:"80%",
    alignSelf:"center",
})

type InvitationPageProps={
    onBeginQuiz:()=>void;
    name: string;
    description: string;
    linkImage: string;
}

const InvitationPage: FC<InvitationPageProps> = (props) => {
 
    const {onBeginQuiz,name,description,linkImage}=props;
 return <div css={dataContainerStyles}>
        <h1 css={headerStyles}>{name}</h1>
        <img src={linkImage} alt={name} css={imageDisplayStyles}/>
        <div css={descriptionStyles}>{description}</div>
        <Button sx={[baseButtonStyles,{width:"fit-content", alignSelf:"center"}]}>Rozpocznij Quiz</Button>
    </div>
}

export default InvitationPage;