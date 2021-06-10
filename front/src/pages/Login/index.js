//#region Dependências
import React, { useState} from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Button, Dialog, DialogActions, DialogContent, Box } from '@material-ui/core';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
//#endregion
const Login = () => {
    //#region Variáveis e Variáveis de Estado
    const [nsa, setNsa] = useState("lfTextSim");
    const [nsaU, setNsaU] = useState("lfUnderTextS");
    const [adm, setAdm] = useState("lfTextNao");
    const [admU, setAdmU] = useState("lfUnderTextN");
    const [most, serMost] = useState("lfNsa");
    const [esco, setEsco] = useState("esconde");
    const [inpE, setinpE] = useState("inp");
    const [inpS, setinpS] = useState("inpS");
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
    }

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
            
            <Dialog open={openA} onClose={handleCloseA} aria-labelledby="form-dialog-title">
                <Box bgcolor="#00AA31" color="#ffffff" align="right" style={{ height: '70px' }}>
                    <AiFillCloseCircle onClick={() => handleCloseA()} style={{ width: '18px', height: 'auto', marginRight: '10px', marginTop: '10px' }} />
                </Box>
                <DialogContent className="Texto" style={{ marginTop: '50px' }}>
                <p className="Texto" id="alerta" style={{ color: '#000000', textAlign: 'center', textSizeAdjust: 'auto', fontSize: '120%', fontWeight: 'bolder' }} >
                    {alerta}
                </p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseA} style={{ backgroundColor: "#2E8E61", color: '#ffffff' }}>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
            
            <Dialog open={openE} onClose={handleCloseE} aria-labelledby="form-dialog-title">
                <Box bgcolor="#00AA31" color="#ffffff" align="right" style={{ height: '70px' }}>
                    <AiFillCloseCircle onClick={() => handleCloseE()} style={{ width: '18px', height: 'auto', marginRight: '10px', marginTop: '10px' }} />
                </Box>
                <DialogContent className="Texto" style={{ marginTop: '50px' }}>
                    <p className="Texto" id="alerta" style={{ color: '#000000', textAlign: 'center', textSizeAdjust: 'auto', fontSize: '100%', fontWeight: 'bolder' }} >
                        Para prosseguir com a redefinição da sua senha, por favor informe seu email.
                    </p><br/>
                    <input 
                        className={inpE}
                        type="email" 
                        name="email"
                        onChange={handleChange(setEmailR)}
                        value={emailR}
                        maxLength="75"
                        minLength="6"
                        placeholder="E-mail"
                    />
                </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseE} style={{ backgroundColor: "#2E8E61", color: '#ffffff' }}>
                            CANCELAR
                        </Button>
                        <Button onClick={()=>handleSendEmail()} style={{ backgroundColor: "#2E8E61", color: '#ffffff' }}>
                            ENVIAR
                        </Button>
                    </DialogActions>
            </Dialog>

            <Header/>
            <div className="login">
                <div className="lbanner">
                    <div className="lBoxVest">
                        <input className="limgVest" />
                        <a href="https://www.vestibulinhoetec.com.br/home/" target="_blank" rel="Vestibulinho" alt="Vestibulinho">
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
                        <input className="logoNSA" />
                        <p>
                            NSA (Novo Sistema Acadêmico) é um sistema cadêmico desenvolvido para facilitar o trabalho da área acadêmica das Etecs do Centro Paula Souza. <br/><br/>
                            Para acessar clique no botão abaixo.
                        </p>
                        <a href="https://nsa.cps.sp.gov.br/" target="_blank" rel="NSA" alt="NSA">
                            <input className="btnNSA" type='button' value="ACESSAR NSA" />
                        </a>
                    </div>
                    <div className={esco}>
                        <input className="logoCoop" />
                        <p>
                            Área restrita para acesso administrativo
                        </p>
                        <input 
                            className={inpE}
                            type="email" 
                            name="email"
                            onChange={handleChange(setEmail)}
                            value={email}
                            maxLength="75"
                            minLength="6"
                            placeholder="E-mail"
                        />
                        
                        <input 
                            className={inpS}
                            type="password" 
                            name="senha"
                            onChange={handleChange(setSenha)}
                            value={senha}
                            maxLength="9"
                            minLength="5"
                            placeholder="Senha"
                        /><br/><br/>
                        <div onClick={()=>handleClickOpenE()} className="esquciSenha">
                            <span>Esqueci minha senha.</span>
                        </div>
                            
                        <input onClick={()=>handleSubmit()} className="btnNSA" type='button' value="ENTRAR" />

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default Login;