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
import pedidoRecebidoBlack from '../../../assets/img/Icons/shopping_bag_black.png';
import pedidoRecebidoWhite from '../../../assets/img/Icons/shopping_bag_white.png';
import pagamentoConfirmadoBlack from '../../../assets/img/Icons/credit_score_black.png';
import pagamentoConfirmadoWhite from '../../../assets/img/Icons/credit_score_white.png';
import pedidoCanceladoBlack from '../../../assets/img/Icons/highlight_off_black.png';
import pedidoCanceladoWhite from '../../../assets/img/Icons/highlight_off_white.png';
import pedidoRetiradoBlack from '../../../assets/img/Icons/delivery_dining_black.png';
import pedidoRetiradoWhite from '../../../assets/img/Icons/delivery_dining_white.png';
import next from '../../../assets/img/Icons/navigate_next_black.png';
import { DialogAlert, DialogLoading } from '../../../components/Dialog';
//#endregion
const Reservas = () => { 
    //#region Variáveis e Variáveis de Estado 
    const [checked, setChecked] = useState([]);
    const [infos, setInfos] = useState([]);
    const [infosI, setInfosI] = useState([]);
    const [filtro, setFiltro] = useState([]);
    const [valorF, setValorF] = useState("");
    const [comF, setComF] = useState("none"); 
    const [semF, setSemF] = useState("block");
    const [open, setOpen] = useState(false);
    const [openA, setOpenA] = useState(false);
    const [openE, setOpenE] = useState(false);
    const [openL, setOpenL] = useState(false);
    const [alerta, setAlerta] = useState("");
    const [id, setId] = useState("");
    const [cliente, setCliente] = useState("");
    const [contato, setContato] = useState("");
    const [dataSituacao, setDataSituacao] = useState("");
    const [usuario, setUsuario] = useState("");
    const [data, setData] = useState("");
    const [situacao, setSituacao] = useState("");
    const [total, setTotal] = useState("");
    const [perfil, setPerfil] = useState(localStorage.getItem("perfil")); 
    const [email, setEmail] = useState(localStorage.getItem("email")); 

    const ArrRes = (arr) =>
      arr.map((item) => ({ id: item.id, cliente: item.cliente, contato: item.contato, data: item.data,
                           usuario: item.usuario, dataSituacao: item.dataSituacao, situacao: item.situacao, 
                           total: item.total }));
    const ArrItens = (arr) =>
        arr.map((item) => ({  
            produtoId: item.produtoId,
            produtoNome: item.produtoNome,
            produtoDescricao: item.produtoDescricao,
            produtoMetrica: item.produtoMetrica,
            produtoImg: item.produtoImg,
            produtoGrupo: item.produtoGrupo,
            quantidade: item.quantidade,
            valor: item.valor }));
    
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
    const handleClickOpen = (id, data, situacao, cliente, contato, total) => {
      setId(id);
      setData(data);
      setSituacao(situacao);
      setCliente(cliente);
      setContato(contato);
      setTotal(total);

      handleLoadItens(id);
    };
    const handleClickOpenL = () => {
      setOpenL(true);
    };
    const handleCloseL = () => {
      setOpenL(false);
    };
    
    const handleAlter = (situa) => {

        handleClickOpenL();

        axios
            .put(`http://` + back + `/reservas/` + id, {
                situacao: situa,
                email: email,
                perfil: perfil,
            })
            .then((res) => {

                if(res.data.retorno){ 
                    handleCloseL();                                                    
                    msg = res.data.msg
                    handleClickOpenA(msg);
                }else{    
                    handleCloseL();                                                 
                    msg = res.data.msg
                    handleClickOpenA(msg);
                }

            })
            .catch((error) => {
                handleCloseL();
                msg = "Não foi possível atualizar a situação dessa reserva, selecione novamente o Pedido desejado e refaça a ação.";
                handleClickOpenA(msg);
            })
    };
    const handleLoad = () =>{
        axios
          .get(`http://`+ back +`/reservas`)
          .then((res) => {         
            
            setInfos(ArrRes(res.data.response.reservas));

          }).catch((res) =>{    
            msg = "Não foi possível localizar reservas."; 
          })  
    };
    const handleLoadItens = (id) =>{
        axios
          .get(`http://`+ back +`/reservas/` + id)
          .then((res) => {         
            
            setInfosI(ArrItens(res.data.response.itens));

          }).catch((res) =>{    
            msg = "Não foi possível localizar reservas."; 
          })  
    };
    const handleFiltro = () => {
      setFiltro(infos.filter(infos => infos.cliente.toUpperCase().indexOf(valorF.toUpperCase()) !== -1 
                            || infos.contato.toUpperCase().indexOf(valorF.toUpperCase()) !== -1
                            || infos.id.indexOf(valorF.toUpperCase()) !== -1));
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
                        Reservas
                    </Typography>
                </Box>
            </Box>
            <Box p={1} display="flex">           
                <Box style={{ width:'50%', textAlign:'start', paddingTop:'20px' }}>  
                    <Typography variant="subtitle1" style={{ textAlign:'left' }} >
                        Lista de Reservas
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
                            placeholder="Busque por um número de reserva"
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
                        <Box display={semF}>
                            <List className="bxLista" container wrap="nowrap" 
                                  style={{ width: "100%", height: "57vh", backgroundColor: "#ffffff", overflow: 'auto', }} 
                                dense component="div" role="list">
                                {infos.map((item) => {
                                    return (
                                        <ListItem key={item.id} role="listitem" 
                                                  button onClick={()=>handleClickOpen(item.id, item.data, item.situacao, item.cliente, item.contato, item.total)}>
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
                                            <Typography variant="subtitle1" id={item.id}>
                                                Pedido #{item.id}
                                            </Typography>
                                            <Typography style={{ width:'56%' , textAlign:'end' }}>
                                                <img src={next} 
                                                    style={{ width:'24px', height:'24px' }} />
                                            </Typography>
                                        </ListItem>
                                    );
                                })}
                                <ListItem />
                            </List>
                        </Box>
                        <Box display={comF}>
                            <List className="bxLista" container wrap="nowrap" style={{ width: "100%", height: "50vh", backgroundColor: "#ffffff", overflow: 'auto', }} 
                                dense component="div" role="list">
                                {filtro.map((item) => {
                                    return (
                                        <ListItem key={item.id} role="listitem" 
                                                  button onClick={()=>handleClickOpen(item.id, item.data, item.situacao, item.cliente, item.contato, item.total)}>
                                                <Box display="flex" style={{ width:'100%' }}>
                                                    <Box style={{ width:'50%', textAlign:'start', padding:'16px' }}>
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
                                                        <Typography variant="subtitle1" id={item.id}>
                                                            Pedido #{item.id}
                                                        </Typography>
                                                    </Box>
                                                    <Box style={{ width:'50%', textAlign:'end', padding:'16px' }}>
                                                        <Typography>
                                                            <img src={next} 
                                                                style={{ width:'24px', height:'24px' }} />
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                        </ListItem>
                                    );
                                })}
                                <ListItem />
                            </List>
                        </Box>
                    </Card>
                </div>
                <div className="bxLeitura" style={{ width: "96%", height: "54vh", backgroundColor: "#ffffff", overflow: 'auto'}}>                         
                    {infosI.length > 0 ? (
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h6">                
                                        Pedido #0{id}                                                     
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="subtitle2" color="textSecondary">                
                                        Data da reserva                                                     
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">                
                                        {(data.slice(0,10).split('-').reverse().join()).replace(/,/g,'/')}                                                     
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>                                    
                                <Box style={{ width:'80%' }}>
                                    <Box display="flex">
                                        <Box style={{ width:'50%', textAlign:'start', padding:'16px' }}>
                                            {situacao === 1 ? (
                                                <Button 
                                                onClick={()=>handleAlter(1)} 
                                                    variante="outlined"  
                                                    className="btnNovo"
                                                    startIcon={
                                                            <img src={pedidoRecebidoWhite} 
                                                            style={{ width:'24px', height:'24px' }} />}
                                                    style={{ color:"#FFFFFF", border:'2px solid #2E8E61', textAlign:'left',
                                                            borderRadius:'50px', backgroundColor:'#2E8E61', width:"200px",
                                                            marginBottom:'16px'  }}>
                                                    <Typography variant="subtitle2">                
                                                        Pedido Recebido                                                    
                                                    </Typography>
                                                </Button>
                                                ):(
                                                <Button  
                                                    onClick={()=>handleAlter(1)} 
                                                    variante="outlined"  
                                                    className="btnNovo"
                                                    startIcon={
                                                        <img src={pedidoRecebidoBlack} 
                                                        style={{ width:'24px', height:'24px' }} />}
                                                    style={{ color:"#000000", border:'2px solid #000000', textAlign:'left',
                                                        borderRadius:'50px', backgroundColor:'#FFFFFF', width:"200px",
                                                        marginBottom:'16px'  }}>
                                                    <Typography variant="subtitle2">                
                                                        Pedido Recebido                                                    
                                                    </Typography>
                                                </Button>)}
                                            {situacao === 3 ? (
                                                <Button 
                                                    onClick={()=>handleAlter(3)}  
                                                    variante="outlined"  
                                                    className="btnNovo"
                                                    startIcon={
                                                            <img src={pedidoCanceladoWhite} 
                                                            style={{ width:'24px', height:'24px' }} />}
                                                    style={{ color:"#FFFFFF", border:'2px solid #2E8E61', textAlign:'left',
                                                            borderRadius:'50px', backgroundColor:'#2E8E61', width:"200px",
                                                            marginBottom:'16px'  }}>
                                                    <Typography variant="subtitle2">                
                                                        Pedido Cancelado                                                   
                                                    </Typography>
                                                </Button>
                                                ):(
                                                <Button  
                                                    onClick={()=>handleAlter(3)} 
                                                    variante="outlined"  
                                                    className="btnNovo"
                                                    startIcon={
                                                            <img src={pedidoCanceladoBlack} 
                                                            style={{ width:'24px', height:'24px' }} />}
                                                    style={{ color:"#000000", border:'2px solid #000000', textAlign:'left',
                                                            borderRadius:'50px', backgroundColor:'#FFFFFF', width:"200px"  }}>
                                                    <Typography variant="subtitle2">                
                                                        Pedido Cancelado                                                    
                                                    </Typography>
                                                </Button>)}
                                        </Box>
                                        <Box style={{ width:'50%', textAlign:'end', padding:'16px' }}>
                                            {situacao === 2 ? (
                                                <Button 
                                                    onClick={()=>handleAlter(2)}  
                                                    variante="outlined"  
                                                    className="btnNovo"
                                                    startIcon={
                                                            <img src={pagamentoConfirmadoWhite} 
                                                            style={{ width:'24px', height:'24px' }} />}
                                                    style={{ color:"#FFFFFF", border:'2px solid #2E8E61', textAlign:'left',
                                                            borderRadius:'50px', backgroundColor:'#2E8E61', width:"200px",
                                                            marginBottom:'16px'  }}>
                                                    <Typography variant="subtitle2">                
                                                        Pagamento Confirmado                                                   
                                                    </Typography>
                                                </Button>
                                                ):(
                                                <Button  
                                                    onClick={()=>handleAlter(2)} 
                                                    variante="outlined"  
                                                    className="btnNovo"
                                                    startIcon={
                                                            <img src={pagamentoConfirmadoBlack} 
                                                            style={{ width:'24px', height:'24px' }} />}
                                                    style={{ color:"#000000", border:'2px solid #000000', textAlign:'left',
                                                            borderRadius:'50px', backgroundColor:'#FFFFFF', width:"250px",
                                                            marginBottom:'16px'  }}>
                                                    <Typography variant="subtitle2">                
                                                        Pagamento Confirmado                                                    
                                                    </Typography>
                                                </Button>)}
                                            {situacao === 4 ? (
                                                <Button 
                                                    onClick={()=>handleAlter(4)}  
                                                    variante="outlined"  
                                                    className="btnNovo"
                                                    startIcon={
                                                            <img src={pedidoRetiradoWhite} 
                                                            style={{ width:'24px', height:'24px' }} />}
                                                    style={{ color:"#FFFFFF", border:'2px solid #2E8E61', textAlign:'left',
                                                            borderRadius:'50px', backgroundColor:'#2E8E61', width:"200px"  }}>
                                                    <Typography variant="subtitle2">                
                                                        Pedido Retirado                                                   
                                                    </Typography>
                                                </Button>
                                                ):(
                                                <Button  
                                                    onClick={()=>handleAlter(4)}
                                                    variante="outlined"  
                                                    className="btnNovo"
                                                    startIcon={
                                                            <img src={pedidoRetiradoBlack} 
                                                            style={{ width:'24px', height:'24px' }} />}
                                                    style={{ color:"#000000", border:'2px solid #000000', textAlign:'left',
                                                            borderRadius:'50px', backgroundColor:'#FFFFFF', width:"250px"  }}>
                                                    <Typography variant="subtitle2">                
                                                        Pedido Retirado                                                    
                                                    </Typography>
                                                </Button>)}
                                        </Box>
                                    </Box>
                                </Box>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="subtitle2" color="textSecondary">                
                                        Nome do Cliente                                                     
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">                
                                        {cliente}                                                     
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="subtitle2" color="textSecondary">                
                                        Telefone de Contato                                                     
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">                
                                        {contato}                                                     
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" style={{ fontWeight:'bold'}}>                
                                        Itens do Pedido                                                     
                                    </Typography>
                                    {infosI.map((item) => {
                                        return (
                                            <Box style={{ width:'100%' }}>
                                                <Box display="flex">
                                                    <Box style={{ width:'50%', textAlign:'start', padding:'16px' }}>
                                                        <Typography variant="subtitle1" style={{ fontWeight:'bold'}}>                
                                                            {item.produtoNome}                                                    
                                                        </Typography>
                                                        <Typography variant="subtitle2" color="textSecondary">                
                                                            {item.produtoDescricao}                                                     
                                                        </Typography>
                                                    </Box>
                                                    <Box style={{ width:'50%', textAlign:'end', padding:'16px' }}>
                                                        <Typography variant="subtitle1">                
                                                            x {item.quantidade}                                                    
                                                        </Typography>
                                                        <Typography variant="subtitle2" color="textSecondary">                
                                                            {(item.valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}                                                     
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <hr style={{ width:'100%', color:'#000000' }} />
                                            </Box>
                                        );
                                    })}                                    
                                    <Box display="flex">
                                        <Box style={{ width:'50%', textAlign:'start', padding:'16px' }}>
                                            <Typography variant="subtitle1" color="textSecondary">                
                                                Total:                                                     
                                            </Typography>
                                        </Box>
                                        <Box style={{ width:'50%', textAlign:'end', padding:'16px' }}>                                            
                                            <Typography variant="subtitle1" style={{ fontWeight:'bold'}}>                
                                                {(total).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}                                                    
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    ):
                    (<CardHeader subheader={
                        <Box p={1} display="flex" style={{ paddingLeft:'25%'}} >                                
                            <AiOutlineInfoCircle style={{ width:'20px', height:'auto', marginRight:'10px' }} /> 
                            <Typography variant="body2" color="textSecondary">                
                                Para visualizar selecione uma reserva/ pedido na lateral                                                      
                            </Typography>
                        </Box> }
                    />)}
                </div>
            </div>
                       
            <DialogAlert open={openA} close={handleCloseA} alert={alerta}/>            
            <DialogLoading open={openL} />  
        </Grid>
    );
}
export default Reservas;