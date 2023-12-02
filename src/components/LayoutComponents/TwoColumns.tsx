/** @jsxImportSource @emotion/react */
import SingleColumn from "./SingleColumn";
import { ReactNode, PropsWithChildren } from "react";
import { SerializedStyles, css } from "@emotion/react";
import { mediaUp } from "../../utils/mediaQueries";


const mainColumnCss = css({
  width: "100%",
  padding: "1rem",
  [mediaUp("md")]:{
    width: "75%",
    padding: "0.8rem"
  }
})

const asideColumnCss = css({
  width: "100%",
  padding: "1rem",
  [mediaUp("md")]:{
    width: "25%",
    padding: "0.8rem"
  }
})

type TwoColumnsProps = {
  sideElement?: ReactNode;
  wrapperContainerCustomCss?: SerializedStyles;
  mainColumnCustomCss?: SerializedStyles;
  asideColumnCustomCss?: SerializedStyles; 
};

const TwoColumns: React.FC<PropsWithChildren<TwoColumnsProps>> = (props) => {
  const { children, sideElement, wrapperContainerCustomCss, mainColumnCustomCss, asideColumnCustomCss } = props;

  return (
    <SingleColumn customCss={wrapperContainerCustomCss}>
      <div css={[mainColumnCss,mainColumnCustomCss]}>{children}</div>
      <aside css={[asideColumnCss,asideColumnCustomCss]}>{sideElement}</aside>
    </SingleColumn>
  );
};

export default TwoColumns;