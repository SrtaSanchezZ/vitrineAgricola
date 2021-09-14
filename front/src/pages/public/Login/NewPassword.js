//#region Dependências
import React, { useState} from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { TextField, Button } from '@material-ui/core';
import { DialogAlert } from '../../../components/Dialog';
//#endregion
const NewPassword = () => {
    //#region Variáveis e Variáveis de Estado
    const [adm, setAdm] = useState("lfTextNao");
    const [inpE, setinpE] = useState("inp");
    const [openA, setOpenA] = useState(false);
    const [alerta, setAlerta] = useState("");
    const [most, serMost] = useState("lfNsa");
    const [senha, setSenha] = useState("");
    const [senhaC, setSenhaC] = useState("");
    const history = useHistory();

    var msg = "";
    var back = "localhost:3001";

    var url_string = window.location.href;
    var url = url_string.split("/novasenha/");  
    var token =  url[1];
    //#endregion
    //#region Funções e Funções de Estado
    const handleClickOpenA = (alerta) => {
      setOpenA(true);
      setAlerta(alerta);
    };
    const handleCloseA = () => {
      setOpenA(false);
      setAlerta("");
    };
    
    const handleChange = (set) => (event) => set(event.target.value);

    const handleSubmit = () => {
      if (senhaC !== "" && senha !== "") {
          if(senha === senhaC){
            axios
              .patch(`http://` + back + `/acesso/` + token, {
                senha: senha
              })
              .then((res) => {    
                if(res.data.retorno){
                    msg = res.data.msg;
                    handleClickOpenA(msg);
    
                    history.push("/");
    
                }else {
                    msg = res.data.msg;
                    handleClickOpenA(msg);
                }      
              }).catch((error) => {
                msg = "Não foi possível atualizar sua senha, token errado ou expirado.";
                handleClickOpenA(msg);
              })
          }else{
            msg = "As senhas informadas são diferentes.";
            handleClickOpenA(msg);
          }
      } else {
        msg = "Informe os dados de acesso.";
        handleClickOpenA(msg);
      }
    };
    //#endregion
    return(
        <div style={{marginBottom:'0px'}}>            
            <DialogAlert open={openA} close={handleCloseA} alert={alerta}/>            
            <Header/>
            <div className="login">
                <div className="lbanner">
                    <div className="lBoxVest">
                        <input className="limgVest" />
                        <a href="https://www.vestibulinhoetec.com.br/home/" rel="noreferrer" target="_blank" alt="Vestibulinho">
                            <input className="btnVest" type='button' value="INSCREVA-SE" />
                        </a>
                    </div>
                </div>
                <div className="lform">
                    <div className={most}>
                        <div style={{ marginTop:"40px", marginBottom:"40px", fontSize:"20px" }}>
                            <span className={adm}>REDEFINIR SENHA</span>
                        </div>
                        <input className="logoCoop" />
                        <p style={{ fontSize:"16px", color:"#4a555c" }}>
                            Defina sua nova senha
                        </p><br/><br/>
                        <TextField 
                            className={inpE}
                            type="password" 
                            onChange={handleChange(setSenha)}
                            value={senha}
                            maxLength="9"
                            minLength="56"
                            label="Senha"
                            variant="outlined"
                        /><br/><br/>
                        <TextField 
                            className={inpE}
                            type="password" 
                            onChange={handleChange(setSenhaC)}
                            value={senhaC}
                            maxLength="9"
                            minLength="56"
                            label="Confirme a senha"
                            variant="outlined"
                        /><br/><br/>
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor:"#3A5E4E",
                                color:"#FFFFFF",
                                width:"100%"
                            }}
                            onClick={()=>handleSubmit()}>
                            CONFIRMAR
                        </Button>
                    </div>
                </div>
            </div>            
            <Footer />
        </div>
    );
}
export default NewPassword;