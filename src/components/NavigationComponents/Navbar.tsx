/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import resolveLastWordColor from "../../utils/ResolveLastWordColor";
import { Link, NavLink } from "react-router-dom";

const navbarStyles = css({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "2rem",
  a: {
    color: "black",
    textDecoration: "none",
    fontSize: "1.25rem",
  },
});

const navbarSideLeftStyles = css({
  fontSize: "2.2rem",
  textShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
  span: {
    color: "#7CF87C",
  },
});

const navbarCenterStyles = css({
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  alignItems: "center",
  a: {
    padding: "0 0.75rem",
    position: "relative",
    "&:before": {
      transition: "ease-out 0.3s transform",
      content: '""',
      height: "0.8px",
      backgroundColor: "#00F800",
      width: "100%",
      transform: "scaleX(0)",
        position:"absolute",
        left: 0,
        bottom: "-0.2rem",
        transformOrigin:"right"
    },

    "&:hover::before": {
      transform: "scaleX(1)",
      transformOrigin:"left"
    },
    "&.active": {
      color: "#00F800",
    },
  },
});

const navbarSideRightStyles = css({
  display: "flex",
  alignItems: "center",
  gap: "1.5rem",
});

const Navbar = () => {
  return (
    <div css={navbarStyles}>
      <div css={navbarSideLeftStyles}>
        {resolveLastWordColor("Nazwa Strony")}
      </div>
      <div css={navbarCenterStyles}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Strona Główna
        </NavLink>
        <NavLink
          to="/quizes"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Quizy
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Kontakt
        </NavLink>
        <NavLink
          to="/help"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Pomoc
        </NavLink>
      </div>
      <div css={navbarSideRightStyles}>
        <Link to="/login">Zaloguj się</Link>
        <Link to="/register">Zarejestruj się</Link>
      </div>
    </div>
  );
};

export default Navbar;
