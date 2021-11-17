//#region Dependências
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Avatar, Box, Button, Card, CardHeader, CardContent, InputAdornment, FormControl, 
         Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { DialogAlert, DialogMain } from '../../../components/Dialog';
//#endregion
const GerenciarUsuarios = () => {  
    //#region Variáveis e Variáveis de Estado
    const [infos, setInfos] = useState([]);
    const [filtro, setFiltro] = useState([]);
    const [valorF, setValorF] = useState("");
    const [comF, setComF] = useState("none"); 
    const [semF, setSemF] = useState("block");
    const [open, setOpen] = useState(false);
    const [openA, setOpenA] = useState(false);
    const [openE, setOpenE] = useState(false);
    const [alerta, setAlerta] = useState("");
    const [nome, setNome] = useState("");
    const [emailU, setEmailU] = useState("");
    const [perfilU, setPerfilU] = useState("");
    const [senha, setSenha] = useState("");
    const [id, setId] = useState("");
    const [nomeE, setNomeE] = useState("");
    const [emailE, setEmailE] = useState("");
    const [senhaE, setSenhaE] = useState("");
    const [perfil, setPerfil] = useState(localStorage.getItem("perfil")); 
    const [email, setEmail] = useState(localStorage.getItem("email")); 

    const ArrNot = (arr) =>
      arr.map((item) => ({ id: item.id, nome: item.nome, email: item.email,
                           senha: item.senha, perfil: item.perfil }));
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
    };
    const handleClose = () => {
      setOpen(false);
      setNome('');
      setEmailU('');
      setSenha('');
      setPerfilU('');

    };
    const handleClickOpenE = (id, nome, email, perfil, senha) => {
      setOpenE(true);
      setId(id);
      setNomeE(nome);
      setEmailE(email);
      setSenhaE(senha);
      setPerfilU(perfil);
    };
    const handleCloseE = () => {
      setOpenE(false);
    };
    
    const handleChange = (set) => (event) => set(event.target.value);

    const handleSubmit = () => {

        if (nome !== "" && emailU !== "" && senha !== "" && perfilU !== ""){
                axios
                    .post(`http://` + back + `/usuarios`, {
                        nome: nome,
                        email: emailU,
                        senha: senha,
                        perfil: perfilU
                    })
                    .then((res) => {

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
                        msg = "Não foi possível cadastrar esse usuario, revise os dados e tente novamente.";
                        handleClickOpenA(msg);
                    })
        } else {

            msg = "Informe os dados solicitados.";
            handleClickOpenA(msg);
        }
    };
    const handleLoad = () =>{
        axios
          .get(`http://`+ back +`/usuarios`)
          .then((res) => {   
            setInfos(ArrNot(res.data.response.usuarios)); 
          }).catch((res) =>{    
            msg = "Não foi possível localizar usuarios.";  
          })  
    };
    const handleAlter = () =>{       

        if (nomeE !== "" && emailE !== "" && senhaE !== "" && perfilU !== ""){
            axios
                .put(`http://`+ back +`/usuarios/`+id, {
                    nome: nomeE,
                    email: emailE,
                    senha: senhaE,
                    perfil: perfilU
                })
                .then((res) => { 
                    if(res.data.retorno){                                                     
                        msg = res.data.msg
                        handleClickOpenA(msg);
                    }else{                                                     
                        msg = res.data.msg
                        handleClickOpenA(msg);
                    }
                    
                    handleCloseE();
                })
                .catch((res) =>{    
                    msg = "Não foi possível atualizar esse usuário.";
                    handleClickOpenA(msg);   
                }) 

        }else{
            msg = "Todos os dados devem ser preenchidos";
            handleClickOpenA(msg);   
        }

    };
    const handleDelete = () =>{       
        axios
            .delete(`http://`+ back +`/usuarios/`+id,{
                headers:{
                    nome: nomeE,
                    senha: "010203",
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
                handleCloseE();
            })
            .catch((res) =>{    
                msg = "Não foi possível apagar esse usuario.";
                handleClickOpenA(msg);   
            }) 
    };
    const handleFiltro = () => {
      setFiltro(infos.filter(item => item.nome.toUpperCase().indexOf(valorF.toUpperCase()) !== -1));

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
            <Box p={1} display="flex">           
                <Box style={{ width:'50%', textAlign:'start', paddingTop:'20px' }}>                         
                    <Typography variant="h6">
                        Gerenciar Usuários
                    </Typography>
                </Box>
                <Box style={{width:'50%', textAlign:'end'}}>      
                    <Box p={1} style={{textAlign:'end'}}>
                        <Button onClick={()=>handleClickOpen()} 
                                variante="outlined" 
                                className="btnNovo" 
                                startIcon={<MdAdd/>}
                                style={{ color:"#2E8E61", position:"unset", border:'2px solid #2E8E61' }}>
                            NOVO USUÁRIO
                        </Button>
                    </Box>       
                </Box>
            </Box>
            <Grid item xs={12} style={{ paddingLeft:'28%' }}>              
                <CardHeader subheader={
                    <Box p={1} display="flex">                                
                        <AiOutlineInfoCircle style={{ width:'40px', height:'auto', marginRight:'10px' }} /> 
                        <Typography variant="body2" color="textSecondary">                
                            Clique no botão "NOVO USUÁRIO" para cadastrar ou sobre um dos usuários abaixo para editar.<br/>
                            CLIQUE AQUI PARA SABER MAIS SOBRE OS NÍVEIS DE ACESSO DE CADA PERFIL DE USUÁRIO.
                        </Typography>
                    </Box> }
                    style={{ cursor:'pointer' }}
                    onClick={()=>handleClickOpenA(<Box>
                        <Typography variant="subtitle1" style={{ fontWeight:'bold', textAlign:'center' }}>
                            Sobre os Níveis de usuário
                        </Typography><br/>
                        <Typography variant="subtitle1" style={{ textAlign:'justify' }}>
                            <b>Redator: </b> Esse perfil pode gerenciar as notícias que ficarão visiveis na área pública do site, sendo possível cadastrar novas, editar, excluir ou destacar as existentes.
                        </Typography>
                        <Typography variant="subtitle1" style={{ textAlign:'justify' }}>
                            <b>Vendedor: </b>Esse perfil pode gerenciar as grupos e seus produtos, sendo possível cadastrar novos, editar e excluir os existentes. Também gerenciar os itens que serão apresentados na vitrine (área pública do site), alterando suas quantidades e valores, por fim, também gerencia as reservas/ pedidos, podendo atualizar as situações de reserva.
                        </Typography>
                        <Typography variant="subtitle1" style={{ textAlign:'justify' }}>
                            <b>Master: </b> Também conhecido como "Administrador" ou "Gerenciador", esse perfil pode executar todas as funções dos anteriores e também gerenciar os usuários que terão acesso a essa área privada do site, cadastrando novos, editando ou excluindo os existentes.
                        </Typography>
                    </Box>)}
                />
            </Grid>
            <Box p={1} display="flex">           
                <Box style={{ width:'50%', textAlign:'start', paddingTop:'20px' }}>  
                    <Typography variant="subtitle1" style={{ textAlign:'left' }} >
                        Lista de Usuários
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
                            placeholder="Busque pelas letras iniciais do nome de um usuário"
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
                            <Card onClick={() => handleClickOpenE(item.id, item.nome, item.email, item.perfil, item.senha)} 
                                    sx={{ display: 'flex', maxHeight: 80, padding:'5px', cursor:'pointer' }}>
                                <Box p={2}>
                                    <Avatar style={{ color:'#201E1E', backgroundColor:'#DBDADA' }}>
                                        <Typography variant="subtitle1" style={{ fontWeight:'bold' }}>
                                            {item.nome.substring(0,2).toUpperCase()}
                                        </Typography>
                                    </Avatar>
                                </Box>
                                <CardContent wrap="nowrap" style={{ textAlign:'left' }}>
                                    <Typography variant="subtitle1" style={{ textTransform:'capitalize', fontWeight:'bold' }}>
                                        {item.nome}
                                    </Typography>
                                    {item.perfil === 1?(
                                    <Typography variant="subtitle2" style={{ textTransform:'capitalize', color:'#B8B8B5' }}>
                                        Master
                                    </Typography>):null}
                                    {item.perfil === 2?(
                                    <Typography variant="subtitle2" style={{ textTransform:'capitalize', color:'#B8B8B5' }}>
                                        Redator
                                    </Typography>):null}
                                    {item.perfil === 3?(
                                    <Typography variant="subtitle2" style={{ textTransform:'capitalize', color:'#B8B8B5' }}>
                                        Vendedor
                                    </Typography>):null}
                                </CardContent>
                            </Card>
                        </Grid> 
                    ))}
                </Grid>
            </Box>
            <Box p={1} display={comF} sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {filtro.map((item, index) => (  
                        <Grid item xs={2} sm={4} md={4} key={item.id}>                                                               
                            <Card onClick={() => handleClickOpenE(item.id, item.nome, item.email, item.perfil, item.senha)} 
                                    sx={{ display: 'flex', maxHeight: 80, padding:'5px', cursor:'pointer' }}>
                                <Box p={2}>
                                    <Avatar style={{ color:'#201E1E', backgroundColor:'#DBDADA' }}>
                                        <Typography variant="subtitle1" style={{ fontWeight:'bold' }}>
                                            {item.nome.substring(0,2).toUpperCase()}
                                        </Typography>
                                    </Avatar>
                                </Box>
                                <CardContent wrap="nowrap" style={{ textAlign:'left' }}>
                                    <Typography variant="subtitle1" style={{ textTransform:'capitalize', fontWeight:'bold' }}>
                                        {item.nome}
                                    </Typography>
                                    {item.perfil === 1?(
                                    <Typography variant="subtitle2" style={{ textTransform:'capitalize', color:'#B8B8B5' }}>
                                        Master
                                    </Typography>):null}
                                    {item.perfil === 2?(
                                    <Typography variant="subtitle2" style={{ textTransform:'capitalize', color:'#B8B8B5' }}>
                                        Redator
                                    </Typography>):null}
                                    {item.perfil === 3?(
                                    <Typography variant="subtitle2" style={{ textTransform:'capitalize', color:'#B8B8B5' }}>
                                        Vendedor
                                    </Typography>):null}
                                </CardContent>
                            </Card>
                        </Grid> 
                    ))}
                </Grid>
            </Box>
            
            <DialogAlert open={openA} close={handleCloseA} alert={alerta}/>            
            <DialogMain
                open={open}
                close={handleClose}
                title={"NOVO USUÁRIO"}
                info={(
                    <Box>
                        <Grid item xs={12} style={{ paddingLeft:'5%', paddingBottom:'20px' }}>              
                            <CardHeader subheader={
                                <Box p={1} display="flex">                                
                                    <AiOutlineInfoCircle style={{ width:'20px', height:'auto', marginRight:'10px' }} /> 
                                    <Typography variant="body2" color="textSecondary">                
                                        Preencha todos os campos e clique em "SALVAR".<br/>
                                        Caso não queira executar nenhuma ação, clique em "CANCELAR".
                                    </Typography>
                                </Box> }
                            />
                        </Grid>
                        <Box display="flex" 
                            style={{ paddingBottom:'15px', paddingRight:'10px' }}>
                            <TextField 
                                className="inp"
                                type="nome" 
                                onChange={handleChange(setNome)}
                                value={nome}
                                maxLength="75"
                                minLength="6"
                                label="Nome (de 6 a 70 caracteres)"
                                variant="outlined"
                                style={{ minWidth: '270px', marginRight:'10px' }}
                            />
                            <TextField 
                                className="inp"
                                type="email" 
                                onChange={handleChange(setEmailU)}
                                value={emailU}
                                maxLength="75"
                                minLength="6"
                                label="E-mail (de 6 a 70 caracteres)"
                                variant="outlined"
                                style={{ minWidth: '270px' }}
                            />
                        </Box>
                        <Box display="flex" style={{ paddingBottom:'7.5px', paddingTop:'15px' }}>                                                                   
                            <FormControl sx={{ minWidth: 270 }}>
                                <InputLabel>Selecione o Nível de Acesso</InputLabel>
                                <Select
                                    value={perfilU}
                                    label="Nível de Acesso"
                                    onChange={handleChange(setPerfilU)}
                                    >
                                    <MenuItem value="">
                                        <em></em>
                                    </MenuItem> 
                                    <MenuItem style={{ color:"#000000", textAlign:'center'}} value="master">Master</MenuItem>
                                    <MenuItem style={{ color:"#000000", textAlign:'center'}} value="vendedor">Vendedor</MenuItem>
                                    <MenuItem style={{ color:"#000000", textAlign:'center'}} value="redator">Redator</MenuItem> 
                                </Select>
                            </FormControl>
                            <TextField 
                                className="inp"
                                type="password" 
                                onChange={handleChange(setSenha)}
                                value={senha}
                                maxLength="10"
                                minLength="5"
                                label="Senha (de 5 a 10 caracteres)"
                                variant="outlined"
                                style={{ marginLeft:'10px' }}
                            />
                        </Box>
                    </Box>)}
                click={()=>handleSubmit()}
                label={"SALVAR"}
            />            
            <DialogMain
                open={openE}
                close={handleCloseE}
                title={"EDITAR USUÁRIO"}
                info={(
                    <Box>
                        <Grid item xs={12} style={{ paddingLeft:'5%', paddingBottom:'20px' }}>              
                            <CardHeader subheader={
                                <Box p={1} display="flex">                                
                                    <AiOutlineInfoCircle style={{ width:'20px', height:'auto', marginRight:'10px' }} /> 
                                    <Typography variant="body2" color="textSecondary">                
                                        Preencha todos os campos e clique em "SALVAR".<br/>
                                        Caso queira excluir este usuário, clique em "EXCLUIR".<br/>
                                        Caso não queira executar nenhuma ação, clique em "CANCELAR".
                                    </Typography>
                                </Box> }
                            />
                        </Grid>
                        <Box display="flex"
                            style={{ paddingBottom:'15px', paddingRight:'10px' }}>
                            <TextField 
                                className="inp"
                                type="nome" 
                                onChange={handleChange(setNomeE)}
                                value={nomeE}
                                maxLength="75"
                                minLength="6"
                                label="Nome (de 6 a 70 caracteres)"
                                variant="outlined"
                                style={{ minWidth: '270px', marginRight:'10px' }}
                            />
                            <TextField 
                                className="inp"
                                type="email" 
                                onChange={handleChange(setEmailE)}
                                value={emailE}
                                maxLength="75"
                                minLength="6"
                                label="E-mail (de 6 a 70 caracteres)"
                                variant="outlined"
                                style={{ minWidth: '270px' }}
                            />
                        </Box>
                        <Box display="flex" style={{ paddingBottom:'7.5px', paddingTop:'15px' }}>                                                                   
                            <FormControl sx={{ minWidth: 270 }}>
                                <InputLabel>Selecione o Nível de Acesso</InputLabel>
                                <Select
                                    value={perfilU}
                                    label="Selecione o Nível de Acesso"
                                    onChange={handleChange(setPerfilU)}
                                    >
                                    {perfilU === 1?(
                                    <MenuItem value={perfilU} style={{ color:"#000000", textAlign:'center'}}>
                                       Atual: Master
                                    </MenuItem>):null}
                                    {perfilU === 2?(
                                    <MenuItem value={perfilU} style={{ color:"#000000", textAlign:'center'}}>
                                       Atual: Redator
                                    </MenuItem>):null}
                                    {perfilU === 3?(
                                    <MenuItem value={perfilU} style={{ color:"#000000", textAlign:'center'}}>
                                       Atual: Vendedor
                                    </MenuItem>):null}
                                    <MenuItem style={{ color:"#000000", textAlign:'center'}} value="master">Master</MenuItem>
                                    <MenuItem style={{ color:"#000000", textAlign:'center'}} value="vendedor">Vendedor</MenuItem>
                                    <MenuItem style={{ color:"#000000", textAlign:'center'}} value="redator">Redator</MenuItem> 
                                </Select>
                            </FormControl>
                            <TextField 
                                className="inp"
                                type="password" 
                                onChange={handleChange(setSenhaE)}
                                value={senhaE}
                                maxLength="10"
                                minLength="5"
                                label="Senha (de 5 a 10 caracteres)"
                                variant="outlined"
                                style={{ marginLeft:'10px' }}
                            />
                        </Box>
                    </Box>)}
                click={()=>handleAlter()}
                delete={()=>handleDelete()}
                label={"SALVAR"}
            /> 
        </Grid>
    );
}
export default GerenciarUsuarios;