//#region Dependências
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Box, Grid, InputAdornment, TextField, ListItem, Typography, List } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import {Header} from '../../../components/Header';
import Footer from '../../../components/Footer';
import banner from '../../../assets/img/IMAGEM-LOGIN.png';
import seta from '../../../assets/img/Icons/chevron_right.png';
import {DialogReadNew} from '../../../components/Dialog';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
//#endregion
const News = () => {
    const [infos, setInfos] = useState([]);
    const [destaque, setDestaque] = useState([]);
    const [filtro, setFiltro] = useState([]);
    const [valorF, setValorF] = useState("");
    const [comF, setComF] = useState("none"); 
    const [semF, setSemF] = useState("block");
    const [open, setOpen] = useState(false);
    // eslint-disable-next-line
    const [id, setId] = useState("");
    const [titulo, setTitulo] = useState("");
    const [texto, setTexto] = useState("");
    const [autor, setAutor] = useState("");
    const [data, setData] = useState("");
    const [imagem, setImagem] = useState([]);

    const ArrNot = (arr) =>
            arr.map((item) => ({ id: item.id, titulo: item.titulo, texto: item.texto, data: item.data,
                         imagem: item.imagem, destaque: item.destaque, autor: item.autor }))
            .filter(item => (item.destaque !== 1));    
    const ArrNotDest = (arr) =>
        arr.map((item) => ({ 
                id: item.id, titulo: item.titulo, texto: item.texto, data: item.data, 
                imagem: item.imagem, destaque: item.destaque, autor: item.autor }))
            .filter(item => (item.destaque === 1));
    const styles = {
        slide: {
            padding: 15,
            minHeight: 450,
            color: '#002829',
        },
        slide2: {
            backgroundColor: '#ffffff',
        }
    };
    var back = "localhost:3001";
  
    const handleOpen = (id, titulo, texto, autor, data, img) => {
        setOpen(true);
        setId(id);
        setTitulo(titulo);
        setTexto(texto);
        setAutor(autor);
        setData((data.slice(0,10).split('-').reverse().join()).replace(/,/g,'/'));
        setImagem(img);

    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleLoad = () =>{
        axios
          .get(`http://`+ back +`/noticias`)
          .then((res) => {              
            setInfos(ArrNot(res.data.response.noticias));
            setDestaque(ArrNotDest(res.data.response.noticias)) 
          }).catch((res) =>{   
            // eslint-disable-next-line    
            var msg = "Não foi possível localizar notícias.";  
          })  
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

    return(
        <div>
            <Header/>
            <Box sx={{ flexGrow: 1 }}  className="content">
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <h5>Notícias</h5>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
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
                        />
                    </Grid>
                    <Grid item xs={8}>
                         <AutoPlaySwipeableViews >
                            {destaque.length !== 0? (
                                destaque.map((value) => {  
                                    return (              
                                        <div style={Object.assign({}, styles.slide, styles.slide2) } 
                                        onClick={() => handleOpen(value.id, value.titulo, value.texto, value.autor, value.data, value.imagem)}>
                                            <div style={{ backgroundImage: `url(${"http://localhost:3001" + value.imagem})`, 
                                                        backgroundRepeat: 'no-repeat', minHeight:"400px", maxHeight:"450px", backgroundSize: '100%'  
                                                }}>
                                            </div>
                                            <Box bgcolor="#00000099" color="#ffffff" style={{ marginTop:'-62px', padding:'16px'}}>
                                                <Typography variant="h6" >
                                                    {value.titulo}
                                                </Typography>
                                            </Box>
                                        </div>
                                    )  
                                })
                            ):(
                                <div style={Object.assign({}, styles.slide, styles.slide2) }>
                                    <div style={{ backgroundImage: `url(${banner})`, backgroundRepeat: 'no-repeat', 
                                                height: 430, backgroundAttachment: 'fixed', backgroundSize: 'cover'  
                                    }}>
                                    </div>
                                        <a href="https://www.vestibulinhoetec.com.br/home/" rel="noreferrer" target="_blank" alt="Vestibulinho">
                                            <input className="btnVest" type='button' value="INSCREVA-SE PARA O VESTIBULINHO" style={{ width:'100%'}} />
                                        </a>
                                </div>
                            )}                             
                        </AutoPlaySwipeableViews >
                    </Grid>
                    <Grid item xs={4}>
                        <Box display={semF}>
                            <Typography noWrap variant="h6">
                                ÚLTIMAS NOTÍCIAS
                            </Typography>
                            <List container wrap="nowrap" style={{ width: "100%", height: "55vh", backgroundColor: "#ffffff", overflow: 'auto', paddingTop:'50px' }} >
                            {infos.map((value) => {
                                return (
                                    <ListItem key={value} role="listitem" button sx={{  height: 150, flexGrow: 1}} >
                                        <Box className="content" sx={{  height: 95, overflow: 'hidden', px: 1  }} 
                                            onClick={() => handleOpen(value.id, value.titulo, value.texto, value.autor, value.data, value.imagem)}>
                                            <Grid container spacing={2} >
                                                <Grid item xs={6}>
                                                    <Typography variant="body2" id={value.id}>                                                        
                                                        {(value.data.slice(0,10).split('-').reverse().join()).replace(/,/g,'/')}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6} style={{ paddingRight:'24px' }}>
                                                    <Typography variant="body2" gutterBottom style={{ textAlign:'right' }}>
                                                        {value.autor}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Typography variant="subtitle1" >
                                                        <b>{value.titulo}</b>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={2} >
                                                    <Typography variant="subtitle1" gutterBottom style={{ textAlign:'right', marginRight:'-10px'}}>
                                                        <img src={seta} alt="leitura" style={{ width:'24px', height:'auto' }} />
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} wrap="nowrap">
                                                    <Box xs={{ overflow: 'hidden', px: 1 }}>
                                                        <Typography nowrap variant="body2">
                                                            {value.texto}
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </ListItem>
                                );
                            })}
                            </List>
                        </Box>
                        <Box display={comF}>
                            <Typography noWrap variant="h6">
                                RESULTADO DA PESQUISA
                            </Typography>
                            <List container wrap="nowrap" style={{ width: "100%", height: "55vh", backgroundColor: "#ffffff", overflow: 'auto', paddingTop:'50px' }} >
                            {filtro.map((value) => {
                                return (
                                    <ListItem key={value} role="listitem" button sx={{  height: 180, flexGrow: 1}} >
                                        <Box className="content" sx={{  height: 100, flexGrow: 1, overflow: 'hidden', px: 1  }} 
                                            onClick={() => handleOpen(value.id, value.titulo, value.texto, value.autor, value.data, value.imagem)}>
                                            <Grid container spacing={2} >
                                                <Grid item xs={6}>
                                                    <Typography variant="body2" id={value.id}>                                                        
                                                        {(value.data.slice(0,10).split('-').reverse().join()).replace(/,/g,'/')}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body2" gutterBottom style={{ textAlign:'right'}}>
                                                        {value.autor}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Typography variant="subtitle1" >
                                                        <b>{value.titulo}</b>
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={2} >
                                                    <Typography variant="subtitle1" gutterBottom style={{ textAlign:'right'}}>
                                                        { ">" }
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} wrap="nowrap">
                                                    <Box sx={{ overflow: 'hidden', px: 1 }}>
                                                        <Typography nowrap variant="body2">
                                                            {value.texto}
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </ListItem>
                                );
                            })}
                            </List>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Footer/>
            <DialogReadNew
                open={open}
                close={handleClose}
                title={titulo}
                text={texto}
                author={autor}
                date={data}
                image={imagem}
            />
        </div>
    );
}

export default News;