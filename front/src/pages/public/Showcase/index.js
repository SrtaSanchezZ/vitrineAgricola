//#region Dependências
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Box, Grid, InputAdornment, TextField, ListItem, Typography, List } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import {Header} from '../../../components/Header';
import Footer from '../../../components/Footer';
import banner from '../../../assets/img/bannerv.png';
import seta from '../../../assets/img/Icons/chevron_right.png';
import {DialogReadNew} from '../../../components/Dialog';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
//#endregion
const Showcase = () => {
    //#region Variáveis e Variáveis de Estado 
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
    //#endregion  
    //#region Funções e Funções de Estado
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
    //#endregion
    return(
        <div>
            <Header/>
            <Box sx={{ flexGrow: 1 }}  className="content">
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <h5>Vitrine Agrícola</h5>
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
                            placeholder="Busque por um produto"
                            className="search"
                            variant="standard"
                            value={valorF}
                            onChange={handleChangeFiltro(setValorF)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <List container wrap="nowrap" style={{ width: "100%", height: "60vh", backgroundColor: "#ffffff", overflow: 'auto', paddingTop:'50px' }} >
                            <img src={banner} alt="Banner Vitrine" style={{ width:"100%", height: "auto" }} />
                            <Box display={comF}>
                                AAAAAAAAA <br/>
                                AAAAAAAAAA<br/>
                                A<br/>
                                AAAAAAAAAAAA<br/>
                                A<br/>
                                A<br/><br/>
                                A<br/>
                                AA<br/>
                                A<br/><br/>
                                A<br/>

                            </Box>
                            <Box display={semF}>
                                AAAAAAAAA <br/>
                                AAAAAAAAAA<br/>
                                A<br/>
                                AAAAAAAAAAAA<br/>
                                A<br/>
                                A<br/><br/>
                                A<br/>
                                AA<br/>
                                A<br/><br/>
                                A<br/>
                            </Box>                   
                        </List>
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

export default Showcase;