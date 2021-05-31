//#region Dependências
import React, { useState} from "react";
import perfilManager from '../../assets/img/Icons/perfil.png';
import { useHistory } from 'react-router-dom';
//#endregion
const Admin = () => {
    //#region Variáveis e Variáveis de Estado
    const [bPerfil, setbPerfil] = useState("perfilM");
    const [dPerfil, setdPerfil] = useState("esconde");
    const [perfil, setPerfil] = useState(localStorage.getItem("perfil"));
    const [nome, setNome] = useState(localStorage.getItem("nome"));
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const history = useHistory();
    //#endregion
    //#region Funções e Funções de Estado
    const handleOpen = () => {
        setbPerfil("esconde");
        setdPerfil("infoPerfil");
    }
    const handleClose = () => {
        setbPerfil("perfilM");
        setdPerfil("esconde");
    }
    const handleLogout = () => {
        localStorage.clear();

        history.push("/");

    }
    //#endregion
    return(
        <div className="privado">
            <div className="menup">
                <input className="itMenuH" type='button' /><br/>
                <input className="itMenuR" type='button' /><br/>
                <input className="itMenuMV" type='button' /><br/>
                <input className="itMenuDN" type='button' /><br/>
                <input className="itMenuGN" type='button' /><br/>
                <input className="itMenuMA" type='button' /><br/>
                <input className="itMenuS" type='button' /><br/>
            </div>
            <div className="conteudo">
                <div className="hConteudo">
                    <div className="hContEsq">
                    </div>
                    <div className="hContDir">
                        <input onClick={()=>handleOpen()} className={bPerfil} type='button' />
                        <div className="hContDir">
                            <div className={dPerfil}>
                                <div style={{textAlign:"right", marginTop:"-10px"}}>
                                    <input onClick={()=>handleClose()} className="fechaM" type='button' value="X" />
                                </div>
                                <img src={perfilManager} alt="Perfil Master" /><br/>
                                <span style={{ fontSize:"18px"}}>Perfil {perfil}</span><br/>
                                <span style={{ fontSize:"16px"}}>{nome}</span><br/>
                                <hr/> 
                                <input onClick={()=>handleLogout()} className="logout" type='button' value="LOGOUT" /><br/>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop:"20%" }}>
                    <span>Página Inicial</span>
                </div>
            </div>
        </div>
    );
}
export default Admin;