//#region Dependências
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, Box, Grid, IconButton } from '@material-ui/core';
import { AiFillCloseCircle } from 'react-icons/ai';
import { MdAdd } from "react-icons/md";
import CircularProgress from '@material-ui/core/CircularProgress';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

//#endregion
const GerenciarUsuarios = () => {  
    const [infos, setInfos] = useState([]);
    const [open, setOpen] = useState(false);
    const [openA, setOpenA] = useState(false);
    const [openE, setOpenE] = useState(false);
    const [alerta, setAlerta] = useState("");
    const [nome, setNome] = useState("");
    const [emailU, setEmailU] = useState("");
    const [perfilU, setPerfilU] = useState("");
    const [senha, setSenha] = useState("");
    const [id, setId] = useState("");
    const [nomeE, setNomeE] = useState("");
    const [emailE, setEmailE] = useState("");
    const [senhaE, setSenhaE] = useState("");
    const [perfil, setPerfil] = useState(localStorage.getItem("perfil"));
    const [email, setEmail] = useState(localStorage.getItem("email")); 

    const ArrNot = (arr) =>
      arr.map((item) => ({ id: item.id, nome: item.nome, email: item.email,
                           senha: item.senha, perfil: item.perfil }));

    var msg = "";
    var back = "localhost:3001";

    const handleClickOpenA = (alerta) => {
      setOpenA(true);
      setAlerta(alerta);
    };
    const handleCloseA = () => {
      setOpenA(false);
      setAlerta("");

      handleLoad();
    };
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleClickOpenE = (id, nome, email) => {
      setOpenE(true);
      setId(id);
      setNomeE(nome);
      setEmailE(email);
      setSenhaE("");
    };
    const handleCloseE = () => {
      setOpenE(false);
    };
    
    const handleChange = (set) => (event) => set(event.target.value);

    const handleSubmit = () => {

        if (nome !== "" && emailU !== "" && senha !== "" && perfilU !== ""){
                axios
                    .post(`http://` + back + `/usuarios`, {
                        nome: nome,
                        email: emailU,
                        senha: senha,
                        perfil: perfilU
                    })
                    .then((res) => {

                        if(res.data.retorno){                                                     
                            msg = res.data.msg
                            handleClickOpenA(msg);
                        }else{                                                     
                            msg = res.data.msg
                            handleClickOpenA(msg);
                        }

                    })
                    .catch((error) => {
                        msg = "Não foi possível cadastrar esse usuario, revise os dados e tente novamente.";
                        handleClickOpenA(msg);
                    })
        } else {

            msg = "Informe os dados solicitados.";
            handleClickOpenA(msg);
        }
    };
    const handleLoad = () =>{
        axios
          .get(`http://`+ back +`/usuarios`)
          .then((res) => {   
            console.log(res.data);

            setInfos(ArrNot(res.data.response.usuarios)); 

          }).catch((res) =>{    
            msg = "Não foi possível localizar usuarios.";
            handleClickOpenA(msg);   
          })  
    };
    const handleAlter = () =>{       

        if (nomeE !== "" && emailE !== "" && senhaE !== "" && perfilU !== ""){
            axios
                .put(`http://`+ back +`/usuarios/`+id, {
                    nome: nomeE,
                    email: emailE,
                    senha: senhaE,
                    perfil: perfilU
                })
                .then((res) => { 
                    if(res.data.retorno){                                                     
                        msg = res.data.msg
                        handleClickOpenA(msg);
                    }else{                                                     
                        msg = res.data.msg
                        handleClickOpenA(msg);
                    }
                })
                .catch((res) =>{    
                    msg = "Não foi possível atualizar esse usuário.";
                    handleClickOpenA(msg);   
                }) 

        }else{
            msg = "Todos os dados devem ser preenchidos";
            handleClickOpenA(msg);   
        }

    };
    const handleDelete = (id, nome) =>{       
            axios
                .delete(`http://`+ back +`/usuarios/`+id,{
                    headers:{
                        nome: nome,
                        senha: "010203",
                        perfil: perfil,
                        email: email
                    }
                })
                .then((res) => { 
                    if(res.data.retorno){                                                     
                        msg = res.data.msg
                        handleClickOpenA(msg);
                    }else{                                                     
                        msg = res.data.msg
                        handleClickOpenA(msg);
                    }
                })
                .catch((res) =>{    
                    msg = "Não foi possível apagar esse usuario.";
                    handleClickOpenA(msg);   
                }) 
    };

    useEffect(() => {
        handleLoad();
        // eslint-disable-next-line
      }, []);
    return(
        <div> 
            <div className="noticias">
                <div className="esquerda">
                </div>
                <div className="direita">
                    <Button onClick={()=>handleClickOpen()} variante="contained" className="btnNovo" style={{ backgroundColor:"#2E8E61", color:"#FFFFFF", position:"unset" }} startIcon={<MdAdd/>}>NOVO USUÁRIO</Button>
                </div>
            </div>
            <div className="noticias">
                    <Grid item xs={12}>
                        <div align="center">
                            <Box display="flex" p={1} m={1} css={{ height: "auto", width: "100%", borderRadius: "5px", backgroundColor: "#2E8E61", fontWeight: 'bolder' }}>
                                <Box p={1} flexGrow={2}>
                                    <span className="ml-0" style={{ color: "#ffffff", fontSize: "120%", marginLeft:"-130px"}}>NOME</span>
                                </Box>
                            </Box>
                        </div>
                        <Box>
                            {infos.map((item, index) => (
                                <div align="center">
                                <Box display="flex" p={1} m={1} css={{ height: "auto", minWidth:"100%", maxWidth: "150%", borderRadius: "5px", backgroundColor: "#b6ffb5" }}>
                                    <Box id="valor" p={1} flexGrow={2} css={{ width: "200px", height: 'auto' }} >
                                        <li style={{listStyleType:"none"}} onClick={() => handleClickOpenE(item.id, item.nome, item.email, item.senha)}>
                                            <span className="ml-0" style={{ color: "black", fontSize: "120%"}}>{item.nome}</span>
                                        </li>
                                    </Box>         
                                    <Box p={1} >
                                    <div className="actions-button" style={{ marginRight: 0, marginTop: -4, width: "100px", height: 'auto', align: "center" }} >
                                        <IconButton size="small" style={{ marginRight: 16, backgroundColor: "#2E8E61", color: "#ffffff", position:"unset"  }} onClick={() => handleClickOpenE(item.id, item.nome, item.email, item.senha)}>
                                        <EditIcon />
                                        </IconButton>
                                        <IconButton size="small" style={{ backgroundColor: "#2E8E61", color: "#ffffff", position:"unset"  }} onClick={() => handleDelete(item.id, item.nome)} >
                                        <DeleteIcon />
                                        </IconButton>
                                    </div>
                                    </Box>
                                </Box>
                                </div>
                            ))}
                        </Box>
                    </Grid>
            </div>
                       
            <Dialog open={openA} onClose={handleCloseA} aria-labelledby="form-dialog-title">
                <Box bgcolor="#2E8E61" color="#ffffff" align="right" style={{ height: '70px' }}>
                    <span style={{marginLeft:'10px'}}>AVISO!</span>
                    <AiFillCloseCircle onClick={() => handleCloseA()} style={{ width: '18px', height: 'auto', marginLeft: '65%', marginRight:"20px", marginTop: '25px' }} />
                </Box>
                <DialogContent className="Texto" style={{ marginTop: '10px' }}>
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
            
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <Box bgcolor="#2E8E61" color="#ffffff" align="right" style={{ height: '70px' }}>
                    <span>NOVO USUÁRIO</span>
                    <AiFillCloseCircle onClick={() => handleClose()} style={{ width: '18px', height: 'auto', marginLeft: '70%', marginRight:"20px", marginTop: '25px' }} />
                </Box>
                <DialogContent className="Texto" style={{ marginTop: '10px' }}>
                    <div style={{ display:"block" }}>
                        <input 
                            className="inp"
                            type="text" 
                            name="titulo"
                            onChange={handleChange(setNome)}
                            value={nome}
                            maxLength="75"
                            minLength="6"
                            placeholder="Nome (min 6 - max 75)"
                        />
                        <input 
                            className="inp"
                            type="text" 
                            name="texto"
                            onChange={handleChange(setEmailU)}
                            value={emailU}
                            maxLength="80"
                            minLength="5"
                            placeholder="E-mail (min 5 - max 80)"
                        />
                        <select name="select" 
                            className="inp"
                            onChange={handleChange(setPerfilU)}>
                          <option value=""> </option>
                          <option value="master">Master</option>
                          <option value="vendedor">Vendedor</option>
                          <option value="redator">Redator</option>
                        </select>
                        <input 
                            className="inp"
                            type="text" 
                            name="texto"
                            onChange={handleChange(setSenha)}
                            value={senha}
                            maxLength="10"
                            minLength="5"
                            placeholder="Senha (min 6 - max 8)"
                        />
                    </div>
                </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} style={{ backgroundColor: "#2E8E61", color: '#ffffff' }}>
                            CANCELAR
                        </Button>
                        <Button onClick={()=>handleSubmit()} style={{ backgroundColor: "#2E8E61", color: '#ffffff' }}>
                            CADASTRAR
                        </Button>
                    </DialogActions>
            </Dialog>
            
            <Dialog open={openE} onClose={handleCloseE} aria-labelledby="form-dialog-title">
                <Box bgcolor="#2E8E61" color="#ffffff" align="right" style={{ height: '70px' }}>
                    <span>EDITAR USUÁRIO</span>
                    <AiFillCloseCircle onClick={() => handleCloseE()} style={{ width: '18px', height: 'auto', marginLeft: '70%', marginRight:"20px", marginTop: '25px' }} />
                </Box>
                <DialogContent className="Texto" style={{ marginTop: '10px' }}>                                            
                    
                <div style={{ display:"block" }}>
                        <input 
                            className="inp"
                            type="text" 
                            name="titulo"
                            onChange={handleChange(setNomeE)}
                            value={nomeE}
                            maxLength="75"
                            minLength="6"
                            placeholder="Nome (min 6 - max 75)"
                        />
                        <input 
                            className="inp"
                            type="text" 
                            name="texto"
                            onChange={handleChange(setEmailE)}
                            value={emailE}
                            maxLength="80"
                            minLength="5"
                            placeholder="E-mail (min 5 - max 80)"
                        />
                        <select name="select" 
                            className="inp"
                            onChange={handleChange(setPerfilU)}>
                          <option value=""> </option>
                          <option value="master">Master</option>
                          <option value="vendedor">Vendedor</option>
                          <option value="redator">Redator</option>
                        </select>
                        <input 
                            className="inp"
                            type="text" 
                            name="texto"
                            onChange={handleChange(setSenhaE)}
                            value={senhaE}
                            maxLength="10"
                            minLength="5"
                            placeholder="Senha (min 5 - max 10)"
                        />
                    </div>
                </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseE} style={{ backgroundColor: "#2E8E61", color: '#ffffff' }}>
                            CANCELAR
                        </Button>
                        <Button onClick={()=>handleAlter()} style={{ backgroundColor: "#2E8E61", color: '#ffffff' }}>
                            ATUALIZAR
                        </Button>
                    </DialogActions>
            </Dialog> 
        </div>
    );
}
export default GerenciarUsuarios;