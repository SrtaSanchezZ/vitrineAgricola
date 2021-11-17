//#region Dependências
import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';
import { Avatar, Button, Box, Card, CardContent, CardHeader, CardMedia, 
         Grid, Drawer, Divider, InputAdornment, Typography, TextField } from '@material-ui/core';
import { MdArrowBack, MdRemoveCircleOutline } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Search from '@material-ui/icons/Search';
import vitrineImg from '../../../assets/img/Icons/vitrineBranca.png';
import vitrineBlack from '../../../assets/img/Icons/vitrine.png';
import ImgProduto from '../../../assets/img/Icons/shopping_basket_black_24dp.png';
import { DialogAlert, DialogLoading, DialogMain } from '../../../components/Dialog';
//#endregion
const MontarVitrine = () => { 
    //#region Variáveis e Variáveis de Estado
    const [infos, setInfos] = useState([]);
    const [infosG, setInfosG] = useState([]);
    const [infosV, setInfosV] = useState([]);
    const [filtro, setFiltro] = useState([]);
    const [filtroG, setFiltroG] = useState([]);
    const [state, setState] = useState({right: false});
    const [valorF, setValorF] = useState("");
    const [valorFG, setValorFG] = useState("");
    const [comF, setComF] = useState("none"); 
    const [semF, setSemF] = useState("block");
    const [comFG, setComFG] = useState("none"); 
    const [semFG, setSemFG] = useState("block");
    const [comG, setComG] = useState("none"); 
    const [semG, setSemG] = useState("block");
    const [open, setOpen] = useState(false);
    const [openA, setOpenA] = useState(false);
    const [openE, setOpenE] = useState(false);
    const [openL, setOpenL] = useState(false);
    const [alerta, setAlerta] = useState("");
    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [grupo, setGrupo] = useState("");
    const [metrica, setMetrica] = useState("");
    const [img, setImg] = useState(""); 
    const [qtd, setQtd] = useState(""); 
    const [valor, setValor] = useState(""); 
    const [grupoId, setGrupoId] = useState("");
    const [grupoNome, setGrupoNome] = useState("");
    const [imagem, setImagem] = useState([]);
    const [perfil, setPerfil] = useState(localStorage.getItem("perfil")); 
    const [email, setEmail] = useState(localStorage.getItem("email")); 

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
    
    var item = {
        id: "",
        qtd: 0,
        valor: 0
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
    };
    const handleClickOpenE = (id, nome, descricao, metrica, imagem) =>{
        setOpenE(true);
        setId(id);
        setNome(nome);
        setDescricao(descricao);
        setMetrica(metrica);
        setImg(imagem);
        setGrupo(grupoNome);
        setValor("");
        setQtd("");
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
    
    const handleSubmit = (id, qtd, valor) => {

        handleClickOpenL();

      
            if(qtd > 0 ){

                item = {
                    id: id,
                    qtd: qtd,
                    valor: valor
                }
    
                axios
                    .post(`http://` + back + `/vitrine`, {
                        email: email,
                        perfil: perfil,
                        itens: item
                    })
                    .then((res) => {                                                   
                        msg = "Vitrine atualizada com sucesso!";
                        handleClickOpenA(msg);                    
                        handleCloseL();
                        handleCloseE();
                        setInfosV([]);
                        handleLoadV();
                    })
                    .catch((error) => {
                        handleCloseL();
                        msg = "Não foi possível cadastrar esse item na vitrine, revise os dados e tente novamente.";
                        handleClickOpenA(msg);
                        handleLoadV();
                    })

            }else{
                if (valor !== ""){
                    item = {
                        id: id,
                        qtd: 0,
                        valor: valor
                    }
        
                    axios
                        .post(`http://` + back + `/vitrine`, {
                            email: email,
                            perfil: perfil,
                            itens: item
                        })
                        .then((res) => {                                                   
                            msg = "Vitrine atualizada com sucesso!";
                            handleClickOpenA(msg);                    
                            handleCloseL();
                            handleCloseE();
                            setInfosV([]);
                            handleLoadV();
                        })
                        .catch((error) => {
                            handleCloseL();
                            msg = "Não foi possível cadastrar esse item na vitrine, revise os dados e tente novamente.";
                            handleClickOpenA(msg);
                            handleLoadV();
                        })
                }else{                                
                    handleCloseL();
                    msg = "Informe as o valor e a quantidade para apresentar na vitrine.";
                    handleClickOpenA(msg);
                }     
            }

        handleCloseL();
        setInfosV([]);
        handleLoadV();           
    };
    const handleLoad = (id) =>{
        axios
          .get(`http://`+ back +`/produtos/`+ id)
          .then((res) => {              
            setInfos(ArrPro(res.data.response.produtos)); 
            setSemG("none");
            setComG("block");
          }).catch((res) =>{ 
            msg = "Não foi possível localizar produtos para esse grupo."; 
            setSemG("none");
            setComG("block");
          })  
    };
    const handleLoadG = () =>{
        axios
          .get(`http://`+ back +`/grupos`)
          .then((res) => {               
            setInfosG(ArrGru(res.data.response.grupos)); 
          }).catch((res) =>{ 
            msg = "Não foi possível localizar produtos.";  
          })  
    };
    const handleLoadV = () =>{
        axios
          .get(`http://`+ back +`/vitrine`)
          .then((res) => {               
            setInfosV(ArrVit(res.data.response.vitrine)); 
          }).catch((res) =>{ 
            msg = "Não foi possível localizar produtos da vitrine.";  
          })  
    };
    const handleFiltro = () => {
      setFiltro(infos.filter(info => info.nome.toUpperCase().indexOf(valorF.toUpperCase()) !== -1));
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
    const handleFiltroG = () => {
      setFiltroG(infosG.filter(info => info.nome.toUpperCase().indexOf(valorFG.toUpperCase()) !== -1));
      
      if(filtroG.length > 1){
        setSemFG("none");
        setComFG("block");
      }else{
        setSemFG("block");
        setComFG("none");
      }
    };
    const handleChangeFiltroG = (set) => (event) => {
      set(event.target.value)
      handleFiltroG();
    };
    useEffect(() => {
        handleLoadG();
        handleLoadV();
        if(infos.length > 0){
            handleLoad(grupoId);
        }
        // eslint-disable-next-line
      }, []);
    //#endregion

    return(
        <Grid display="block" style={{ paddingLeft:'24px', paddingRight:'24px', height:'80vh' }}>
            <Box display={semG}>
                <Box p={1} display="flex" align="right">                      
                    <Box style={{width:'50%', textAlign:'start', paddingTop:'20px'}}>                         
                        <Typography variant="h6">
                            Montar Vitrine
                        </Typography>
                    </Box>
                </Box> 
                <Grid item xs={12} style={{ paddingLeft:'28%' }}>              
                    <CardHeader subheader={
                        <Box p={1} display="flex">                                
                            <AiOutlineInfoCircle style={{ width:'40px', height:'auto', marginRight:'10px' }} /> 
                            <Typography variant="body2" color="textSecondary" style={{ textAlign:'left' }}>                
                                Clique sobre um dos grupos para visualizar os produtos relacionados a este. <br/>
                                CLIQUE AQUI PARA SABER MAIS SOBRE A MONTAGEM DA VITRINE.
                            </Typography>
                        </Box> }
                        style={{ cursor:'pointer' }}
                        onClick={()=>handleClickOpenA(<Box>
                            <Typography variant="subtitle1" style={{ fontWeight:'bold', textAlign:'center' }}>
                                Como utilizar o recurso de Montar Vitrine
                            </Typography><br/>
                            <Typography variant="subtitle1" style={{ textAlign:'left' }}>
                                Com grupos e produtos previamente cadastrados, serão listados os grupos nesta interface.<br/>
                                Clique sobre um dos grupos, localize um produto e clique sobre ele.<br/>
                                Será aberto um módulo para a inclusão da quantidade (baseando-se na métrica cadastrada para o produto em questão) e o valor.<br/>
                                Ao Salvar, será possível visualizar os produtos no botão flutuate "ITENS NA VITRINE".<br/>
                                Os itens na vitrine são todos os produtos com valor adicionado e quantidade maior que 1. <br/>
                                Para que um produto deixe de ser apresentado na vitrine (página pública do site), é necessário que a quantidade do mesmo seja 0.
                            </Typography>
                        </Box>)}
                    />
                </Grid> 
                <Box p={1} display="flex">           
                    <Box style={{ width:'50%', textAlign:'start', paddingTop:'15px' }}>  
                        <Typography variant="subtitle1" style={{ textAlign:'left' }} >
                            Lista de Grupos
                        </Typography>
                    </Box>
                    <Box p={1} style={{width:'50%', textAlign:'end'}}>      
                        <Box style={{textAlign:'end'}}>
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
                                placeholder="Busque por um grupo"
                                className="search"
                                variant="standard"
                                value={valorFG}
                                onChange={handleChangeFiltroG(setValorFG)}
                                style={{ width:'60%', borderRadius:'60px' }}
                            /> 
                        </Box>       
                    </Box>
                </Box> 
                <Box p={1} display={semFG} sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {infosG.map((grup, index) => (  
                            <Grid item xs={2} sm={4} md={4} key={grup.id}>                                                               
                                <Card onClick={()=>handleComG(grup.id, grup.nome)}
                                        sx={{ display: 'flex', maxHeight: 80, padding:'5px', cursor:'pointer' }}>
                                    <Box p={2}>
                                        <Avatar style={{ color:'#201E1E', backgroundColor:'#FFFFFF' }}>
                                            <Typography variant="subtitle1" style={{ fontWeight:'bold' }}>
                                                <img src={ImgProduto} style={{ width:'24px', height:'auto' }} />   
                                            </Typography>
                                        </Avatar>
                                    </Box>
                                    <CardContent wrap="nowrap" style={{ textAlign:'left' }}>
                                        <Typography variant="subtitle1" style={{ textTransform:'capitalize', fontWeight:'bold' }}>
                                            {grup.nome}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid> 
                        ))}
                    </Grid>                    
                </Box>
                <Box p={1} display={comFG} sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {filtroG.map((grup, index) => (  
                            <Grid item xs={2} sm={4} md={4} key={grup.id}>                                                               
                                <Card onClick={()=>handleComG(grup.id, grup.nome)} 
                                      sx={{ display: 'flex', maxHeight: 80, padding:'5px', cursor:'pointer' }}>
                                    <Box p={2}>
                                        <Avatar style={{ color:'#201E1E', backgroundColor:'#FFFFFF' }}>
                                            <Typography variant="subtitle1" style={{ fontWeight:'bold' }}>
                                                <img src={ImgProduto} style={{ width:'24px', height:'auto' }} />   
                                            </Typography>
                                        </Avatar>
                                    </Box>
                                    <CardContent wrap="nowrap" style={{ textAlign:'left' }}>
                                        <Typography variant="subtitle1" style={{ textTransform:'capitalize', fontWeight:'bold' }}>
                                            {grup.nome}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid> 
                        ))}  
                    </Grid>
                </Box>
            </Box>
            <Box display={comG}>
                <Box p={1} display="flex" align="right">                      
                    <Box style={{width:'50%', textAlign:'start', paddingTop:'20px'}}>         
                        <Box style={{textAlign:'start'}}>
                            <Button 
                                onClick={()=>handleCloseComG()} 
                                variante="outlined" 
                                className="btnVoltar"
                                startIcon={
                                    <Avatar style={{ color:'#201E1E', backgroundColor:'#21222D1E' }}>
                                        <MdArrowBack style={{ width:'24px', height:'auto' }} />   
                                    </Avatar>
                                    }
                                style={{ color:"#000000", position:"unset"}}>                                                        
                                <Typography variant="h6">
                                    {grupoNome}
                                </Typography>
                            </Button>
                        </Box> 
                    </Box> 
                </Box>  
                {infos.length !== 0 ?(
                    <Box> 
                        <Grid item xs={12} style={{ paddingLeft:'35%' }}>              
                            <CardHeader subheader={
                                <Box p={1} display="flex">                                
                                    <AiOutlineInfoCircle style={{ width:'20px', height:'auto', marginRight:'10px' }} /> 
                                    <Typography variant="body2" color="textSecondary">                
                                        Selecione os produtos desejados para adicioná-los à Vitrine.                                                      
                                    </Typography>
                                </Box> }
                            />
                        </Grid>
                        <Box p={1} display="flex">           
                            <Box p={1} display="flex" style={{ width:'50%', textAlign:'start', paddingTop:'15px' }}>
                                <img src={ImgProduto} style={{ width:'24px', height:'24px', marginRight:'16px' }} />     
                                <Typography variant="subtitle1" style={{ textAlign:'left' }} >      
                                    Lista de {grupoNome + " (" + infos.length + ")"  }
                                </Typography>
                            </Box>
                            <Box p={1} style={{width:'50%', textAlign:'end'}}>      
                                <Box style={{textAlign:'end'}}>
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
                                        placeholder="Busque por um produto"
                                        className="search"
                                        variant="standard"
                                        value={valorF}
                                        onChange={handleChangeFiltro(setValorF)}
                                        style={{ width:'60%', borderRadius:'60px' }}
                                    /> 
                                </Box>       
                            </Box>
                        </Box> 
                        <Box p={1} display={semF} sx={{ flexGrow: 1 }}>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                {infos.map((item, index) => (  
                                    <Grid item xs={2} sm={4} md={4} key={item.id}>                                                               
                                        <Card onClick={() => handleClickOpenE(item.id, item.nome, item.descricao, item.metrica, item.imagem)}
                                              sx={{ display: 'flex', maxHeight: 80, padding:'5px', cursor:'pointer' }}>
                                            <CardMedia
                                                component="img"
                                                sx={{ width: 100, height: 'auto', borderRadius:'5px' }}
                                                image={"http://" + back + item.imagem}
                                                alt={item.nome}
                                            />
                                            <CardContent wrap="nowrap" style={{ textAlign:'left', width:'100%' }}>     
                                                <Typography variant="subtitle1" style={{ textTransform:'capitalize', fontWeight:'bold' }}>
                                                    {item.nome}
                                                </Typography>
                                                <Typography variant="subtitle2" style={{ textTransform:'capitalize', color:'#B8B8B5' }}>
                                                    {item.descricao}
                                                </Typography>
                                            </CardContent>
                                            <Typography variant="subtitle2" style={{ textTransform:'capitalize', textAlign:'end', width:'100%' }}>
                                                Por {item.metrica}
                                            </Typography> 
                                        </Card>
                                    </Grid> 
                                ))}
                            </Grid>
                        </Box>
                        <Box p={1} display={comF} sx={{ flexGrow: 1 }}>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                {filtro.map((item, index) => (   
                                    <Grid item xs={2} sm={4} md={4} key={item.id}>                                                               
                                        <Card onClick={() => handleClickOpenE(item.id, item.nome, item.descricao, item.metrica, item.imagem)}
                                              sx={{ display: 'flex', maxHeight: 80, padding:'5px', cursor:'pointer' }}>
                                            <CardMedia
                                                component="img"
                                                sx={{ width: 100, height: 'auto', borderRadius:'5px' }}
                                                image={"http://" + back + item.imagem}
                                                alt={item.nome}
                                            />
                                            <CardContent wrap="nowrap" style={{ textAlign:'left', width:'100%' }}>     
                                                <Typography variant="subtitle1" style={{ textTransform:'capitalize', fontWeight:'bold' }}>
                                                    {item.nome}
                                                </Typography>
                                                <Typography variant="subtitle2" style={{ textTransform:'capitalize', color:'#B8B8B5' }}>
                                                    {item.descricao}
                                                </Typography>
                                            </CardContent>
                                            <Typography variant="subtitle2" style={{ textTransform:'capitalize', textAlign:'end', width:'100%' }}>
                                                Por {item.metrica}
                                            </Typography> 
                                        </Card>
                                    </Grid> 
                                ))}
                            </Grid>
                        </Box>
                    </Box>):(
                    <Grid item xs={12} style={{ paddingLeft:'35%' }}>              
                        <CardHeader subheader={
                            <Box p={1} display="flex">                                
                                <AiOutlineInfoCircle style={{ width:'20px', height:'auto', marginRight:'10px' }} /> 
                                <Typography variant="body2" color="textSecondary">                
                                    Não há produtos cadastrados para esse grupo.                                                      
                                </Typography>
                            </Box> }
                        />
                    </Grid>
                )}                
            </Box>  

            <Box p={1} style={{ width:'90%', minMarginTop:'10vh', maxMarginTop:'15vh', position:'absolute' }}>      
                <Box style={{ textAlign:'end' }}>
                    <Button  
                        onClick={toggleDrawer('right', true)}
                        variante="outlined" 
                        className="btnVoltar"
                        endIcon={
                            <Avatar style={{ backgroundColor:'#3A5E4E', padding:'10px' }}>
                                <img src={vitrineImg} style={{ width:'24px', height:'auto' }} /> 
                            </Avatar>
                            }
                        style={{ position:"unset" }}>
                        <Typography variant="subtitle1" style={{ color:'#3A5E4E', fontWeight:'bold' }}>
                            Itens na Vitrine
                        </Typography>
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
                            <Card onClick={()=>handleSubmit(item.id, 0, item.valor)}
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

            <DialogMain
                open={openE}
                close={handleCloseE}
                title={"ADICIONAR PRODUTO Á VITRINE"}
                info={(<Box >
                    <Grid item xs={12} style={{ paddingLeft:'5%', paddingBottom:'20px' }}>              
                        <CardHeader subheader={
                            <Box p={1} display="flex">                                
                                <AiOutlineInfoCircle style={{ width:'20px', height:'auto', marginRight:'10px' }} /> 
                                <Typography variant="body2" color="textSecondary">                
                                    Preencha todos os campos e clique em "ADICIONAR".<br/>
                                    Caso não queira executar nenhuma ação, clique em "CANCELAR".
                                </Typography>
                            </Box> }
                        />
                    </Grid>
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
                            <Typography variant="subtitle2" style={{ textTransform:'capitalize', color:'#B8B8B5' }}>
                                {nome}
                            </Typography>
                            <Box style={{ marginTop:'10px' }}>  
                                <Typography variant="subtitle1" style={{ textTransform:'capitalize', fontWeight:'bold' }}>
                                    Descrição
                                </Typography>
                                <Typography variant="subtitle2" style={{ textTransform:'capitalize', color:'#B8B8B5' }}>
                                    {descricao}
                                </Typography>                                
                            </Box>
                        </CardContent>
                        <CardContent style={{ textAlign:'left', width:'100%' }}>     
                            <Typography variant="subtitle1" style={{ textTransform:'capitalize', fontWeight:'bold' }}>
                                Grupo
                            </Typography>
                            <Typography variant="subtitle2" style={{ textTransform:'capitalize', color:'#B8B8B5' }}>
                                {grupo}
                            </Typography>
                            <Box style={{ marginTop:'10px' }}>     
                                <Typography variant="subtitle1" style={{ textTransform:'capitalize', fontWeight:'bold' }}>
                                    Métrica
                                </Typography>
                                <Typography variant="subtitle2" style={{ textTransform:'capitalize', color:'#B8B8B5' }}>
                                    {metrica}
                                </Typography>                             
                            </Box>
                        </CardContent>
                    </Box><br/>
                    <div className="noticias">
                        <div className="esquerda" style={{ paddingRight:'10px' }}>
                            <TextField 
                                className="inp"
                                type="number"
                                onChange={handleChange(setQtd)}
                                value={qtd}
                                label="Quantidade Disponível"
                                variant="outlined" />
                        </div>
                        <div className="direita">
                            <TextField 
                                className="inp"
                                type="number"
                                onChange={handleChange(setValor)}
                                value={valor}
                                label="Valor por métrica"
                                variant="outlined" />
                        </div>
                    </div>
                    </Box>)}
                click={()=>handleSubmit(id, qtd, valor)}
                label={"ADICIONAR"}
            />          
            <DialogAlert open={openA} close={handleCloseA} alert={alerta}/>            
            <DialogLoading open={openL} />  
               
        </Grid>
    );
}
export default MontarVitrine;