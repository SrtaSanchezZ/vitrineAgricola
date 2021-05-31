//#region Dependências
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, Box, Grid, IconButton } from '@material-ui/core';
import { AiFillCloseCircle } from 'react-icons/ai';
import { MdAdd } from "react-icons/md";
import CircularProgress from '@material-ui/core/CircularProgress';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import semimg from '../../assets/img/noimg.png';

//#endregion
const GerenciarNoticias = () => {  
    const [infos, setInfos] = useState([]);
    const [open, setOpen] = useState(false);
    const [openA, setOpenA] = useState(false);
    const [openE, setOpenE] = useState(false);
    const [openL, setOpenL] = useState(false);
    const [alerta, setAlerta] = useState("");
    const [titulo, setTitulo] = useState("");
    const [texto, setTexto] = useState("");
    const [destaque, setDestaque] = useState("");
    const [imagem, setImagem] = useState([]);
    const [id, setId] = useState("");
    const [tituloE, setTituloE] = useState("");
    const [textoE, setTextoE] = useState("");
    const [img, setImg] = useState("");  
    const [perfil, setPerfil] = useState(localStorage.getItem("perfil"));
    const [email, setEmail] = useState(localStorage.getItem("email")); 

    const ArrNot = (arr) =>
      arr.map((item) => ({ id: item.id, titulo: item.titulo, texto: item.texto,
                           data: item.data, usuario: item.usuario, destaque: item.destaque }));

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
    const handleClickOpenE = (id, titulo, texto, destaque) => {
      setOpenE(true);
      setId(id);
      setTituloE(titulo);
      setTextoE(texto);
      setDestaque(destaque);
      //setImg(imagem);
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
        if(img !== null && img !== ""){
        var ima = img;
        return <img src={ima} alt="Imagem Notícia" style={{maxWidth:"100px", maxHeight: "100px", borderRadius: "5px"}} />
        }else{
        return <img src={semimg} alt="Imagem" style={{maxWidth:"100px", maxHeight: "100px", borderRadius: "5px"}}  />
        }
	};
    const handleSubmit = () => {

        var noticia = {
          titulo: "",
          texto: "",
          imagem: []
        }

        handleClickOpenL();

        if (titulo !== "" || texto !== ""){
            if(imagem.length > 0){

                noticia = {
                    titulo: titulo,
                    texto: texto,
                    imagem: imagem[0]
                  }
                
                const formData = new FormData();
                  formData.append('perfil',perfil);
                  formData.append('email',email);
                  formData.append('titulo',noticia.titulo);
                  formData.append('texto',noticia.texto);
                  formData.append('imagem',noticia.imagem);

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
                    formData.append('imagem',noticia.imagem);
  
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
          .get(`http://`+ back +`/noticia`)
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
                .put(`http://`+ back +`/noticia/`+id,{
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

    useEffect(() => {
        handleLoad();
        // eslint-disable-next-line
      }, []);
    return(
        <div> 
            <div className="noticias">
                <div className="esquerda">
                    <span>Lista de Notícias</span>
                </div>
                <div className="direita">
                    <Button onClick={()=>handleClickOpen()} variante="contained" className="btnNovo" style={{ backgroundColor:"#00AA31", color:"#FFFFFF" }} startIcon={<MdAdd/>}>NOVA NOTÍCIA</Button>
                </div>
            </div>
            <div className="noticias">
                    <Grid item xs={12}>
                        <div align="center">
                            <Box display="flex" p={1} m={1} css={{ height: "auto", width: "100%", borderRadius: "5px", backgroundColor: "#00AA31", fontWeight: 'bolder' }}>
                                <Box p={1} flexGrow={2}>
                                    <span className="ml-0" style={{ color: "#ffffff", fontSize: "120%", marginLeft:"-130px"}}>TITULO</span>
                                </Box>
                            </Box>
                        </div>
                        <Box>
                            {infos.map((item, index) => (
                                <div align="center">
                                <Box display="flex" p={1} m={1} css={{ height: "auto", minWidth:"100%", maxWidth: "150%", borderRadius: "5px", backgroundColor: "#b6ffb5" }}>
                                    <Box id="valor" p={1} flexGrow={2} css={{ width: "200px", height: 'auto' }} >
                                        <li style={{listStyleType:"none"}} onClick={() => handleClickOpenE(item.id, item.titulo, item.texto, item.destaque)}>
                                            <span className="ml-0" style={{ color: "black", fontSize: "120%"}}>{item.titulo}</span>
                                        </li>
                                    </Box>         
                                    <Box p={1} >
                                    <div className="actions-button" style={{ marginRight: 0, marginTop: -4, width: "100px", height: 'auto', align: "center" }} >
                                        <IconButton size="small" style={{ marginRight: 16, backgroundColor: "#00AA31", color: "#ffffff" }} onClick={() => handleClickOpenE(item.id, item.titulo, item.texto, item.destaque)}>
                                        <EditIcon />
                                        </IconButton>
                                        <IconButton size="small" style={{ backgroundColor: "#00AA31", color: "#ffffff" }} onClick={() => handleClickOpenA(item.id)} >
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
                    <span>NOVA NOTÍCIA</span>
                    <AiFillCloseCircle onClick={() => handleClose()} style={{ width: '18px', height: 'auto', marginLeft: '70%', marginRight:"20px", marginTop: '25px' }} />
                </Box>
                <DialogContent className="Texto" style={{ marginTop: '10px' }}>
                    <div style={{ display:"block" }}>
                        <input 
                            className="inp"
                            type="file" 
                            name="imagem"
                            onChange={handleChageImg}
                        /><br/>
                        <label htmlFor="file" className="label">
                            <i className="material-icons">Imagem (até 512KB - 600 x 600), formatos suportados (png, jpg e jpeg)</i>
                        </label>
                        <input 
                            className="inp"
                            type="text" 
                            name="titulo"
                            onChange={handleChange(setTitulo)}
                            value={titulo}
                            maxLength="75"
                            minLength="6"
                            placeholder="Título (min 6 - max 75)"
                        />
                        <textarea 
                            className="inp"
                            type="text" 
                            name="texto"
                            onChange={handleChange(setTexto)}
                            value={texto}
                            maxLength="1990"
                            minLength="6"
                            placeholder="Texto (min 6 - max 1990)"
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
                    <span>EDITAR NOTÍCIA</span>
                    <AiFillCloseCircle onClick={() => handleCloseE()} style={{ width: '18px', height: 'auto', marginLeft: '70%', marginRight:"20px", marginTop: '25px' }} />
                </Box>
                <DialogContent className="Texto" style={{ marginTop: '10px' }}>                                                 
                    <div className="result">{renderPhotos(img)}</div><br/>
                    <div style={{ display:"block" }}>
                        <input 
                            className="inp"
                            type="file" 
                            name="imagem"
                            onChange={handleChageImg}
                        /><br/>
                        <label htmlFor="file" className="label">
                            <i className="material-icons">Imagem (até 512KB - 600 x 600), formatos suportados (png, jpg e jpeg)</i>
                        </label>
                        <input 
                            className="inp"
                            type="text" 
                            name="titulo"
                            onChange={handleChange(setTituloE)}
                            value={tituloE}
                            maxLength="75"
                            minLength="6"
                            placeholder="Título (min 6 - max 75)"
                        />
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
export default GerenciarNoticias;