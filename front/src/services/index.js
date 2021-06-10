import React from 'react';
import { Button } from '@material-ui/core';
import { MdHome } from "react-icons/md";

export const isAuthenticated = () => {
    if (!localStorage.getItem("perfil")) {
    return false;
  }
  return true;    
};

export const NotFound = () => {
  return (
          <div className="e404" style={{ backgroundColor:"#333775"}}>
            <div className="eFontB">
              <span className="eFont">Ooops!</span><br/>
              <p className="eFontN">
                Erro 404...<br/>
                Parece que a página que você está procurando se perdeu no espaço!<br/><br/>
                Está na hora de voltar para casa<br/><br/>
                <Button href="/" variante="contained" style={{ backgroundColor:"#333775", color:"#FFFFFF", position:"unset", border:"#FFFFFF" }} startIcon={<MdHome/>}>VOLTAR PARA O INÍCIO</Button>
              </p>
            </div>
          </div>
  );
}; 