/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const headerStyles = css({
    position: "fixed",
    left: 0,
    top:0,
    width: "100%",
    height: "5rem",
    padding: "0 2rem",
    background: "linear-gradient(180deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.00) 100%)"
});

const Navigation = ()=>{

    const [isUnfolded, setUnfolded] = useState(false);

    return <header css={headerStyles}>
        <Navbar/>
        <Sidebar/>
    </header>
}

export default Navigation;