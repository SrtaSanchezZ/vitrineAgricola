//#region Dependências
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Box, Grid, IconButton, Typography, TextField } from '@material-ui/core';
import { MdAdd } from "react-icons/md";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import semimg from '../../../assets/img/noimg.png';
import { DialogAlert, DialogLoading, DialogMain } from '../../../components/Dialog';
//#endregion
const GerenciarProdutos = () => { 
    //#region Variáveis e Variáveis de Estado
    const [infos, setInfos] = useState([]);
    const [infosG, setInfosG] = useState([]);
    const [open, setOpen] = useState(false);
    const [openA, setOpenA] = useState(false);
    const [openE, setOpenE] = useState(false);
    const [openL, setOpenL] = useState(false);
    const [openG, setOpenG] = useState(false);
    const [alerta, setAlerta] = useState("");
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [grupo, setGrupo] = useState("");
    const [grupoId, setGrupoId] = useState("");
    const [grupoNome, setGrupoNome] = useState("");
    const [imagem, setImagem] = useState([]);
    const [id, setId] = useState("");
    const [nomeE, setNomeE] = useState("");
    const [descricaoE, setDescricaoE] = useState("");
    const [img, setImg] = useState("");  
    const perfil = useState(localStorage.getItem("perfil"));
    const email = useState(localStorage.getItem("email"));

    const ArrPro = (arr) =>
      arr.map((item) => ({ id: item.id, nome: item.nome, descricao: item.descricao,
                           grupo: item.grupo, imagem: item.imagem })); 
    const ArrGru = (arr) =>
        arr.map((item) => ({ id: item.id, nome: item.nome}));
    
    var produto = {
        nome: "",
        descricao: "",
        grupo: "",
        email: "",
        perfil: "",
        imagem: []
    }
    var msg = "";
    var back = "localhost:3001";
    //#endregion
    //#region Funções e Funções de Estado
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
    const handleClickOpenG = () =>{
        setOpenG(true);

        setGrupoId("");
        setGrupoNome("");
    };
    const handleCloseG = () => {
      setOpenG(false);
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
                    grupo: grupo,
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
                    grupo: grupo,
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
    const handleSubmitG = () => {
        if (grupoNome !== ""){                
            const formData = new FormData();
                formData.append('perfil',perfil);
                formData.append('email',email);
                formData.append('nome',grupoNome);

            axios
                .post(`http://` + back + `/grupos`, formData)
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
                    msg = "Não foi possível cadastrar esse grupo, revise os dados e tente novamente.";
                    handleClickOpenA(msg);
                })
        } else {
            msg = "Informe os dados solicitados.";
            handleClickOpenA(msg);
        }
    };
    const handleLoad = () =>{
        axios
          .get(`http://`+ back +`/produtos`)
          .then((res) => {              
            setInfos(ArrPro(res.data.response.produtos)); 
            setInfosG(ArrGru(res.data.response.grupos)); 
          }).catch((res) =>{ 
            // msg = "Não foi possível localizar produtos.";
            // handleClickOpenA(msg);   
          })  
    };
    const handleAlter = () =>{       

        if (nomeE !== "" || descricaoE !== ""){
            axios
                .put(`http://`+ back +`/produtos/`+id,{
                    nome: nomeE,
                    descricao: descricaoE,
                    grupo: grupo,
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
                        grupo: grupo,
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
    //#endregion
    return(
        <div>    
            <Box p={1} display="flex" align="right">                      
                <Box p={1} style={{width:'50%', textAlign:'start', paddingTop:'20px'}}>                         
                    <Typography variant="h6">
                        Gerenciar Produtos
                    </Typography>
                </Box>  
                <Box p={1} display="flex" justifyContent="flex-end" style={{width:'50%', textAlign:'end'}}>      
                    <Box p={1} style={{textAlign:'end'}}>
                        <Button 
                            onClick={()=>handleClickOpenG()} 
                            variante="contained" 
                            className="btnNovo"
                            startIcon={<MdAdd/>}
                            style={{ backgroundColor:"#2E8E61", color:"#FFFFFF", marginRight:'20px'  }}> 
                            NOVO GRUPO
                        </Button>
                        <Button 
                            onClick={()=>handleClickOpen()} 
                            variante="outlined" 
                            className="btnNovo"
                            startIcon={<MdAdd/>}
                            style={{ color:"#2E8E61"}}> 
                            NOVO PRODUTO
                        </Button>
                    </Box>       
                </Box>
            </Box>  
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

            <DialogMain
                open={open}
                close={handleClose}
                title={"NOVO PRODUTO"}
                info={(<Box>
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
                            <TextField 
                                className="inp"
                                type="text" 
                                onChange={handleChange(setNome)}
                                value={nome}
                                maxLength="75"
                                minLength="6"
                                label="Nome (min 6 - max 75)"
                                variant="outlined" />
                        </div>
                    </div><br/><br/>
                    <div style={{ display:"block", textAlign:'center' }}>
                        <TextField 
                            className="inp"
                            type="text" 
                            onChange={handleChange(setDescricao)}
                            value={descricao}
                            maxLength="250"
                            minLength="6"
                            label="Descrição (min 6 - max 250)"
                            multiline
                            variant="outlined" />
                    </div>
                    </Box>)}
                click={()=>handleSubmit()}
                label={"CADASTRAR"}
            />
            <DialogMain
                open={openE}
                close={handleCloseE}
                title={"EDITAR PRODUTO"}
                info={(<Box>
                    <div className="noticias">
                        <div className="esquerda">                                                 
                            <div className="result">{renderPhotos(img)}</div>
                        </div>
                        <div className="direita">
                            <TextField 
                                className="inp"
                                type="text" 
                                onChange={handleChange(setNomeE)}
                                value={nomeE}
                                maxLength="75"
                                minLength="6"
                                label="Nome (min 6 - max 75)"
                                variant="outlined" />
                        </div>
                    </div><br/><br/>
                    <div style={{ display:"block", textAlign:'center' }}>
                        <TextField 
                            className="inp"
                            type="text" 
                            onChange={handleChange(setDescricaoE)}
                            value={descricaoE}
                            maxLength="250"
                            minLength="6"
                            label="Descrição (min 6 - max 250)"
                            multiline
                            variant="outlined" />
                    </div>
                    </Box>)}
                click={()=>handleAlter()}
                label={"ATUALIZAR"}
            /> 
            <DialogMain
                open={openG}
                close={handleCloseG}
                title={"NOVO GRUPO"}
                info={(<Box>
                    <TextField 
                        className="inp"
                        type="text" 
                        onChange={handleChange(setGrupoNome)}
                        value={grupoNome}
                        maxLength="75"
                        minLength="6"
                        label="Nome (min 6 - max 75)"
                        variant="outlined" />
                    </Box>)}
                click={()=>handleSubmitG()}
                label={"CADASTRAR"}
            />           
            <DialogAlert open={openA} close={handleCloseA} alert={alerta}/>            
            <DialogLoading open={openL} />    
        </div>
    );
}
export default GerenciarProdutos;