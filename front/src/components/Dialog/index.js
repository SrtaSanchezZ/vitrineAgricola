import React from "react";
import { GrClose } from 'react-icons/gr';
import { FiLogOut, FiTrash } from "react-icons/fi";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button, Dialog, DialogActions, DialogContent, Box, Typography } from '@material-ui/core';
 
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
            <Box display="flex" color="#21222D" align="right" style={{ height: '40px', paddingTop:'5px' }}>                
                <Box p={1} style={{ width:'50%' }} >
                    <span style={{ marginTop: '10px', marginLeft:'5px' }}>{props.title}</span>
                </Box>                
                <Box p={1} style={{ width:'50%', textAlign:'end', cursor:'pointer' }} >
                    <GrClose onClick={props.close} style={{ width: '16px', height: 'auto', marginLeft: '58%', marginRight:"10px" }} />
                </Box>
            </Box>
            <DialogContent className="Texto" style={{ width:'500px', paddingBottom: '30px' }}>
                {props.info}
            </DialogContent>
            {props.delete ? (        
                <Box style={{ marginBottom:' -50px', padding:'10px' }}>  
                    <Button onClick={props.delete}
                        startIcon={<FiTrash/>}
                        style={{
                            color:"#000000"
                        }}>
                        EXCLUIR
                    </Button>
                </Box>):null}                
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
            </DialogContent>  
            <DialogActions style={{ textAlign:"center" }}>
                <Button
                    startIcon={<FiLogOut/>}
                    style={{
                        color:"#2E8E61"
                    }}
                    onClick={props.click}>
                    LOGOUT
                </Button>
            </DialogActions>
        </Dialog>
    );
 }