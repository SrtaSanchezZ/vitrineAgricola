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
    };
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleClickOpenE = (id, nome, email, senha, perfil) => {
      setOpenE(true);
      setId(id);
      setNomeE(nome);
      setEmailE(email);
      setSenhaE(senha);
      setPerfilU(perfil);
    };
    const handleCloseE = () => {
      setOpenE(false);
    };
    
    const handleChange = (set) => (event) => set(event.target.value);

    const handleSubmit = () => {

        if (nome !== "", emailU !== "", senha !== "", perfilU !== ""){
                axios
                    .post(`http://` + back + `/usuario`, {
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
          .get(`http://`+ back +`/usuario`)
          .then((res) => {   
            console.log(res.data);

            setInfos(ArrNot(res.data.response.usuarios)); 

          }).catch((res) =>{    
            msg = "Não foi possível localizar usuarios.";
            handleClickOpenA(msg);   
          })  
    };
    const handleAlter = () =>{       

        if (nomeE !== "", emailE !== "", senhaE !== "", perfil !== ""){
            axios
                .put(`http://`+ back +`/usuario/`+id, {
                    nome: nomeE,
                    email: emailE,
                    senha: senhaE,
                    perfil: perfil
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
    const handleDelete = (id) =>{       
            axios
                .delete(`http://`+ back +`/noticia/`+id)
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
                    <span>Lista de Usuários</span>
                </div>
                <div className="direita">
                    <Button onClick={()=>handleClickOpen()} variante="contained" className="btnNovo" style={{ backgroundColor:"#00AA31", color:"#FFFFFF", position:"unset" }} startIcon={<MdAdd/>}>NOVO USUÁRIO</Button>
                </div>
            </div>
            <div className="noticias">
                    <Grid item xs={12}>
                        <div align="center">
                            <Box display="flex" p={1} m={1} css={{ height: "auto", width: "100%", borderRadius: "5px", backgroundColor: "#00AA31", fontWeight: 'bolder' }}>
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
                                        <li style={{listStyleType:"none"}} onClick={() => handleClickOpenE(item.id, item.nome, item.email, item.senha, item.perfil)}>
                                            <span className="ml-0" style={{ color: "black", fontSize: "120%"}}>{item.nome}</span>
                                        </li>
                                    </Box>         
                                    <Box p={1} >
                                    <div className="actions-button" style={{ marginRight: 0, marginTop: -4, width: "100px", height: 'auto', align: "center" }} >
                                        <IconButton size="small" style={{ marginRight: 16, backgroundColor: "#00AA31", color: "#ffffff", position:"unset"  }} onClick={() => handleClickOpenE(item.id, item.nome, item.email, item.senha, item.perfil)}>
                                        <EditIcon />
                                        </IconButton>
                                        <IconButton size="small" style={{ backgroundColor: "#00AA31", color: "#ffffff", position:"unset"  }} onClick={() => handleDelete(item.id)} >
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
                            placeholder="Título (min 6 - max 75)"
                        />
                        <input 
                            className="inp"
                            type="text" 
                            name="texto"
                            onChange={handleChange(setEmailU)}
                            value={emailU}
                            maxLength="75"
                            minLength="6"
                            placeholder="Texto (min 6 - max 75)"
                        />
                        <input 
                            className="inp"
                            type="text" 
                            name="texto"
                            onChange={handleChange(setSenha)}
                            value={senha}
                            maxLength="75"
                            minLength="6"
                            placeholder="Texto (min 6 - max 75)"
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
                            onChange={handleChange(setNome)}
                            value={nome}
                            maxLength="75"
                            minLength="6"
                            placeholder="Título (min 6 - max 75)"
                        />
                        <input 
                            className="inp"
                            type="text" 
                            name="texto"
                            onChange={handleChange(setEmailU)}
                            value={emailU}
                            maxLength="75"
                            minLength="6"
                            placeholder="Texto (min 6 - max 75)"
                        />
                        <input 
                            className="inp"
                            type="text" 
                            name="texto"
                            onChange={handleChange(setSenha)}
                            value={senha}
                            maxLength="75"
                            minLength="6"
                            placeholder="Texto (min 6 - max 75)"
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