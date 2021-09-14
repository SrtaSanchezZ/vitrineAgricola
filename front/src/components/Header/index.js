import React from 'react';
import { CgLogIn } from "react-icons/cg";

const Header = () => {
    return(
        <div className="header">
            <a style={{ textDecoration:"none", color:"#FFFFFF" }} href="/" rel="paginainicial" alt="pagina inicial">
                <div className="hLogo"></div>
            </a>
            <div className="hMenu">
                <div className="hMenuBox">
                    <a style={{ textDecoration:"none", color:"#FFFFFF" }} href="/quemsomos" rel="quemsomos" alt="quem somos">
                        <span className="hMenuText">QUEM SOMOS</span>
                    </a>
                </div>
                <div className="hMenuBox">
                    <a style={{ textDecoration:"none", color:"#FFFFFF" }} href="/cursos" rel="cursos" alt="cursos">
                        <span className="hMenuText">CURSOS</span>
                    </a>
                </div>
                <div className="hMenuBox">
                    <a style={{ textDecoration:"none", color:"#FFFFFF" }} href="/gestao" rel="gestao" alt="gestao">
                        <span className="hMenuText">GESTÃO</span>
                    </a>
                </div>
                <div className="hMenuBox">
                    <a style={{ textDecoration:"none", color:"#FFFFFF" }} href="/noticias" rel="noticias" alt="noticias">
                        <span className="hMenuText">NOTÍCIAS</span>
                    </a>
                </div>
                <div className="hMenuBox">
                    <a style={{ textDecoration:"none", color:"#FFFFFF" }} href="/contato" rel="contato" alt="contato">
                        <span className="hMenuText">CONTATO</span>
                    </a>
                </div>
                <div className="hMenuBox">
                    <a style={{ textDecoration:"none", color:"#FFFFFF" }} href="/vitrineagricola" rel="vitrineagricola" alt="vitrine agricola">
                        <span className="hMenuText">VITRINE</span>
                    </a>
                </div>
            </div>
            <div className="hLogin">
                <a style={{ textDecoration:"none", color:"#FFFFFF" }} href="/acesso" rel="Login" alt="Login">
                    <CgLogIn style={{width:"20px", height:"auto", marginRight:"10px", marginTop:"5px", marginBottom:"-6px"}} />
                    <span>LOGIN</span>
                </a>
            </div>
        </div>
    );
}

export default Header;