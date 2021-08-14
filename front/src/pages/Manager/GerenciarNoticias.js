//#region Dependências
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Box, Grid, IconButton, TextField } from '@material-ui/core';
import { MdAdd } from "react-icons/md";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import semimg from '../../assets/img/noimg.png';
import { DialogAlert, DialogMain, DialogLoading } from '../../components/Dialog';
//#endregion
const GerenciarNoticias = () => { 
    //#region Variáveis e Variáveis de Estado 
    const [infos, setInfos] = useState([]);
    const [open, setOpen] = useState(false);
    const [openA, setOpenA] = useState(false);
    const [openE, setOpenE] = useState(false);
    const [openL, setOpenL] = useState(false);
    const [alerta, setAlerta] = useState("");
    const [titulo, setTitulo] = useState("");
    const [texto, setTexto] = useState("");
    const [usuario, setUsuario] = useState("");
    const [data, setData] = useState("");
    const [imagem, setImagem] = useState([]);
    const [id, setId] = useState("");
    const [tituloE, setTituloE] = useState("");
    const [textoE, setTextoE] = useState("");
    const [img, setImg] = useState("");  
    const [perfil, setPerfil] = useState(localStorage.getItem("perfil"));
    const [email, setEmail] = useState(localStorage.getItem("email")); 

    const ArrNot = (arr) =>
      arr.map((item) => ({ id: item.id, titulo: item.titulo, texto: item.texto,
                           data: item.data, usuario: item.usuario, imagem: item.imagem }));
    
    var noticia = {
    titulo: "",
    texto: "",
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

      setTitulo("");
      setTexto("");
      setImagem([]);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleClickOpenE = (id, titulo, texto, imagem, usuario, data) => {
      setOpenE(true);
      setId(id);
      setTituloE(titulo);
      setTextoE(texto);
      setUsuario(usuario);
      setImg(imagem);
      setData(data);
    };
    const handleCloseE = () => {
      setOpenE(false);
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
        return <img src={ima} alt="Imagem Notícia" style={{maxWidth:"100px", maxHeight: "100px", borderRadius: "5px"}} />
	};
    const handleSubmit = () => {

        handleClickOpenL();

        if (titulo !== "" && texto !== ""){
            if(imagem.length > 0){

                noticia = {
                    titulo: titulo,
                    texto: texto,
                    email: email,
                    perfil: perfil,
                    imagem: imagem[0]
                  }
                
                const formData = new FormData();
                  formData.append('perfil',perfil);
                  formData.append('email',email);
                  formData.append('titulo',noticia.titulo);
                  formData.append('texto',noticia.texto);
                  formData.append('file',noticia.imagem);

                axios
                    .post(`http://` + back + `/noticias`, formData)
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
                        msg = "Não foi possível cadastrar essa notícia, revise os dados e tente novamente.";
                        handleClickOpenA(msg);
                    })
            }else{
                noticia = {
                    titulo: titulo,
                    texto: texto,
                    imagem: semimg
                  }
                
                  const formData = new FormData();
                    formData.append('perfil',perfil);
                    formData.append('email',email);
                    formData.append('titulo',noticia.titulo);
                    formData.append('texto',noticia.texto);
                    formData.append('file',noticia.imagem);
  
                  axios
                      .post(`http://` + back + `/noticia`, formData)
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
                          msg = "Não foi possível cadastrar essa notícia, revise os dados e tente novamente.";
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
          .get(`http://`+ back +`/noticias`)
          .then((res) => {              
            setInfos(ArrNot(res.data.response.noticias)); 
          }).catch((res) =>{    
            msg = "Não foi possível localizar notícias.";
            handleClickOpenA(msg);   
          })  
    };
    const handleAlter = () =>{       

        if (tituloE !== "" || textoE !== ""){
            axios
                .put(`http://`+ back +`/noticias/`+id,{
                    titulo: tituloE,
                    texto: textoE,
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
                    msg = "Não foi possível atualizar essa notícia.";
                    handleClickOpenA(msg);   
                }) 

        }else{
            msg = "O titulo e texto devem ser preenchidos";
            handleClickOpenA(msg);   
        }

    };
    const handleDelete = (id, titulo, texto) =>{       
            axios
                .delete(`http://`+ back +`/noticias/`+id,{
                    headers:{
                        titulo: titulo,
                        texto: texto,
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
                    msg = "Não foi possível apagar essa notícia.";
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
            <div className="noticias">
                <div className="esquerda">
                </div>
                <div className="direita">
                    <Button onClick={()=>handleClickOpen()} variante="contained" className="btnNovo" style={{ backgroundColor:"#2E8E61", color:"#FFFFFF", position:"unset"  }} startIcon={<MdAdd/>}>NOVA NOTÍCIA</Button>
                </div>
            </div>
            <div className="noticias">
                <div className="esquerdaN">
                    <Grid className="bxLista" item xs={12}>
                        {infos.map((item, index) => (
                            <Box display="bloxk">    
                                <Box display="flex" id={index} p={1} m={1} css={{ height: "auto", width:"90%"}}>
                                    <Box p={1} flexGrow={2} css={{ width: "200px", height: 'auto' }} >
                                        <li style={{listStyleType:"none"}} onClick={() => handleClickOpenE(item.id, item.titulo, item.texto, item.imagem, item.usuario, item.data)}>
                                            <div className="result">{renderPhotos(item.imagem)}</div>
                                        </li>
                                    </Box>
                                    <Box p={1} flexGrow={2} css={{ width: "200px", height: 'auto' }} >
                                        <li style={{listStyleType:"none"}} onClick={() => handleClickOpenE(item.id, item.titulo, item.texto, item.imagem, item.usuario, item.data)}>
                                            <div style={{ textAlign:"left",  color: "black", alignItems:'center' }}>
                                                <span >{item.titulo}</span><br/><br/>
                                                <span className="labelPre">{item.texto}</span>
                                            </div>
                                        </li>
                                    </Box>          
                                    <Box p={1} >
                                        <div className="actions-button" style={{ marginRight: 0, marginTop: -4, width: "100px", height: 'auto', align: "center" }} >
                                            <IconButton size="small" style={{ marginRight: 16, backgroundColor: "#2E8E61", color: "#ffffff", position:"unset" }} onClick={() => handleClickOpenE(item.id, item.titulo, item.texto, item.imagem, item.usuario, item.data)}>
                                            <EditIcon />
                                            </IconButton>
                                            <IconButton size="small" style={{ backgroundColor: "#2E8E61", color: "#ffffff", position:"unset" }} onClick={() => handleDelete(item.id, item.titulo, item.texto)} >
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
                <div className="direitaN">
                    <div className="bxLeitura">
                        <div className="bxLTexto">
                            <span>Em breve: Campo de Leitura de Notícias</span>
                        </div>
                    </div>
                </div>
            </div>
                       
            <DialogAlert open={openA} close={handleCloseA} alert={alerta}/>            
            <DialogMain
                open={open}
                close={handleClose}
                title={"NOVA NOTÍCIA"}
                info={(<div>
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
                                onChange={handleChange(setTitulo)}
                                value={titulo}
                                maxLength="75"
                                minLength="6"
                                label="Título (min 6 - max 75)"
                                variant="outlined"
                            /><br/><br/>
                        </div>
                    </div>
                    <div style={{ display:"block", textAlign:'center' }}>
                        <TextField 
                            className="inp"
                            type="text" 
                            onChange={handleChange(setTexto)}
                            value={texto}
                            maxLength="1990"
                            minLength="6"
                            label="Texto (min 6 - max 1990)"
                            multiline
                            rows={4}
                            variant="outlined"
                        /><br/><br/>
                    </div>
                    </div>)}
                click={()=>handleSubmit()}
                label={"CADASTRAR"}
            />
            <DialogMain
                open={openE}
                close={handleCloseE}
                title={"EDITAR NOTÍCIA"}
                info={(<div>
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
                                onChange={handleChange(setTituloE)}
                                value={tituloE}
                                maxLength="75"
                                minLength="6"
                                placeholder="Título (min 6 - max 75)"
                            />
                        </div>
                    </div>
                    <div style={{ display:"block", textAlign:'center' }}>
                        <textarea 
                            className="inp"
                            type="text" 
                            name="texto"
                            onChange={handleChange(setTextoE)}
                            value={textoE}
                            maxLength="1990"
                            minLength="6"
                            placeholder="Texto (min 6 - max 1990)"
                        />
                    </div>
                    </div>)}
                click={()=>handleAlter()}
                label={"ATUALIZAR"}
            />            
            <DialogLoading open={openL} />  
        </div>
    );
}
export default GerenciarNoticias;