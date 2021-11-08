//#region Dependências
import React, { useState, useEffect, Fragment } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import { Avatar, Button, ButtonGroup, Box, Card, CardContent, CardHeader, CardMedia, Drawer, 
        Divider, Grid, InputAdornment, Tabs, Tab, TextField, ListItem, Typography, List } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import {Header} from '../../../components/Header';
import Footer from '../../../components/Footer';
import banner from '../../../assets/img/bannerv.png';
import { MdArrowBack, MdRemoveCircleOutline } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import vitrineImg from '../../../assets/img/Icons/shoppingCart.png';
import vitrineBlack from '../../../assets/img/Icons/shoppingCartB.png';
import ImgProduto from '../../../assets/img/Icons/shopping_basket_black_24dp.png';
import { DialogAlert, DialogLoading, DialogMain } from '../../../components/Dialog';
//#endregion
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
//#endregion
const Showcase = () => {
    //#region Variáveis e Variáveis de Estado 
    const [infos, setInfos] = useState([]);
    const [infosG, setInfosG] = useState([]);
    const [infosV, setInfosV] = useState([]);
    const [filtro, setFiltro] = useState([]);
    const [itens, setItens] = useState([]);
    const [cesta, setCesta] = useState([]);
    const [valor, setValor] = useState(""); 
    const [valorF, setValorF] = useState(""); 
    const [value, setValue] = useState(0);
    const [comFG, setComFG] = useState("none"); 
    const [semFG, setSemFG] = useState("block");
    const [comF, setComF] = useState("none"); 
    const [semF, setSemF] = useState("block");
    const [comG, setComG] = useState("none"); 
    const [semG, setSemG] = useState("block");
    const [open, setOpen] = useState(false);
    const [openA, setOpenA] = useState(false);
    const [openE, setOpenE] = useState(false);
    const [openL, setOpenL] = useState(false);
    const [state, setState] = useState({right: false});
    const [alerta, setAlerta] = useState("");
    const [grupo, setGrupo] = useState("");
    const [grupoId, setGrupoId] = useState("");
    const [grupoNome, setGrupoNome] = useState("");
    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [metrica, setMetrica] = useState("");
    const [img, setImg] = useState(""); 
    const [qtd, setQtd] = useState(0); 
    const [idP, setIdP] = useState(0);
    const [idC, setIdC] = useState(0); 
    const [qtdC, setQtdC] = useState(1); 
    const [prodC, setProdC] = useState(""); 
    const [descC, setDescC] = useState(""); 
    const [valorC, setValorC] = useState("");
    const [valorM, setValorM] = useState("");
    const [imgC, setImgC] = useState(""); 
    const [telefone, setTelefone] = useState(""); 
 
    const ArrPro = (arr) =>
        arr.map((item) => ({ id: item.id, nome: item.nome, descricao: item.descricao,
                           grupo: item.grupo, metrica: item.metrica, imagem: item.imagem })); 
    const ArrGru = (arr) =>
        arr.map((item) => ({ id: item.id, nome: item.nome}));
    const ArrVit = (arr) =>
        arr.map((item) => ({ id: item.produtoId, descricao: item.produtoDescricao,
                            grupo: item.produtoGrupo, metrica: item.produtoMetrica, 
                            imagem: item.produtoImg, nome: item.produtoNome, qtd: item.quantidade,
                            valor: item.valor })); 
    
    var narray = [];
    var aux = "";
    var i = 0;
    var back = "localhost:3001";
    //#endregion  
    //#region Funções e Funções de Estado
    const handleLoadG = () =>{
        axios
          .get(`http://`+ back +`/vitrine/grupos`)
          .then((res) => {               
            setInfosG(ArrGru(res.data.response.grupos)); 

            var id = 0;
            id = res.data.response.grupos[0].id;

            if(id > 0){
                handleLoad(id);
            }

          }).catch((res) =>{ 
            var msg = "Não foi possível localizar grupos.";  
          })  
    };
    const handleLoadV = () =>{
        axios
          .get(`http://`+ back +`/vitrine`)
          .then((res) => {               
            setInfosV(ArrVit(res.data.response.vitrine)); 
          }).catch((res) =>{ 
            var msg = "Não foi possível localizar produtos da vitrine.";  
          })  
    };
    const handleLoad = (id) =>{
        axios
          .get(`http://`+ back +`/vitrine/`+ id)
          .then((res) => {               
            setInfosV(ArrVit(res.data.response.vitrine));  
          }).catch((res) =>{ 
            var msg = "Não foi possível localizar produtos para esse grupo."; 
          })  
    };
    const handleCloseA = () => {
      setOpenA(false);
      setAlerta("");
    };
    const handleClickOpen = (id, valor) => {
      setOpen(true);
      setId(id);
      setValor(valor);
      setQtd(0);

      handleSubmit();
      handleLoadV();
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleClickOpenE = (id, nome, descricao, metrica, imagem, valor) =>{
        setOpenE(true);

        setId(id);
        setNome(nome);
        setDescricao(descricao);
        setMetrica(metrica);
        setImg(imagem);
        setValor(valor);
    };
    const handleClickCesta = (id, nome, descricao, valor, qtdC, img) => {
        
      setValorM("Item adicionado a Cesta!");

      aux = "";
  
      var ces = {
        id: 0,
        prodid: 0,
        qtde: 0,
        nome: '',
        descricao: '',
        valor: 0,
        obs: ''
      };
  
      if(tipo === "prod"){    
        ces = {
          id: idP,
          prodid: id,
          promoid: null,
          ite_qtde: qtd,
          nome: nome,
          ite_valor_total: (valor * qtd),
          obs: obs
        };      
  
        if(qtd > 0){
          i = 0;
  
          for(i; i < cesta.length; i++){
            aux = cesta[i].nome;
  
            if(nome === aux){
  
              ces = {
                id: cesta[i].id,
                prodid: cesta[i].prodid,
                promoid: null,
                ite_qtde: qtd + cesta[i].ite_qtde,
                nome: cesta[i].nome,
                ite_valor_total: (valor * qtd) + cesta[i].ite_valor_total,
                obs: cesta[i].obs
              };
  
              narray = cesta.splice(i,1);
              setCesta([...cesta, ces]);
              setQdd(qdd + qtd);
              setSoma(soma + (valor * qtd));
              setOpenB(false);
              setQddC(1);
            }
          }
          
        }else{     
  
          for(i = 0; i < cesta.length; i++){
            aux = cesta[i].nome;
  
            if(nome === aux){
  
              ces = {
                id: cesta[i].id,
                prodid: cesta[i].prodid,
                promoid: null,
                ite_qtde: cesta[i].ite_qtde - 1,
                nome: cesta[i].nome,
                ite_valor_total: cesta[i].ite_valor_total - valor,
                obs: cesta[i].obs
              };
  
              narray = cesta.splice(i,1);
              
              setCesta([...cesta, ces]);
              setQdd(qdd - 1);
              setSoma(soma - valor);
              setOpenB(false);
              setQddC(1);
            }
          }
        }
      }
      if(tipo === "promo"){    
        ces = {
          id: idP,
          prodid: null,
          promoid: id,
          ite_qtde: qtd,
          nome: nome,
          ite_valor_total: (valor * qtd),
          obs: obs
        };           
  
        if(qtd > 0){
          i = 0;
  
          for(i; i < cesta.length; i++){
            aux = cesta[i].nome;
  
            if(nome === aux){
  
              ces = {
                id: cesta[i].id,
                prodid: null,
                promoid: cesta[i].promoid,
                ite_qtde: qtd + cesta[i].ite_qtde,
                nome: cesta[i].nome,
                ite_valor_total: (valor * qtd) + cesta[i].ite_valor_total,
                obs: cesta[i].obs
              };
  
              narray = cesta.splice(i,1);
              setCesta([...cesta, ces]);
              setQdd(qdd + qtd);
              setSoma(soma + (valor * qtd));
              setOpenB(false);
              setQddC(1);
            }
          }
          
        }else{     
  
          for(i = 0; i < cesta.length; i++){
            aux = cesta[i].nome;
  
            if(nome === aux){
  
              ces = {
                id: cesta[i].id,
                prodid: null,
                promoid: cesta[i].promoid,
                ite_qtde: cesta[i].ite_qtde - 1,
                nome: cesta[i].nome,
                ite_valor_total: cesta[i].ite_valor_total - valor,
                obs: cesta[i].obs
              };
  
              narray = cesta.splice(i,1);
              
              setCesta([...cesta, ces]);
              setQdd(qdd - 1);
              setSoma(soma - valor);
              setOpenB(false);
              setQddC(1);
            }
          }
        }
      }
      if(tipo === "meia"){
        aux = meia.length-1;
  
          mId =  meia[aux].prodid;
          mQtd = meia[aux].ite_qtde;
          mValor = meia[aux].ite_valor_total + meia[aux-1].ite_valor_total;
  
          ces = {
            id: idP,
            prodid: mId,
            promoid: null,
            ite_qtde: mQtd,
            nome: nome,
            ite_valor_total: mValor,
            obs: obs
          };          
  
        if(qtd > 0){
          i = 0;
  
          for(i; i < cesta.length; i++){
            aux = cesta[i].nome;
  
            if(nome === aux){
  
              ces = {
                id: cesta[i].id,
                prodid: cesta[i].prodid,
                promoid: null,
                ite_qtde: qtd + cesta[i].ite_qtde,
                nome: cesta[i].nome,
                ite_valor_total: (valor * qtd) + cesta[i].ite_valor_total,
                obs: cesta[i].obs
              };
  
              narray = cesta.splice(i,1);
              setCesta([...cesta, ces]);
              setQdd(qdd + qtd);
              setSoma(soma + (valor * qtd));
              setOpenB(false);
              setQddC(1);
            }
          }
          
        }else{     
  
          for(i = 0; i < cesta.length; i++){
            aux = cesta[i].nome;
  
            if(nome === aux){
  
              ces = {
                id: cesta[i].id,
                prodid: cesta[i].prodid,
                promoid: null,
                ite_qtde: cesta[i].ite_qtde - 1,
                nome: cesta[i].nome,
                ite_valor_total: cesta[i].ite_valor_total - valor,
                obs: cesta[i].obs
              };
  
              narray = cesta.splice(i,1);
              
              setCesta([...cesta, ces]);
              setQdd(qdd - 1);
              setSoma(soma - valor);
              setOpenB(false);
              setQddC(1);
            }
          }
        }
      }
  
      setCesta([...cesta, ces]);
      setQdd(qdd + qtd);
      setSoma(soma + (valor * qtd));
      setOpenB(false);
      setQddC(1);
      setIdP(idP + 1);
  
      narray = [];
      
    };
    const handleClickRemCesta = (id) => {
      aux = [];
      var ct = 0;
      var aux1 = '';
      
      var ces = {
        id: 0,
        prodid: 0,
        promoid: 0,
        ite_qtde: 0,
        nome: '',
        ite_valor_total: 0,
        obs: ''
      };
  
      for(i = 0; i < cesta.length; i++){
  
        ces = {
          id: cesta[i].id,
          prodid: cesta[i].prodid,
          promoid: null,
          ite_qtde: cesta[i].ite_qtde,
          nome: cesta[i].nome,
          ite_valor_total: cesta[i].ite_valor_total,
          obs: cesta[i].obs
        };
  
        if(id === cesta[i].id){
  
          aux1 = cesta[i].prodid;
  
          if(aux1 === null){
  
            ct = cesta[i].ite_valor_total / cesta[i].ite_qtde;
  
            ces = {
              id: cesta[i].id,
              prodid: null,
              promoid: cesta[i].promoid,
              ite_qtde: cesta[i].ite_qtde - 1,
              nome: cesta[i].nome,
              ite_valor_total: cesta[i].ite_valor_total - ct,
              obs: cesta[i].obs
            };
  
            aux = cesta.splice(i,1);
            if(ces.ite_qtde === 0){
              handleClickDelCesta(id);
            }else{
              setCesta([...cesta, ces]);
            }
  
            setQdd(qdd - 1);
            setSoma(soma - ct);
          }else{
            ct = cesta[i].ite_valor_total / cesta[i].ite_qtde;
  
            ces = {
              id: cesta[i].id,
              prodid: cesta[i].prodid,
              promoid: null,
              ite_qtde: cesta[i].ite_qtde - 1,
              nome: cesta[i].nome,
              ite_valor_total: cesta[i].ite_valor_total - ct,
              obs: cesta[i].obs
            };
  
            aux = cesta.splice(i,1);
            if(ces.ite_qtde === 0){
              handleClickDelCesta(id);
            }else{
              setCesta([...cesta, ces]);
            }
  
            setQdd(qdd - 1);
            setSoma(soma - ct);        
          }
        }
      }
    }; 
    const handleClickAddCesta = (id) => {
      aux = [];
      var ct = 0;
      var aux1 = '';
      
      var ces = {
        id: 0,
        prodid: 0,
        promoid: 0,
        ite_qtde: 0,
        nome: '',
        ite_valor_total: 0,
        obs: ''
      };
  
      for(i = 0; i < cesta.length; i++){
  
        ces = {
          id: cesta[i].id,
          prodid: cesta[i].prodid,
          promoid: null,
          ite_qtde: cesta[i].ite_qtde,
          nome: cesta[i].nome,
          ite_valor_total: cesta[i].ite_valor_total,
          obs: cesta[i].obs
        };
  
        if(id === cesta[i].id){
  
          aux1 = cesta[i].prodid;
  
          if(aux1 === null){
            
            ct = cesta[i].ite_valor_total / cesta[i].ite_qtde;
  
            ces = {
              id: cesta[i].id,
              prodid: null,
              promoid: cesta[i].promoid,
              ite_qtde: cesta[i].ite_qtde + 1,
              nome: cesta[i].nome,
              ite_valor_total: cesta[i].ite_valor_total + ct,
              obs: cesta[i].obs
            };
  
            aux = cesta.splice(i,1);
            setCesta([...cesta, ces]);
  
            setQdd(qdd + 1);
            setSoma(soma + ct);
  
          }else{
            
            ct = cesta[i].ite_valor_total / cesta[i].ite_qtde;
  
            ces = {
              id: cesta[i].id,
              prodid: cesta[i].prodid,
              promoid: null,
              ite_qtde: cesta[i].ite_qtde + 1,
              nome: cesta[i].nome,
              ite_valor_total: cesta[i].ite_valor_total + ct,
              obs: cesta[i].obs
            };
  
            aux = cesta.splice(i,1);
            setCesta([...cesta, ces]);
  
            setQdd(qdd + 1);
            setSoma(soma + ct);
  
          }
        }
      }
    }; 
    const handleClickDelCesta = (id) => {
      aux = [];
      var ct = 0;
  
      for(i = 0; i < cesta.length; i++){
        if(id === cesta[i].id){
          setQdd(qdd - cesta[i].ite_qtde);
          setSoma(soma - cesta[i].ite_valor_total);
        }else{
          aux[ct] = cesta[i];
          ct++;
        }
      }
      
      setCesta(aux);
  
    };
    const handleCloseE = () => {
        setOpenE(false);
    };
    const handleComG = (id, nome) =>{
        setGrupoId(id);
        setGrupoNome(nome);

        handleLoad(id);
    };
    const handleCloseComG = () => {
        setSemG("block");
        setComG("none");

        setGrupoId("");
        setGrupoNome("");
        setInfos([]);
        handleLoadG();
    };
    const handleClickOpenL = () => {
      setOpenL(true);
    };
    const handleCloseL = () => {
      setOpenL(false);
    };
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
    };
    
    const handleChange = (set) => (event) => set(event.target.value);    
    
    const handleChangeMenu = (event, newValue) => {
        setValue(newValue);
    };    
    const handleSubmit = () => {

        handleClickOpenL();

        handleCloseL();
        handleLoadV();            
    }; 
    const handleChangeFiltro = (set) => (event) => {
        set(event.target.value);
        handleFiltro();
    };   
    const handleFiltro = () => {
        setFiltro(infosV.filter(info => info.nome.toUpperCase().indexOf(valorF.toUpperCase()) !== -1));

        if(filtro.length > 1){
          setSemF("none");
          setComF("block");
        }else{
          setSemF("block");
          setComF("none");
        }
    };
    useEffect(() => {
        handleLoadG();
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
                            <Box p={1} sx={{ flexGrow: 1 }}>
                                <Tabs value={value} centered
                                    onChange={handleChangeMenu}>
                                    {infosG.map((grup)=>(
                                        <Tab label={grup.nome} 
                                            onClick={()=>handleComG(grup.id, grup.nome)} />
                                    ))}
                                </Tabs><br/>                  
                            </Box> 
                            <Box p={1} display={semF} sx={{ flexGrow: 1 }} style={{ paddingLeft:'135px', paddingRight:'135px' }}>
                                <Grid container>
                                    {infosV.map((item, index) => (  
                                        <Grid item xs={2} key={item.id}>                                                               
                                            <Card onClick={() => handleClickOpenE(item.id, item.nome, item.descricao, item.metrica, item.imagem, item.valor)}
                                                sx={{ width: 150, height: 220, cursor:'pointer', textAlign:'center' }}>
                                                <CardContent wrap="nowrap" style={{ textAlign:'center'}}>
                                                    <CardMedia
                                                        component="img"
                                                        sx={{ width: 120, height: 120, borderRadius:'5px', textAlign:'center' }}
                                                        image={"http://" + back + item.imagem}
                                                        alt={item.nome}
                                                    />     
                                                    <Typography variant="subtitle1"
                                                                style={{ textTransform:'capitalize', fontWeight:'bold', paddingBottom:'5px', paddingTop:'5px' }}>
                                                        {item.nome}
                                                    </Typography>
                                                    <Typography variant="subtitle2">
                                                        {(item.valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} / {item.metrica}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid> 
                                    ))}
                                </Grid>
                            </Box>
                            <Box p={1} display={comF} sx={{ flexGrow: 1 }} style={{ paddingLeft:'135px', paddingRight:'135px' }}>
                                <Grid container>
                                    {filtro.map((item, index) => (  
                                        <Grid item xs={2} key={item.id}>                                                               
                                            <Card onClick={() => handleClickOpenE(item.id, item.nome, item.descricao, item.metrica, item.imagem, item.valor)}
                                                sx={{ width: 150, height: 220, cursor:'pointer', textAlign:'center' }}>
                                                <CardContent wrap="nowrap" style={{ textAlign:'center'}}>
                                                    <CardMedia
                                                        component="img"
                                                        sx={{ width: 120, height: 120, borderRadius:'5px', textAlign:'center' }}
                                                        image={"http://" + back + item.imagem}
                                                        alt={item.nome}
                                                    />     
                                                    <Typography variant="subtitle1"
                                                                style={{ textTransform:'capitalize', fontWeight:'bold', paddingBottom:'5px', paddingTop:'5px' }}>
                                                        {item.nome}
                                                    </Typography>
                                                    <Typography variant="subtitle2">
                                                        {(item.valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} / {item.metrica}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid> 
                                    ))}
                                </Grid>
                            </Box>                
                        </List> 
                    </Grid> 
                </Grid>
            </Box>
            <Box p={1} style={{ width:'95%', textAlign:'end', marginTop:'-120px', position:'absolute'  }}>      
                <Box style={{ textAlign:'end' }}>
                    <Button  
                        onClick={toggleDrawer('right', true)}
                        variante="outlined" 
                        className="btnVoltar"
                        startIcon={
                            <Avatar style={{ backgroundColor:'#3A5E4E', padding:'10px' }}>
                                <img src={vitrineImg} style={{ width:'24px', height:'auto' }} /> 
                            </Avatar>
                            }
                        style={{ position:"unset" }}>
                    </Button>
                </Box>       
            </Box>
            <Fragment>
                <Drawer
                    anchor={'right'}
                    open={state['right']}
                    onClose={toggleDrawer('right', false)}
                >
                <Box
                    sx={{ width: 450, padding:'10px' }}
                    role="presentation"
                    onClick={toggleDrawer('right', false)}
                    onKeyDown={toggleDrawer('right', false)}
                    >
                    <Box style={{ textAlign:'center' }}>
                        <Button  
                            variante="outlined" 
                            className="btnVoltar"
                            startIcon={
                                <Avatar style={{ backgroundColor:'#ffffff', padding:'5px' }}>
                                    <img src={vitrineBlack} style={{ width:'24px', height:'auto' }} /> 
                                </Avatar>
                                }
                            style={{ position:"unset" }}>
                            <Typography variant="subtitle1" style={{ color:'#000000', textTransform:'capitalize', fontWeight:'bold' }}>
                                Vitrine
                            </Typography>
                        </Button>
                    </Box> 
                    <Typography variant="subtitle1" style={{ textTransform:'capitalize' }}>
                        Lista de Produtos Adicionados
                    </Typography>             
                    <CardHeader subheader={
                        <Box p={1} display="flex">                                
                            <AiOutlineInfoCircle style={{ width:'20px', height:'auto', marginRight:'10px' }} /> 
                            <Typography variant="body2" color="textSecondary">                
                                Clique no ícone negativo para remover o produto da vitrine.                                                      
                            </Typography>
                        </Box> }
                    />
                    {infosV.map((item, index) => (  
                        <Grid item style={{ padding:"10px" }}>                                                               
                            <Card onClick={() => handleClickOpen(item.id, item.valor)}
                                sx={{ display: 'flex', maxHeight: 80, padding:'5px', cursor:'pointer' }}>                                            
                                <Avatar style={{ color:'#000000', backgroundColor:'#ffffff', padding:'5px', marginTop:'15px' }}>
                                    <MdRemoveCircleOutline style={{ width:'20px', height:'20px' }} /> 
                                </Avatar>
                                <CardContent wrap="nowrap" style={{ textAlign:'left', width:'100%' }}>     
                                    <Typography variant="subtitle1" style={{ textTransform:'capitalize', fontWeight:'bold' }}>
                                        {item.nome}
                                    </Typography>
                                    <Typography variant="subtitle2" style={{ textTransform:'capitalize', color:'#B8B8B5' }}>
                                        {item.descricao}
                                    </Typography>
                                </CardContent>
                                <Box style={{ width:'100%', paddingRight:'10px' }}>
                                    <Typography variant="subtitle2" style={{ textTransform:'capitalize', textAlign:'end', width:'100%' }}>
                                        QTD. {item.qtd}
                                    </Typography> <br/>
                                    <Typography variant="subtitle1" style={{ textTransform:'capitalize', fontWeight:'bold', textAlign:'end' }}>
                                        {(item.valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                                    </Typography>
                                </Box>
                            </Card>
                            <Divider/>
                        </Grid> 
                    ))}
                </Box>
                </Drawer>
            </Fragment> 
            <Footer/>
            <DialogMain
                open={openE}
                close={handleCloseE}
                title={"DETALHE DO PRODUTO"}
                info={(<Box >
                    <Box display="flex">                                               
                        <CardMedia
                            component="img"
                            sx={{ width: 300, height: 150, borderRadius:'5px' }}
                            image={"http://" + back + img}
                            alt={nome}
                        />
                        <CardContent style={{ textAlign:'left', width:700 }}>     
                            <Typography variant="subtitle1" style={{ textTransform:'capitalize', fontWeight:'bold' }}>
                                Nome do Produto
                            </Typography>
                            <Typography variant="subtitle2" style={{ textTransform:'capitalize', color:'#21222DBD' }}>
                                {nome}
                            </Typography>
                            <Box style={{ marginTop:'10px' }}>  
                                <Typography variant="subtitle1" style={{ textTransform:'capitalize', fontWeight:'bold' }}>
                                    Descrição
                                </Typography>
                                <Typography variant="subtitle2" style={{ textTransform:'capitalize', color:'#21222DBD' }}>
                                    {descricao}
                                </Typography>                                
                            </Box>
                        </CardContent>
                        <CardContent style={{ textAlign:'left', width:'100%' }}> 
                            <Typography variant="subtitle1" style={{ textTransform:'capitalize', fontWeight:'bold' }}>
                                Valor
                            </Typography>
                            <Typography variant="subtitle2" style={{ textTransform:'capitalize', color:'#21222DBD' }}>
                                {(valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} / {metrica}
                            </Typography> 
                        </CardContent>
                    </Box>
                        <Box style={{ width: "100%", height: 'auto', paddingTop:'15px', textAlign:'center' }}>
                            <ButtonGroup style={{ width:'100px', height:'36px', cursor:'pointer', textAlign:'center' }}>
                                <Button
                                    aria-label="reduce"
                                    style={{ backgroundColor:'#4A4E8A', color:'#FFFFFF' }}
                                    onClick={() => {
                                        setQtdC(Math.max(qddC - 1, 1));
                                    }}
                                >
                                    <RemoveIcon style={{ width:'20px', height:'auto' }} />
                                </Button>
                                <Button>
                                    <Typography variant="subtitle2"
                                    style={{ color:'#000000' }}>
                                        {qtdC}
                                    </Typography>
                                </Button>
                                <Button
                                    aria-label="increase"
                                    style={{ backgroundColor:'#4A4E8A', color:'#FFFFFF' }}
                                    onClick={() => {
                                        setQtdC(qddC + 1);
                                    }}
                                >
                                    <AddIcon style={{ width:'20px', height:'auto' }} />
                                </Button>
                            </ButtonGroup>
                        </Box>
                    </Box>)}
                click={()=>handleClickCesta(id, nome, descricao, valor, qtdC, img)}
                label={"ADICIONAR AO CARRINHO"}
            />
        </div>
    );
}

export default Showcase;