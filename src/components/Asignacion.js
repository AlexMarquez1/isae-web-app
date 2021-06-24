import React from "react";
import "../assets/css/Asignacion.css";
import { Form, Col, Row, Button } from "react-bootstrap";
import {
  BootstrapTable,
  TableHeaderColumn,
  ExportCSVButton,
} from "react-bootstrap-table";
import { DragDropContext } from "react-beautiful-dnd";
import { BsSearch, BsFillPersonCheckFill } from "react-icons/bs";
import Column from "./Drag/Column";
import { URL_SERVICES, URL } from "../constants/contants.js";
import NavBar from "../components/NavBar";

class Asignacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_btn_assing: false,
      habilitarBtn: true,
      describe: "Buscar",
      usersList: [], // Lista de todos los empleados a cargo del Usuario
      userListProyect: [], // Lista de todos los empleados de formulario por proyecto
      userListSelect: 0, // Valor por default del select del area de busqueda
      userListSelectProyecto: 0, //Lista de formulario por proyecto
      projectSelect: 0, // Valor por default del select de projectos
      projectSelectP: 0, // Valor por default del select de projectos

      projectSelectEstado: 0, // Valor por default del select de projectos
      projectSelectLocalidad: 0, // Valor por default del select de projectos

      projectsList: [], // Lista de proyectos
      projectsListP: [], // Lista de proyectos
      inventarioList: [], // Lista de inventarios
      estadosList: [], // Lista de estados
      localidadesList: [], // Lista de localidades

      employeeSelected: [],
      numIterator: 0,

      // Option to Table of Employs
      options: {
        sizePerPageList: [
          {
            text: "5",
            value: 5,
          },
          {
            text: "10",
            value: 10,
          },
          {
            text: "15",
            value: 15,
            //text: 'All', value: inventariosid.length
          },
        ], // you can change the dropdown list for size per page
        sizePerPage: 5, // which size per page you want to locate as default
        paginationPosition: "top", // default is bottom, top and both is all available
        noDataText: "Sin registros",
      },
      selectRow: {
        mode: "checkbox",
        bgColor: "",
        className: "my-selection-custom",
      },
      perfilid: JSON.parse(this.props.userdata).perfilid,
    };

    console.log(this.state);
    this.getListAdminUsers();
  }

  /**
   * Get List of Users to show on Search select options
   */

  getListAdminUsers() {
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
        this.setState({ usersList: usersList, userListProyect : usersList });
      })
      .catch((err) => console.log(err));
  }


  /**
   * Get List of Projects
   */
  getListProjectsP(idusuario) {

    document.querySelector(".loader").classList.add("show");
		document.querySelector(".back-loader").classList.add("show");

    //let url = URL_SERVICES + `inventario/projectsid`;
    // let url= "https://cookysoft.com/serving-web-content-0.0.1-SNAPSHOT/lista/proyectos";
    let url= `${URL}lista/SinAsignacion/proyecto/${idusuario}`;

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
      .then((projectsList) => {
        console.log(projectsList);
        this.setState({ projectsListP: projectsList });
        document.querySelector(".loader").classList.remove("show");
				document.querySelector(".back-loader").classList.remove("show");
      })
      .catch((err) => console.log(err));
  }
  getListProjects(idusuario) {

    

    //let url = URL_SERVICES + `inventario/projectsid`;
    let url= `${URL}lista/Asignacion/proyectos/${idusuario}`;

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
      .then((projectsList) => {
        console.log(projectsList);
        this.setState({ projectsList: projectsList });
      })
      .catch((err) => console.log(err));
  }

  /**
   * Obtiene la Lista del Inventario por proyecto
   */
  getListInventario(projectid, usuarioid) {
    document.querySelector("#loader").classList.add("show");
		document.querySelector("#back-loader").classList.add("show");
    console.log("getListInventario :: Proyecto id: " + projectid);
    let url = URL_SERVICES + `inventario/projects/noasign/${projectid}`;
    let headers = { "Content-type": "application/json;" };

    // Request options
    let options = {
      method: "GET",
      mode: "cors",
      cache: "default",
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((projectsInv) => {
        console.log(projectsInv);
        this.setState({ inventarioList: projectsInv });
        document.querySelector("#loader").classList.remove("show");
				document.querySelector("#back-loader").classList.remove("show");
      })
      .catch((err) => console.log(err));
  }

  /**
   * Obtiene la Lista de los Estados del Inventario del proyecto Selecccionado
   */
  getInvEstados(id) {
    console.log("getInvEstados :: Proyecto id: " + id);
    let url = URL_SERVICES + `inventario/projects/estado/${id}`;

    let headers = { "Content-type": "application/json;" };

    // Request options
    let options = {
      method: "GET",
      mode: "cors",
      cache: "default",
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((estadoInv) => {
        console.log(estadoInv);
        this.setState({ estadosList: estadoInv });
      })
      .catch((err) => console.log(err));
  }

  /**
   * Obtiene la Lista de las localidades de los Estados del Inventario del proyecto Selecccionado
   */
  getInvLocalidades(idproyecto, estado) {
    let url = URL_SERVICES + `inventario/projects/localidades`;

    const dataCampos = new FormData();
    dataCampos.append("proyectoid", idproyecto);
    dataCampos.append("estado", estado);

    let headers = { "Content-type": "application/json;" };

    // Request options
    let options = {
      method: "POST",
      mode: "cors",
      cache: "default",
      body: dataCampos,
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((localidades) => {
        console.log(localidades);
        this.setState({ localidadesList: localidades });
      })
      .catch((err) => console.log(err));
  }

  /**
   * Get List of Inventario Asignado al Usuario
   */
  getListInventarioUsuarios(idusuario) {
    let url = URL_SERVICES + `inventario/projects/user/${idusuario}`;

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
      .then((invuser) => {
        console.log(invuser);
        this.setState({ inventarioList: invuser });
      })
      .catch((err) => console.log(err));
  }

  /**
   * Select a User
   */

  selectUserProyect = (e) => {
    console.log("Usuario seleccionado: "+e.target.value);
    this.setState({
      userListSelectProyecto: e.target.value,
      projectSelectP: 0,
      projectsListP: [],
      habilitarBtn: true,
    });
    if(e.target.value > 0){
      this.getListProjectsP(e.target.value);
    }
  };

  selectUser = (e) => {
    this.setState({
      userListSelect: e.target.value,
      projectSelect: 0,
      projectSelectEstado: "",
      projectSelectLocalidad: "",
      projectsList: [],
      estadosList: [],
      localidadesList: [],
      inventarioList: [],
    });

    this.refs.refEstado.cleanFiltered();
    this.refs.refLocalidad.cleanFiltered();

    if (e.target.value > 0) {
      console.log(this.state.show_btn_assing);

      if (this.state.show_btn_assing) {
        this.getListInventarioUsuarios(e.target.value);
      } else {
        this.getListProjects(e.target.value);
      }
    } else {
    }
  };

  /**
   * List of projects :: Select project onChancge
   * @param {*} e
   */
  selectProjectP = (e) => {
    e.preventDefault();

    if(e.target.value > 0){
      this.setState({
        projectSelectP: e.target.value,
        habilitarBtn : false,
      });
    }else{
      this.setState({
        projectSelectP: e.target.value,
        habilitarBtn : true,
      });
    }

    
    //Condicion para habilitar el boton de asignar :)
  };

  selectProject = (e) => {
    e.preventDefault();

    this.setState({
      projectSelect: e.target.value,
      projectSelectEstado: "",
      estadosList: [],
      projectSelectLocalidad: "",
      localidadesList: [],
    });

    this.refs.tableinv.cleanSelected();
    this.refs.refEstado.cleanFiltered();
    this.refs.refLocalidad.cleanFiltered();

    if (e.target.value > 0) {
      console.log("Proyecto id: " + this.state.projectSelect);
      console.log("Proyecto id: " + e.target.value);
      console.log("Usuaeio ID: " + this.state.userListSelect);

      this.getListInventario(e.target.value, this.state.userListSelect);
      this.getInvEstados(e.target.value);
    } else {
      this.setState({
        projectSelectEstado: "",
        estadosList: [],
        inventarioList: [],
      });
    }
  };

  /**
   *
   * @param {*} e
   */
  selectProjectEstado = (e) => {
    e.preventDefault();

    this.setState({
      projectSelectEstado: e.target.value,
      projectSelectLocalidad: "",
      localidadesList: [],
    });
    this.refs.tableinv.cleanSelected();
    this.refs.refLocalidad.cleanFiltered();

    if (e.target.value !== "") {
      console.log("Project id: " + this.state.projectSelect);
      console.log("Estado: " + e.target.value);

      this.refs.refEstado.applyFilter(e.target.value);

      this.getInvLocalidades(this.state.projectSelect, e.target.value);
    } else {
      this.refs.refEstado.cleanFiltered();
    }
  };

  /**
   *
   * @param {*} e
   */
  selectProjectLocalidad = (e) => {
    e.preventDefault();

    this.setState({ projectSelectLocalidad: e.target.value });

    this.refs.tableinv.cleanSelected();
    this.refs.refLocalidad.applyFilter(e.target.value);

    if (e.target.value == "") {
      this.refs.refLocalidad.cleanFiltered();
    }
  };

  asignarProyecto = (e) => {
    e.preventDefault();
    console.log("Click add Proyecto");

    //let url = URL_SERVICES + `inventario_usuarios`;
    let url = `${URL}asignar/proyecto/${this.state.projectSelectP}/${this.state.userListSelectProyecto}`;


    if (this.state.userListSelectProyecto > 0) {
      if (this.state.projectSelectP > 0) {
          
        let headers = { "Content-type": "application/json;" };

        // Request options
        let options = {
          method: "GET",
          mode: "cors",
          cache: "default",
          header: headers,
        };
          fetch(url, options)
            .then((response) => response.text())
            .then((texto) => {
              console.log("Datos :: Asignacion de Proyecto");
              console.log(texto);
            })
            .catch((err) => console.log(err));

          this.setState({
            userListSelectProyecto: 0,
            projectSelectP:0,
            habilitarBtn: true,
          });

            alert("Proyecto Asignado");
      } else {
        alert("Selecciona un Proyecto para asignar");
      }
    } else {
      alert("Selecciona un Usuario para asignar");
    }
  };
  asignInventario = (e) => {
    e.preventDefault();
    console.log("Click add inventario");
    console.log(this.refs.tableinv.store);
    console.log(this.refs.tableinv.store.selected);
    console.log(this.refs.tableinv.store.filteredData);

    let url = URL_SERVICES + `inventario_usuarios`;
    var data =
      this.refs.tableinv.store.selected.length > 0
        ? this.refs.tableinv.store.selected
        : this.refs.tableinv.store.filteredData
        ? this.refs.tableinv.store.filteredData
        : this.state.inventarioList;

    console.log(data);

    if (this.state.userListSelect > 0) {
      if (this.state.projectSelect > 0) {
        for (var i = 0; i < data.length; i++) {
          var item = data[i];
          var invid =
            this.refs.tableinv.store.selected.length > 0
              ? data[i]
              : item.inventarioid;

          console.log(item);
          console.log(this.state.userListSelect);
          console.log(invid);

          const dataCampos = new FormData();
          dataCampos.append("usuarioid", this.state.userListSelect);
          dataCampos.append("inventarioid", invid);

          let options = {
            method: "POST",
            body: dataCampos,
            mode: "cors",
            cache: "default",
          };

          fetch(url, options)
            .then((response) => response.text())
            .then((texto) => {
              console.log("Datos :: Asignación Inventario");
              console.log(texto);
            })
            .catch((err) => console.log(err));

          if (i + 1 === data.length) {
            this.setState({
              inventarioList: [],
            });

            this.setState({
              userListSelect: 0,
              projectSelect: 0,
              projectSelectEstado: "",
              projectSelectLocalidad: "",
              projectsList: [],
              estadosList: [],
              localidadesList: [],
              inventarioList: [],
            });

            alert("Inventario Asignado");
          }
        }
      } else {
        alert("Selecciona un Proyecto");
      }
    } else {
      alert("Selecciona un Usuario");
    }
  };

  /**
   *
   */
  selectProjectSearch = (e) => {
    console.log("Search -----");
  };

  /**
   * Selecciona el boton con la accion a realziar
   * @param {*} e
   */
  selectAction = (e) => {
    e.preventDefault();

    this.setState({
      userListSelect: 0,
      projectSelect: 0,
      projectSelectEstado: "",
      projectSelectLocalidad: "",
      projectsList: [],
      estadosList: [],
      localidadesList: [],
      inventarioList: [],
    });

    console.log(this.state.show_btn_assing);

    if (this.state.show_btn_assing === true) {
      this.setState({ show_btn_assing: false, describe: "Buscar" });
    } else {
      this.setState({ show_btn_assing: true, describe: "Asignar" });
    }
  };

  render() {
    return (
      <React.Fragment>
        <NavBar perfilid={this.state.perfilid} history={this.props.history} />

        <div id="asign-projects" className="manage-container">
          <div className="main-container">
            <div className="header-container">
              <div>
                <h3>Asignación</h3>
              </div>
            </div>

            <div id="asign-projects" className="manage-container">
          <div className="main-container">

            <div className="container">
            <div className="loader">
									<img src="../loading.gif" alt="loading"></img>
								</div>
								<div className="back-loader"></div>
              <Row>
                <div className="header-container">
              <div>
                <h3>Asignación de Proyecto</h3>
              </div>
            </div>
              </Row>

              <Row className="justify-content-center">
                <Col sm="6" className="">
                  <Row>
                    <Form.Label column sm="4">
                      Empleados
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        as="select"
                        value={this.state.userListSelectProyecto || "0"}
                        onChange={this.selectUserProyect.bind(this)}
                      >
                        <option value="0">Seleccionar Usuario..</option>
                        {this.state.userListProyect.map((item) => (
                          <option key={item.usuarioid} value={item.usuarioid}>
                            {item.nombrecompleto}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    
                      <Form.Label column sn ="4">
                        Proyecto
                      </Form.Label>
                      <Col sm={8}>
                      <Form.Control
                        as="select"
                        value={this.state.projectSelectP || "0"}
                        onChange={this.selectProjectP.bind(this)}
                      >
                        <option value="0">Seleccionar Proyecto..</option>
                        {this.state.projectsListP.map((project, index) => (
                          <option key={project[0]} value={project[0]}>
                            {project[1]}
                          </option>
                        ))}
                      </Form.Control>
                      </Col>
                    
                  </Row>
                </Col>
              </Row>

              <Row className="justify-content-end">
                <Col sm="6" className="">
                  <Row>
                  <div className="btn-action">
                  <Button
                    onClick={this.asignarProyecto.bind(this)}
                    disabled={this.state.habilitarBtn}
                  >
                    Asignar Proyecto
                  </Button>
                </div>
                  </Row>
                </Col>
              </Row>

              <Row className="justify-content-start">
                
              </Row>

              <div>
                <div className="col-sm-12">
                  
                </div>
              </div>
            </div>
          </div>
        </div>

            <div className="container">
            <div id="loader" className="loader">
									<img src="../loading.gif" alt="loading"></img>
								</div>
								<div id="back-loader" className="back-loader"></div>
              <Row>
                <div className="btn-action">
                  <Button onClick={this.selectAction.bind(this)}>
                    {this.state.describe + " "}

                    {this.state.describe === "Buscar" ? (
                      <BsSearch />
                    ) : (
                        <BsFillPersonCheckFill />
                    )}

                  </Button>
                </div>

                <div className="btn-action">
                  <Button
                    onClick={this.asignInventario.bind(this)}
                    disabled={this.state.show_btn_assing}
                  >
                    Asignar
                  </Button>
                </div>

                <div className="header-container">
              <div>
                <h3>Asignación</h3>
              </div>
            </div>
              </Row>

              <Row className="justify-content-center">
                <Col sm="6" className="">
                  <Row>
                    <Form.Label column sm="4">
                      Empleados
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        as="select"
                        value={this.state.userListSelect || "0"}
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

              <Row className="justify-content-start">
                {!this.state.show_btn_assing ? (
                  <>
                    <Col sm="4" className="">
                      <Form.Label>Proyecto</Form.Label>
                      <Form.Control
                        as="select"
                        value={this.state.projectSelect || "0"}
                        onChange={this.selectProject.bind(this)}
                      >
                        <option value="0">Seleccionar Proyecto..</option>
                        {this.state.projectsList.map((project, index) => (
                          <option key={project[0]} value={project[0]}>
                            {project[1]}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>

                    <Col sm="4" className="">
                      <Form.Label>Estado</Form.Label>
                      <Form.Control
                        as="select"
                        value={this.state.projectSelectEstado || ""}
                        onChange={this.selectProjectEstado.bind(this)}
                      >
                        <option value="">Seleccionar Estado..</option>
                        {this.state.estadosList.map((item) => (
                          <option key={item[1]} value={item[1]}>
                            {item[1]}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>

                    <Col sm="4" className="">
                      <Form.Label>Localidad</Form.Label>
                      <Form.Control
                        as="select"
                        value={this.state.projectSelectLocalidad || ""}
                        onChange={this.selectProjectLocalidad.bind(this)}
                      >
                        <option value="">Seleccionar Localidad..</option>
                        {this.state.localidadesList.map((item) => (
                          <option key={item[2]} value={item[2]}>
                            {item[2]}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </>
                ) : null}
              </Row>

              <div
                className={
                  !this.state.show_btn_assing
                    ? `row content-table mode-search`
                    : `row content-table`
                }
              >
                <div className="col-sm-12">
                  <BootstrapTable
                    ref="tableinv"
                    id="tableinventarios"
                    striped={true}
                    data={this.state.inventarioList}
                    keyField="inventarioid"
                    version="4"
                    pagination
                    options={this.state.options}
                    selectRow={
                      !this.state.show_btn_assing ? this.state.selectRow : []
                    }
                  >
                    <TableHeaderColumn
                      dataField="inventarioid"
                      hidden
                      className="active-column-header"
                      columnClassName="active-column-data"
                    >
                      ID INVENTARIO
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="proyecto"
                      className="active-column-header"
                      filter={{ type: "TextFilter", placeholder: "PROYECTO" }}
                      columnClassName="active-column-data"
                    >
                      PROYECTO
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="folio"
                      className="active-column-header"
                      filter={{ type: "TextFilter", placeholder: "FOLIO" }}
                      columnClassName="active-column-data"
                    >
                      FOLIO
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      ref="refEstado"
                      dataField="estado"
                      filter={{
                        type: "TextFilter",
                        condition: !this.state.show_btn_assing ? "eq" : "like",
                        placeholder: "ESTADO",
                      }}
                      className="active-column-header"
                      columnClassName="active-column-data"
                    >
                      ESTADO
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      ref="refLocalidad"
                      dataField="localidad"
                      filter={{
                        type: "TextFilter",
                        condition: !this.state.show_btn_assing ? "eq" : "like",
                        placeholder: "LOCALIDAD",
                      }}
                      className="active-column-header"
                      columnClassName="active-column-data"
                    >
                      LOCALIDAD
                    </TableHeaderColumn>
                  </BootstrapTable>
                </div>
              </div>
            </div>
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default Asignacion;
