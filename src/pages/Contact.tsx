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
          githubUrl="https://github.com/1ChaLLengeR1"
          facebookUrl="https://www.facebook.com/profile.php?id=100008634312630"
          linkedinUrl="https://www.linkedin.com/in/artur-%C5%9Bcibor-9799ba276/"
          email="artek.scibor@gmail.com"
          portfolioUrl="https://arturscibor.pl/"
        />
         <ContactCard
          name="Filip Wojtyła"
          functionInProject="Manual Tester"
          githubUrl="https://github.com/t3rrificc"
          facebookUrl="https://www.facebook.com/filip.wojtyla.3"
          linkedinUrl="https://www.linkedin.com/in/filip-wojty%C5%82a-ba763626a?trk=contact-info"
          email="filip.wojtyla@student.up.krakow.pl"
        />
      </ContentContainer>
    </SingleColumn>
  );
};

export default Contact;
