import React from "react";
import passImg from "../../assets/images/logo_isae512.png";
import { Form, Button } from "react-bootstrap";
import * as ApiServices from "../../Services/ApiServices.js";
import "../../assets/css/Login/login.css";

class ChangePass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false, // Estado de validación del formulario
      changePassword: this.props.isfirstAccess ? true : false,
      iduser: 0,
    };
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  /**
   * Validate If User Exist, For Changes The Password
   * @param {*} e
   */
  async validateUser(e) {
    e.preventDefault();
    let result = await ApiServices.validateUserExists(
      this.refs.user.value,
      true
    );

    if (result !== null) {
      if (result.password === null) {
        this.props.setfirstAccess(true, result.usuarioid);
        this.setState({ changePassword: true, iduser: result.usuarioid });
      } else if (result.password === this.refs.currentpass.value) {
        this.props.setfirstAccess(false, result.usuarioid);
        this.setState({ changePassword: true, iduser: result.usuarioid });
      } else {
        alert("Contraseña Invalida");
      }
    }
  }

  /**
   * Event submit, to update password
   */
  async handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      this.setState({ validated: false });
    } else {
      let newpass = this.refs.newpassword;
      let newpass1 = this.refs.newpassword1;

      if (newpass.value !== newpass1.value) {
        newpass1.setCustomValidity("La contraseña no coincide");
      } else {
        let dataCampos = new FormData(form);
        dataCampos.append(
          "iduser",
          this.props.isfirstAccess === false
            ? this.state.iduser
            : this.props.iduser
        );

        let result = await ApiServices.updatePassword(dataCampos);

        if (result) this.props.onClick();
      }
    }

    this.setState({ validated: true });
  }

  /**
   * Even change on inputs to update the value
   */
  onInputChange = (e) => {
    let { value } = e.target;

    if (value !== "") e.target.setCustomValidity("");
  };

  render() {
    return (
      <div
        id="pass-form"
        className="login-container"
        ref={this.props.containerRef}
      >
        <div className="main-container">
          <div className="header">
            {this.props.isfirstAccess ? "Nuevo Acceso" : "Cambiar Contraseña"}
          </div>
          <div className="content">
            <div className="App-logo">
              <img src={passImg} alt="ISAE" />
            </div>

            <Form
              id="passsword-form"
              className="form"
              noValidate
              name="passform"
              validated={this.state.validated}
              onSubmit={this.handleSubmit.bind(this)}
            >
              {this.props.isfirstAccess == false ? (
                <>
                  <Form.Group controlId="groupuser">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Usuario"
                      name="user"
                      ref="user"
                      onChange={this.onInputChange.bind(this)}
                      required
                      disabled={this.state.changePassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingresa el Usuario.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    controlId="groupcurrentpass"
                    className="form-group"
                  >
                    <Form.Label>Contraseña Actual</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Contraseña Actual"
                      name="currentpass"
                      ref="currentpass"
                      onChange={this.onInputChange.bind(this)}
                      required
                      disabled={this.state.changePassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingresa la Contraseña Actual.
                    </Form.Control.Feedback>
                  </Form.Group>
                </>
              ) : null}
              <Form.Group
                controlId="groupnewpassword"
                className="form-group"
                hidden={this.state.changePassword == true ? false : true}
              >
                <Form.Label>Nueva Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nueva Contraseña"
                  name="newpassword"
                  ref="newpassword"
                  onChange={this.onInputChange.bind(this)}
                  required
                  disabled={this.state.changePassword == true ? false : true}
                />
                <Form.Control.Feedback type="invalid">
                  Formato Invalido.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                controlId="groupnewpassword1"
                className="form-group"
                hidden={this.state.changePassword == true ? false : true}
              >
                <Form.Label>Repetir Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Repetir Contraseña"
                  name="newpassword1"
                  ref="newpassword1"
                  onChange={this.onInputChange.bind(this)}
                  required
                  disabled={this.state.changePassword == true ? false : true}
                />
                <Form.Control.Feedback type="invalid">
                  No coincide con la Contraseña.
                </Form.Control.Feedback>
              </Form.Group>

              <div className="footer">
                {this.props.isfirstAccess || this.state.changePassword ? (
                  <Button type="submit" className="">
                    Actualizar
                  </Button>
                ) : (
                  <Button className="" onClick={this.validateUser.bind(this)}>
                    Validar
                  </Button>
                )}
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default ChangePass;
