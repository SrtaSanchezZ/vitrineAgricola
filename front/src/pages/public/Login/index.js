//#region Dependências
import React, { useState} from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Button } from '@material-ui/core';
import {Header} from '../../../components/Header';
import Footer from '../../../components/Footer';
import { DialogAlert, DialogMain } from '../../../components/Dialog';
import NSA from '../../../assets/img/NSA.jpeg';
import Coop from '../../../assets/img/logo-colegio.png';
import Vest from '../../../assets/img/Vestibulinho.png';
//#endregion
const Login = () => {
    //#region Variáveis e Variáveis de Estado
    const [nsa, setNsa] = useState("lfTextSim");
    const [nsaU, setNsaU] = useState("lfUnderTextS");
    const [adm, setAdm] = useState("lfTextNao");
    const [admU, setAdmU] = useState("lfUnderTextN");
    const [most, serMost] = useState("lfNsa");
    const [esco, setEsco] = useState("esconde");
    // eslint-disable-next-line 
    const [inpE, setinpE] = useState("inp");
    const [openA, setOpenA] = useState(false);
    const [openE, setOpenE] = useState(false);
    const [alerta, setAlerta] = useState("");
    const [email, setEmail] = useState("");
    const [emailR, setEmailR] = useState("");
    const [senha, setSenha] = useState("");
    const history = useHistory();

    var msg = "";
    var back = "localhost:3001";
    //#endregion
    //#region Funções e Funções de Estado
    const handleAtiva = (valor) =>{
        if(valor === "nsa"){
            setNsa("lfTextSim");
            setNsaU("lfUnderTextS");
            setAdm("lfTextNao");
            setAdmU("lfUnderTextN");
            serMost("lfNsa");
            setEsco("esconde");
        }else{
            setNsa("lfTextNao");
            setNsaU("lfUnderTextN");
            setAdm("lfTextSim");
            setAdmU("lfUnderTextS");
            serMost("esconde");
            setEsco("lfNsa");
        }
    };
    const handleClickOpenA = (alerta) => {
      setOpenA(true);
      setAlerta(alerta);
    };
    const handleCloseA = () => {
      setOpenA(false);
      setAlerta("");
    };
    const handleClickOpenE = (alerta) => {
      setOpenE(true);
      setEmailR("");
    };
    const handleCloseE = () => {
      setOpenE(false);
    };
    
    const handleChange = (set) => (event) => set(event.target.value);

    const handleSubmit = () => {
      if (email !== "" || senha !== "") {
        axios
          .post(`http://` + back + `/acesso`, {
            email: email,
            senha: senha
          })
          .then((res) => {

            if(res.data.retorno){

                localStorage.setItem("nome", res.data.nome);
                localStorage.setItem("email", res.data.email);
                localStorage.setItem("perfil", res.data.perfil);

                var perfil = "/"+ res.data.perfil;

                history.push(perfil);

            }else {
                msg = res.data.msg;
                handleClickOpenA(msg);
            }
  
          }).catch((error) => {
            msg = "O e-mail ou a senha não foi localizado em nossa base dados, revise e tente novamente.";
            handleClickOpenA(msg);
          })
      } else {
        msg = "Informe os dados de acesso.";
        handleClickOpenA(msg);
      }
    };
    const handleSendEmail = () => {
      if (emailR !== "") {
        axios
          .patch(`http://` + back + `/acesso`, {
            email: emailR
          })
          .then((res) => {

            if(res.data.retorno){
                msg = res.data.msg;
                handleClickOpenA(msg);

            }else {
                msg = res.data.msg;
                handleClickOpenA(msg);
            }
  
          }).catch((error) => {
            msg = "O e-mail informado não foi localizado em nossa base dados, revise e tente novamente.";
            handleClickOpenA(msg);
          })
      } else {
        msg = "Informe o e-mail para enviarmos um link de validação.";
        handleClickOpenA(msg);
      }
    };

    //#endregion
    return(
        <div style={{marginBottom:'0px'}}>
            <Header/>
            <div className="login">
                <div className="lbanner">
                    <div className="lBoxVest">
                        <img src={Vest} style={{ width: '70%', height:'auto' }} alt="Vestibulinho" />
                        <a href="https://www.vestibulinhoetec.com.br/home/" rel="noreferrer" target="_blank" alt="Vestibulinho">
                            <input className="btnVest" type='button' value="INSCREVA-SE" />
                        </a>
                    </div>
                </div>
                <div className="lform">
                    <div className="lFormText">
                        <div onClick={()=>handleAtiva("nsa")} style={{ display:"block", cursor:"pointer" }}>
                            <span className={nsa}>NSA</span>
                            <span className={nsaU}></span>
                        </div>
                    </div>
                    <div className="lFormText">
                        <div onClick={()=>handleAtiva("adm")} style={{ display:"block", cursor:"pointer"  }}>
                            <span className={adm}>ADMINISTRATIVO</span>
                            <span className={admU}></span>
                        </div>
                    </div>
                    <div className={most}>
                        <img src={NSA} style={{ width:"130px", height:"auto"}} alt="NSA" />
                        <p style={{ paddingBottom:'10%' }}>
                            NSA (Novo Sistema Acadêmico) é um sistema desenvolvido para facilitar o trabalho da área acadêmica das Etecs do Centro Paula Souza. <br/><br/>
                            Para acessar clique no botão abaixo.
                        </p>
                        <a href="https://nsa.cps.sp.gov.br/" rel="noreferrer" target="_blank" alt="NSA" style={{ textDecoration:'none' }}>
                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor:"#3A5E4E",
                                    color:"#FFFFFF",
                                    width:"100%"
                                }}>
                                ACESSAR NSA
                            </Button>
                        </a>
                    </div> 
                    <div className={esco}>                   
                        <img src={Coop} style={{ width:"130px", height:"auto"}} alt="Cooperativa Escola" />
                        <p>
                            Área restrita para acesso administrativo
                        </p><br/>
                        <TextField 
                            className={inpE}
                            type="email" 
                            onChange={handleChange(setEmail)}
                            value={email}
                            maxLength="75"
                            minLength="6"
                            label="E-mail"
                            variant="outlined"
                        /><br/><br/>
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
                        <div onClick={()=>handleClickOpenE()} className="esquciSenha" style={{ paddingBottom:'10%' }}>
                            <span>Esqueci minha senha.</span>
                        </div>                            
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor:"#3A5E4E",
                                color:"#FFFFFF",
                                width:"100%"
                            }}
                            onClick={()=>handleSubmit()}>
                            ENTRAR
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
            
            <DialogAlert open={openA} close={handleCloseA} alert={alerta}/>            
            <DialogMain
                open={openE}
                close={handleCloseE}
                title={"REDEFINIÇÃO DE SENHA"}
                info={(<Box>
                        <p className="Texto">
                            Para prosseguir com a redefinição da sua senha, por favor informe seu email.
                        </p><br/>
                        <TextField 
                            className={inpE}
                            type="email" 
                            onChange={handleChange(setEmailR)}
                            value={emailR}
                            maxLength="75"
                            minLength="6"
                            label="E-mail"
                            variant="outlined"
                        />
                    </Box>)}
                click={()=>handleSendEmail()}
                label={"ENVIAR"}
            />
        </div>
    );
}
export default Login;