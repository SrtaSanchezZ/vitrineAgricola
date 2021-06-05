//#region Dependências
import React, { useState} from "react";
import { useHistory } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";
import perfilManager from '../../assets/img/Icons/perfil.png';
import Reservas from './Reservas';
import MontarVitrine from './MontarVitrine';
import GerenciarProdutos from './GerenciarProdutos';
import DestacarNoticia from './DestacarNoticia';
import GerenciarUsuarios from './GerenciarUsuarios';
import GerenciarNoticias from './GerenciarNoticias';
//#endregion
const Admin = () => {
    //#region Variáveis e Variáveis de Estado
    const [bPerfil, setbPerfil] = useState("perfilM");
    const [dPerfil, setdPerfil] = useState("esconde");
    const [perfil, setPerfil] = useState(localStorage.getItem("perfil"));
    const [nome, setNome] = useState(localStorage.getItem("nome"));
    const [step, setStep] = useState(1);
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
                    <input className="itMenuDN" onClick={()=>handleStep(5)} type='button' /><br/>
                    <input className="itMenuGN" onClick={()=>handleStep(6)} type='button' /><br/>
                    <input className="itMenuMA" onClick={()=>handleStep(7)} type='button' /><br/>
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
                                    <FiLogOut style={{ width:"24px", height:"auto", color:"#3A3E87", marginBottom:"-6px" }}/>
                                    <input onClick={()=>handleLogout()} className="logout" type='button' value="LOGOUT" /><br/>
                                </div>
                            </div>
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
                    <input className="itMenuP" onClick={()=>handleStep(3)} type='button' /><br/>
                    <input className="itMenuMV" onClick={()=>handleStep(4)} type='button' /><br/>
                    <input className="itMenuDN" onClick={()=>handleStep(5)} type='button' /><br/>
                    <input className="itMenuGN" onClick={()=>handleStep(6)} type='button' /><br/>
                    <input className="itMenuMA" onClick={()=>handleStep(7)} type='button' /><br/>
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
                                    <FiLogOut style={{ width:"24px", height:"auto", color:"#3A3E87", marginBottom:"-6px" }}/>
                                    <input onClick={()=>handleLogout()} className="logout" type='button' value="LOGOUT" /><br/>
                                </div>
                            </div>
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
                    <input className="itMenuDN" onClick={()=>handleStep(5)} type='button' /><br/>
                    <input className="itMenuGN" onClick={()=>handleStep(6)} type='button' /><br/>
                    <input className="itMenuMA" onClick={()=>handleStep(7)} type='button' /><br/>
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
                                    <FiLogOut style={{ width:"24px", height:"auto", color:"#3A3E87", marginBottom:"-6px" }}/>
                                    <input onClick={()=>handleLogout()} className="logout" type='button' value="LOGOUT" /><br/>
                                </div>
                            </div>
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
                    <input className="itMenuDN" onClick={()=>handleStep(5)} type='button' /><br/>
                    <input className="itMenuGN" onClick={()=>handleStep(6)} type='button' /><br/>
                    <input className="itMenuMA" onClick={()=>handleStep(7)} type='button' /><br/>
                </div>
                <div className="conteudo">
                    <div className="hConteudo">
                        <div className="hContEsq">
                            <span>Gerenciar Produtos</span>
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
                                    <FiLogOut style={{ width:"24px", height:"auto", color:"#3A3E87", marginBottom:"-6px" }}/>
                                    <input onClick={()=>handleLogout()} className="logout" type='button' value="LOGOUT" /><br/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop:"20%" }}>
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
                    <input className="itMenuDN" onClick={()=>handleStep(5)} type='button' /><br/>
                    <input className="itMenuGN" onClick={()=>handleStep(6)} type='button' /><br/>
                    <input className="itMenuMA" onClick={()=>handleStep(7)} type='button' /><br/>
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
                                    <FiLogOut style={{ width:"24px", height:"auto", color:"#3A3E87", marginBottom:"-6px" }}/>
                                    <input onClick={()=>handleLogout()} className="logout" type='button' value="LOGOUT" /><br/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop:"20%" }}>
                        <DestacarNoticia/>
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
                    <input className="itMenuDN" onClick={()=>handleStep(5)} type='button' /><br/>
                    <input className="itMenuGN" onClick={()=>handleStep(6)} type='button' /><br/>
                    <input className="itMenuMA" onClick={()=>handleStep(7)} type='button' /><br/>
                </div>
                <div className="conteudo">
                    <div className="hConteudo">
                        <div className="hContEsq">
                            <span>Gerenciar Notícias</span>
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
                                    <FiLogOut style={{ width:"24px", height:"auto", color:"#3A3E87", marginBottom:"-6px" }}/>
                                    <input onClick={()=>handleLogout()} className="logout" type='button' value="LOGOUT" /><br/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <GerenciarNoticias/>
                    </div>
                </div>
            </div>
        );
        case 7: 
        return(
            <div className="privado">
                <div className="menup">
                    <input className="itMenuH" onClick={()=>handleStep(1)} type='button' /><br/>
                    <input className="itMenuR" onClick={()=>handleStep(2)} type='button' /><br/>
                    <input className="itMenuMV" onClick={()=>handleStep(3)} type='button' /><br/>
                    <input className="itMenuP" onClick={()=>handleStep(4)} type='button' /><br/>
                    <input className="itMenuDN" onClick={()=>handleStep(5)} type='button' /><br/>
                    <input className="itMenuGN" onClick={()=>handleStep(6)} type='button' /><br/>
                    <input className="itMenuMA" onClick={()=>handleStep(7)} type='button' /><br/>
                </div>
                <div className="conteudo">
                    <div className="hConteudo">
                        <div className="hContEsq">
                            <span>Gerenciar Usuários</span>
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
                                    <FiLogOut style={{ width:"24px", height:"auto", color:"#3A3E87", marginBottom:"-6px" }}/>
                                    <input onClick={()=>handleLogout()} className="logout" type='button' value="LOGOUT" /><br/>
                                </div>
                            </div>
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