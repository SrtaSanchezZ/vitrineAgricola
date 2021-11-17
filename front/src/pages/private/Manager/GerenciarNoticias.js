//#region Dependências
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { AiOutlineInfoCircle, AiFillSave, AiOutlineCloseCircle } from "react-icons/ai";
import { VscStarEmpty } from "react-icons/vsc";
import { Button, Box, Grid, IconButton, TextField, List, Card, CardHeader, InputAdornment, ListItem, 
       ListItemIcon, Checkbox, Divider, Typography } from '@material-ui/core';
import { MdAdd } from "react-icons/md";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Search from '@material-ui/icons/Search';
import semimg from '../../../assets/img/noimg.png';
import { DialogAlert, DialogLoading } from '../../../components/Dialog';
//#endregion
const GerenciarNoticias = () => { 
    //#region Variáveis e Variáveis de Estado 
    const [checked, setChecked] = useState([]);
    const [infos, setInfos] = useState([]);
    const [filtro, setFiltro] = useState([]);
    const [valorF, setValorF] = useState("");
    const [comF, setComF] = useState("none"); 
    const [semF, setSemF] = useState("block");
    const [open, setOpen] = useState(false);
    const [openA, setOpenA] = useState(false);
    const [openE, setOpenE] = useState(false);
    const [openL, setOpenL] = useState(false);
    const [alerta, setAlerta] = useState("");
    const [titulo, setTitulo] = useState("");
    const [texto, setTexto] = useState("");
    const [autor, setAutor] = useState("");
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
      arr.map((item) => ({ id: item.id, titulo: item.titulo, texto: item.texto, data: item.data,
                           usuario: item.usuario, imagem: item.imagem, destaque: item.destaque, autor: item.autor }));
    
    var noticia = {
        titulo: "",
        texto: "",
        email: "",
        autor: "",
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
      setAutor("");
      setImagem([]);
    };
    const handleClose = () => {
      setOpen(false);
      setChecked([]);
    };
    const handleClickOpenV = (id, titulo, texto, imagem, usuario, data, autor) => {
        setId(id);
        setTitulo(titulo);
        setTexto(texto);
        setUsuario(usuario);
        setImg(imagem);
        setData(data);
        setAutor(autor);
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
        handleClose();
        handleCloseE();

        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        handleClickOpenV(value.id, value.titulo, value.texto, value.imagem, value.usuario, value.data, value.autor);
    
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
        
        if(file > 1024000){
            error = "Arquivo deve ter até 1MB";
            handleClickOpenA(error);
            setImagem([]);
        }else{
            setImagem([]);
            var fileArray = Array.from(e.target.files);
            setImagem((Img)=>Img.concat(fileArray));
        }
    };
    const renderPhotos = (img) => {
        var ima = "http://localhost:3001" + img;
        return <img src={ima} alt="Imagem Notícia" style={{ width:"400px", maxHeight: "200px", borderRadius: "5px"}} />
	};
    const handleSubmit = () => {

        handleClickOpenL();

        if (titulo !== "" && texto !== ""){
            if(imagem.length > 0){

                noticia = {
                    titulo: titulo,
                    texto: texto,
                    autor: autor,
                    imagem: imagem[0]
                  }
                
                const formData = new FormData();
                  formData.append('perfil',perfil);
                  formData.append('email',email);
                  formData.append('autor',noticia.autor);
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
                            handleClose();
                        }else{                                                     
                            msg = res.data.msg
                            handleClickOpenA(msg);
                            handleClose();
                        }

                    })
                    .catch((error) => {
                        handleClose();
                        handleCloseL();
                        msg = "Não foi possível cadastrar essa notícia, revise os dados e tente novamente.";
                        handleClickOpenA(msg);
                    })
            }else{
                noticia = {
                    titulo: titulo,
                    texto: texto,
                    autor: autor,
                    imagem: semimg
                  }
                
                  const formData = new FormData();
                    formData.append('perfil',perfil);
                    formData.append('email',email);
                    formData.append('autor',noticia.autor);
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
                            handleClose();
                        }else{                                                     
                            msg = res.data.msg
                            handleClickOpenA(msg);
                            handleClose();
                        }

                      })
                      .catch((error) => {
                            handleClose();
                            handleCloseL();
                            msg = "Não foi possível cadastrar essa notícia, revise os dados e tente novamente.";
                            handleClickOpenA(msg);
                      })
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
                    
                        setTitulo(tituloE);
                        setTexto(textoE);
                        handleCloseE();
                    }else{                                                     
                        msg = res.data.msg
                        handleClickOpenA(msg);
                    
                        setTitulo(tituloE);
                        setTexto(textoE);
                        handleCloseE();
                    }
                })
                .catch((error) =>{    
                    msg = "Não foi possível atualizar essa notícia.";
                    handleClickOpenA(msg);   
                    handleCloseE();
                }) 

        }else{
            msg = "O titulo e texto devem ser preenchidos";
            handleClickOpenA(msg);   
        }

    };
    const handleDelete = () =>{       
        axios
            .delete(`http://`+ back +`/noticias/`+id,{
                headers:{
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
            .catch((error) =>{    
                msg = "Não foi possível apagar essa notícia.";
                handleClickOpenA(msg); 
                setChecked([]);  
            }) 
    };
    const handleHighlight = () =>{   

        handleClickOpenL();

        if(checked.length > 0){
            axios
                .put(`http://`+ back +`/noticias`,{
                    perfil: perfil,
                    email: email,
                    noticias: checked
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
                    handleCloseL();
                })
                .catch((error) =>{    
                    msg = "Não foi possível destacar essa(s) notícia(s).";
                    handleClickOpenA(msg); 
                    setChecked([]);  
                    handleCloseL();
                }) 
            }else{
                msg = "Selecione ao menos uma notícias para destacar.";
                handleClickOpenA(msg);   
                handleCloseL();              
            }
    };
    const handleFiltro = () => {
      setFiltro(infos.filter(infos => infos.texto.toUpperCase().indexOf(valorF.toUpperCase()) !== -1 
                            || infos.titulo.toUpperCase().indexOf(valorF.toUpperCase()) !== -1
                            || infos.autor.toUpperCase().indexOf(valorF.toUpperCase()) !== -1));
      if(filtro.length > 1){
        setSemF("none");
        setComF("block");
      }else{
        setSemF("block");
        setComF("none");
      }
    };
    const handleChangeFiltro = (set) => (event) => {
      set(event.target.value)
      handleFiltro();
    };

    useEffect(() => {
        handleLoad();
        // eslint-disable-next-line
      }, []);
    //#endregion
    return(
        <Grid display="block" style={{ paddingLeft:'24px', paddingRight:'24px' }}>
            <Box p={1} display="flex" align="right">           
                <Box  style={{width:'50%', textAlign:'start', paddingTop:'20px'}}>                         
                    <Typography variant="h6">
                        Gerenciar Notícias
                    </Typography>
                </Box>
                <Box  display="flex" justifyContent="flex-end" style={{ width:'50%', textAlign:'end' }}>      
                    <Box p={1} style={{textAlign:'end'}}>
                        <Button 
                            onClick={()=>handleHighlight()} 
                            variante="contained" 
                            className="btnNovo"
                            startIcon={<VscStarEmpty/>}
                            style={{ backgroundColor:"#2E8E61", color:"#FFFFFF", marginRight:'20px' }}> 
                            DESTACAR
                        </Button>
                        <Button 
                            onClick={()=>handleClickOpen()} 
                            variante="outlined" 
                            className="btnNovo"
                            startIcon={<MdAdd/>}
                            style={{ color:"#2E8E61", position:"unset", border:'2px solid #2E8E61' }}> 
                            NOVA NOTÍCIA
                        </Button>
                    </Box>       
                </Box>
            </Box>
            <Grid item xs={12} style={{ paddingLeft:'28%' }}>              
                <CardHeader subheader={
                    <Box p={1} display="flex">                                
                        <AiOutlineInfoCircle style={{ width:'40px', height:'auto', marginRight:'10px' }} /> 
                        <Typography variant="body2" color="textSecondary">                
                            Clique no botão "NOVA NOTÍCIA" para cadastrar ou sobre uma das listadas na "Lista de Notícias" para visualizar.<br/>
                            CLIQUE AQUI PARA SABER MAIS SOBRE A FUNÇÃO "DESTACAR".
                        </Typography>
                    </Box> }
                    style={{ cursor:'pointer' }}
                    onClick={()=>handleClickOpenA(<Box>
                        <Typography variant="subtitle1" style={{ fontWeight:'bold', textAlign:'center' }}>
                            Notícias em Destaque
                        </Typography><br/>
                        <Typography variant="subtitle1" style={{ textAlign:'justify' }}>
                            É possível selecionar até 3 notícias da lista para receberem destaque na tela de "Notícias" da área pública do site.<br/>
                            Ao selecionar as notícias desejadas e clicar no botão "DESTACAR", o banner de destaque, que recebe as imagens das notícias destacadas, será atualizado com as imagens das notícias escolhidas.<br/><br/>
                            <b>DICA: </b>Sempre opte por imagens com altura (450px) e largura (900px) ou proporcional a essas dimensões, respeitando o tamanho de 1MB e os formatos (png, jpg ou jpeg).
                        </Typography>
                    </Box>)}
                />
            </Grid>
            <Box p={1} display="flex">           
                <Box style={{ width:'50%', textAlign:'start', paddingTop:'20px' }}>  
                    <Typography variant="subtitle1" style={{ textAlign:'left' }} >
                        Lista de Notícias
                    </Typography>
                </Box>
                <Box style={{width:'50%', textAlign:'end'}}>      
                    <Box p={1} style={{textAlign:'end'}}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search style={{ margin:'5px' }} />
                                    </InputAdornment>
                                ),
                                'aria-label': 'search',
                                disableUnderline: true
                            }}
                            placeholder="Busque por uma notícia"
                            className="search"
                            variant="standard"
                            value={valorF}
                            onChange={handleChangeFiltro(setValorF)}
                            style={{ width:'60%', borderRadius:'60px' }}
                        /> 
                    </Box>       
                </Box>
            </Box> 
            <div className="noticias">
                <div className="esquerdaN">
                    <Card>
                        <CardHeader
                            avatar={<VscStarEmpty/>}
                            subheader={`Notícias Selecionadas para Destacar (${numberOfChecked(infos)}/3)`}
                        />
                        <Divider />
                        <Box display={semF}>
                            <List className="bxLista" container wrap="nowrap" style={{ width: "100%", height: "50vh", backgroundColor: "#ffffff", overflow: 'auto', }} 
                                dense component="div" role="list">
                                {infos.sort((a, b) => b.id - a.id).map((value) => {
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
                                            {value.destaque == 1 ? (
                                            <Typography noWrap variant="subtitle1" id={value.id}>
                                            <VscStarEmpty/> {" " + value.titulo}
                                            </Typography>):( <Typography noWrap variant="subtitle1" id={value.id}>
                                            {value.titulo}
                                            </Typography>) }
                                        </ListItem>
                                    );
                                })}
                                <ListItem />
                            </List>
                        </Box>
                        <Box display={comF}>
                            <List className="bxLista" container wrap="nowrap" style={{ width: "100%", height: "50vh", backgroundColor: "#ffffff", overflow: 'auto', }} 
                                dense component="div" role="list">
                                {filtro.sort((a, b) => b.id - a.id).map((value) => {
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
                                            {value.destaque == 1 ? (
                                            <Typography noWrap variant="subtitle1" id={value.id}>
                                            <VscStarEmpty/> {" " + value.titulo}
                                            </Typography>):( <Typography noWrap variant="subtitle1" id={value.id}>
                                            {value.titulo}
                                            </Typography>) }
                                        </ListItem>
                                    );
                                })}
                                <ListItem />
                            </List>
                        </Box>
                    </Card>
                </div>
                <div className="bxLeitura" style={{ width: "96%", height: "53vh", backgroundColor: "#ffffff", overflow: 'auto'}}>
                    {open ? (                            
                        <Grid item xs container direction="column" spacing={2}>
                            <Box display="flex" p={1}> 
                                <Box p={1} style={{ paddingLeft:'20%', width:"60%", textAlign:'center' }} > 
                                    <Typography variant="subtitle1" style={{ fontWeight:'bold', textAlign:'center' }}>
                                        Cadastrar Notícia
                                    </Typography> 
                                </Box>
                                <Box p={1} style={{ width:"40%", textAlign:'end' }} > 
                                    <Button onClick={()=>handleSubmit()}
                                        startIcon={<AiFillSave/>}
                                        style={{
                                            color:"#2E8E61"
                                        }}>
                                        SALVAR
                                    </Button>
                                    <Button onClick={() => handleClose()}
                                        startIcon={<AiOutlineCloseCircle/>}
                                        style={{
                                            color:"#2E8E61"
                                        }}>
                                        CANCELAR
                                    </Button>      
                                </Box>   
                            </Box>
                            <Box style={{ paddingLeft:'28%', marginTop:'-30px' }} >             
                                <CardHeader subheader={
                                    <Box p={1} display="flex">                                
                                        <AiOutlineInfoCircle style={{ width:'20px', height:'auto', marginRight:'10px' }} /> 
                                        <Typography variant="body2" color="textSecondary" style={{ textAlign:'left' }}>                
                                            Preencha todos os campos e clique em "SALVAR".<br/>
                                            Caso não queira executar nenhuma ação, clique em "CANCELAR".
                                        </Typography>
                                    </Box> }
                                        style={{ paddingLeft:'5%' }}
                                /> 
                             </Box>  
                            <Box display="flex" p={1} > 
                                <Box p={1} style={{ width:"50%" }} >                                        
                                    <TextField 
                                        className="inpImg"
                                        type="file" 
                                        name="imagem"
                                        onChange={handleChageImg}
                                    />
                                    <Typography variant="body2" color="textSecondary" style={{ textAlign:'left' }}>                
                                        Imagem (até 1MB - 450 x 900 - Formatos: png, jpg ou jpeg
                                    </Typography>
                                </Box>            
                                <Box p={1} style={{ width:"50%", textAlign:'center' }} >
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
                                    <TextField 
                                        className="inp"
                                        type="text" 
                                        onChange={handleChange(setAutor)}
                                        value={autor}
                                        maxLength="75"
                                        minLength="6"
                                        label="Autor(a) (min 6 - max 75)"
                                        variant="outlined"
                                    />
                                </Box>           
                            </Box>
                            <Box p={1} m={1}>
                                <TextField 
                                    className="inp"
                                    type="text" 
                                    onChange={handleChange(setTexto)}
                                    value={texto}
                                    maxLength="1990"
                                    minLength="6"
                                    label="Texto (min 6 - max 1990)"
                                    multiline
                                    rows={10}
                                    variant="outlined" 
                                />
                            </Box>
                        </Grid>
                        ) : (!openE && checked.length ? (                                                                
                        <Grid item xs container direction="column" spacing={2}>
                            <Box display="flex" p={1}> 
                                <Box p={1} style={{ paddingLeft:'20%', width:"40%", textAlign:'center', margin:'5px' }} > 
                                    <Typography variant="subtitle1" style={{ fontWeight:'bold', textAlign:'center' }}>
                                        Visualização de Notícia
                                    </Typography> 
                                </Box>
                                <Box p={1} style={{ width:"60%", textAlign:'end' }} > 
                                    <Button onClick={() => handleClickOpenE(titulo, texto)}
                                        startIcon={<EditIcon/>}
                                        style={{
                                            color:"#2E8E61", margin:'5px'
                                        }}>
                                        EDITAR
                                    </Button>
                                    <Button onClick={() => handleDelete()}
                                        startIcon={<DeleteIcon/>}
                                        style={{
                                            color:"#2E8E61", margin:'5px'
                                        }}>
                                        EXCLUIR
                                    </Button> 
                                    <Button onClick={() => handleClose()}
                                        startIcon={<AiOutlineCloseCircle/>}
                                        style={{
                                            color:"#2E8E61", margin:'5px'
                                        }}>
                                        CANCELAR
                                    </Button>      
                                </Box>   
                            </Box>
                            <Box style={{ paddingLeft:'25%', marginTop:'-80px' }} >             
                                <CardHeader subheader={
                                    <Box p={1} display="flex">                                
                                        <AiOutlineInfoCircle style={{ width:'20px', height:'auto', marginRight:'10px' }} /> 
                                        <Typography variant="body2" color="textSecondary" style={{ textAlign:'left' }}>                
                                            Caso queira editar esta notícia, clique em "EDITAR".<br/>
                                            Caso queira excluir esta notícia, clique em "EXCLUIR".<br/>
                                            Caso não queira executar nenhuma ação, clique em "CANCELAR".
                                        </Typography>
                                    </Box> }
                                        style={{ paddingLeft:'5%' }}
                                /> 
                             </Box>
                            <Box display="flex" p={1} m={1} style={{ width:"96%" }} > 
                                <Box p={1} style={{ width:"30%" }} >
                                    <div className="result">{renderPhotos(img)}</div>
                                </Box>            
                                <Box p={6} style={{ width:"60%", textAlign:'center' }} >
                                    <Typography variant="subtitle1" id={id} style={{ fontWeight:'bold' }}>
                                        {titulo}
                                    </Typography><br/>
                                    <Typography variant="subtitle1" id={id}>
                                       Autor(a): {autor}
                                    </Typography>
                                </Box>                  
                            </Box>
                            <Typography variant="body2" style={{ textAlign:'justify', paddingLeft:'20px' }} color="textSecondary">                                                
                                {texto}                                                          
                            </Typography>
                        </Grid>
                        ) : (!checked.length ? (                           
                                <CardHeader subheader={
                                    <Box p={1} display="flex" style={{ paddingLeft:'25%'}} >                                
                                        <AiOutlineInfoCircle style={{ width:'20px', height:'auto', marginRight:'10px' }} /> 
                                        <Typography variant="body2" color="textSecondary">                
                                            Para visualizar selecione uma notícia na lateral                                                      
                                        </Typography>
                                    </Box> }
                                />   
                        ) : (                                                              
                        <Grid item xs container direction="column" spacing={2}>
                            <Box display="flex" p={1}> 
                                <Box p={1} style={{ paddingLeft:'20%', width:"60%", textAlign:'center' }} > 
                                    <Typography variant="subtitle1" style={{ fontWeight:'bold', textAlign:'center' }}>
                                        Editar Notícia
                                    </Typography> 
                                </Box>
                                <Box p={1} style={{ width:"40%", textAlign:'end' }} > 
                                    <Button onClick={()=>handleAlter()}
                                        startIcon={<AiFillSave/>}
                                        style={{
                                            color:"#2E8E61"
                                        }}>
                                        SALVAR
                                    </Button>
                                    <Button onClick={() => handleClose()}
                                        startIcon={<AiOutlineCloseCircle/>}
                                        style={{
                                            color:"#2E8E61"
                                        }}>
                                        CANCELAR
                                    </Button>      
                                </Box>   
                            </Box>
                            <Box style={{ paddingLeft:'25%', marginTop:'-80px' }} >             
                                <CardHeader subheader={
                                    <Box p={1} display="flex">                                
                                        <AiOutlineInfoCircle style={{ width:'20px', height:'auto', marginRight:'10px' }} /> 
                                        <Typography variant="body2" color="textSecondary" style={{ textAlign:'left' }}>                
                                            Edite o Título e o Texto, clique em "SALVAR".<br/>
                                            Caso não queira executar nenhuma ação, clique em "CANCELAR".
                                        </Typography>
                                    </Box> }
                                        style={{ paddingLeft:'5%' }}
                                /> 
                             </Box>
                            <Box display="flex" p={1} m={1} style={{ width:"96%" }} > 
                                <Box p={1} style={{ width:"30%" }} >
                                    <div className="result">{renderPhotos(img)}</div>
                                </Box>            
                                <Box p={1} m={3} style={{ width:"60%", textAlign:'center' }} >
                                    <TextField 
                                        className="inp"
                                        type="text" 
                                        onChange={handleChange(setTituloE)}
                                        value={tituloE}
                                        maxLength="75"
                                        minLength="6"
                                        label="Título (min 6 - max 75)"
                                        variant="outlined"
                                    /><br/><br/><br/>
                                    <Typography variant="subtitle1" id={id}>
                                        Autor(a): {autor}
                                    </Typography>
                                </Box>              
                            </Box>
                            <Box p={1} m={1}>
                                <TextField 
                                    className="inp"
                                    type="text" 
                                    onChange={handleChange(setTextoE)}
                                    value={textoE}
                                    maxLength="1990"
                                    minLength="6"
                                    label="Texto (min 6 - max 1990)"
                                    multiline
                                    rows={10}
                                    variant="outlined"
                                />            
                            </Box>
                        </Grid>)))}
                </div>
            </div>
                       
            <DialogAlert open={openA} close={handleCloseA} alert={alerta}/>            
            <DialogLoading open={openL} />  
        </Grid>
    );
}
export default GerenciarNoticias;