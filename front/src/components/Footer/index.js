import React from 'react';
import { RiWhatsappLine, RiFacebookCircleLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
    return(
        <div className="footer">
            <div className="fContato">
                <div style={{ display:"block"}}><br/>
                    <span>etecppagricola@gmail.com - (18) 98196-1025</span>
                </div>
            </div>
            <div className="fDireitos">
                <div style={{ display:"block"}}><br/>
                    <span>Copyright@2021 - Todos os Direitos Reservados</span>
                </div>
            </div>
            <div className="fRedes">
                <a style={{ textDecoration:"none", color:"#FFFFFF" }} href="https://api.whatsapp.com/send?phone=5518981961025&fbclid=IwAR1QyguQBa7dyM1WWh3Irh859NVfVJUIy-G5ZajTX_q_mDYXD2wUD95xNX0" rel="noreferrer" target="_blank" alt="WhatsApp">
                    <RiWhatsappLine style={{width:"35px", height:"auto", marginRight:"10px", marginTop:"7px", marginBottom:"-6px"}} />
                </a>
                <a style={{ textDecoration:"none", color:"#FFFFFF" }} href="https://www.facebook.com/colegioagricolaprudenteoficial/" rel="noreferrer" target="_blank" alt="Facebook">
                    <RiFacebookCircleLine style={{width:"35px", height:"auto", marginRight:"10px", marginTop:"2px", marginBottom:"-6px"}} />
                </a>
                <a style={{ textDecoration:"none", color:"#FFFFFF" }} href="https://www.instagram.com/colegioagricolaprudenteoficial/" rel="noreferrer" target="_blank" alt="Instagram">
                    <FaInstagram style={{width:"30px", height:"auto", marginRight:"10px", marginTop:"-3px", marginBottom:"-3px"}} />
                </a>
            </div>
        </div>
    );
}

export default Footer;