//#region Dependências
import React from "react";
import { Box, Typography } from '@material-ui/core';
import {Header} from '../../../components/Header';
import Footer from '../../../components/Footer';
import banner from '../../../assets/img/Banner.png';
import mapa from '../../../assets/img/mapa.jpg';
//#endregion
const Home = () => {
    return(
        <Box>
            <Header/>
            <Box sx={{ flexGrow: 1 }}  className="content">
                <a href="https://www.vestibulinhoetec.com.br/home/" rel="noreferrer" target="_blank" alt="Vestibulinho" style={{ cursor:'pointer' }}>
                    <img src={banner} alt="Banner" style={{ width:"100%", height: "auto" }} />     
                </a>                        
                <Box display="flex">
                    <Box style={{ width:'50%', padding:'10px', textAlign:'center' }}>
                        <img src={mapa} alt="mapa" style={{ width:"85%", height: "auto", borderRadius:'5px', marginBottom:'50px' }} />
                    </Box>
                    <Box style={{ width:'50%'}}>                             
                        <Typography variant="subtitle1" style={{ textTransform:'capitalize', fontWeight:'bold', padding:'30px' }}>
                            Conheça os espaços do Colégio
                        </Typography>
                        <Box display="flex">
                            <Box style={{ width:'50%'}}>                          
                                <Typography variant="subtitle1" style={{ textTransform:'capitalize'}}>
                                    01. Quadra Poliesportiva
                                </Typography>                          
                                <Typography variant="subtitle1" style={{ textTransform:'capitalize'}}>
                                    02. Viveiro Florestal
                                </Typography>                          
                                <Typography variant="subtitle1" style={{ textTransform:'capitalize'}}>
                                    03. Alojamentos Estudantis
                                </Typography>                          
                                <Typography variant="subtitle1" style={{ textTransform:'capitalize'}}>
                                    04. Laboratório de Química
                                </Typography>                          
                                <Typography variant="subtitle1" style={{ textTransform:'capitalize'}}>
                                    05. Sala dos Professores
                                </Typography>                          
                                <Typography variant="subtitle1" style={{ textTransform:'capitalize'}}>
                                    06. Salas de Aula
                                </Typography>
                            </Box>
                            <Box style={{ width:'50%'}}>                        
                                <Typography variant="subtitle1" style={{ textTransform:'capitalize'}}>
                                    07. Administração Central
                                </Typography>                          
                                <Typography variant="subtitle1" style={{ textTransform:'capitalize'}}>
                                    08. Agroindústria do Leite
                                </Typography>                           
                                <Typography variant="subtitle1" style={{ textTransform:'capitalize'}}>
                                    09. Portaria
                                </Typography>                          
                                <Typography variant="subtitle1" style={{ textTransform:'capitalize'}}>
                                    10. Estação Metereológica da UNESP
                                </Typography>                          
                                <Typography variant="subtitle1" style={{ textTransform:'capitalize'}}>
                                    11. Oficina
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>         
            </Box>
            <Footer/>
        </Box>
    );
}

export default Home;