//#region Dependências
import React, { useState} from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Button, Dialog, DialogActions, DialogContent, Box } from '@material-ui/core';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
//#endregion
const NewPassword = () => {
    //#region Variáveis e Variáveis de Estado
    const [adm, setAdm] = useState("lfTextNao");
    const [inpS, setinpS] = useState("inpS");
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
                    <div className={most}>
                        <div style={{ marginTop:"40px", marginBottom:"40px", fontSize:"20px" }}>
                            <span className={adm}>REDEFINIR SENHA</span>
                        </div>
                        <input className="logoCoop" />
                        <p style={{ fontSize:"16px", color:"#4a555c" }}>
                            Defina sua nova senha
                        </p>
                        <input 
                            className={inpS}
                            type="password" 
                            name="senha"
                            onChange={handleChange(setSenha)}
                            value={senha}
                            maxLength="9"
                            minLength="5"
                            placeholder="Senha"
                        />
                        
                        <input 
                            className={inpS}
                            type="password" 
                            name="senha"
                            onChange={handleChange(setSenhaC)}
                            value={senhaC}
                            maxLength="9"
                            minLength="5"
                            placeholder="Confirme a senha"
                        /><br/><br/>
                            
                        <input onClick={()=>handleSubmit()} className="btnNSA" type='button' value="CONFIRMAR" />

                    </div>
                </div>
            </div>            
            <Footer />
        </div>
    );
}
export default NewPassword;