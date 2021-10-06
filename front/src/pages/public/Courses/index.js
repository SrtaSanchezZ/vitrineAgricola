//#region Dependências
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Box, Grid, InputAdornment, TextField, ListItem, Typography, List } from '@material-ui/core';
import {Header} from '../../../components/Header';
import Footer from '../../../components/Footer';
//#endregion
const Courses = () => {
    const [nivel, setNivel] = useState([]);
    const [area, setArea] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [nivelId, setNivelId] = useState("");
    const [nivelNome, setNivelNome] = useState("");
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

    const ArrNivel = (arr) =>
            arr.map((item) => ({ id: item.id, nome: item.nome }));    
    const ArrArea = (arr) =>
        arr.map((item) => ({ id: item.id, nome: item.nome, nivel: item.nivel }))
            .filter(item => (item.nivel === nivelId));    
    const ArrCursos = (arr) =>
        arr.map((item) => ({ id: item.id, nome: item.nome, coordernado: item.coordernador,                
            email: item.email, eixo: item.eixo, obj: item.obj, principal: item.principal,                
            mercado: item.mercado, mod1: item.mod1, mod2: item.mod2, mod3: item.mod3,                
            mod4: item.mod4, duracao: item.duracao, img: item.img, area: item.area }))
            .filter(item => (item.area === areaId));

    var msg = "";
    var back = "localhost:3001";

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
                    <Grid item xs={8}>
                        <h4>Cursos</h4>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            placeholder="Busque por um curso"
                            className="search"
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        Lista
                    </Grid>
                    <Grid item xs={10}>
                        Conteúdo
                    </Grid>
                </Grid>
            </Box>
            <Footer/>
        </div>
    );
}

export default Courses;