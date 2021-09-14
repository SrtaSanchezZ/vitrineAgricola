//#region Dependências
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, Box, Grid, IconButton } from '@material-ui/core';
import { AiFillCloseCircle } from 'react-icons/ai';
import { MdAdd } from "react-icons/md";
import CircularProgress from '@material-ui/core/CircularProgress';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import semimg from '../../../assets/img/noimg.png';
//#endregion
const GerenciarProdutos = () => { 
    const [infos, setInfos] = useState([]);
    const [open, setOpen] = useState(false);
    const [openA, setOpenA] = useState(false);
    const [openE, setOpenE] = useState(false);
    const [openL, setOpenL] = useState(false);
    const [alerta, setAlerta] = useState("");
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [grupo, setGrupo] = useState("");
    const [imagem, setImagem] = useState([]);
    const [id, setId] = useState("");
    const [nomeE, setNomeE] = useState("");
    const [descricaoE, setDescricaoE] = useState("");
    const [img, setImg] = useState("");  
    const [perfil, setPerfil] = useState(localStorage.getItem("perfil"));
    const [email, setEmail] = useState(localStorage.getItem("email")); 

    const ArrNot = (arr) =>
      arr.map((item) => ({ id: item.id, nome: item.nome, descricao: item.descricao,
                           grupo: item.grupo, imagem: item.imagem }));
    
    var produto = {
        nome: "",
        descricao: "",
        grupo: "hortaliça",
        email: "",
        perfil: "",
        imagem: []
    }

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

      setNome("");
      setDescricao("");
      setImagem([]);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleClickOpenE = (id, nome, descricao, imagem) => {
      setOpenE(true);
      setId(id);
      setNomeE(nome);
      setDescricaoE(descricao);
      setImg(imagem);
    };
    const handleCloseE = () => {
      setOpenE(false);
      setId("");
      setNomeE("");
      setDescricaoE("");
      setImg("");
    };
    const handleClickOpenL = () => {
      setOpenL(true);
    };
    const handleCloseL = () => {
      setOpenL(false);
    };
    
    const handleChange = (set) => (event) => set(event.target.value);
    
    const handleChageImg = (e) => {
        var file = e.target.files[0].size;
        var error = "";
        
        if(file > 512000){
            error = "Arquivo deve ter até 512KB";
            handleClickOpenA(error);
            setImagem([]);
            document.getElementById("file").value = "";
        }else{
            setImagem([]);
            var fileArray = Array.from(e.target.files);
            setImagem((Img)=>Img.concat(fileArray));
        }
    };
    const renderPhotos = (img) => {
        var ima = "http://localhost:3001" + img;
        return <img src={ima} alt="Imagem Produto" style={{maxWidth:"100px", maxHeight: "100px", borderRadius: "5px"}} />
	};
    const handleSubmit = () => {

        handleClickOpenL();

        if (nome !== "" && descricao !== ""){
            if(imagem.length > 0){

                produto = {
                    nome: nome,
                    descricao: descricao,
                    grupo: "hortaliça",
                    email: email,
                    perfil: perfil,
                    imagem: imagem[0]
                  }
                
                const formData = new FormData();
                  formData.append('perfil',perfil);
                  formData.append('email',email);
                  formData.append('nome',produto.nome);
                  formData.append('descricao',produto.descricao);
                  formData.append('grupo',produto.grupo);
                  formData.append('file',produto.imagem);

                axios
                    .post(`http://` + back + `/produtos`, formData)
                    .then((res) => {
                        
                        handleCloseL();

                        if(res.data.retorno){                                                     
                            msg = res.data.msg
                            handleClickOpenA(msg);
                        }else{                                                     
                            msg = res.data.msg
                            handleClickOpenA(msg);
                        }

                    })
                    .catch((error) => {
                        handleCloseL();
                        msg = "Não foi possível cadastrar esse produto, revise os dados e tente novamente.";
                        handleClickOpenA(msg);
                    })
            }else{
                produto = {
                    nome: nome,
                    descricao: descricao,
                    grupo: "hortaliça",
                    imagem: semimg
                  }
                
                  const formData = new FormData();
                    formData.append('perfil',perfil);
                    formData.append('email',email);
                    formData.append('nome',produto.nome);
                    formData.append('descricao',produto.descricao);
                    formData.append('grupo',produto.grupo);
                    formData.append('file',produto.imagem);
  
                  axios
                      .post(`http://` + back + `/produtos`, formData)
                      .then((res) => {
                        
                        handleCloseL();

                        if(res.data.retorno){                                                     
                            msg = res.data.msg
                            handleClickOpenA(msg);
                        }else{                                                     
                            msg = res.data.msg
                            handleClickOpenA(msg);
                        }

                      })
                      .catch((error) => {
                          handleCloseL();
                          msg = "Não foi possível cadastrar esse produto, revise os dados e tente novamente.";
                          handleClickOpenA(msg);
                      })
            }
        } else {
            handleCloseL();

            msg = "Informe os dados solicitados.";
            handleClickOpenA(msg);
        }
    };
    const handleLoad = () =>{
        axios
          .get(`http://`+ back +`/produtos`)
          .then((res) => {              
            setInfos(ArrNot(res.data.response.produtos)); 
            console.log(res.data.response.produtos);
          }).catch((res) =>{    
            msg = "Não foi possível localizar produtos.";
            handleClickOpenA(msg);   
          })  
    };
    const handleAlter = () =>{       

        if (nomeE !== "" || descricaoE !== ""){
            axios
                .put(`http://`+ back +`/produtos/`+id,{
                    nome: nomeE,
                    descricao: descricaoE,
                    grupo: "hortaliça",
                    perfil: perfil,
                    email: email
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
                    msg = "Não foi possível atualizar esse produto.";
                    handleClickOpenA(msg);   
                }) 

        }else{
            msg = "O nome e descrição devem ser preenchidos";
            handleClickOpenA(msg);   
        }

    };
    const handleDelete = (id, nome, descricao) =>{       
            axios
                .delete(`http://`+ back +`/produtos/`+id,{
                    headers:{
                        nome: nome,
                        descricao: descricao,
                        grupo: "hortaliça",
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
                    msg = "Não foi possível apagar esse produto.";
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
                    <Button onClick={()=>handleClickOpen()} variante="contained" className="btnNovo" style={{ backgroundColor:"#2E8E61", color:"#FFFFFF", position:"unset"  }} startIcon={<MdAdd/>}>NOVO PRODUTO</Button>
                </div>
            </div>
            <div className="noticias">
                <Grid className="bxLista" item xs={12}>
                    {infos.map((item, index) => (
                        <Box display="bloxk">    
                            <Box display="flex" id={index} p={1} m={1} css={{ height: "auto", width:"90%"}}>
                                <Box p={1} flexGrow={2} css={{ width: "200px", height: 'auto' }} >
                                    <li style={{listStyleType:"none"}} onClick={() => handleClickOpenE(item.id, item.nome, item.descricao, item.imagem)}>
                                        <div className="result">{renderPhotos(item.imagem)}</div>
                                    </li>
                                </Box>
                                <Box p={1} flexGrow={2} css={{ width: "200px", height: 'auto' }} >
                                    <li style={{listStyleType:"none"}} onClick={() => handleClickOpenE(item.id, item.nome, item.descricao, item.imagem)}>
                                        <div style={{ textAlign:"left",  color: "black", alignItems:'center' }}>
                                            <span >{item.nome}</span><br/><br/>
                                            <span className="labelPre">{item.descricao}</span>
                                        </div>
                                    </li>
                                </Box>          
                                <Box p={1} >
                                    <div className="actions-button" style={{ marginRight: 0, marginTop: -4, width: "100px", height: 'auto', align: "center" }} >
                                        <IconButton size="small" style={{ marginRight: 16, backgroundColor: "#2E8E61", color: "#ffffff", position:"unset" }} onClick={() => handleClickOpenE(item.id, item.nome, item.descricao, item.imagem)}>
                                        <EditIcon />
                                        </IconButton>
                                        <IconButton size="small" style={{ backgroundColor: "#2E8E61", color: "#ffffff", position:"unset" }} onClick={() => handleDelete(item.id, item.nome, item.descricao)} >
                                        <DeleteIcon />
                                        </IconButton>
                                    </div>
                                </Box>
                            </Box>                            
                            <hr/>
                        </Box>
                    ))}
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
                    <span>NOVO PRODUTO</span>
                    <AiFillCloseCircle onClick={() => handleClose()} style={{ width: '18px', height: 'auto', marginLeft: '60%', marginRight:"20px", marginTop: '25px' }} />
                </Box>
                <DialogContent >
                    <div className="noticias">
                        <div className="esquerda">
                            <input 
                                className="inpImg"
                                type="file" 
                                name="imagem"
                                onChange={handleChageImg}
                            /><br/>
                            <label htmlFor="file" className="label">
                                <i className="material-icons">Imagem (até 512KB - 600 x 600) <br/> Formatos (png, jpg ou jpeg)</i>
                            </label>
                        </div>
                        <div className="direita">
                            <input 
                                style={{ marginLeft:'-20px' }} 
                                className="inp"
                                type="text" 
                                name="titulo"
                                onChange={handleChange(setNome)}
                                value={nome}
                                maxLength="75"
                                minLength="6"
                                placeholder="Nome (min 6 - max 75)"
                            />
                        </div>
                    </div>
                    <div style={{ display:"block", textAlign:'center' }}>
                        <textarea 
                            className="inp"
                            type="text" 
                            name="texto"
                            onChange={handleChange(setDescricao)}
                            value={descricao}
                            maxLength="1990"
                            minLength="6"
                            placeholder="Descrição (min 6 - max 250)"
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
                    <span>EDITAR PRODUTO</span>
                    <AiFillCloseCircle onClick={() => handleCloseE()} style={{ width: '18px', height: 'auto', marginLeft: '45%', marginRight:"20px", marginTop: '25px' }} />
                </Box>
                <DialogContent>
                    <div className="noticias">
                        <div className="esquerda">                                                 
                            <div className="result">{renderPhotos(img)}</div>
                        </div>
                        <div className="direita">
                            <input 
                                style={{ marginLeft:'-20px' }} 
                                className="inp"
                                type="text" 
                                name="titulo"
                                onChange={handleChange(setNomeE)}
                                value={nomeE}
                                maxLength="75"
                                minLength="6"
                                placeholder="Nome (min 6 - max 75)"
                            />
                        </div>
                    </div>
                    <div style={{ display:"block", textAlign:'center' }}>
                        <textarea 
                            className="inp"
                            type="text" 
                            name="texto"
                            onChange={handleChange(setDescricaoE)}
                            value={descricaoE}
                            maxLength="1990"
                            minLength="6"
                            placeholder="Descrição (min 6 - max 250)"
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
            
            <Dialog open={openL} aria-labelledby="form-dialog-title">
                <DialogContent className="Texto">          
                    <CircularProgress />
                </DialogContent>
            </Dialog>  
        </div>
    );
}
export default GerenciarProdutos;