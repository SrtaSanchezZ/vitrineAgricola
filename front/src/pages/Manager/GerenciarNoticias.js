//#region Dependências
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { AiOutlineInfoCircle, AiOutlineSave, AiOutlineCloseCircle } from "react-icons/ai";
import { Button, Box, Grid, IconButton, TextField, List, Card, CardHeader, ListItem, 
        ListItemText, ListItemIcon, Checkbox, Divider, Typography } from '@material-ui/core';
import { MdAdd } from "react-icons/md";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import semimg from '../../assets/img/noimg.png';
import { DialogAlert, DialogMain, DialogLoading } from '../../components/Dialog';
//#endregion
  
const GerenciarNoticias = () => { 
    //#region Variáveis e Variáveis de Estado 
    const [checked, setChecked] = useState([]);
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
      setChecked([]);
    };
    const handleClickOpenV = (id, titulo, texto, imagem, usuario, data) => {
        setId(id);
        setTitulo(titulo);
        setTexto(texto);
        setUsuario(usuario);
        setImg(imagem);
        setData(data);
    };
    const handleClickOpenE = (titulo, texto) => {
      setOpenE(true);
      setTituloE(titulo);
      setTextoE(texto);
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
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        handleClickOpenV(value.id, value.titulo, value.texto, value.imagem, value.usuario, value.data);
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
        
        if(checked.length < 3){
            setChecked(newChecked);
        }else{
            newChecked.splice(currentIndex, 1);
            setChecked(newChecked);
        }
    };
    
    const numberOfChecked = (items) => checked.filter((value) => items.indexOf(value) !== -1).length;
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
        return <img src={ima} alt="Imagem Notícia" style={{maxWidth:"200px", maxHeight: "130px", borderRadius: "5px"}} />
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
                      handleClose();
            }
        } else {
            handleCloseL();

            msg = "Informe os dados solicitados.";
            handleClickOpenA(msg);
            handleClose();
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
                    
                    setTitulo(tituloE);
                    setTexto(textoE);
                    handleCloseE();
                })
                .catch((res) =>{    
                    msg = "Não foi possível atualizar essa notícia.";
                    handleClickOpenA(msg);   
                    handleCloseE();
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
                    setChecked([]);
                })
                .catch((res) =>{    
                    msg = "Não foi possível apagar essa notícia.";
                    handleClickOpenA(msg); 
                    setChecked([]);  
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
                    <Card>
                        <CardHeader
                            subheader={`Notícias Selecionadas para Destacar (${numberOfChecked(infos)}/3)`}
                        />
                        <Divider />
                        <List container wrap="nowrap" style={{ width: "100%", height: "65vh", backgroundColor: "#ffffff", overflow: 'auto', }} 
                              dense component="div" role="list">
                            {infos.map((value) => {
                                return (
                                    <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
                                        <ListItemIcon>
                                            <Checkbox
                                            checked={checked.indexOf(value) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': value.id }}
                                            />
                                        </ListItemIcon>
                                        <Typography noWrap variant="subtitle1" id={value.id}>
                                            {value.titulo}
                                        </Typography>
                                    </ListItem>
                                );
                            })}
                            <ListItem />
                        </List>
                    </Card>
                </div>
                <div className="direitaN">
                    <div className="bxLeitura" style={{ width: "96%", height: "68vh", backgroundColor: "#ffffff", overflow: 'auto', }}>
                        {open ? (                            
                                    <Grid item xs container direction="column" spacing={2}>
                                    <Box display="flex" p={1} m={1} style={{ width:"96%" }} > 
                                        <Box p={1} style={{ width:"30%" }} >                                        
                                            <input 
                                                className="inpImg"
                                                type="file" 
                                                name="imagem"
                                                onChange={handleChageImg}
                                            /><br/>
                                            <label htmlFor="file" className="label">
                                                <i className="material-icons">Imagem (até 512KB - 600 x 600) <br/> Formatos (png, jpg ou jpeg)</i>
                                            </label>
                                        </Box>            
                                        <Box p={1} style={{ width:"60%", textAlign:'center' }} >
                                            <TextField 
                                                className="inp"
                                                type="text" 
                                                onChange={handleChange(setTitulo)}
                                                value={titulo}
                                                maxLength="75"
                                                minLength="6"
                                                label="Título (min 6 - max 75)"
                                                variant="outlined"
                                            />
                                        </Box>            
                                        <Box p={1} style={{ width:"10%" }} >
                                            <div className="actions-button" style={{ marginRight: 0, marginTop: -4, width: "90px", height: 'auto', align: "center" }} >
                                                <IconButton size="small" style={{ marginRight: 16, backgroundColor: "#2E8E61", color: "#ffffff", position:"unset" }} onClick={()=>handleSubmit()}>
                                                    <AiOutlineSave style={{ width:30, height:30 }} />
                                                </IconButton>
                                                <IconButton size="small" style={{ backgroundColor: "#2E8E61", color: "#ffffff", position:"unset" }} onClick={() => handleClose()} >
                                                    <AiOutlineCloseCircle style={{ width:30, height:30 }} />
                                                </IconButton>
                                            </div>
                                        </Box>               
                                    </Box>
                                    <TextField 
                                        className="inp"
                                        type="text" 
                                        onChange={handleChange(setTexto)}
                                        value={texto}
                                        maxLength="1990"
                                        minLength="6"
                                        label="Texto (min 6 - max 1990)"
                                        multiline
                                        variant="outlined"
                                    />
                                </Grid>
                                ) : (!openE && checked.length ? (                                                                
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Box display="flex" p={1} m={1} style={{ width:"96%" }} > 
                                            <Box p={1} style={{ width:"30%" }} >
                                                <div className="result">{renderPhotos(img)}</div>
                                            </Box>            
                                            <Box p={1} style={{ width:"60%", textAlign:'center' }} >
                                                <Typography variant="subtitle1" id={id}>
                                                    {titulo}
                                                </Typography>
                                            </Box>            
                                            <Box p={1} style={{ width:"10%" }} >
                                                <div className="actions-button" style={{ marginRight: 0, marginTop: -4, width: "90px", height: 'auto', align: "center" }} >
                                                    <IconButton size="small" style={{ marginRight: 16, backgroundColor: "#2E8E61", color: "#ffffff", position:"unset" }} onClick={() => handleClickOpenE(titulo, texto)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton size="small" style={{ backgroundColor: "#2E8E61", color: "#ffffff", position:"unset" }} onClick={() => handleDelete(id, titulo, texto)} >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </div>
                                            </Box>               
                                        </Box>
                                        <Typography variant="body2" style={{ textAlign:'justify' }} color="textSecondary">                                                
                                            {texto}                                                          
                                        </Typography>
                                    </Grid>
                                ) : (!checked.length ? (                            
                                    <CardHeader
                                        avatar={<AiOutlineInfoCircle/>}
                                        subheader={`Para visualizar selecione uma notícia na lateral`}
                                    />   
                                ) : (                                                              
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Box display="flex" p={1} m={1} style={{ width:"96%" }} > 
                                            <Box p={1} style={{ width:"30%" }} >
                                                <div className="result">{renderPhotos(img)}</div>
                                            </Box>            
                                            <Box p={1} style={{ width:"60%", textAlign:'center' }} >
                                                <TextField 
                                                    className="inp"
                                                    type="text" 
                                                    onChange={handleChange(setTituloE)}
                                                    value={tituloE}
                                                    maxLength="75"
                                                    minLength="6"
                                                    label="Título (min 6 - max 75)"
                                                    variant="outlined"
                                                />
                                            </Box>            
                                            <Box p={1} style={{ width:"10%" }} >
                                                <div className="actions-button" style={{ marginRight: 0, marginTop: -4, width: "90px", height: 'auto', align: "center" }} >
                                                    <IconButton size="small" style={{ marginRight: 16, backgroundColor: "#2E8E61", color: "#ffffff", position:"unset" }} onClick={()=>handleAlter()}>
                                                        <AiOutlineSave style={{ width:30, height:30 }} />
                                                    </IconButton>
                                                    <IconButton size="small" style={{ backgroundColor: "#2E8E61", color: "#ffffff", position:"unset" }} onClick={() => handleCloseE()} >
                                                        <AiOutlineCloseCircle style={{ width:30, height:30 }} />
                                                    </IconButton>
                                                </div>
                                            </Box>               
                                        </Box>
                                        <TextField 
                                            className="inp"
                                            type="text" 
                                            onChange={handleChange(setTextoE)}
                                            value={textoE}
                                            maxLength="1990"
                                            minLength="6"
                                            label="Texto (min 6 - max 1990)"
                                            multiline
                                            variant="outlined"
                                        />
                                    </Grid>)))
                        }
                    </div>
                </div>
            </div>
                       
            <DialogAlert open={openA} close={handleCloseA} alert={alerta}/>            
            <DialogLoading open={openL} />  
        </div>
    );
}
export default GerenciarNoticias;