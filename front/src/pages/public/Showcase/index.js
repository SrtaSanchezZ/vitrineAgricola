//#region Dependências
import React, { useState, useEffect, Fragment } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import { Avatar, Button, ButtonGroup, Box, Card, CardContent, CardMedia, Drawer, 
        Divider, Grid, InputAdornment, Tabs, Tab, TextField, Typography, List } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {Header} from '../../../components/Header';
import Footer from '../../../components/Footer';
import banner from '../../../assets/img/bannerv.png';
import { AiOutlineInfoCircle } from "react-icons/ai";
import vitrineImg from '../../../assets/img/Icons/shoppingCart.png';
import vitrineBlack from '../../../assets/img/Icons/shoppingCartB.png';
import { DialogAlert, DialogMain } from '../../../components/Dialog';
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
    const [infosG, setInfosG] = useState([]);
    const [infosV, setInfosV] = useState([]);
    const [filtro, setFiltro] = useState([]);
    const [cesta, setCesta] = useState([]);
    const [valor, setValor] = useState(""); 
    const [valorF, setValorF] = useState(""); 
    const [value, setValue] = useState(0);
    const [comF, setComF] = useState("none"); 
    const [semF, setSemF] = useState("block"); 
    const [open, setOpen] = useState(false);
    const [openA, setOpenA] = useState(false);
    const [openE, setOpenE] = useState(false);
    const [openL, setOpenL] = useState(false);
    const [state, setState] = useState({right: false});
    const [alerta, setAlerta] = useState("");
    const [grupoId, setGrupoId] = useState("");
    const [grupoNome, setGrupoNome] = useState("");
    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [metrica, setMetrica] = useState("");
    const [img, setImg] = useState(""); 
    const [qtd, setQtd] = useState(0); 
    const [qtdd, setQtdd] = useState(0); 
    const [idP, setIdP] = useState(0); 
    const [qtdC, setQtdC] = useState(1); 
    const [soma, setSoma] = useState(0);  
    const [cliente, setCliente] = useState(""); 
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
    const handleLoad = (id) =>{
        axios
          .get(`http://`+ back +`/vitrine/`+ id)
          .then((res) => {               
            setInfosV(ArrVit(res.data.response.vitrine));  
          }).catch((res) =>{ 
            var msg = "Não foi possível localizar produtos para esse grupo."; 
          })  
    };
    const handleClickOpenA = (alerta) => {
      setOpenA(true);
      setAlerta(alerta);
    };
    const handleCloseA = () => {
      setOpenA(false);
      setAlerta("");
    };
    const handleClickOpenE = (id, nome, descricao, metrica, imagem, valor, qtd) =>{
        setOpenE(true);

        setId(id);
        setNome(nome);
        setDescricao(descricao);
        setMetrica(metrica);
        setImg(imagem);
        setValor(valor);
        setQtdd(qtd);
    };
    const handleClickCesta = (id, nome, descricao, metrica, valor, qtaad, img ) => {
        
      aux = "";
  
      var ces = {
        id: idP,
        prodid: id,
        nome: nome,
        descricao: descricao,
        metrica: metrica, 
        qtd: qtaad,
        qtdMax: qtdd,
        valor: valor,
        valorT: (valor * qtaad),
        img: img
      };   
  
      if(qtaad > 0){
        i = 0;

        for(i; i < cesta.length; i++){

          if(id === cesta[i].prodid){
            
            ces = {
              id: cesta[i].id,
              prodid: cesta[i].prodid,
              nome: cesta[i].nome,
              descricao: cesta[i].descricao,
              metrica: cesta[i].metrica,
              qtd: cesta[i].qtd + qtaad,
              qtdMax: cesta[i].qtdMax,
              valor: cesta[i].valor,
              valorT: cesta[i].valorT + (valor * qtaad),
              img: cesta[i].img
            }; 

            narray = cesta.splice(i,1);
            setCesta([...cesta, ces]);
            setQtd(qtd + qtaad);
            setSoma(soma + (valor * qtaad));
            setOpenE(false);
            setQtdC(1);
          }
        }
        
      }else{     

        for(i = 0; i < cesta.length; i++){

          if(id === cesta[i].prodid){
            
            ces = {
              id: cesta[i].id,
              prodid: cesta[i].prodid,
              nome: cesta[i].nome,
              descricao: cesta[i].descricao,
              metrica: cesta[i].metrica,
              qtd: cesta[i].qtd - 1,
              qtdMax: cesta[i].qtdMax,
              valor: cesta[i].valor,
              valorT: cesta[i].valorT - valor,
              img: cesta[i].img
            }; 

            narray = cesta.splice(i,1);
            
            setCesta([...cesta, ces]);
            setQtd(qtd - 1);
            setSoma(soma - valor);
            setOpen(false);
            setQtdC(1);
          }
        }
      }
  
      setCesta([...cesta, ces]);
      setQtd(qtd + qtaad);
      setSoma(soma + (valor * qtaad));
      setOpenE(false);
      setQtdC(1);
      setIdP(idP + 1);
  
      narray = [];
      
    };
    const handleClickRemCesta = (id) => {
      var ct = 0;
            
      var ces = {
        id: 0,
        prodid: 0,
        nome: "",
        descricao: "",
        metrica: "",
        qtd: 0,
        qtdMax: 0,
        valor: 0,
        valorT: 0,
        img:""
      }; 
  
      for(i = 0; i < cesta.length; i++){
            
        ces = {
          id: cesta[i].id,
          prodid: cesta[i].prodid,
          nome: cesta[i].nome,
          descricao: cesta[i].descricao,
          metrica: cesta[i].metrica,
          qtd: cesta[i].qtd,
          qtdMax: cesta[i].qtdMax,
          valor: cesta[i].valor,
          valorT: cesta[i].valorT,
          img: cesta[i].img
        }; 
  
        if(id === cesta[i].prodid){

          ct = cesta[i].valor;

          ces = {
            id: cesta[i].id,
            prodid: cesta[i].prodid,
            nome: cesta[i].nome,
            descricao: cesta[i].descricao,
            metrica: cesta[i].metrica,
            qtd: cesta[i].qtd - 1,
            qtdMax: cesta[i].qtdMax,
            valor: cesta[i].valor,
            valorT: cesta[i].valorT - ct,
            img: cesta[i].img
          }; 

          aux = cesta.splice(i,1);

          if(ces.qtd === 0){
            handleClickDelCesta(id);
          }else{
            setCesta([...cesta, ces]);
          }

          setQtd(qtd - 1);
          setSoma(soma - ct);        
        }
      }
    }; 
    const handleClickAddCesta = (id) => {
      aux = [];
      var ct = 0;
            
      var ces = {
        id: 0,
        prodid: 0,
        nome: "",
        descricao: "",
        metrica: "",
        qtd: 0,
        qtdMax: 0,
        valor: 0,
        valorT: 0,
        img:""
      }; 
  
      for(i = 0; i < cesta.length; i++){
            
        ces = {
          id: cesta[i].id,
          prodid: cesta[i].prodid,
          nome: cesta[i].nome,
          descricao: cesta[i].descricao,
          metrica: cesta[i].metrica,
          qtd: cesta[i].qtd,
          qtdMax: cesta[i].qtdMax,
          valor: cesta[i].valor,
          valorT: cesta[i].valorT,
          img: cesta[i].img
        }; 
  
        if(id === cesta[i].prodid){
        
          ct = cesta[i].valor;
            
            ces = {
              id: cesta[i].id,
              prodid: cesta[i].prodid,
              nome: cesta[i].nome,
              descricao: cesta[i].descricao,
              metrica: cesta[i].metrica,
              qtd: cesta[i].qtd + 1,
              qtdMax: cesta[i].qtdMax,
              valor: cesta[i].valor,
              valorT: cesta[i].valorT + ct,
              img: cesta[i].img
            }; 

            if(ces.qtd > ces.qtdMax){
              var msg = "A quantidade disponível deste item é de " + ces.qtdMax + " x " + ces.metrica;
              handleClickOpenA(msg);
            }else{
  
              aux = cesta.splice(i,1);

              setCesta([...cesta, ces]);
  
              setQtd(qtd + 1);
              setSoma(soma + ct);
            }
        }
      }
    }; 
    const handleClickDelCesta = (id) => {
      aux = [];
      var ct = 0;
  
      for(i = 0; i < cesta.length; i++){
        if(id === cesta[i].prodid){
          setQtd(qtd - cesta[i].qtd);
          setSoma(soma - cesta[i].valorT);
        }else{
          aux[ct] = cesta[i];
          ct++;
        }
      }
      
      setCesta(aux);
  
    };
    const handleCloseE = () => {
        setOpenE(false);
        setQtdC(1);
    };
    const handleComG = (id, nome) =>{
        setGrupoId(id);
        setGrupoNome(nome);

        handleLoad(id);
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

        var produtos2 = "";
        var produtos1 = "";
        aux = "";   
        let numeros = /[0-9]+/g;
        var itens = [];
    
        var info = {
          id: 0,
          qtd: 0,
          valor: 0,
        };
    
        for(i=0;i<cesta.length;i++){
          info = {
            id: cesta[i].prodid,
            qtd: cesta[i].qtd,
            valor: cesta[i].valor,
          };
          
          itens[i] = info;
          
          produtos2 = `
          ${produtos2} *${cesta[i].qtd}* - *${cesta[i].nome}*
          
          `;
          
          produtos1 = `${produtos1} ${cesta[i].qtd} - ${cesta[i].nome}`;
        }
        
        if(cliente !== "" && telefone !== ""){      
          aux = "";  
    
          var msg = `       
          *COOPERATIVA ESCOLA - COLÉGIO AGRÍCOLA*
    
          *=============================*
    
          Os itens escolhidos são:
          ${produtos2}     
          Totalizando: *${(soma).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}*
    
          *=============================* 
    
          Nome: *${cliente}* 
          Telefone: *${telefone}*
    
          *=============================*
    
          Agradecemos a preferência!

          http://localhost:3000/vitrineagricola
    
          `;
    
          aux = encodeURI(msg); 
          axios
          .post(`http://`+ back +`/reservas`, {              
              cliente: cliente,
              contato: telefone.match(numeros).join([]),
              total: soma,
              itens: itens
            })
          .then((res) => { 
            return window.location.href = 'https://wa.me/55018981842531?text=' + aux; 
          })
          .catch((error) =>{
            msg = "Por gentileza, informe ou revise os dados do formulário e tente novamente.";
            handleClickOpenA(msg); 
          })    
    
        }else{        
          msg = "Você será redirecionada(o) ao nosso WhatsApp. Feche esse aviso e confirme novamente seu pedido para prosseguir.";
          handleClickOpenA(msg);     
        }

        handleCloseL();            
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
                            placeholder="Busque por um produto dentro do grupo selecionado"
                            className="search"
                            variant="standard"
                            value={valorF}
                            onChange={handleChangeFiltro(setValorF)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <List container wrap="nowrap" style={{ width: "100%", height: "65vh", backgroundColor: "#ffffff", overflow: 'auto', paddingTop:'50px' }} >
                            <img src={banner} alt="Banner Vitrine" style={{ width:"100%", height: "auto" }} />                             
                            <Box p={1} sx={{ flexGrow: 1 }}>
                                <Tabs value={value} centered
                                    onChange={handleChangeMenu}>
                                    {infosG.map((grup)=>(
                                        <Tab label={grup.nome} 
                                            onClick={()=>handleComG(grup.id, grup.nome)} style={{ fontWeight:'bold' }} />
                                    ))}
                                </Tabs><br/>                  
                            </Box> 
                            <Box p={1} display={semF} sx={{ flexGrow: 1 }} style={{ paddingLeft:'135px', paddingRight:'135px' }}>
                                <Grid container>
                                    {infosV.map((item, index) => (  
                                        <Grid item xs={2} key={item.id}>                                                               
                                            <Card onClick={() => handleClickOpenE(item.id, item.nome, item.descricao, item.metrica, item.imagem, item.valor, item.qtd)}
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
                                            <Card onClick={() => handleClickOpenE(item.id, item.nome, item.descricao, item.metrica, item.imagem, item.valor, item.qtd)}
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
                <Box sx={{ width: 450, padding:'10px' }} role="presentation">
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
                                Meu Carrinho
                            </Typography>
                        </Button>
                    </Box>  
                      {cesta.length > 0 ? (
                        <>
                        <List container wrap="nowrap" style={{ width: "100%", height: "30vh", backgroundColor: "#ffffff", overflow: 'auto', paddingTop:'50px' }} >
                          {cesta.sort((a, b) => a.id - b.id).map((item, index) => (  
                            <Grid item style={{ padding:"10px" }}>                                                               
                                <Card sx={{ display: 'flex', maxHeight: 80, padding:'5px', cursor:'pointer' }}> 
                                    <Box style={{ width: "100%", height: 'auto', paddingTop:'22px', paddingRight:'10px', textAlign:'center' }}>                                                                           
                                      <ButtonGroup style={{ width:'100px', height:'36px', cursor:'pointer', textAlign:'center' }}>
                                          <Button
                                              aria-label="reduce"
                                              style={{ backgroundColor:'#4A4E8A', color:'#FFFFFF' }}
                                              onClick={() => handleClickRemCesta(item.prodid)}
                                          >
                                              <RemoveIcon style={{ width:'20px', height:'auto' }} />
                                          </Button>
                                          <Button>
                                              <Typography variant="subtitle2"
                                              style={{ color:'#000000' }}>
                                                  {item.qtd}
                                              </Typography>
                                          </Button>
                                          <Button
                                              aria-label="increase"
                                              style={{ backgroundColor:'#4A4E8A', color:'#FFFFFF' }}
                                              onClick={() => handleClickAddCesta(item.prodid)}
                                          >
                                              <AddIcon style={{ width:'20px', height:'auto' }} />
                                          </Button>
                                      </ButtonGroup>
                                    </Box>
                                    <CardContent wrap="nowrap" style={{ textAlign:'left', width:'100%' }}>     
                                        <Typography variant="subtitle1" style={{ textTransform:'capitalize', fontWeight:'bold' }}>
                                            {item.nome}
                                        </Typography>
                                        <Typography variant="subtitle1" style={{ textTransform:'capitalize', fontWeight:'bold' }}>
                                            {(item.valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} / {item.metrica}
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Divider/>
                            </Grid> 
                          ))}
                        </List>                                   
                        <Box display="flex">
                            <Box style={{ width:'50%', textAlign:'start', padding:'16px' }}>
                                <Typography variant="subtitle1" color="textSecondary">                
                                    Total:                                                     
                                </Typography>
                            </Box>
                            <Box style={{ width:'50%', textAlign:'end', padding:'16px' }}>                                            
                                <Typography variant="subtitle1" style={{ fontWeight:'bold'}}>                
                                    {(soma).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}                                                    
                                </Typography>
                            </Box>
                        </Box>          
                        <Box p={1} style={{ textAlign:'justify', padding:'20px' }}>                                
                            <Typography variant="body2" color="textSecondary"> 
                               Para finalizar a reserva de itens, preencha os dados abaixo. Ao clicar em 'Enviar Reserva', sua solicitação será encaminhada para prosseguir com o atendimento no WhatsApp.                                                      
                            </Typography> <br/>                       
                            <TextField 
                                className="inp"
                                type="text" 
                                onChange={handleChange(setCliente)}
                                value={cliente}
                                maxLength="75"
                                minLength="6"
                                label="Informe seu nome"
                                variant="outlined"
                                style={{ marginBottom:'10px' }}
                            /><br/>
                            <TextField 
                                className="inp"
                                type="number" 
                                onChange={handleChange(setTelefone)}
                                value={telefone}
                                maxLength="15"
                                minLength="9"
                                label="Telefone"
                                variant="outlined"
                            />
                            <Box style={{ width: "100%", textAlign:'center', paddingTop:'30px' }}>
                                <Button onClick={() => handleSubmit()}
                                    variante="contained" 
                                    style={{ backgroundColor:"#2E8E61", color:"#FFFFFF" }}>
                                      ENVIAR RESERVA
                                </Button>
                            </Box>        
                        </Box>
                      </>
                      ):(           
                          <Box p={1} style={{ textAlign:'center', padding:'50px' }}>                                
                              <AiOutlineInfoCircle style={{ width:'48px', height:'48px', marginRight:'10px', padding:'20px' }} /> 
                              <Typography variant="body2" color="textSecondary">                
                                  O carrinho está vazio no momento, adicione itens para reservar.                                                      
                              </Typography>
                          </Box> 
                      )}            
                </Box>
                </Drawer>
            </Fragment> 
            <Footer/>
            <DialogAlert open={openA} close={handleCloseA} alert={alerta}/>  
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
                                        setQtdC(Math.max(qtdC - 1, 1));
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
                                      if(qtdC < qtdd){
                                        setQtdC(qtdC + 1);
                                      }else{
                                        var msg = "A quantidade disponível deste item é de " + qtdd + " x " + metrica;
                                        handleClickOpenA(msg);
                                        setQtdC(1);
                                      }}}
                                >
                                    <AddIcon style={{ width:'20px', height:'auto' }} />
                                </Button>
                            </ButtonGroup>
                        </Box>
                    </Box>)}
                click={()=>handleClickCesta(id, nome, descricao, metrica, valor, qtdC, img)}
                label={"ADICIONAR AO CARRINHO"}
            />
        </div>
    );
}

export default Showcase;