//#region Dependências
import React, { useState} from "react";
import { useHistory } from 'react-router-dom';
import { DialogPerfil } from '../../../components/Dialog';
import { HeaderAdm } from '../../../components/Header';
import { MenuPrivate } from '../../../components/Menu';
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
            <div>
            <HeaderAdm perfil={perfil} img={perfilManager} diag={()=>handleOpen()} />
                <div className="privado">
                    <MenuPrivate 
                        home={()=>handleStep(1)}
                        docs={()=>handleStep(2)}
                        views={()=>handleStep(3)} 
                        products={()=>handleStep(4)} 
                        news={()=>handleStep(5)} 
                        users={()=>handleStep(6)}  />
                    <div className="conteudo">                    
                        <DialogPerfil open={open} close={handleClose} img={perfilManager} perfil={perfil} name={nome} click={()=>handleLogout() } />
                        <div style={{ marginTop:"20%" }}>
                            <h1>Página Inicial</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
        case 2: 
        return(
            <div>
                <HeaderAdm perfil={perfil} img={perfilManager} diag={()=>handleOpen()} />
                <div className="privado">
                    <MenuPrivate 
                        home={()=>handleStep(1)}
                        docs={()=>handleStep(2)}
                        views={()=>handleStep(3)} 
                        products={()=>handleStep(4)} 
                        news={()=>handleStep(5)} 
                        users={()=>handleStep(6)}  />
                    <div className="conteudo">                        
                        <DialogPerfil open={open} close={handleClose} img={perfilManager} perfil={perfil} name={nome} click={()=>handleLogout() } />
                        <Reservas/>
                    </div>
                </div>
            </div>
        );
        case 3: 
        return(
            <div>
                <HeaderAdm perfil={perfil} img={perfilManager} diag={()=>handleOpen()} />
                <div className="privado">
                    <MenuPrivate 
                        home={()=>handleStep(1)}
                        docs={()=>handleStep(2)}
                        views={()=>handleStep(3)} 
                        products={()=>handleStep(4)} 
                        news={()=>handleStep(5)} 
                        users={()=>handleStep(6)}  />
                        <div className="conteudo">                        
                            <DialogPerfil open={open} close={handleClose} img={perfilManager} perfil={perfil} name={nome} click={()=>handleLogout() } />
                            <MontarVitrine/>
                        </div>
                </div>
            </div>
        );
        case 4: 
        return(
            <div>
                <HeaderAdm perfil={perfil} img={perfilManager} diag={()=>handleOpen()} />
                <div className="privado">
                    <MenuPrivate 
                        home={()=>handleStep(1)}
                        docs={()=>handleStep(2)}
                        views={()=>handleStep(3)} 
                        products={()=>handleStep(4)} 
                        news={()=>handleStep(5)} 
                        users={()=>handleStep(6)}  />
                    <div className="conteudo">                        
                        <DialogPerfil open={open} close={handleClose} img={perfilManager} perfil={perfil} name={nome} click={()=>handleLogout() } />
                        <GerenciarProdutos/>
                    </div>
                </div>
            </div>
        );
        case 5: 
        return(
            <div>
                <HeaderAdm perfil={perfil} img={perfilManager} diag={()=>handleOpen()} />
                <div className="privado">
                    <MenuPrivate 
                        home={()=>handleStep(1)}
                        docs={()=>handleStep(2)}
                        views={()=>handleStep(3)} 
                        products={()=>handleStep(4)} 
                        news={()=>handleStep(5)} 
                        users={()=>handleStep(6)}  />
                    <div className="conteudo">
                        <DialogPerfil open={open} close={handleClose} img={perfilManager} perfil={perfil} name={nome} click={()=>handleLogout() } />
                        <GerenciarNoticias/>
                    </div>
                </div>
            </div>
        );
        case 6: 
        return(
            <div>
                <HeaderAdm perfil={perfil} img={perfilManager} diag={()=>handleOpen()} />
                <div className="privado">
                    <MenuPrivate 
                        home={()=>handleStep(1)}
                        docs={()=>handleStep(2)}
                        views={()=>handleStep(3)} 
                        products={()=>handleStep(4)} 
                        news={()=>handleStep(5)} 
                        users={()=>handleStep(6)}  />
                    <div className="conteudo">                        
                        <DialogPerfil open={open} close={handleClose} img={perfilManager} perfil={perfil} name={nome} click={()=>handleLogout() } />
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