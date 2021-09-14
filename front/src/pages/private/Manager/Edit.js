//#region Dependências
import React, { useState} from "react";
import { useHistory } from 'react-router-dom';
import { DialogPerfil } from '../../../components/Dialog';
import perfilEdit from '../../../assets/img/Icons/perfilEdit.png';
import GerenciarNoticias from './GerenciarNoticias';
//#endregion
const Edit = () => {
    //#region Variáveis e Variáveis de Estado
    const [bPerfil, setbPerfil] = useState("perfilM");
    const [dPerfil, setdPerfil] = useState("esconde");
    const [open, setOpen] = useState(false);
    const [perfil, setPerfil] = useState(localStorage.getItem("perfil"));
    const [nome, setNome] = useState(localStorage.getItem("nome"));
    const [step, setStep] = useState(1);
    const history = useHistory();
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
    //#endregion
    switch(step) {
        case 1: 
        return(
            <div className="privado">
                <div className="menup">
                    <input className="itMenuH" onClick={()=>handleStep(1)} type='button' /><br/>
                    <input className="itMenuGN" onClick={()=>handleStep(2)} type='button' /><br/>
                </div>
                <div className="conteudo">
                    <div className="hConteudo">
                        <div className="hContEsq">
                        </div>
                        <div className="hContDir">
                            <input onClick={()=>handleOpen()} className="perfilM" type='button' />
                            <DialogPerfil open={open} close={handleClose} img={perfilEdit} perfil={perfil} name={nome} click={()=>handleLogout() } />
                        </div>
                    </div>
                    <div style={{ marginTop:"20%" }}>
                        <h1>Página Inicial</h1>
                    </div>
                </div>
            </div>
        );
        case 2: 
        return(
            <div className="privado">
                <div className="menup">
                    <input className="itMenuH" onClick={()=>handleStep(1)} type='button' /><br/>
                    <input className="itMenuGN" onClick={()=>handleStep(2)} type='button' /><br/>
                </div>
                <div className="conteudo">
                    <div className="hConteudo">
                        <div className="hContEsq">
                            <span>Gerenciar Notícias</span>
                        </div>
                        <div className="hContDir">
                            <input onClick={()=>handleOpen()} className="perfilM" type='button' />
                            <DialogPerfil open={open} close={handleClose} img={perfilEdit} perfil={perfil} name={nome} click={()=>handleLogout() } />
                        </div>
                    </div>
                    <div>
                        <GerenciarNoticias/>
                    </div>
                </div>
            </div>
        );
        default:
      return(
        step
      );
    }
}
export default Edit;