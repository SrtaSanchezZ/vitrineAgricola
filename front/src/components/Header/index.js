import React from 'react';
import { CgLogIn } from "react-icons/cg";
import { Box, Typography, Grid } from '@material-ui/core';
import logo from '../../assets/img/logo-ETEC-neg.png';
export const Header = () => {
    return(
        <Box display="flex" bgcolor="#3A5E4E" color="#ffffff"  >                
            <Box p={1} style={{ width:'20%' }} >
                <Typography style={{ textAlign:'start', paddingLeft:'10%' }}>
                    <img src={logo} style={{ width:'88px', height:'auto', marginTop:'-15px', marginBottom:'-15px' }} />
                </Typography>
            </Box>                   
            <Box p={1} display="flex" style={{ width:'60%', textAlign:'center' }} >
                <Box p={1}  style={{width:'14%', textAlign:'center'}} style={{width:'14%', textAlign:'center'}}>
                    <Typography variant="subtitle2" style={{ textAlign:'center', textTransform:"capitalize", marginTop:'10px' }}> 
                        <a style={{ textDecoration:"none", color:"#FFFFFF" }} href="/" rel="home" alt="home">
                            <span className="hMenuText">HOME</span>
                        </a>
                    </Typography>
                </Box>
                <Box p={1}  style={{width:'14%', textAlign:'center'}}>
                    <Typography variant="subtitle2" style={{ textAlign:'center', textTransform:"capitalize", marginTop:'10px' }}> 
                        <a style={{ textDecoration:"none", color:"#FFFFFF" }} href="/quemsomos" rel="quemsomos" alt="quem somos">
                            <span className="hMenuText">QUEM SOMOS</span>
                        </a>
                    </Typography>
                </Box>
                <Box p={1}  style={{width:'14%', textAlign:'center'}}>
                    <Typography variant="subtitle2" style={{ textAlign:'center', textTransform:"capitalize", marginTop:'10px' }}> 
                        <a style={{ textDecoration:"none", color:"#FFFFFF" }} href="/cursos" rel="cursos" alt="cursos">
                            <span className="hMenuText">CURSOS</span>
                        </a>
                    </Typography>
                </Box>
                <Box p={1}  style={{width:'14%', textAlign:'center'}}>
                    <Typography variant="subtitle2" style={{ textAlign:'center', textTransform:"capitalize", marginTop:'10px' }}> 
                        <a style={{ textDecoration:"none", color:"#FFFFFF" }} href="/gestao" rel="gestao" alt="gestao">
                            <span className="hMenuText">GESTÃO</span>
                        </a>
                    </Typography>
                </Box>
                <Box p={1}  style={{width:'14%', textAlign:'center'}}>
                    <Typography variant="subtitle2" style={{ textAlign:'center', textTransform:"capitalize", marginTop:'10px' }}>
                        <a style={{ textDecoration:"none", color:"#FFFFFF" }} href="/noticias" rel="noticias" alt="noticias">
                            <span className="hMenuText">NOTÍCIAS</span>
                        </a>
                    </Typography>
                </Box>
                <Box p={1}  style={{width:'14%', textAlign:'center'}}>
                    <Typography variant="subtitle2" style={{ textAlign:'center', textTransform:"capitalize", marginTop:'10px' }}>
                        <a style={{ textDecoration:"none", color:"#FFFFFF" }} href="/contato" rel="contato" alt="contato">
                            <span className="hMenuText">CONTATO</span>
                        </a>
                    </Typography>
                </Box>
                <Box p={1}  style={{width:'14%', textAlign:'center'}}>
                    <Typography variant="subtitle2" style={{ textAlign:'center', textTransform:"capitalize", marginTop:'10px' }}> 
                        <a style={{ textDecoration:"none", color:"#FFFFFF" }} href="/vitrineagricola" rel="vitrineagricola" alt="vitrine agricola">
                            <span className="hMenuText">VITRINE</span>
                        </a>
                    </Typography>
                </Box>
            </Box>               
            <Box display="flex" justifyContent="flex-end" p={1} style={{ width:'20%', textAlign:'end', cursor:"pointer" }} >
                <CgLogIn style={{width:"20px", height:"auto", marginRight:"10px", marginTop:"5px"}} />  
                <a style={{ textDecoration:"none", color:"#FFFFFF" }} href="/acesso" rel="Login" alt="Login">                    
                    <Typography variant="subtitle2" style={{ textAlign:'center', textTransform:"capitalize", marginTop:"22px", marginRight:'24px'}}>
                        LOGIN
                    </Typography>
                </a>
            </Box>  
        </Box>
    );
}
export function HeaderAdm(props){
    return(
        <Box display="flex" bgcolor="#3A5E4E" color="#ffffff">
            <Grid container>
                <Grid item xs={1}>
                    <Typography style={{ textAlign:'center' }}>
                        <img src={logo} style={{ width:'88px', height:'auto', marginTop:'-10px', marginBottom:'-10px' }} />
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="h6" style={{ textAlign:'left', marginLeft:'10px', marginTop:'20px' }}>
                        Painel Administrativo
                    </Typography>
                </Grid>
                <Grid item xs={2} onClick={props.diag} style={{ cursor:'pointer', paddingLeft:'5%'}}>
                    <Box display="flex" p={1} style={{ marginTop:'15px', textAlign:'end' }}>
                        <img src={props.img} style={{ width:'40px', height:'40px', marginTop:'-7px'}} /> 
                        <Typography variant="subtitle2" style={{ textAlign:'end', textTransform:"capitalize", marginLeft:'20px' }}>
                            Perfil {props.perfil}
                        </Typography>                        
                    </Box>
                </Grid>
            </Grid>
        </Box>
   );
}