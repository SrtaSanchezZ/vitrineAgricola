//#region Dependências
import React, { useState } from "react";
import { Box, Button, Grid, Typography, TextField } from '@material-ui/core';
import {Header} from '../../../components/Header';
import Footer from '../../../components/Footer';
import { DialogAlert } from '../../../components/Dialog';
import banner from '../../../assets/img/bannerPlaca.jpg';
import location from '../../../assets/img/Icons/location.png';
import call from '../../../assets/img/Icons/call.png';
import whats from '../../../assets/img/Icons/whats.png';
//#endregion

const Contact = () => {
    const [nome, setNome] = useState(""); 
    const [assunto, setAssunto] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [openA, setOpenA] = useState(false);
    const [alerta, setAlerta] = useState("");
    
    const handleClickOpenA = (alerta) => {
        setOpenA(true);
        setAlerta(alerta);
      };
    const handleCloseA = () => {
        setOpenA(false);
        setAlerta("");
    };

    const handleChange = (set) => (event) => set(event.target.value); 

    const handleSubmit = () => {
        if(nome.length > 2 && nome.length < 75 && assunto.length > 5 && assunto.length < 15 && mensagem.length > 6 && mensagem.length < 500){
            window.open('mailto:etecppagricola@gmail.com?subject=' + assunto + '&&body=Olá, meu nome é ' + nome + ', ' + mensagem);
        }else{
            handleClickOpenA('Informe os dados solicitados corretamente.');
        }
    }
    return(
        <Box>
            <Header/>                       
            <Box sx={{ flexGrow: 1 }}  className="content">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h5>Contato</h5>
                    </Grid>
                    <Grid item xs={12} style={{ textAlign:'center' }}>
                        <img src={banner} alt="Banner Contato" style={{ width:"90%", height: "250px" }} />    
                    </Grid>
                    <Grid item xs={6} style={{ padding:'40px', marginBottom:'50px' }}>
                        <Typography variant="subtitle1" style={{ textTransform:'capitalize', fontWeight:'bold', marginBottom:'20px' }}>
                            Mande uma mensagem para nós!
                        </Typography>
                        <Box display="flex">
                            <Box style={{ width:'50%', marginRight:'20px' }}>                    
                                <TextField 
                                    className="inp"
                                    type="text" 
                                    onChange={handleChange(setNome)}
                                    value={nome}
                                    maxLength="75"
                                    minLength="3"
                                    label="Informe seu nome"
                                    variant="outlined"
                                    style={{ marginBottom:'10px' }}
                                />
                            </Box>
                            <Box style={{ width:'50%' }}>
                                <TextField 
                                    className="inp"
                                    type="text" 
                                    onChange={handleChange(setAssunto)}
                                    value={assunto}
                                    maxLength="15"
                                    minLength="5"
                                    label="Assunto do contato"
                                    variant="outlined"
                                />                                
                            </Box>
                        </Box> <br/>                         
                        <TextField 
                                className="inp"
                                type="text" 
                                onChange={handleChange(setMensagem)}
                                value={mensagem}
                                maxLength="500"
                                minLength="6"
                                label="Texto (min 6 - max 500)"
                                multiline
                                variant="outlined" 
                            />
                        <Box style={{ width: "100%", textAlign:'center', paddingTop:'30px' }}>
                            <Button onClick={() => handleSubmit()}
                                variante="contained" 
                                style={{ backgroundColor:"#2E8E61", color:"#FFFFFF" }}>
                                    ENVIAR MENSAGEM
                            </Button>
                        </Box><br/>    
                    </Grid>
                    <Grid item xs={6} style={{ padding:'40px' }}>
                        <Box style={{ borderRadius:'5px', border:'solid 2px #3A5E4E', padding:'10px' }}>
                            <Typography variant="subtitle1" style={{ color:'#000000', textTransform:'capitalize', fontWeight:'bold', textAlign:'center' }}>
                                Informações de Contato
                            </Typography>
                            <Box display="flex" style={{ paddingTop:'20px' }}>
                                <Box style={{ width:'50px', textAlign:'center', paddingTop:'10px' }}>
                                    <img src={location} alt="location" style={{ width:"24px", height: "24px" }} />  
                                </Box>
                                <Box>
                                    <Typography variant="subtitle1" style={{ color:'#000000', fontWeight:'bold' }}>
                                        Escola Técnica Estadual Prof. Dr. Antônio Eufrásio de Toledo
                                    </Typography>
                                    <Typography variant="subtitle1" style={{ color:'#000000' }}>
                                        Rodovia Raposo Tavares Km 561, Pontilhão - Pres. Prudente/SP
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display="flex" style={{ paddingTop:'10px' }}>
                                <Box style={{ width:'50px', textAlign:'center' }}>
                                    <img src={call} alt="call" style={{ width:"24px", height: "24px" }} />  
                                </Box>
                                <Box>
                                    <Typography variant="subtitle1" style={{ color:'#000000' }}>
                                        (18) 3223-2067
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display="flex" style={{ paddingTop:'10px' }}>
                                <Box style={{ width:'50px', textAlign:'center' }}>
                                    <img src={call} alt="call" style={{ width:"24px", height: "24px" }} />  
                                </Box>
                                <Box>
                                    <Typography variant="subtitle1" style={{ color:'#000000' }}>
                                        (18) 3222-8466
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display="flex" style={{ paddingTop:'10px' }}>
                                <Box style={{ width:'50px', textAlign:'center' }}>
                                    <img src={whats} alt="whats" style={{ width:"24px", height: "24px" }} />  
                                </Box>
                                <Box>
                                    <Typography variant="subtitle1" style={{ color:'#000000' }}>
                                        (18) 98196-1025
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>                    
                </Grid>
            </Box>
            <Footer/>
            <DialogAlert open={openA} close={handleCloseA} alert={alerta}/> 
        </Box>
    );
}

export default Contact;