import React from "react";
import { AiFillCloseCircle } from 'react-icons/ai';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button, Dialog, DialogActions, DialogContent, Box } from '@material-ui/core';
 
export function DialogAlert(props){
     return(
        <Dialog open={props.open} onClose={props.close}>
            <DialogContent className="Texto">
                <p className="Texto" id="alerta" >
                    {props.alert}
                </p>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
 }

export function DialogMain(props){
    return(
        <Dialog open={props.open} onClose={props.close} aria-labelledby="form-dialog-title">
        <Box bgcolor="#2E8E61" color="#ffffff" align="right" style={{ height: '40px' }}>
            <span style={{ marginTop: '10px' }}>{props.title}</span>
            <AiFillCloseCircle onClick={props.close} style={{ width: '18px', height: 'auto', marginLeft: '58%', marginRight:"20px", marginTop: '10px' }} />
        </Box>
            <DialogContent className="Texto" style={{ width:'500px', borderBottom: '1px solid #00000024', paddingBottom: '30px' }}>
                {props.info}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>
                    CANCELAR
                </Button>
                <Button onClick={props.click}>
                    {props.label}
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