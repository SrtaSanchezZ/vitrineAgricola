//#region Dependências
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { VscStarEmpty } from "react-icons/vsc";
import { Box, Divider, Grid, List, Card, ListItem, 
       ListItemIcon, Typography } from '@material-ui/core';
import pedidoRecebidoBlack from '../../../assets/img/Icons/shopping_bag_black.png';
import pagamentoConfirmadoBlack from '../../../assets/img/Icons/credit_score_black.png';
import pedidoCanceladoBlack from '../../../assets/img/Icons/highlight_off_black.png';
import pedidoRetiradoBlack from '../../../assets/img/Icons/delivery_dining_black.png';
import vitrine from '../../../assets/img/Icons/vitrine.png';
import produto from '../../../assets/img/Icons/shopping_basket_black_24dp.png';
import store from '../../../assets/img/Icons/store.png';
import next from '../../../assets/img/Icons/navigate_next_black.png';
//#endregion
const HomePrivate = () => { 
    const [infos, setInfos] = useState([]);
    const [prod, setProd] = useState([]);
    const [vit, setVit] = useState([]);
    const [noti, setNoti] = useState([]);
    const [perfil, setPerfil] = useState(localStorage.getItem("perfil")); 

    const ArrRes = (arr) =>
            arr.map((item) => ({ id: item.id, cliente: item.cliente, contato: item.contato, data: item.data,
                           usuario: item.usuario, dataSituacao: item.dataSituacao, situacao: item.situacao, 
                           total: item.total }));   
    const ArrPro = (arr) =>
            arr.map((item) => ({ id: item.id, nome: item.nome, descricao: item.descricao,
                        grupo: item.grupo, metrica: item.metrica, imagem: item.imagem })); 
    const ArrVit = (arr) =>
             arr.map((item) => ({ id: item.produtoId, descricao: item.produtoDescricao,
                            grupo: item.produtoGrupo, metrica: item.produtoMetrica, 
                            imagem: item.produtoImg, nome: item.produtoNome, qtd: item.quantidade,
                            valor: item.valor })); 
    const ArrNot = (arr) =>
            arr.map((item) => ({ id: item.id, titulo: item.titulo, texto: item.texto, data: item.data,
                            usuario: item.usuario, imagem: item.imagem, destaque: item.destaque, autor: item.autor }));
    
    var msg = "";
    var back = "localhost:3001"; 
    
    const handleLoad = () =>{
        axios
          .get(`http://`+ back +`/reservas`)
          .then((res) => {         
            
            setInfos(ArrRes(res.data.response.reservas));

          }).catch((res) =>{    
            msg = "Não foi possível localizar reservas."; 
          })  
    };
    const handleLoadProd = () =>{
        axios
          .get(`http://`+ back +`/produtos`)
          .then((res) => {        
            
            setProd(ArrPro(res.data.response.produtos));

          }).catch((res) =>{    
            msg = "Não foi possível localizar reservas."; 
          })  
    };
    const handleLoadVit = () =>{
        axios
          .get(`http://`+ back +`/vitrine`)
          .then((res) => {               
            setVit(ArrVit(res.data.response.vitrine)); 
          }).catch((res) =>{ 
            msg = "Não foi possível localizar produtos da vitrine.";  
          })  
    };
    const handleLoadNot = () =>{
        axios
          .get(`http://`+ back +`/noticias`)
          .then((res) => {              
            setNoti(ArrNot(res.data.response.noticias)); 
          }).catch((res) =>{    
            msg = "Não foi possível localizar notícias."; 
          })  
    };

    useEffect(() => {
        handleLoad();
        handleLoadProd();
        handleLoadVit();
        handleLoadNot();
        // eslint-disable-next-line
      }, []);
    return(
        <Grid display="block" style={{ paddingLeft:'24px', paddingRight:'24px' }}>
            <Box style={{ textAlign:'center', paddingTop:'24px', paddingBottom:'24px' }}>
                <img src={store} alt="Banner Vitrine" style={{ width:"36px", height: "auto" }} />                                       
                <Typography variant="subtitle1" style={{ fontWeight:'bold'}}><br/>
                    Seja bem vindo (a) à Vitrine Agrícola! <br/>
                    Para navegar utilize o menu lateral
                </Typography>  
            </Box>
            <Grid container spacing={2}>
                {perfil === 'redator'? null:(
                    <Grid item xs={4}>
                        <Card style={{ padding:'10px', textAlign:'left' }}>                                      
                            <Typography variant="subtitle1" style={{ fontWeight:'bold'}}><br/>
                                Vitrine em Números
                            </Typography>                               
                            <Typography variant="subtitle2" style={{ color:'#FFFFFF', marginTop:'-15px' }}><br/>
                                " "
                            </Typography> 
                            <Divider/>
                            <List className="bxLista" container wrap="nowrap" 
                                    style={{height: "57vh", backgroundColor: "#ffffff", overflow: 'auto', }} 
                                    dense component="div" role="list">
                                <ListItem key={1} role="listitem">
                                    <ListItemIcon>
                                        <img src={produto} style={{ width:'24px', height:'24px' }} />
                                    </ListItemIcon>
                                    <Typography variant="subtitle1" style={{ width:'100%' }}>
                                        Produtos Cadastrados
                                    </Typography>
                                    <Typography style={{ width:'60%' , textAlign:'end' }}>
                                        {prod.length}
                                    </Typography>
                                </ListItem>
                                <Divider/>
                                <ListItem key={2} role="listitem">
                                    <ListItemIcon>
                                        <img src={vitrine} style={{ width:'24px', height:'24px' }} />
                                    </ListItemIcon>
                                    <Typography variant="subtitle1" style={{ width:'100%' }}>
                                        Produtos Ativos na Vitrine
                                    </Typography>
                                    <Typography style={{ width:'60%' , textAlign:'end' }}>
                                        {vit.length}
                                    </Typography>
                                </ListItem>
                                <Divider/>
                            </List>
                        </Card>
                    </Grid>
                )}
                {perfil === 'vendedor'? null:(
                    <Grid item xs={4}>
                        <Card style={{ padding:'10px', textAlign:'left' }}>                                      
                            <Typography variant="subtitle1" style={{ fontWeight:'bold'}}><br/>
                                Últimas notícias
                            </Typography>                              
                            <Typography variant="subtitle2" style={{ color:'#00000099', marginTop:'-15px' }}><br/>
                                Total de Notícias: {noti.length}
                            </Typography> 
                            <List className="bxLista" container wrap="nowrap" 
                                style={{height: "57vh", backgroundColor: "#ffffff", overflow: 'auto', }} 
                                dense component="div" role="list">
                                {noti.sort((a, b) => b.id - a.id).map((value) => {
                                    return (
                                        <>
                                        <ListItem key={value} role="listitem" button>
                                            {value.destaque == 1 ? (
                                            <Typography noWrap variant="subtitle1" id={value.id}>
                                            <VscStarEmpty/> {" " + value.titulo}
                                            </Typography>):( <Typography noWrap variant="subtitle1" id={value.id}>
                                            {value.titulo}
                                            </Typography>) }
                                        </ListItem>                                    
                                        <Divider/>
                                        </>
                                    );
                                })}
                            </List>
                        </Card>
                    </Grid>
                )}
                {perfil === 'redator'? null:(
                    <Grid item xs={4}>
                        <Card style={{ padding:'10px', textAlign:'left' }}>                                      
                            <Typography variant="subtitle1" style={{ fontWeight:'bold'}}><br/>
                                Últimos Pedidos
                            </Typography>                              
                            <Typography variant="subtitle2" style={{ color:'#00000099', marginTop:'-15px' }}><br/>
                                Total de Pedidos: {infos.length}
                            </Typography> 
                            <Divider/>
                            <List className="bxLista" container wrap="nowrap" 
                                    style={{height: "57vh", backgroundColor: "#ffffff", overflow: 'auto', }} 
                                dense component="div" role="list">
                                {infos.sort((a, b) => b.id - a.id).map((item) => {
                                    return (
                                        <>
                                        <ListItem key={item.id} role="listitem">
                                            <ListItemIcon>
                                                {item.situacao === 1 ? (
                                                    <img src={pedidoRecebidoBlack} 
                                                    style={{ width:'24px', height:'24px' }} />
                                                ): null}
                                                {item.situacao === 2 ? (
                                                    <img src={pagamentoConfirmadoBlack} 
                                                    style={{ width:'24px', height:'24px' }} />
                                                ):null}
                                                {item.situacao === 3 ? (
                                                    <img src={pedidoCanceladoBlack} 
                                                    style={{ width:'24px', height:'24px' }} />
                                                ):null}
                                                {item.situacao === 4 ? (
                                                    <img src={pedidoRetiradoBlack} 
                                                    style={{ width:'24px', height:'24px' }} />
                                                ):null}
                                            </ListItemIcon>
                                            <Typography variant="subtitle1" id={item.id} style={{ width:'200px' }}>
                                                Pedido #{item.id}
                                            </Typography>
                                            <Typography style={{ width:'65%' , textAlign:'end' }}>
                                                <img src={next} 
                                                    style={{ width:'24px', height:'24px' }} />
                                            </Typography>
                                        </ListItem>
                                        <Divider/>
                                        </>
                                    );
                                })}
                            </List>
                        </Card>
                    </Grid> 
                )}  
            </Grid>
        </Grid>
    );
}
export default HomePrivate;