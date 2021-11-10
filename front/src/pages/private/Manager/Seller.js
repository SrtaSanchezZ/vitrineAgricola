//#region Dependências
import React, { useState, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import {  Box } from '@material-ui/core';
import { DialogPerfil } from '../../../components/Dialog';
import { HeaderAdm } from '../../../components/Header';
import { MenuPrivate } from '../../../components/Menu';
import vendedor from '../../../assets/img/Icons/perfilSeller.png';
import Reservas from './Reservas';
import MontarVitrine from './MontarVitrine';
import GerenciarProdutos from './GerenciarProdutos';
import HomePrivate from './Home';
//#endregion
const Seller = () => {
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
            <HeaderAdm perfil={perfil} img={vendedor} diag={()=>handleOpen()} />
                <Box display="flex" bgcolor="#FCFCFC" >
                    <MenuPrivate 
                        home={()=>handleStep(1)}
                        docs={()=>handleStep(2)}
                        views={()=>handleStep(3)} 
                        products={()=>handleStep(4)} />
                    <Box className="conteudo">            
                        <DialogPerfil open={open} close={handleClose} img={vendedor} perfil={perfil} name={nome} click={()=>handleLogout() } />
                        <HomePrivate/>                   
                    </Box>
                </Box>
            </div>
        );
        case 2: 
        return(
            <div>
                <HeaderAdm perfil={perfil} img={vendedor} diag={()=>handleOpen()} />
                <Box display="flex" bgcolor="#FCFCFC" >
                    <MenuPrivate 
                        home={()=>handleStep(1)}
                        docs={()=>handleStep(2)}
                        views={()=>handleStep(3)} 
                        products={()=>handleStep(4)} />
                    <Box className="conteudo">                
                        <DialogPerfil open={open} close={handleClose} img={vendedor} perfil={perfil} name={nome} click={()=>handleLogout() } />
                        <Reservas/>
                    </Box>
                </Box>
            </div>
        );
        case 3: 
        return(
            <div>
                <HeaderAdm perfil={perfil} img={vendedor} diag={()=>handleOpen()} />
                <Box display="flex" bgcolor="#FCFCFC" >
                    <MenuPrivate 
                        home={()=>handleStep(1)}
                        docs={()=>handleStep(2)}
                        views={()=>handleStep(3)} 
                        products={()=>handleStep(4)} />
                    <Box className="conteudo">                      
                        <DialogPerfil open={open} close={handleClose} img={vendedor} perfil={perfil} name={nome} click={()=>handleLogout() } />
                        <MontarVitrine/>
                    </Box>
                </Box>
            </div>
        );
        case 4: 
        return(
            <div>
                <HeaderAdm perfil={perfil} img={vendedor} diag={()=>handleOpen()} />
                <Box display="flex" bgcolor="#FCFCFC" >
                    <MenuPrivate 
                        home={()=>handleStep(1)}
                        docs={()=>handleStep(2)}
                        views={()=>handleStep(3)} 
                        products={()=>handleStep(4)} />
                    <Box className="conteudo">               
                        <DialogPerfil open={open} close={handleClose} img={vendedor} perfil={perfil} name={nome} click={()=>handleLogout() } />
                        <GerenciarProdutos/>
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
export default Seller;