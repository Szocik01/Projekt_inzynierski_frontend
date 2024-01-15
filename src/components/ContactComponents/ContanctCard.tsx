/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import LanguageIcon from "@mui/icons-material/Language";
import { mediaUp } from "../../utils/mediaQueries";

const contactCardContainerStyles = css({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  gap: "1.5rem",
  borderRadius: "10px",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.20);",
  padding: "1rem",
  backgroundColor: "#fff",
  width: "100%",

  span: {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    gap: "0.5rem",
    fontSize: "1.1rem",
    wordBreak: "break-word",
  },
  a: {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    gap: "0.5rem",
    color: "#000",
    fontSize: "1.1rem",
    wordBreak: "break-word",
    transition: "color 0.2s ease-out",
    "&:hover": {
      color: "#00dd00",
    },
  },
  [mediaUp("md")]: {
    width: "33.3%",
  },
});

const headersContainerStyles = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  width: "100%",
  h4: {
    width: "100%",
    textAlign: "center",
  },
  h2: {
    width: "100%",
    textAlign: "center",
  },
});

type ContactCardProps = {
  name: string;
  functionInProject: string;
  email?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  facebookUrl?: string;
  portfolioUrl?: string;
};

const ContactCard: FC<ContactCardProps> = (props) => {
  const {
    name,
    functionInProject,
    email,
    githubUrl,
    linkedinUrl,
    facebookUrl,
    portfolioUrl,
  } = props;

  return (
    <div css={contactCardContainerStyles}>
      <div css={headersContainerStyles}>
        <h2>{name}</h2>
        <h4>{functionInProject}</h4>
      </div>
      {email && (
        <span>
          <EmailIcon />
          {email}
        </span>
      )}
      {githubUrl && (
        <a href={githubUrl}>
          <GitHubIcon />
          github.com
        </a>
      )}
      {linkedinUrl && (
        <a href={linkedinUrl}>
          <LinkedInIcon />
          linkedIn.com
        </a>
      )}
      {facebookUrl && (
        <a href={facebookUrl}>
          <FacebookIcon />
          facebook.com
        </a>
      )}
      {portfolioUrl && (
        <a href={portfolioUrl}>
          <LanguageIcon />
          strona portfolio
        </a>
      )}
    </div>
  );
};

export default ContactCard;
