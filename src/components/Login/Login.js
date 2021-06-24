import React, { Suspense } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import * as ApiServices from  "../../Services/ApiServices.js";
import "../../assets/css/Login/login.css";
import loginImg from "../../assets/images/logo_isae512.png";
import auth from "../Login/auth";

class Login extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            accessUser: false,
            userid: 0,
            user: '',
            password: '',
            emailreset: '',
            validated: false, // Estado de validación del formulario
            validatedResetPass: false,
            showModalResetPass: false,
            userValidate: false,
            messageResetPass: '',
            hideModalTime: null
        }
    }

    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return;
        };
    }
    
    /**
     * Event submit, to get Login
     */
    async handleSubmit (e) {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();     
            this.setState({validated: false})
        }else{    
            let result = await ApiServices.validateUserExists(this.state.user, true);

            if(result !== null){
                let result_login = await ApiServices.getLoginUser(result.usuarioid);

                if(result_login[0].password == null){
                    this.props.setfirstAccess(true, result.usuarioid);
                    this.props.onClick();
                }else if(result_login[0].password === this.state.password){
                    this.setState({ accessUser: true })

                    auth.login(() => {
                        this.props.history.push("/Home");
                    }, result_login[0]);

                    // ReactDOM.render(<Home usuarioid={result_login[0].usuarioid} usuario={result_login[0].usuario} nombrecompleto={result_login[0].nombrecompleto}/>, 
                    //                 document.getElementById('root'));

                }else{
                    alert("Contraseña Invalida");    
                }
            }          
        }        
        
        this.setState({validated: true})
    }

    /**
     * Show Modal for reset password
     * get de email for send a temporary pass
     * @param {*} e 
     */
    async showModalResetPassword(e){
        e.preventDefault();

        if(this.state.user !== ''){

            let result = await ApiServices.validateUserExists(this.state.user, true);

            if(result !== null){
                let result_login = await ApiServices.getLoginUser(result.usuarioid);                
                this.setState({ showModalResetPass: true, userValidate: true, userid: result_login[0].usuarioid, emailreset: result_login[0].correo });
            }

        }else{
            this.setState({ userValidate: false, showModalResetPass: true });
        }
    }

    /**
     * Hide modal for Reset Password
     * @param {*} e 
     */
    hideModalResetPassword = (e) =>{
        let reset = this.state.messageResetPass !== '' ? true : false;
        this.setState({ showModalResetPass: false, emailreset: '', validatedResetPass: false, messageResetPass: '', userid: 0 });
        
        // Disabled until implement a code verification
        if(reset){
            clearTimeout(this.state.hideModalTime);
            //this.props.onClick();
        }
    }
    
    /**
     * 
     */
    hideAfterModalResetPass = () =>{
        this.hideModalResetPassword();
    }
    
    /**
     * Event submit, to get Login
     */
    async handleSubmitResetPass (e) {
        e.preventDefault();
        const form = e.currentTarget;        

        if (form.checkValidity() === false) {
            e.stopPropagation();     
            this.setState({validatedResetPass: false})
        }else{

            if(this.state.userValidate){
                
                this.sendMailResetPass(this.state.userid, this.state.user, this.state.emailreset);
            
            }else{
                let email = this.state.emailreset;
                let result = await ApiServices.validateEmailExists(email);

                if(result !== null){

                    if(result.length>0){

                        if(result[0].password === null){
                            alert("El Usuario es de Nuevo Ingreso");
                        }else{
                            this.setState({ userid: result[0].usuarioid, user: result[0].usuario });
                            this.sendMailResetPass(result[0].usuarioid, result[0].usuario, this.state.emailreset);
                        }

                    }else{
                        alert("El Correo no esta ligado a un usuario");
                    }

                }
            }                  
        }        
        
        this.setState({validatedResetPass: true})
    }

    /**
     * 
     * @param {*} user 
     * @param {*} email 
     */
    async sendMailResetPass(userid, user, email){
        let dataCampos = new FormData();

        dataCampos.append("userid", userid);
        dataCampos.append("user", user);
        dataCampos.append("email", email);

        let result = await ApiServices.sendEmailPassReset(dataCampos);
        let message = 'Se ha enviado un codigo al correo, con la contraseña temporal'

        if(result){
            this.props.setResetPass(true, userid);            
            let callback = setTimeout(this.hideAfterModalResetPass, 4000);
            this.setState( { hideModalTime: callback } );
        }else{
            message = 'Ocurrio un error en el envio del correo';
        }

        this.setState( { messageResetPass: message } );
    }

     /**
     * Even change on inputs to update the value
     */
    onInputChange  = (e) => {
        const {name, value} = e.target;
        this.setState({
          [name]: value
        })
    };

    render() {
        return (

        <>
        {this.state.accessUser ?
            null
        :         
        <div id="login-form" className="login-container" ref={this.props.containerRef}>
            <div className="main-container">
                <div className="header">Inicia Sesión</div>
                
                <div className="content">

                    <div className="App-logo">
                        <img src={loginImg} alt="ISAE"></img>                
                    </div>
                    
                    <Form id="login-form" className="form" noValidate name="loginform" validated={this.state.validated} onSubmit={this.handleSubmit.bind(this)}>
                    
                        <Form.Group controlId="groupuser">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control type="text" placeholder="Usuario" 
                                name="user"
                                value={this.state.user ||""}
                                onChange={this.onInputChange.bind(this)}
                                required />
                            <Form.Control.Feedback type="invalid">Ingresa el Usuario.</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="grouppassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Contraseña" 
                                name="password"
                                value={this.state.password ||""}
                                onChange={this.onInputChange.bind(this)}
                                required />
                            <Form.Control.Feedback type="invalid">Ingresa la Contraseña.</Form.Control.Feedback>
                        </Form.Group>
                    
                        <Form.Group className="forgot-password">
                          <a onClick={this.showModalResetPassword.bind(this)}>
                            Olvidaste tu Contraseña?
                          </a>
                        </Form.Group>

                        <Form.Group className="footer">
                            <Button type="submit" className="">
                                Ingresar
                            </Button>                        
                        </Form.Group>
                    </Form>
                    
                </div>               
            </div>            
        </div> }


        <Modal id="resetpassemodal" ref='resetpassmodalRef' refs={this.refs} show={this.state.showModalResetPass} 
            onHide={ this.hideModalResetPassword.bind(this)}
            dialogClassName=""
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
        
            <Modal.Header closeButton>
                <Modal.Title>Restablecer Contraseña</Modal.Title>
            </Modal.Header>

            <Modal.Body>

            <Form id="resetpass-form" className="form" noValidate name="resetpassform" 
                validated={this.state.validatedResetPass} onSubmit={this.handleSubmitResetPass.bind(this)}>
                    <Form.Group controlId="groupemailreset" >
                            <Form.Label>Correo</Form.Label>
                            <Form.Control type="email" placeholder="Correo" 
                                name="emailreset"
                                value={this.state.emailreset || ""}
                                onChange={this.onInputChange.bind(this)}
                                required
                                disabled={this.state.userValidate}
                                />
                            <Form.Control.Feedback type="invalid">Ingresa un Correo Valido.</Form.Control.Feedback>
                    </Form.Group>

                    {
                        this.state.messageResetPass !== '' ?
                        <Form.Group controlId="groupemailresetmessage" >
                            <Form.Text className='font-weight-bold'>{this.state.messageResetPass}</Form.Text>                            
                        </Form.Group>
                        : null
                    }

                    <Form.Group className="footer">
                        <Button type="submit" className="" disabled={this.state.messageResetPass !== '' ? true : false}>
                            Restablecer Contraseña
                        </Button>                        
                    </Form.Group>

                </Form>            
            </Modal.Body>

        </Modal>

        </>
        )
    }
}

export default Login;