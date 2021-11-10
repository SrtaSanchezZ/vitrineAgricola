//#region Dependências
import React from "react";
import { Box, Grid, Typography } from '@material-ui/core';
import {Header} from '../../../components/Header';
import Footer from '../../../components/Footer';
import placa from '../../../assets/img/placa.jpg';
import coop from '../../../assets/img/logo-colegio.png';
import prof from '../../../assets/img/senhor.jpeg';
import aula from '../../../assets/img/aula.jpg';
import aula2 from '../../../assets/img/aula2.jpg';
//#endregion
const About = () => {
    return(
        <Box>
            <Header/>            
            <Box sx={{ flexGrow: 1 }}  className="content">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h5>Quem Somos</h5><br/>
                    </Grid>
                    <Grid item xs={4} style={{ textAlign:'center'  }}>
                        <img src={placa} alt="placa" style={{ width:"100%", height: "auto", borderRadius:'5px' }} />
                    </Grid>
                    <Grid item xs={8}>                          
                        <Typography variant="subtitle1" style={{ textAlign:'justify', padding:'10px'}}><br/>
                            A Escola Técnica Estadual de Presidente Prudente foi criada em 3 de junho de 1942, com o nome de Escola Prática Agrícola de Presidente Prudente, tendo como objetivo principal a formação de Líderes Rurais e Profissionais Agrícolas de 2º Grau. <br/> <br/>
                            Uma grande preocupação da equipe escolar está na vontade de se trabalhar de forma constante com a interdisciplinaridade. <br/>  <br/>
                            Em 2018 a Etec completou 76 anos de atividades educacionais, constituindo-se em motivo de grande satisfação para a comunidade escolar.
                        </Typography>
                    </Grid>
                    <Grid item xs={9}>                         
                        <Typography variant="subtitle1" style={{ textAlign:'justify'}}><br/>
                            A Cooperativa Escola como um órgão de apoio da Etec, tem como uma de suas principais funções manter o regime de residência escolar para alunos que moram em municípios distantes e também se apresenta como um laboratório de aprendizagem através da gestão dos projetos produtivos onde o exercício prático das atividades didático pedagógicas proporciona o desenvolvimento dos projetos e a qualificação profissional de cada aluno. A residência permite a sistematização de ações técnicas pedagógicas e administrativas em função da organização, execução, controle e avaliação das atividades desenvolvidas pelos alunos. A cooperativa escola configura, portanto, num espaço onde, o exercício democrático através da participação dos alunos em ações cooperativas e a gestão do agronegócio orientada para uma vivência saudável, colaboram com o processo de ensino aprendizado de qualidade.
                        </Typography>
                    </Grid>
                    <Grid item xs={3} style={{ padding:'20px', textAlign:'center' }}> 
                        <img src={coop} alt="cooperativa" style={{ width:"90%", height: "auto", borderRadius:'5px' }} />
                    </Grid>
                    <Grid item xs={3} style={{ textAlign:'center'  }}>  
                        <img src={prof} alt="Antonio Eufrásio de Toledo" style={{ width:"250px", height: "auto", borderRadius:'5px' }} /> 
                    </Grid>
                    <Grid item xs={9} style={{ padding:'10px', textAlign:'justify' }}>                      
                        <Typography variant="subtitle1" style={{ textTransform:'capitalize', fontWeight:'bold'}}><br/>
                            Profº Drº Antonio Eufrásio de Toledo
                        </Typography>                      
                        <Typography variant="subtitle1" style={{ textAlign:'justify'}}><br/>
                            A Escola Técnica Estadual de Presidente Prudente foi criada em 3 de junho de 1942, com o nome de Escola Prática Agrícola de Presidente Prudente, tendo como objetivo principal a formação de Líderes Rurais e Profissionais Agrícolas de 2º Grau.  Uma grande preocupação da equipe escolar está na vontade de se trabalhar de forma constante com a interdisciplinaridade.  Em 2018 a Etec completou 76 anos de atividades educacionais, constituindo-se em motivo de grande satisfação para a comunidade escolar.
                        </Typography>
                    </Grid>
                    <Grid item xs={7}> <br/><br/>
                        <Box style={{ textAlign:'center', padding:'5px' }}>
                            <Box style={{ backgroundColor:'#4a555c', color:'#FFFFFF', padding:'5px', borderRadius:'5px', textAlign:'center' }}>
                                <h5 style={{ textTransform:'capitalize', fontWeight:'bold'}}>Missão</h5>                                
                            </Box>                     
                            <Typography variant="subtitle1" style={{ padding:'5px' }}><br/>
                                Promover um ensino de qualidade, para atender á comunidade que busca se profissionalizar, adequáala ao mundo do trabalho, criar, divulgar, apoiar e aplicar novas tecnologias, contribuir para a formação de cidadãos críticos, empreendedores, responsáveis e transformadores da sua realidade.
                            </Typography><br/>
                            <Box style={{ backgroundColor:'#4a555c', color:'#FFFFFF', padding:'5px', borderRadius:'5px', textAlign:'center' }}>
                                <h5 style={{ textTransform:'capitalize', fontWeight:'bold'}}>Visão</h5>                                
                            </Box>                     
                            <Typography variant="subtitle1" style={{ padding:'5px' }}><br/>
                                Ser um referencial regional, uma unidade de ensino moderna, eficaz e comprometida com a formação de técnicos preparados para o mundo do trabalho.
                            </Typography><br/>
                            <Box style={{ backgroundColor:'#4a555c', color:'#FFFFFF', padding:'5px', borderRadius:'5px', textAlign:'center' }}>
                                <h5 style={{ textTransform:'capitalize', fontWeight:'bold'}}>Valores</h5>                                
                            </Box>                     
                            <Typography variant="subtitle1" style={{ padding:'5px' }}><br/>
                                Democracia, Ética, Justiça, Responsabilidade e Solidariedade.
                            </Typography><br/>
                        </Box> 
                   </Grid>
                    <Grid item xs={5} style={{ paddingLeft:'50px', textAlign:'center' }}>  
                        <img src={aula} alt="aula" style={{  width:"550px", height: "320px", borderRadius:'5px' }} /> <br/>
                        <img src={aula2} alt="aula2" style={{  width:"550px", height: "320px", borderRadius:'5px' }} /> <br/><br/><br/>
                    </Grid>
                </Grid>
            </Box>
            <Footer/>
        </Box>
    );
}

export default About;