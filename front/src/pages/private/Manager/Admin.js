//#region Dependências
import React, { useState} from "react";
import { useHistory } from 'react-router-dom';
import { DialogPerfil } from '../../../components/Dialog';
import perfilManager from '../../../assets/img/Icons/perfil.png';
import Reservas from './Reservas';
import MontarVitrine from './MontarVitrine';
import GerenciarProdutos from './GerenciarProdutos';
import GerenciarUsuarios from './GerenciarUsuarios';
import GerenciarNoticias from './GerenciarNoticias';
//#endregion
const Admin = () => {
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
                    <input className="itMenuR" onClick={()=>handleStep(2)} type='button' /><br/>
                    <input className="itMenuMV" onClick={()=>handleStep(3)} type='button' /><br/>
                    <input className="itMenuP" onClick={()=>handleStep(4)} type='button' /><br/>
                    <input className="itMenuGN" onClick={()=>handleStep(5)} type='button' /><br/>
                    <input className="itMenuMA" onClick={()=>handleStep(6)} type='button' /><br/>
                </div>
                <div className="conteudo">
                    <div className="hConteudo">
                        <div className="hContEsq">
                        </div>
                        <div className="hContDir">
                            <input onClick={()=>handleOpen()} className="perfilM" type='button' />
                            <DialogPerfil open={open} close={handleClose} img={perfilManager} perfil={perfil} name={nome} click={()=>handleLogout() } />
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
                    <input className="itMenuR" onClick={()=>handleStep(2)} type='button' /><br/>
                    <input className="itMenuMV" onClick={()=>handleStep(3)} type='button' /><br/>
                    <input className="itMenuP" onClick={()=>handleStep(4)} type='button' /><br/>
                    <input className="itMenuGN" onClick={()=>handleStep(5)} type='button' /><br/>
                    <input className="itMenuMA" onClick={()=>handleStep(6)} type='button' /><br/>
                </div>
                <div className="conteudo">
                    <div className="hConteudo">
                        <div className="hContEsq">
                        </div>
                        <div className="hContDir">
                            <input onClick={()=>handleOpen()} className="perfilM" type='button' />
                            <DialogPerfil open={open} close={handleClose} img={perfilManager} perfil={perfil} name={nome} click={()=>handleLogout() } />
                        </div>
                    </div>
                    <div style={{ marginTop:"20%" }}>
                        <Reservas/>
                    </div>
                </div>
            </div>
        );
        case 3: 
        return(
            <div className="privado">
                <div className="menup">
                    <input className="itMenuH" onClick={()=>handleStep(1)} type='button' /><br/>
                    <input className="itMenuR" onClick={()=>handleStep(2)} type='button' /><br/>
                    <input className="itMenuMV" onClick={()=>handleStep(3)} type='button' /><br/>
                    <input className="itMenuP" onClick={()=>handleStep(4)} type='button' /><br/>
                    <input className="itMenuGN" onClick={()=>handleStep(5)} type='button' /><br/>
                    <input className="itMenuMA" onClick={()=>handleStep(6)} type='button' /><br/>
                </div>
                <div className="conteudo">
                    <div className="hConteudo">
                        <div className="hContEsq">
                        </div>
                        <div className="hContDir">
                            <input onClick={()=>handleOpen()} className="perfilM" type='button' />
                            <DialogPerfil open={open} close={handleClose} img={perfilManager} perfil={perfil} name={nome} click={()=>handleLogout() } />
                        </div>
                    </div>
                    <div style={{ marginTop:"20%" }}>
                        <MontarVitrine/>
                    </div>
                </div>
            </div>
        );
        case 4: 
        return(
            <div className="privado">
                <div className="menup">
                    <input className="itMenuH" onClick={()=>handleStep(1)} type='button' /><br/>
                    <input className="itMenuR" onClick={()=>handleStep(2)} type='button' /><br/>
                    <input className="itMenuMV" onClick={()=>handleStep(3)} type='button' /><br/>
                    <input className="itMenuP" onClick={()=>handleStep(4)} type='button' /><br/>
                    <input className="itMenuGN" onClick={()=>handleStep(5)} type='button' /><br/>
                    <input className="itMenuMA" onClick={()=>handleStep(6)} type='button' /><br/>
                </div>
                <div className="conteudo">
                    <div className="hConteudo">
                        <div className="hContEsq">
                            <span>Gerenciar Produtos</span>
                        </div>
                        <div className="hContDir">
                            <input onClick={()=>handleOpen()} className="perfilM" type='button' />
                            <DialogPerfil open={open} close={handleClose} img={perfilManager} perfil={perfil} name={nome} click={()=>handleLogout() } />
                        </div>
                    </div>
                    <div >
                        <GerenciarProdutos/>
                    </div>
                </div>
            </div>
        );
        case 5: 
        return(
            <div className="privado">
                <div className="menup">
                    <input className="itMenuH" onClick={()=>handleStep(1)} type='button' /><br/>
                    <input className="itMenuR" onClick={()=>handleStep(2)} type='button' /><br/>
                    <input className="itMenuMV" onClick={()=>handleStep(3)} type='button' /><br/>
                    <input className="itMenuP" onClick={()=>handleStep(4)} type='button' /><br/>
                    <input className="itMenuGN" onClick={()=>handleStep(5)} type='button' /><br/>
                    <input className="itMenuMA" onClick={()=>handleStep(6)} type='button' /><br/>
                </div>
                <div className="conteudo">
                    <div className="hConteudo">
                        <div className="hContEsq">
                            <span>Gerenciar Notícias</span>
                        </div>
                        <div className="hContDir">
                            <input onClick={()=>handleOpen()} className="perfilM" type='button' />
                            <DialogPerfil open={open} close={handleClose} img={perfilManager} perfil={perfil} name={nome} click={()=>handleLogout() } />
                        </div>
                    </div>
                    <div>
                        <GerenciarNoticias/>
                    </div>
                </div>
            </div>
        );
        case 6: 
        return(
            <div className="privado">
                <div className="menup">
                    <input className="itMenuH" onClick={()=>handleStep(1)} type='button' /><br/>
                    <input className="itMenuR" onClick={()=>handleStep(2)} type='button' /><br/>
                    <input className="itMenuMV" onClick={()=>handleStep(3)} type='button' /><br/>
                    <input className="itMenuP" onClick={()=>handleStep(4)} type='button' /><br/>
                    <input className="itMenuGN" onClick={()=>handleStep(5)} type='button' /><br/>
                    <input className="itMenuMA" onClick={()=>handleStep(6)} type='button' /><br/>
                </div>
                <div className="conteudo">
                    <div className="hConteudo">
                        <div className="hContEsq">
                            <span>Gerenciar Usuários</span>
                        </div>
                        <div className="hContDir">
                            <input onClick={()=>handleOpen()} className="perfilM" type='button' />
                            <DialogPerfil open={open} close={handleClose} img={perfilManager} perfil={perfil} name={nome} click={()=>handleLogout() } /> 
                        </div>
                    </div>
                    <div>
                        <GerenciarUsuarios/>
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
export default Admin;