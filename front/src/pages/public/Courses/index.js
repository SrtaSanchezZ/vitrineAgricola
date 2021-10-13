//#region Dependências
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { styled } from '@material-ui/styles';
import { Box, Button, Card, CardContent, CardMedia, CardActionArea, CardActions, Grid, Typography, List } from '@material-ui/core';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import { Header } from '../../../components/Header';
import Footer from '../../../components/Footer';
//#endregion
const Courses = () => {
    const [nivel, setNivel] = useState([]);
    const [area, setArea] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [nivelId, setNivelId] = useState(1);
    const [nivelNome, setNivelNome] = useState("Ensino Médio");
    const [areaId, setAreaId] = useState("");
    const [areaNome, setAreaNome] = useState("");
    const [areaNivel, setAreaNivel] = useState("");
    const [cursosId, setCursosId] = useState("");
    const [cursosNome, setCursosNome] = useState("");
    const [cursosCoordenacao, setCursosCoordenacao] = useState("");
    const [cursosEmail, setCursosEmail] = useState("");
    const [cursosEixo, setCursosEixo] = useState("");
    const [cursosObj, setCursosObj] = useState("");
    const [cursosPrincipal, setCursosPrincipal] = useState("");
    const [cursosMercado, setCursosMercado] = useState("");
    const [cursosMod1, setCursosMod1] = useState("");
    const [cursosMod2, setCursosMod2] = useState("");
    const [cursosMod3, setCursosMod3] = useState("");
    const [cursosMod4, setCursosMod4] = useState("");
    const [cursosDuracao, setCursosDuracao] = useState("");
    const [cursosImg, setCursosImg] = useState("");
    const [cursosArea, setCursosArea] = useState("");
    const [expanded, setExpanded] = useState('panel1');

    const ArrNivel = (arr) =>
            arr.map((item) => ({ id: item.id, nome: item.nome }));    
    const ArrArea = (arr) =>
        arr.map((item) => ({ id: item.id, nome: item.nome, nivel: item.nivel })); 
    const ArrCursos = (arr) =>
        arr.map((item) => ({ id: item.id, nome: item.nome, coordernado: item.coordernador,                
            email: item.email, eixo: item.eixo, obj: item.obj, principal: item.principal,                
            mercado: item.mercado, mod1: item.mod1, mod2: item.mod2, mod3: item.mod3,                
            mod4: item.mod4, duracao: item.duracao, img: item.img, area: item.area }));

    var msg = "";
    var back = "localhost:3001";

    
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  borderBottom: `1px solid #c3c3c3`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(() => ({
  borderTop: `1px solid #c3c3c3`,
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: 10,
  },
}));
const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: 2,
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

    const handleLoadNivel = () =>{
        axios
          .get(`http://`+ back +`/cursos/nivel`)
          .then((res) => {              
            setNivel(ArrNivel(res.data.response.nivel));
          }).catch((res) =>{    
            msg = "Não foi possível localizar eixos de ensino.";  
          })  
    };
    const handleLoadArea = () =>{
        axios
          .get(`http://`+ back +`/cursos/area`)
          .then((res) => {              
            setArea(ArrArea(res.data.response.area));
          }).catch((res) =>{    
            msg = "Não foi possível localizar áreas de ensino.";  
          })  
    };
    const handleLoadCursos = () =>{
        axios
          .get(`http://`+ back +`/cursos`)
          .then((res) => {              
            setCursos(ArrCursos(res.data.response.cursos));
          }).catch((res) =>{    
            msg = "Não foi possível localizar cursos.";  
          })  
    };
    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
    const handleChangeNivel = (id, nome) => () => {
      setNivelId(id);
      setNivelNome(nome);
    };
    useEffect(() => {
      handleLoadNivel();
      handleLoadArea();
      handleLoadCursos();
      // eslint-disable-next-line
    }, []);

    return(
        <div>
            <Header/>
            <Box sx={{ flexGrow: 1 }}  className="content">  
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <h4>Cursos</h4>
                </Grid>
                <Grid item xs={1.5}> 
                  {nivel.map((niveis) => {
                      return (<>
                      {niveis.id === nivelId?(
                        <Box color="#2E8E61"
                             onClick={handleChangeNivel(niveis.id, niveis.nome)}
                             style={{ cursor:'pointer', borderRight:'4px solid #2E8E61',
                                      paddingBottom:'10px', paddingTop:'5px' }}>
                          <Typography variant="subtitle2">
                            {niveis.nome.toUpperCase()}
                          </Typography>
                        </Box>):(
                        <Box onClick={handleChangeNivel(niveis.id, niveis.nome)}
                             style={{ cursor:'pointer', paddingBottom:'10px', paddingTop:'5px' }}>
                          <Typography variant="subtitle2">
                            {niveis.nome.toUpperCase()}
                          </Typography>
                        </Box>
                        )}
                      </>)}
                    )}
                </Grid>
                <Grid item xs={10.5} style={{ padding:'24px' }}>                  
                  <Typography variant="h6" style={{ paddingBottom:'24px' }}>
                    {nivelNome}
                  </Typography>
                  <List container wrap="nowrap" style={{ paddingBottom:'50px' }}>
                  {area.map((areas) => {
                    return (<div>
                      {areas.nivel === nivelId?
                        (<Accordion expanded={expanded === 'panel' + areas.id} onChange={handleChange('panel' + areas.id)}>    
                            <AccordionSummary id={'panel' + areas.id}>
                              <Typography variant="subtitle2">{areas.nome}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {cursos.map((curso) => {
                                return (
                                  <div>
                                    {curso.area === areas.id?
                                      (                                        
                                        <Card sx={{ display: 'flex', maxWidth: 345, maxHeight: 100, padding:'24px' }}>
                                          <CardMedia
                                            component="img"
                                            sx={{ width: 100, height: 100 }}
                                            image={"http://" + back + curso.img}
                                            alt={curso.nome}
                                          />
                                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                          <CardContent wrap="nowrap">
                                            <Typography variant="subtitle2" style={{ textTransform:'capitalize' }}>
                                              {curso.nome}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                              <Button size="small" color="primary">
                                                Saiba mais
                                              </Button>
                                            </Box>
                                          </CardContent>
                                          </Box>
                                        </Card>):null
                                    }
                                  </div>
                                )}
                              )}
                            </AccordionDetails>                           
                          </Accordion>):null}            
                    </div>                    
                    )}
                  )}
                  </List>
                </Grid>    
              </Grid>
            </Box>
            <Footer/>
          </div>
    );
}

export default Courses;