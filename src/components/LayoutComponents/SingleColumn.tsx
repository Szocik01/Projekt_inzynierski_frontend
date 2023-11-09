/** @jsxImportSource @emotion/react */
import {FC, PropsWithChildren} from "react";
import { mediaUp } from "../../utils/mediaQueries";
import { SerializedStyles, css } from "@emotion/react";

type SingleColumnProps = {
  customCss?: SerializedStyles
};

const singleColumnCss = css({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  padding: "0 0.5rem",
  [mediaUp("sm")]: {
    width: "540px",
    margin: "0 auto",
  },
  [mediaUp("md")]:{
    width: "720px"
  },
  [mediaUp("lg")]:{
    width: "960px",
    padding: "0 1rem",
  },
  [mediaUp("xl")]:{
    width: "1140px"
  },
  [mediaUp("xxl")]:{
    width: "1320px",
    padding: "0 1.5rem"
  }

})

const SingleColumn: FC<PropsWithChildren<SingleColumnProps>> = (props) => {
    
  const {children, customCss} = props;
    return <main css={[singleColumnCss,customCss]}>
      {children}
    </main>;
};

export default SingleColumn;
