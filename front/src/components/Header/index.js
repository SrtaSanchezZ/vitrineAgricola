import React from 'react';
import { CgLogIn } from "react-icons/cg";

const Header = () => {
    return(
        <div className="header">
            <div className="hLogo"></div>
            <div className="hMenu">
                <div className="hMenuBox">
                    <span className="hMenuText">QUEM SOMOS</span>
                </div>
                <div className="hMenuBox">
                    <span className="hMenuText">CURSOS</span>
                </div>
                <div className="hMenuBox">
                    <span className="hMenuText">GESTÃO</span>
                </div>
                <div className="hMenuBox">
                    <span className="hMenuText">NOTÍCIAS</span>
                </div>
                <div className="hMenuBox">
                    <span className="hMenuText">CONTATO</span>
                </div>
                <div className="hMenuBox">
                    <span className="hMenuText">VITRINE</span>
                </div>
            </div>
            <div className="hLogin">
                <a style={{ textDecoration:"none", color:"#FFFFFF" }} href="/" rel="Login" alt="Login">
                    <CgLogIn style={{width:"20px", height:"auto", marginRight:"10px", marginTop:"5px", marginBottom:"-6px"}} />
                    <span>LOGIN</span>
                </a>
            </div>
        </div>
    );
}

export default Header;