import React from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { BsFillPersonPlusFill, BsFillTrashFill } from "react-icons/bs";
import { MdSave } from "react-icons/md";
import "../assets/css/Users.css";
import { URL_SERVICES } from "../constants/contants.js";
import NavBar from "./NavBar";
import * as ApiServices from "../Services/ApiServices.js";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      location: "",
      email: "",
      profileid: 0,
      telephone: "",
      bossid: 0,
      validated: false, // Estado de validación del formulario
      profileList: [], // Lista de perfiles
      usersList: [], // Lista de todos los usuarios, desplegados en el area de busqueda
      userListsSelect: 0, // Valor por default del select del area de busqueda
      userSelected: [], // Usuario seleccionado de la lista del area de buscar
      adminUsersList: [], // Lista de Usuarios con perfil admin, desplegados en el form
      banderUpdate: false, // Bandera para verificar si Guardar o Actualizar el Usuario
      perfilid: JSON.parse(this.props.userdata).perfilid,
    };

    this.getProfiles();
    this.getListUsers();
    this.getListAdminUsers();
  }

  /**
   * Get Admin Profiles when load page or load componenet
   */
  getProfiles() {
    let url = URL_SERVICES + `profile`;

    let headers = { "Content-type": "application/json;" };

    // Request options
    let options = {
      method: "GET",
      mode: "cors",
      cache: "default",
      header: headers,
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((profilesList) => {
        console.log(profilesList);
        this.setState({ profileList: profilesList });
      })
      .catch((err) => console.log(err));
  }

  /**
   * Get List of Users to show on Search select options
   */
  getListUsers() {
    let url = URL_SERVICES + `users`;

    let headers = { "Content-type": "application/json;" };

    // Request options
    let options = {
      method: "GET",
      mode: "cors",
      cache: "default",
      header: headers,
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((usersList) => {
        console.log(usersList);
        this.setState({ usersList: usersList });
      })
      .catch((err) => console.log(err));
  }

  /**
   * Get User selected on Search List
   */
  getUser(id) {
    let url = URL_SERVICES + `users/${id}`;

    let headers = { "Content-type": "application/json;" };

    // Request options
    let options = {
      method: "GET",
      mode: "cors",
      cache: "default",
      header: headers,
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((userList) => {
        console.log(userList);
        var listdata = userList[0];

        this.setState({ userSelected: listdata });

        this.setState({
          name: listdata.usuario,
          //name: listdata.nombrecompleto, // disabled
          location: listdata.ubicacion,
          email: listdata.correo,
          profileid: listdata.perfilid,
          telephone: listdata.telefono,
          bossid: listdata.jefeid,
        });

        this.setState({ validated: false });
        this.setState({ banderUpdate: true });
      })
      .catch((err) => console.log(err));
  }

  /**
   * Get List of Admi Users to select into a form
   */
  getListAdminUsers() {
    let url = URL_SERVICES + `users/adminusers`;

    let headers = { "Content-type": "application/json;" };

    // Request options
    let options = {
      method: "GET",
      mode: "cors",
      cache: "default",
      header: headers,
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((usersAdminList) => {
        console.log(usersAdminList);
        this.setState({ adminUsersList: usersAdminList });
      })
      .catch((err) => console.log(err));
  }

  /**
   * Load Data of new User to Database
   */
  addUser = () => {
    let url = URL_SERVICES + `users`;

    var dataCampos = new FormData();
    dataCampos.append("nombrecompleto", this.state.name);
    dataCampos.append("ubicacion", this.state.location);
    dataCampos.append("correo", this.state.email);
    dataCampos.append("perfilid", this.state.profileid);
    dataCampos.append("telefono", this.state.telephone);
    dataCampos.append("jefeid", this.state.bossid);
    dataCampos.append("usuario", this.state.name);

    // Request options
    let options = {
      method: "POST",
      body: dataCampos,
      mode: "cors",
      cache: "default",
    };

    fetch(url, options)
      .then((response) => response.text())
      .then((texto) => {
        console.log("Datos :: Alta Usuario");
        console.log(texto);

        this.cleanForm();

        // Actualiza las listas
        this.getListUsers();
        this.getListAdminUsers();

        alert("Usuario Guardado");
      })
      .catch((err) => console.log(err));
  };

  /**
   * Update user on Data Base
   */
  updateUser = () => {
    let url = URL_SERVICES + `users/${this.state.userSelected.usuarioid}`;

    var dataCampos = new FormData();
    //dataCampos.append("usuarioid", this.state.userSelected.usuarioid);
    dataCampos.append("nombrecompleto", this.state.name);
    dataCampos.append("ubicacion", this.state.location);
    dataCampos.append("correo", this.state.email);
    dataCampos.append("perfilid", this.state.profileid);
    dataCampos.append("telefono", this.state.telephone);
    dataCampos.append("jefeid", this.state.bossid);

    // No incluidos
    dataCampos.append("cp", this.state.userSelected.cp);
    dataCampos.append("usuario", this.state.userSelected.usuario);
    dataCampos.append("password", this.state.userSelected.password);

    // Request options
    let options = {
      method: "PUT",
      body: dataCampos,
      mode: "cors",
      cache: "default",
    };

    fetch(url, options)
      .then((response) => response.text())
      .then((texto) => {
        console.log("Datos :: Update Usuario");
        console.log(texto);

        this.cleanForm();

        // Actualiza las listas
        this.setState({ banderUpdate: false });
        this.getListUsers();
        this.getListAdminUsers();

        alert("Usuario Actualizado");
      })
      .catch((err) => console.log(err));
  };

  /**
   * Event submit of form
   */
  async handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      this.setState({ validated: false });
    } else {
      if (this.state.banderUpdate) {
        // Update User
        this.updateUser();
      } else {
        // Add user
        let result = await ApiServices.validateUserExists(
          this.state.name,
          false
        );

        console.log(result);

        if (result !== null) {
          alert("El Nombre de Usuario ya existe");
        } else {
          result = await ApiServices.validateEmailExists(this.state.email);

          console.log(result);
          if (result !== null) {
            if (result.length > 0) {
              alert(
                "No es posible el Alta de Usuario \n El Correo ya esta ligado a un Nombre de Usuario"
              );
            } else {
              this.addUser();
            }
          }
        }
      }
    }

    this.setState({ validated: true });
  }

  /**
   * Even on inputs to update value of data
   */
  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  /**
   * Show a specifi user after select
   */
  selectUser = (e) => {
    this.setState({ userListsSelect: e.target.value });

    if (e.target.value > 0) {
      this.getUser(e.target.value);
    } else {
      this.cleanForm();
      this.setState({ banderUpdate: false });
    }
  };

  /**
   * Clean input on form
   */
  cleanForm = (e) => {
    this.setState({
      validated: false,
      name: "",
      location: "",
      email: "",
      profileid: 0,
      telephone: "",
      bossid: 0,
      userListsSelect: 0, // reset search select
      banderUpdate: false,
    });
  };

  render() {
    return (
      <>
        <NavBar perfilid={this.state.perfilid} history={this.props.history} />

        <div id="manage-users" className="manage-container">
          <div className="main-container">
            <div className="header-container">
              <div>
                <h3>Alta - Usuarios</h3>
              </div>
            </div>

            <div className="container">
              <Row className="justify-content-center">
                <Col sm="6" className="">
                  <Row>
                    <Form.Label column sm="3">
                      Buscar
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        as="select"
                        value={this.state.userListsSelect || ""}
                        onChange={this.selectUser.bind(this)}
                      >
                        <option value="0">Seleccionar Usuario..</option>
                        {this.state.usersList.map((item) => (
                          <option key={item.usuarioid} value={item.usuarioid}>
                            {item.nombrecompleto}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Form
                id="formid"
                noValidate
                name="validate"
                validated={this.state.validated}
                onSubmit={this.handleSubmit.bind(this)}
              >
                <Form.Row>
                  <Form.Group as={Col} sm="6" controlId="formName">
                    <Form.Label>Nombre Usuario</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nombre"
                      name="name"
                      value={this.state.name || ""}
                      onChange={this.handleChange.bind(this)}
                      required
                      disabled={this.state.banderUpdate}
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingresa el Nombre.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} sm="6" controlId="formLocation">
                    <Form.Label>Ubicacion</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ubicacion"
                      name="location"
                      value={this.state.location || ""}
                      onChange={this.handleChange.bind(this)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} sm="6" controlId="formEmail">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Correo"
                      name="email"
                      value={this.state.email || ""}
                      onChange={this.handleChange.bind(this)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingresa un Correo.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} sm="6" controlId="formProfile">
                    <Form.Label>Perfil</Form.Label>
                    <Form.Control
                      as="select"
                      name="profileid"
                      value={this.state.profileid || ""}
                      onChange={this.handleChange.bind(this)}
                      required
                    >
                      <option value="">Seleccionar Perfil..</option>
                      {this.state.profileList.map((item) => (
                        <option key={item.perfilid} value={item.perfilid}>
                          {item.perfilnombre}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Seleccion un Perfil.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} sm="6" controlId="formTelephoneN">
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Telefono"
                      name="telephone"
                      value={this.state.telephone || ""}
                      onChange={this.handleChange.bind(this)}
                      required
                      pattern="\d{10}"
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingresa un Telefono.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formBoss">
                    <Form.Label>Jefe Inmediato</Form.Label>
                    <Form.Control
                      as="select"
                      name="bossid"
                      value={this.state.bossid || ""}
                      onChange={this.handleChange.bind(this)}
                      required
                    >
                      <option value="">Selecciona un Jefe</option>
                      {this.state.adminUsersList.map((item) => (
                        <option key={item[0]} value={item[0]}>
                          {item[1]}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Seleccion un Jefe.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>

                <Form.Row className="justify-content-end">
                  <Col sm="auto" className="mb-2">
                    <Button
                      id="btn-clean"
                      onClick={this.cleanForm.bind(this)}
                      className="float-right"
                      variant="primary"
                    >
                      Limpiar <BsFillTrashFill />
                    </Button>
                  </Col>

                  <Col sm="auto" className="mb-2">
                    {this.state.banderUpdate ? (
                      <Button
                        className="float-right"
                        id="brn-update"
                        variant="primary"
                        type="submit"
                      >
                        Actualizar <MdSave />
                      </Button>
                    ) : (
                      <Button
                        id="brn-save"
                        className="float-right"
                        variant="primary"
                        type="submit"
                      >
                        Guardar <BsFillPersonPlusFill />
                      </Button>
                    )}
                  </Col>
                </Form.Row>
              </Form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Users;
