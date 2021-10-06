import React from "react";
import { AiFillCloseCircle } from 'react-icons/ai';
import { FiLogOut } from "react-icons/fi";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button, Dialog, DialogActions, DialogContent, Box, Typography } from '@material-ui/core';
import user from '../../assets/img/Icons/manage_accounts_black_24dp.png';
 
export function DialogAlert(props){
     return(
        <Dialog open={props.open} onClose={props.close}>
            <DialogContent className="Texto">
                <p className="Texto" id="alerta" >
                    {props.alert}
                </p>
            </DialogContent>
            <DialogActions>
                <Button
                    style={{
                        color:"#3A5E4E"
                    }}
                    onClick={props.close}>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
 }

 export function DialogMain(props){
    return(
        <Dialog open={props.open} onClose={props.close} aria-labelledby="form-dialog-title">
            <Box display="flex" bgcolor="#2E8E61" color="#ffffff" align="right" style={{ height: '40px', paddingTop:'5px' }}>                
                <Box p={1} style={{ width:'50%' }} >
                    <span style={{ marginTop: '10px', marginLeft:'5px' }}>{props.title}</span>
                </Box>                
                <Box p={1} style={{ width:'50%', textAlign:'end', cursor:'pointer' }} >
                    <AiFillCloseCircle onClick={props.close} style={{ width: '18px', height: 'auto', marginLeft: '58%', marginRight:"10px" }} />
                </Box>
            </Box>
            <DialogContent className="Texto" style={{ width:'500px', borderBottom: '1px solid #00000024', paddingBottom: '30px' }}>
                {props.info}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}
                    style={{
                        color:"#00000061"
                    }}>
                    CANCELAR
                </Button>
                <Button onClick={props.click}
                    style={{
                        color:"#2E8E61"
                    }}>
                    {props.label}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export function DialogReadNew(props){
    return(
        <Dialog open={props.open} onClose={props.close} fullScreen={true}>
            <Box display="flex" bgcolor="#2E8E61" color="#ffffff" align="right" style={{ height: '40px' }}>                
                <Box p={1} style={{ width:'50%' }} >
                    <span style={{ textAlign:'left' }}>Leitura de Notícia</span>
                </Box>                
                <Box p={1} style={{ width:'50%', textAlign:'end', cursor:'pointer' }} >
                    <span style={{ textAlign:'right' }} onClick={props.close}>X</span>
                </Box>
            </Box>
            <DialogContent className="Texto" style={{ borderBottom: '1px solid #00000024', padding: '30px' }}>
                <Box display="flex" >                
                    <Box p={1} style={{ width:'20%' }} >
                        <Typography variant="h4" style={{ textAlign:'center' }}>
                            <img src={"http://localhost:3001" + props.image} style={{ width:'100%', height:'auto' }} />
                        </Typography>
                    </Box>                   
                    <Box p={1} style={{ width:'60%' }} >
                        <Typography variant="h4" style={{ textAlign:'center' }}>{props.title}</Typography>
                    </Box>               
                    <Box p={1} style={{ width:'20%', textAlign:'end' }} >
                        <span style={{ textAlign:'right', marginBottom:'20px' }}>autor(a): {props.author}</span><br/>
                        <span style={{ textAlign:'right' }}>atualizada: {props.date}</span>
                    </Box>
                </Box>
                <Typography variant="body1" style={{textAlign:'justify'}}>{props.text}</Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    style={{
                        color:"#00000061"
                    }}
                    onClick={props.close}>
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export function DialogLoading(props){
    return(
        <Dialog open={props.open}>
            <DialogContent className="Texto">          
                <CircularProgress />
            </DialogContent>
        </Dialog>
    );
} 

export function DialogPerfil(props){
     return(
        <Dialog open={props.open} onClose={props.close}>          
            <Box p={1} style={{ textAlign:'end', cursor:'pointer' }} >
                <span style={{ textAlign:'right' }} onClick={props.close}>X</span>
            </Box>
            <DialogContent className="Texto" style={{ width:'300px', textAlign:"center" }}>
                <img src={props.img} style={{ width:'60px', height:'auto' }} alt={props.perfil} /><br/>
                <Typography variant="h6" style={{ textAlign:'center', textTransform:"capitalize" }}>Perfil {props.perfil}</Typography>
                <Typography variant="subtitle1" style={{ textAlign:'center' }}>{props.name}</Typography>      
                <Box p={1} style={{ textAlign:'center' }} >
                    <hr style={{ width:'100%' }} /> 
                </Box>                 
                <Button 
                    onClick={props.close} 
                    variante="text" 
                    startIcon={<img src={user} style={{ width:'30px', height:'auto' }} alt="Editar Perfil" />}
                    style={{ color:"#21222DCC", textAlign:"center", textTransform:"capitalize"  }}> 
                    Edite Perfil
                </Button>  
            </DialogContent>  
            <DialogActions style={{ textAlign:"center" }}>
                <Button
                    startIcon={<FiLogOut/>}
                    style={{
                        color:"#3A3E87"
                    }}
                    onClick={props.click}>
                    LOGOUT
                </Button>
            </DialogActions>
        </Dialog>
    );
 }