//#region Dependências
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Avatar, Button, Box, Card, CardContent, CardMedia, FormControl, Grid, IconButton, InputLabel, InputAdornment, 
         MenuItem, Select, Typography, TextField } from '@material-ui/core';
import { MdAdd, MdArrowBack } from "react-icons/md";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Search from '@material-ui/icons/Search';
import semimg from '../../../assets/img/noimg.png';
import ImgProduto from '../../../assets/img/Icons/shopping_basket_black_24dp.png';
import { DialogAlert, DialogLoading, DialogMain } from '../../../components/Dialog';
//#endregion
const MontarVitrine = () => { 
    //#region Variáveis e Variáveis de Estado
    const [infos, setInfos] = useState([]);
    const [infosG, setInfosG] = useState([]);
    const [filtro, setFiltro] = useState([]);
    const [valorF, setValorF] = useState("");
    const [comF, setComF] = useState("none"); 
    const [semF, setSemF] = useState("block");
    const [filtroG, setFiltroG] = useState([]);
    const [valorFG, setValorFG] = useState("");
    const [comFG, setComFG] = useState("none"); 
    const [semFG, setSemFG] = useState("block");
    const [comG, setComG] = useState("none"); 
    const [semG, setSemG] = useState("block");
    const [open, setOpen] = useState(false);
    const [openA, setOpenA] = useState(false);
    const [openE, setOpenE] = useState(false);
    const [openL, setOpenL] = useState(false);
    const [openG, setOpenG] = useState(false);
    const [openGE, setOpenGE] = useState(false);
    const [alerta, setAlerta] = useState("");
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [grupo, setGrupo] = useState("");
    const [metrica, setMetrica] = useState("");
    const [grupoId, setGrupoId] = useState("");
    const [grupoNome, setGrupoNome] = useState("");
    const [grupoNomeE, setGrupoNomeE] = useState("");
    const [imagem, setImagem] = useState([]);
    const [id, setId] = useState("");
    const [nomeE, setNomeE] = useState("");
    const [descricaoE, setDescricaoE] = useState("");
    const [metricaE, setMetricaE] = useState("");
    const [img, setImg] = useState(""); 
    const [perfil, setPerfil] = useState(localStorage.getItem("perfil")); 
    const [email, setEmail] = useState(localStorage.getItem("email")); 

    const ArrPro = (arr) =>
      arr.map((item) => ({ id: item.id, nome: item.nome, descricao: item.descricao,
                           grupo: item.grupo, metrica: item.metrica, imagem: item.imagem })); 
    const ArrGru = (arr) =>
        arr.map((item) => ({ id: item.id, nome: item.nome}));
    
    var produto = {
        nome: "",
        descricao: "",
        grupo: "",
        metrica: "",
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
    };
    const handleClickOpen = () => {
      setOpen(true);

      setNome("");
      setDescricao("");
      setMetrica("");
      setGrupo("");
      setImagem([]);
    };
    const handleClose = () => {
      setOpen(false);
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
    
    const handleChange = (set) => (event) => set(event.target.value);
    
    const handleSubmit = () => {

        handleClickOpenL();

        if (nome !== "" && descricao !== ""){
            if(imagem.length > 0){

                produto = {
                    nome: nome,
                    descricao: descricao,
                    grupo: grupo,
                    metrica: metrica,
                    email: email,
                    perfil: perfil,
                    imagem: imagem[0]
                  }
                
                const formData = new FormData();
                  formData.append('perfil',perfil);
                  formData.append('email',email);
                  formData.append('nome',produto.nome);
                  formData.append('descricao',produto.descricao);
                  formData.append('grupo',produto.grupo);
                  formData.append('metrica',produto.metrica);
                  formData.append('file',produto.imagem);

                axios
                    .post(`http://` + back + `/produtos`, formData)
                    .then((res) => {
                        
                        handleCloseL();

                        if(res.data.retorno){                                                     
                            msg = res.data.msg
                            handleClickOpenA(msg);
                        }else{                                                     
                            msg = res.data.msg
                            handleClickOpenA(msg);
                        }

                        handleClose();

                    })
                    .catch((error) => {
                        handleCloseL();
                        msg = "Não foi possível cadastrar esse produto, revise os dados e tente novamente.";
                        handleClickOpenA(msg);
                    })
            }else{
                produto = {
                    nome: nome,
                    descricao: descricao,
                    grupo: grupo,
                    metrica: metrica,
                    imagem: semimg
                  }
                
                  const formData = new FormData();
                    formData.append('perfil',perfil);
                    formData.append('email',email);
                    formData.append('nome',produto.nome);
                    formData.append('descricao',produto.descricao);
                    formData.append('grupo',produto.grupo);
                    formData.append('metrica',produto.metrica);
                    formData.append('file',produto.imagem);
  
                  axios
                      .post(`http://` + back + `/produtos`, formData)
                      .then((res) => {
                        
                        handleCloseL();

                        if(res.data.retorno){                                                     
                            msg = res.data.msg
                            handleClickOpenA(msg);
                        }else{                                                     
                            msg = res.data.msg
                            handleClickOpenA(msg);
                        }
                        
                        handleClose();

                      })
                      .catch((error) => {
                          handleCloseL();
                          msg = "Não foi possível cadastrar esse produto, revise os dados e tente novamente.";
                          handleClickOpenA(msg);
                      })
            }
        } else {
            handleCloseL();

            msg = "Informe os dados solicitados.";
            handleClickOpenA(msg);
        }
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
        if(infos.length > 0){
            handleLoad();
        }
        // eslint-disable-next-line
      }, []);
    //#endregion

    return(
        <Grid display="block" style={{ paddingLeft:'24px', paddingRight:'24px' }}>
            <Box display={semG}>
                <Box p={1} display="flex" align="right">                      
                    <Box style={{width:'50%', textAlign:'start', paddingTop:'20px'}}>                         
                        <Typography variant="h6">
                            Montar Vitrine
                        </Typography>
                    </Box>
                </Box>  
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
                {infos.length !== null ?(
                    <Box>
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
                                        <Card sx={{ display: 'flex', maxHeight: 80, padding:'5px', cursor:'pointer' }}>
                                            <CardMedia
                                                component="img"
                                                sx={{ width: 100, height: 'auto' }}
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
                                        <Card sx={{ display: 'flex', maxHeight: 80, padding:'5px', cursor:'pointer' }}>
                                            <Box p={2}>
                                                <Avatar style={{ color:'#201E1E', backgroundColor:'#FFFFFF' }}>
                                                    <Typography variant="subtitle1" style={{ fontWeight:'bold' }}>
                                                        <img src={ImgProduto} style={{ width:'24px', height:'auto' }} />   
                                                    </Typography>
                                                </Avatar>
                                            </Box>
                                            <CardContent wrap="nowrap" style={{ textAlign:'left' }}>
                                                <Typography variant="subtitle1" style={{ textTransform:'capitalize', fontWeight:'bold' }}>
                                                    {item.nome}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid> 
                                ))}
                            </Grid>
                        </Box>
                    </Box>):(
                    <Box color="#000000" style={{ textTransform:'capitalize', fontWeight:'bold', textAlign:'center' }}>
                        <Typography variant="subtitle1" >
                            Não há produtos cadastrados neste grupo
                        </Typography>
                    </Box>
                )}                
            </Box>           
            <DialogAlert open={openA} close={handleCloseA} alert={alerta}/>            
            <DialogLoading open={openL} />    
        </Grid>
    );
}
export default MontarVitrine;