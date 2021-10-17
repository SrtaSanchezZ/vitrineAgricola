import React from 'react';
import { Box, Typography } from '@material-ui/core';
import inicio from '../../assets/img/Icons/home_black_24dp.png';
import reserva from '../../assets/img/Icons/receipt_black_24dp.png';
import vitrine from '../../assets/img/Icons/view_module_black_24dp.png';
import produto from '../../assets/img/Icons/shopping_basket_black_24dp.png';
import noticia from '../../assets/img/Icons/post_add_black_24dp.png';
import usuario from '../../assets/img/Icons/manage_accounts_black_24dp.png';

export function MenuPrivate(props){
    return(
        <Box m={1} bgcolor="#FFFFFF" color="#333333" style={{ opacity: "1", margin:0, height: '88vh' }}>                
            <Box p={1} onClick={props.home} style={{ cursor:"pointer" }} >
                <Typography style={{ textAlign:'center' }}>
                    <img src={inicio} style={{ width:'24px', height:'auto' }} />
                </Typography>
                <Typography variant="subtitle1" style={{ textAlign:'center' }}>
                    Início
                </Typography>
            </Box> 
            {props.docs ? (               
            <Box p={1} onClick={props.docs} style={{ cursor:"pointer" }} >
                <Typography style={{ textAlign:'center' }}>
                    <img src={reserva} style={{ width:'24px', height:'auto' }} />
                </Typography>
                <Typography variant="subtitle1" style={{ textAlign:'center' }}>
                    Reservas
                </Typography>
            </Box>):null}             
            {props.views ? (              
            <Box p={1} onClick={props.views} style={{ cursor:"pointer" }} >
                <Typography style={{ textAlign:'center' }}>
                    <img src={vitrine} style={{ width:'24px', height:'auto' }} />
                </Typography>
                <Typography variant="subtitle1" style={{ textAlign:'center' }}>
                    Vitrine
                </Typography>
            </Box>):null}              
            {props.products ? (                
            <Box p={1} onClick={props.products} style={{ cursor:"pointer" }} >
                <Typography style={{ textAlign:'center' }}>
                    <img src={produto} style={{ width:'24px', height:'auto' }} />
                </Typography>
                <Typography variant="subtitle1" style={{ textAlign:'center' }}>
                    Produtos
                </Typography>
            </Box>):null}               
            {props.news ? (        
            <Box p={1} onClick={props.news} style={{ cursor:"pointer" }} >
                <Typography style={{ textAlign:'center' }}>
                    <img src={noticia} style={{ width:'24px', height:'auto' }} />
                </Typography>
                <Typography variant="subtitle1" style={{ textAlign:'center' }}>
                    Notícias
                </Typography>
            </Box>):null}                
            {props.users ? (        
            <Box p={1} onClick={props.users} style={{ cursor:"pointer" }} >
                <Typography style={{ textAlign:'center' }}>
                    <img src={usuario} style={{ width:'24px', height:'auto' }} />
                </Typography>
                <Typography variant="subtitle1" style={{ textAlign:'center' }}>
                    Usuários
                </Typography>
            </Box>):null}
        </Box>
   );
}