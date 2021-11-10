//#region Dependências
import React, { useState, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import {  Box } from '@material-ui/core';
import { DialogPerfil } from '../../../components/Dialog';
import { HeaderAdm } from '../../../components/Header';
import { MenuPrivate } from '../../../components/Menu';
import redator from '../../../assets/img/Icons/perfilEdit.png';
import GerenciarNoticias from './GerenciarNoticias';
import HomePrivate from './Home';
//#endregion
const Edit = () => {
    //#region Variáveis e Variáveis de Estado
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(1);
    const history = useHistory();
    const perfil = useState(localStorage.getItem("perfil"));
    const nome = useState(localStorage.getItem("nome"));
    //#endregion
    //#region Funções e Funções de Estado
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleLogout = () => {
        localStorage.clear();

        history.push("/");
    }
    const handleStep = (val) => {
        setStep(val);
    }
    const handleLoad = () => {
        history.push("/" + perfil[0]);
    }
    useEffect(() => {
      handleLoad();
      // eslint-disable-next-line
    }, []);
    //#endregion
    switch(step) {
        case 1: 
        return(
            <div>
            <HeaderAdm perfil={perfil} img={redator} diag={()=>handleOpen()} />
                <Box display="flex" bgcolor="#FCFCFC" >
                    <MenuPrivate 
                        home={()=>handleStep(1)}
                        news={()=>handleStep(5)} />
                    <Box  className="conteudo">               
                        <DialogPerfil open={open} close={handleClose} img={redator} perfil={perfil} name={nome} click={()=>handleLogout() } />
                        <HomePrivate/>
                    </Box>
                </Box>
            </div>
        );
        case 5: 
        return(
            <div>
                <HeaderAdm perfil={perfil} img={redator} diag={()=>handleOpen()} />
                <Box display="flex" bgcolor="#FCFCFC" >
                    <MenuPrivate 
                        home={()=>handleStep(1)}
                        news={()=>handleStep(5)} />
                    <Box  className="conteudo"> 
                        <DialogPerfil open={open} close={handleClose} img={redator} perfil={perfil} name={nome} click={()=>handleLogout() } />
                        <GerenciarNoticias/>
                    </Box>
                </Box>
            </div>
        );
        default:
      return(
        step
      );
    }   
}
export default Edit;