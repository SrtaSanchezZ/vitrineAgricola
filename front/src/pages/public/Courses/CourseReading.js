import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Box, Button, CardMedia, Grid, Typography, List } from '@material-ui/core';
import { Header } from '../../../components/Header';
import Footer from '../../../components/Footer';

const CourseReading = () => {
    var url = window.location.href;
    var back = "localhost:3001";
    var id = url.split("cursos/");
    id = id[1];

    const [curso, setCurso] = useState([]);

    const ArrCurso = (arr) =>
        arr.map((item) => ({ id: item.id, nome: item.nome, coordenador: item.coordenador,                
            email: item.email, eixo: item.eixo, obj: item.obj, principal: item.principal,                
            mercado: item.mercado, mod1: item.mod1, mod2: item.mod2, mod3: item.mod3,                
            mod4: item.mod4, duracao: item.duracao, img: item.img }));
            
    const handleLoadCurso = () =>{
        axios
          .get(`http://`+ back +`/cursos/`+ id)
          .then((res) => {              
            setCurso(ArrCurso(res.data.response.cursos));
          }).catch((res) =>{    
            var msg = "Não foi possível localizar esse curso.";  
          })  
    };
    useEffect(() => {
        handleLoadCurso();
        // eslint-disable-next-line
      }, []);

    console.log(curso);

    return(
        <div>
            <Header/>            
            <Box sx={{ flexGrow: 1 }}  className="content">
                {curso.map((item) => {
                    return (
                        <Grid container spacing={2}>
                            <Grid item xs={4} style={{ padding:'24px' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width:'100%', height: 'auto', borderRadius:'10px' }}
                                    image={"http://" + back + item.img}
                                    alt={item.nome}
                                />
                                <Typography variant="subtitle1" style={{ paddingTop:'24px' }} >
                                    <b>Coordenação: </b> {item.coordenador}
                                </Typography>
                                <Typography variant="subtitle1" >
                                    <b>E-mail da Coordenação: </b>{item.email}
                                </Typography>
                                <Typography variant="subtitle1" >
                                    <b>Eixo Tecnológico: </b>{item.eixo}
                                </Typography>
                                <Typography variant="subtitle1">
                                    <b>Duração: </b>{item.duracao}
                                </Typography>
                            </Grid>
                            <Grid item xs={8} style={{ paddingBottom:'50px' }}>
                                <Typography variant="h6" style={{ color:'#2E8E61', fontWeight:'bold' }}>
                                    {item.nome.toUpperCase()}
                                </Typography>
                                <Typography variant="subtitle1" style={{ fontWeight:'bold', paddingTop:'24px' }}>
                                    Objetivo do Curso: 
                                </Typography>
                                <Typography variant="subtitle1" style={{ textAlign:'justify' }} >
                                    {item.obj}
                                </Typography>
                                <Typography variant="subtitle1" style={{ fontWeight:'bold', paddingTop:'10px' }}>
                                    Atividades Principais:
                                </Typography>
                                <Typography variant="subtitle1" style={{ textAlign:'justify' }}>
                                   {item.principal}
                                </Typography>
                                <Typography variant="subtitle1" style={{ fontWeight:'bold', paddingTop:'10px' }}>
                                    Mercado de Trabalho:
                                </Typography>
                                <Typography variant="subtitle1" style={{ textAlign:'justify' }}>
                                    {item.mercado}
                                </Typography>
                                <Typography variant="subtitle1" style={{ fontWeight:'bold', paddingTop:'10px' }}>
                                    <b>Certificações:</b>
                                </Typography>
                                <Typography variant="subtitle1" >
                                    1º Módulo: {item.mod1}
                                </Typography>                                
                                {item.mod2 !== null ?(
                                    <Typography variant="subtitle1" >
                                        2º Módulo: {item.mod2}
                                    </Typography>):null}                                
                                {item.mod3 !== null ?(
                                    <Typography variant="subtitle1" >
                                        3º Módulo: {item.mod3}
                                    </Typography>):null}                                
                                {item.mod4 !== null ?(
                                    <Typography variant="subtitle1" >
                                        4º Módulo: {item.mod4}
                                    </Typography>):null}
                            </Grid>                
                        </Grid>
                    )}
                )}                
            </Box>
            <Footer/>
        </div>
    );
}

export default CourseReading;