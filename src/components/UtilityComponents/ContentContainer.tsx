/** @jsxImportSource @emotion/react */

import { SerializedStyles, css } from "@emotion/react";
import ContentLoading from "./ContentLoading";

const contentContainerStyles = css({
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

const innerContainerStyles = css({
  position:"relative",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "1rem 1.2rem",
});

type ContentContainerProps = {
  customStyles?: SerializedStyles;
  title?: string;
  isLoading?: boolean;
};

const ContentContainer = (
  props: React.PropsWithChildren<ContentContainerProps>
) => {
  const { customStyles, children, title, isLoading } = props;

  return (
    <div css={[contentContainerStyles, customStyles]}>
      {title && <h2 className="header" css={sectionHeaderStyles}>
        {title}
      </h2>}
      <div className="innerContainer" css={innerContainerStyles}>
        {isLoading && <ContentLoading blurOverlay coverParent />}
        {children}
      </div>
    </div>
  );
};

export default ContentContainer;
