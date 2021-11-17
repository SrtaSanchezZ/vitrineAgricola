//#region Dependências
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Button, Box, Divider, Grid, TextField, List, Card, CardHeader, InputAdornment, ListItem, 
       ListItemIcon, Typography } from '@material-ui/core';
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
import { DialogAlert, DialogLoading, DialogMain } from '../../../components/Dialog';
//#endregion
const Reservas = () => { 
    //#region Variáveis e Variáveis de Estado 
    const [infos, setInfos] = useState([]);
    const [infosI, setInfosI] = useState([]);
    const [filtro, setFiltro] = useState([]);
    const [valorF, setValorF] = useState("");
    const [comF, setComF] = useState("none"); 
    const [semF, setSemF] = useState("block");
    const [open, setOpen] = useState(false);
    const [openA, setOpenA] = useState(false);
    const [openL, setOpenL] = useState(false);
    const [alerta, setAlerta] = useState("");
    const [id, setId] = useState("");
    const [cliente, setCliente] = useState("");
    const [contato, setContato] = useState("");
    const [data, setData] = useState("");
    const [dataSituacao, setDataSituacao] = useState("");
    const [responsavel, setResponsavel] = useState("");
    const [situacao, setSituacao] = useState("");
    const [situacaoE, setSituacaoE] = useState("");
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
    const handleClickOpen = (id, data, dataSituacao, usuario, situacao, cliente, contato, total) => {
        setId(id);
        setData(data);
        setDataSituacao(dataSituacao)
        setSituacao(situacao);
        setCliente(cliente);
        setContato(contato);
        setTotal(total);
        setResponsavel("");
        
        handleLoadItens(id);

        if(usuario !== null){
            handleLoadUsuario(usuario);
        }

    };
    const handleClickOpenL = () => {
      setOpenL(true);
    };
    const handleCloseL = () => {
      setOpenL(false);
    };
    const handleClickOpenE = (situa) => {
      setOpen(true);
      setSituacaoE(situa);
    };
    const handleClose = () => {
      setOpen(false);
    };
    
    const handleAlter = () => {

        handleClose();
        handleClickOpenL();
        
        if(situacao === 3){
            handleCloseL();                                                 
            msg = "Não é possível alterar um pedido cancelado.";
            handleClickOpenA(msg);
        }else if(situacao === situacaoE){ 
            handleCloseL();                                                 
            msg = "Não é possível alterar um pedido para a mesma situação que a atual.";
            handleClickOpenA(msg);
        }else if(situacao === 4){ 
            handleCloseL();                                                 
            msg = "Esse pedido já foi retirado pelo cliente.";
            handleClickOpenA(msg);
        }else if(situacao === 2 && situacaoE === 1 || situacao === 2 && situacaoE === 3){ 
            handleCloseL();                                                 
            msg = "Não é possível desfazer o recebimento de um pedido.";
            handleClickOpenA(msg);
        }else{
            axios
            .put(`http://` + back + `/reservas/` + id, {
                situacao: situacaoE,
                email: email,
                perfil: perfil,
            })
            .then((res) => {

                if(res.data.retorno){ 
                    handleCloseL();                                                    
                    msg = res.data.msg;
                    setInfosI([]);
                    handleClickOpenA(msg);
                }else{    
                    handleCloseL();                                                 
                    msg = res.data.msg;
                    setInfosI([]);
                    handleClickOpenA(msg);
                }

            })
            .catch((error) => {
                handleCloseL();
                msg = "Não foi possível atualizar a situação dessa reserva, selecione novamente o Pedido desejado e refaça a ação.";
                handleClickOpenA(msg);
            })
        }
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
    const handleLoadUsuario = (id) =>{
        axios
          .get(`http://`+ back + `/usuarios/` + id)
          .then((res) => {         
            
            setResponsavel(res.data.response.usuario[0].nome);

          }).catch((res) =>{    
            msg = "Não foi possível localizar esse usuário."; 
          })  
    };
    const handleFiltro = () => {
      setFiltro(infos.filter(infos => infos.cliente.toUpperCase().indexOf(valorF.toUpperCase()) !== -1));
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
                <Grid item xs={12} style={{ paddingLeft:'28%' }}>              
                    <CardHeader subheader={
                        <Box p={1} display="flex">                                
                            <AiOutlineInfoCircle style={{ width:'40px', height:'auto', marginRight:'10px' }} /> 
                            <Typography variant="body2" color="textSecondary" style={{ textAlign:'left' }}>                
                                Clique sobre uma das reservas/ pedidos na "Lista de Reservas" para visualização. <br/>
                                Clique no botão referente a situação atual desta reserva. <br/>
                                CLIQUE AQUI PARA SABER MAIS SOBRE AS SITUAÇÕES DE RESERVA.
                            </Typography>
                        </Box> }
                        style={{ cursor:'pointer' }}
                        onClick={()=>handleClickOpenA(<Box>
                            <Typography variant="subtitle1" style={{ fontWeight:'bold', textAlign:'center' }}>
                                Gerenciando Situações de Reserva
                            </Typography><br/>
                            <Typography variant="subtitle1" style={{ textAlign:'justify' }}>
                                <b>PEDIDO RECEBIDO: </b>Essa é a situação inicial de uma reserva, assim que é selecionada outra situação para a reserva em questão, não será possível retroceder para esse status inicial. Sempre que um produto é reservado, a quantidade reservada é baixada do estoque.
                            </Typography>
                            <Typography variant="subtitle1" style={{ textAlign:'justify' }}>
                                <b>PEDIDO CANCELADO: </b>Essa situação refere-se a uma reserva que foi cancelada pelo cliente, em contato com o vendedor ou devido a indisponibilidade de estoque/ quantidade do item desatualizada. Uma vez selecionada, não será possível reverter essa ação. Sempre que uma reserva é cancelada, a quantidade dos itens que compoem a relação de produtos selecionados, é retornada ao estoque.
                            </Typography>
                            <Typography variant="subtitle1" style={{ textAlign:'justify' }}>
                                <b>PAGAMENTO CONFIRMADO: </b>O sistema não faz controle de caixa, mas permite que seja selecionada essa situação para apontar quais reservas já foram pagas pelo cliente. Assim que essa situação é selecionada, só será possível prosseguir com a retirada do pedido.
                            </Typography>
                            <Typography variant="subtitle1" style={{ textAlign:'justify' }}>
                                <b>PEDIDO RETIRADO: </b>Quando o cliente recebe o produto, essa situação deve ser atualizada, ela simboliza a fase final do fluxo de situações e indica que os produtos listados já não estão mais na empresa. Essa situação não pode ser revertida.
                            </Typography>
                        </Box>)}
                    />
                </Grid>
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
                            placeholder="Busque pelo nome de um cliente"
                            className="search"
                            variant="standard"
                            value={valorF}
                            onChange={handleChangeFiltro(setValorF)}
                            style={{ width:'60%', borderRadius:'60px' }}
                        /> 
                    </Box>       
                </Box>
            </Box> 
            <Box className="noticias">
                <Box style={{ display:"inline-flex", alignItems: "center", textAlign: "left", fontsize: "16px" }} >
                    <Card>
                        <Box display={semF}>
                            <List className="bxLista" container wrap="nowrap" 
                                  style={{height: "57vh", backgroundColor: "#ffffff", overflow: 'auto', }} 
                                dense component="div" role="list">
                                {infos.sort((a, b) => b.id - a.id).map((item) => {
                                    return (
                                        <>
                                        <ListItem key={item.id} role="listitem" 
                                                  button onClick={()=>handleClickOpen(item.id, item.data, item.dataSituacao, item.usuario, item.situacao, item.cliente, item.contato, item.total)}>
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
                                <ListItem />
                            </List>
                        </Box>
                        <Box display={comF}>
                            <List className="bxLista" container wrap="nowrap" 
                                  style={{ height: "57vh", backgroundColor: "#ffffff", overflow: 'auto', }} 
                                dense component="div" role="list">
                                {filtro.sort((a, b) => b.id - a.id).map((item) => {
                                    return (
                                        <>
                                        <ListItem key={item.id} role="listitem" 
                                                  button onClick={()=>handleClickOpen(item.id, item.data, item.dataSituacao, item.usuario, item.situacao, item.cliente, item.contato, item.total)}>
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
                                <ListItem />
                            </List>
                        </Box>
                    </Card>
                </Box>
                <Box className="bxLeitura" style={{ width:'96%', height: "54vh", backgroundColor: "#ffffff", overflow: 'auto'}}>                         
                    {infosI.length > 0 ? (                        
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6">                
                                    Pedido #0{id}                                                     
                                </Typography>
                            </Grid>
                            <Grid item xs={12} style={{ display:'flex', padding:'16px' }}>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle2" color="textSecondary">                
                                        Data da reserva                                                     
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">                
                                        {(data.slice(0,10).split('-').reverse().join()).replace(/,/g,'/')}                                                     
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle2" color="textSecondary">                
                                        Nome do Cliente                                                     
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">                
                                        {cliente}                                                     
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle2" color="textSecondary">                
                                        Telefone de Contato                                                     
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">                
                                        {contato}                                                     
                                    </Typography>
                                </Grid>
                                {responsavel !== "" ? (
                                <Grid item xs={3}>
                                    <Typography variant="subtitle2" color="textSecondary">                
                                        Última atualização                                                     
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">                
                                       {responsavel.split(' ').slice(0, 2).join(' ')} - {(dataSituacao.slice(0,10).split('-').reverse().join()).replace(/,/g,'/')}                                                     
                                    </Typography>
                                </Grid>):null}
                            </Grid>
                            <Grid container spacing={2} columns={12}>     
                                <Grid item xs={3} sm={4} style={{ textAlign:'center' }}>
                                    {situacao === 1 ? (
                                        <Button 
                                        onClick={()=>handleClickOpenE(1)} 
                                            variante="outlined"  
                                            className="btnNovo"
                                            startIcon={
                                                    <img src={pedidoRecebidoWhite} 
                                                    style={{ width:'24px', height:'24px' }} />}
                                            style={{ color:"#FFFFFF", border:'2px solid #2E8E61', textAlign:'left',
                                                    borderRadius:'50px', backgroundColor:'#2E8E61', width:"220px" }}>
                                            <Typography variant="subtitle2" style={{ fontSize:'12px' }}>                
                                                Pedido Recebido                                                    
                                            </Typography>
                                        </Button>
                                        ):(
                                        <Button  
                                            onClick={()=>handleClickOpenE(1)} 
                                            variante="outlined"  
                                            className="btnNovo"
                                            startIcon={
                                                <img src={pedidoRecebidoBlack} 
                                                style={{ width:'24px', height:'24px' }} />}
                                            style={{ color:"#000000", border:'2px solid #000000', textAlign:'left',
                                                borderRadius:'50px', backgroundColor:'#FFFFFF', width:"220px" }}>
                                            <Typography variant="subtitle2" style={{ fontSize:'12px' }}>                
                                                Pedido Recebido                                                    
                                            </Typography>
                                        </Button>
                                    )}
                                </Grid>
                                <Grid item xs={3} sm={4} style={{ textAlign:'center' }}>
                                    {situacao === 3 ? (
                                        <Button 
                                            onClick={()=>handleClickOpenE(3)}  
                                            variante="outlined"  
                                            className="btnNovo"
                                            startIcon={
                                                    <img src={pedidoCanceladoWhite} 
                                                    style={{ width:'24px', height:'24px' }} />}
                                            style={{ color:"#FFFFFF", border:'2px solid #2E8E61', textAlign:'left',
                                                    borderRadius:'50px', backgroundColor:'#2E8E61', width:"220px" }}>
                                            <Typography variant="subtitle2" style={{ fontSize:'12px' }}>                
                                                Pedido Cancelado                                                   
                                            </Typography>
                                        </Button>
                                        ):(
                                        <Button  
                                            onClick={()=>handleClickOpenE(3)} 
                                            variante="outlined"  
                                            className="btnNovo"
                                            startIcon={
                                                    <img src={pedidoCanceladoBlack} 
                                                    style={{ width:'24px', height:'24px' }} />}
                                            style={{ color:"#000000", border:'2px solid #000000', textAlign:'left',
                                                    borderRadius:'50px', backgroundColor:'#FFFFFF', width:"220px" }}>
                                            <Typography variant="subtitle2" style={{ fontSize:'12px' }}>                
                                                Pedido Cancelado                                                    
                                            </Typography>
                                        </Button>
                                    )}
                                </Grid>
                                <Grid item xs={3} sm={4} style={{ textAlign:'center' }}>
                                    {situacao === 2 ? (
                                        <Button 
                                            onClick={()=>handleClickOpenE(2)}  
                                            variante="outlined"  
                                            className="btnNovo"
                                            startIcon={
                                                    <img src={pagamentoConfirmadoWhite} 
                                                    style={{ width:'24px', height:'24px' }} />}
                                            style={{ color:"#FFFFFF", border:'2px solid #2E8E61', textAlign:'left',
                                                    borderRadius:'50px', backgroundColor:'#2E8E61', width:"220px" }}>
                                            <Typography variant="subtitle2" style={{ fontSize:'12px' }}>                
                                                Pagamento Confirmado                                                   
                                            </Typography>
                                        </Button>
                                        ):(
                                        <Button  
                                            onClick={()=>handleClickOpenE(2)} 
                                            variante="outlined"  
                                            className="btnNovo"
                                            startIcon={
                                                    <img src={pagamentoConfirmadoBlack} 
                                                    style={{ width:'24px', height:'24px' }} />}
                                            style={{ color:"#000000", border:'2px solid #000000', textAlign:'left',
                                                    borderRadius:'50px', backgroundColor:'#FFFFFF', width:"220px" }}>
                                            <Typography variant="subtitle2" style={{ fontSize:'12px' }}>                
                                                Pagamento Confirmado                                                    
                                            </Typography>
                                        </Button>
                                    )}
                                </Grid> 
                                <Grid item xs={3} sm={4} style={{ textAlign:'center' }}>
                                    {situacao === 4 ? (
                                        <Button 
                                            onClick={()=>handleClickOpenE(4)}  
                                            variante="outlined"  
                                            className="btnNovo"
                                            startIcon={
                                                    <img src={pedidoRetiradoWhite} 
                                                    style={{ width:'24px', height:'24px' }} />}
                                            style={{ color:"#FFFFFF", border:'2px solid #2E8E61', textAlign:'left',
                                                    borderRadius:'50px', backgroundColor:'#2E8E61', width:"220px" }}>
                                            <Typography variant="subtitle2" style={{ fontSize:'12px' }}>                
                                                Pedido Retirado                                                   
                                            </Typography>
                                        </Button>
                                        ):(
                                        <Button  
                                            onClick={()=>handleClickOpenE(4)}
                                            variante="outlined"  
                                            className="btnNovo"
                                            startIcon={
                                                    <img src={pedidoRetiradoBlack} 
                                                    style={{ width:'24px', height:'24px' }} />}
                                            style={{ color:"#000000", border:'2px solid #000000', textAlign:'left',
                                                    borderRadius:'50px', backgroundColor:'#FFFFFF', width:"220px" }}>
                                            <Typography variant="subtitle2" style={{ fontSize:'12px' }}>                
                                                Pedido Retirado                                                    
                                            </Typography>
                                        </Button>
                                    )}
                                </Grid>                               
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
                    ):
                    (<CardHeader subheader={
                        <Box p={1} display="flex" style={{ paddingLeft:'25%'}} >                                
                            <AiOutlineInfoCircle style={{ width:'20px', height:'auto', marginRight:'10px' }} /> 
                            <Typography variant="body2" color="textSecondary">                
                                Para visualizar selecione uma reserva / pedido na lateral                                                      
                            </Typography>
                        </Box> }
                    />)}
                </Box>
            </Box>
                       
            <DialogAlert open={openA} close={handleCloseA} alert={alerta}/>            
            <DialogLoading open={openL} />            
            <DialogMain
                open={open}
                close={handleClose}
                title={"ATUALIZA SITUAÇÃO"}
                info={(
                    <Box>
                        <Typography variant="subtitle2">                
                            Você tem certeza que deseja atualizar o pedido #{id} com a situação 
                            "{situacao === 1 ? (
                                <b>Pedido Recebido</b>
                            ): null }
                            {situacao === 2 ? (
                                <b>Pagamento Confirmado</b>
                            ): null }{situacao === 3 ? (
                                <b>Pedido Cancelado</b>
                            ): null }{situacao === 4 ? (
                                <b>Pedido Retirado</b>
                            ): null }" para a situação 
                            "{situacaoE === 1 ? (
                                <b>Pedido Recebido</b>
                            ): null }
                            {situacaoE === 2 ? (
                                <b>Pagamento Confirmado</b>
                            ): null }{situacaoE === 3 ? (
                                <b>Pedido Cancelado</b>
                            ): null }{situacaoE === 4 ? (
                                <b>Pedido Retirado</b>
                            ): null }"?
                        </Typography>
                    </Box>)}
                click={()=>handleAlter()}
                label={"SIM"}
            />   
        </Grid>
    );
}
export default Reservas;