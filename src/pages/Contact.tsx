/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import SingleColumn from "../components/LayoutComponents/SingleColumn";
import ContentContainer from "../components/UtilityComponents/ContentContainer";
import ContactCard from "../components/ContactComponents/ContanctCard";
import { mediaUp } from "../utils/mediaQueries";

const contactContainerStyles = css({
    
  ".innerContainer": {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    [mediaUp("md")]:{
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        alignItems: "center",
    },
  },
});

const Contact = () => {
  return (
    <SingleColumn>
      <ContentContainer title="Kontakt" customStyles={contactContainerStyles}>
        <ContactCard
          name="Wiktor Szot"
          functionInProject="Frontend Developer"
          githubUrl="a"
          facebookUrl="a"
          linkedinUrl="a"
          email="wiktor01@op.pl"
        />
        <ContactCard
          name="Artur Ścibor"
          functionInProject="Backend Developer"
          githubUrl="a"
          facebookUrl="a"
          linkedinUrl="a"
          email="a"
          portfolioUrl="a"
        />
         <ContactCard
          name="Filip Wojtyła"
          functionInProject="Manual Tester"
          githubUrl="a"
          facebookUrl="a"
          linkedinUrl="a"
          email="a"
          portfolioUrl="a"
        />
      </ContentContainer>
    </SingleColumn>
  );
};

export default Contact;
