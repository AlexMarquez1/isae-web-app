import React from "react";
import { Form, Col, Row, Button, Accordion, Card } from "react-bootstrap";
import { BsUpload } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { MdSave } from "react-icons/md";
import { URL_SERVICES } from "../constants/contants.js";
import { URL } from "../constants/contants.js";
import "../assets/css/ReadFile.css";
import { CustomToggle } from "../components/Customs/CustomToggle.js";
import { NavBar } from "../components/NavBar";

class ReadFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectsIds: [], // Id´s proyectos to show on select options
      formcampos: [], // campos para crear el formulario
      modeloequipo: [],
      modelomonitor: [],
      modeloteclado: [],
      modelomause: [],
      modeloups: [],

      modelomaletin: [],

      estado: [], // Select optios :: Lista de estados
      colonia: [], // Select optios :: Lista de colonias
      localidad: [], // Select options :: Lista Localidades

      project: [], // Proyoecto, datos de la tabla tbl_proyecto
      projectArr: [], // Arreglo de Arreglos [key, value]
      projectid: 0,
      validated: false, // Estado de validación del formulario
      typeofload: "Formulario",
      banderatypeofload: false,

      inputsBeforeValue: "",
      perfilid: JSON.parse(this.props.userdata).perfilid,
    };
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  /**
   * On Load Page
   */
  componentDidMount() {
    this.obtenerDatos();
    //this.obtenerFormCampos();
  }

  /**
   * Obtiene los datos de proyectos, llena el select de proyectos,
   * Obtiene los id´s de los proyecto existentes (inventario)
   */
  obtenerDatos = async () => {
    //let url = URL_SERVICES + "projects";
    let url= `${URL}lista/Asignacion/proyectos/${JSON.parse(this.props.userdata).usuarioid}`;

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
      .then((projects) => {
        console.log(projects);
        this.setState({ projectsIds: projects });
      })
      .catch((err) => console.log(err));
  };

  /**
   * Obtiene los datos para armar el formulario de alta de inventario
   */
  obtenerFormCampos = async (idproject) => {
    let url = URL_SERVICES + `formcamposgroup/${idproject}`;

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
      .then((formcampos) => {
        console.log(formcampos);
        this.setState({ formcampos: formcampos });
      })
      .catch((err) => console.log(err));
  };

  /**
   * Obtiene los datos de los modelos de la marca seleccionada
   */
  obtenerSelectedModelos = async (idmarca, name) => {
    console.log("obtenerSelectedModelos");
    let url = URL_SERVICES + `marcamodelo/modelos/${idmarca}`;

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
      .then((modelos) => {
        console.log(modelos);
        console.log(name);
        this.setState({ [name]: modelos });
      })
      .catch((err) => console.log(err));
  };

  /**
   * Obtiene el proyecto de la tabla proyectos, (Campos con Banderas para validar o no el campo)
   */
  getDataProjectFields = async (id) => {
    console.log("get by ID");
    let url = URL_SERVICES + `project/${id}`;

    let headers = { "Content-type": "application/json;" };

    let options = {
      method: "GET",
      mode: "cors",
      cache: "default",
      header: headers,
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((project) => {
        console.log("Datos");
        console.log(project);

        this.setState({ project: project });

        if (this.state.banderatypeofload === true) {
          console.log("Ged Data for Form");
          this.obtenerFormCampos(id);
        }
      })
      .catch((err) => console.log(err));
  };

  /**
   * Select options of projects
   *  */

  SelectProjec = (e) => {
    /*Select inventario by project, on select options*/
    var id = e.target.value;

    this.setState({ validated: false, projectid: id, project: [] });

    if (id > 0) {
      this.getDataProjectFields(id);
    } else {
      this.setState({ formcampos: [] });
    }
  };

  fileChangedHandler = (e) => {
    e.preventDefault();

    if (e.target.files.length > 0) {
      var id_project = document.getElementById("combo-projects").value;

      if (id_project > 0) {
        var name_project = this.state.project[0].proyecto;
        var des_project = this.state.project[0].proyectodescripcion;

        console.log("id proyecto: " + id_project);

        var f = e.target.files[0];
        const dataCampos = new FormData();
        dataCampos.append("file", f);
        dataCampos.append("proyectoid", id_project);
        dataCampos.append("proyecto", name_project);
        dataCampos.append("proyectodescripcion", des_project);

        let url = URL_SERVICES + `inventario/uploadfile`;

        let headers = { "Content-type": "multipart/form-data" };
        let options = {
          method: "POST",
          body: dataCampos,
          header: headers,
        };

        fetch(url, options)
          .then((response) => response.blob())
          .then((blob) => {
            console.log(blob);
            //var file = window.URL.createObjectURL(blob);
            //window.location.assign(file);
            if (blob.size > 0) {
              var bad = document.getElementById("inventario_bad");
              bad.href = URL.createObjectURL(blob);
              bad.setAttribute("download", "Error_Inventario.xlsx");
              bad.click();

              alert("Archivo presenta Errores!");
            } else {
              alert("Archivo cargado Correctamente!");
            }

            this.setState({ project: [], projectid: 0 });
          })
          .catch((err) => console.log(err));
      } else {
        alert("Selecciona un proyecto");
      }

      document.getElementById("input-fileInv").value = "";
    } else {
      console.log("no File");
    }
  };

  loadFile = async (dataCampos, banderaAlert) => {
    console.log("Alta Archivo de inventario");
    let url = URL_SERVICES + `inventario/uploadfile`;

    let headers = { "Content-type": "application/json;" };

    let options = {
      method: "POST",
      mode: "cors",
      cache: "default",
      body: dataCampos,
    };

    fetch(url, options)
      .then((response) => response.text())
      .then((texto) => {
        console.log(texto);
        this.setState({ project: [] });
      })
      .catch((err) => console.log(err));
  };

  loadToDB = async (dataCampos, banderaAlert) => {
    //loadToDB = (dataCampos, banderaAlert) =>{
    console.log("Alta de inventario, por proyecto");
    let url = URL_SERVICES + `inventario`;

    let headers = { "Content-type": "application/json;" };

    let options = {
      method: "POST",
      mode: "cors",
      cache: "default",
      body: dataCampos,
      header: headers,
    };

    fetch(url, options)
      .then((response) => response.text())
      .then((texto) => {
        console.log(texto);
        this.setState({ project: [] });
      })
      .catch((err) => console.log(err));
  };

  /**
   * Load bad inventario to DB only to create a file that contains details of that inventario
   * @param {*} dataCampos
   */
  loadBadToDB = (dataCampos) => {
    console.log("Alta Inventario Erroneo");
    let url = URL_SERVICES + "inventario/bad";

    let headers = { "Content-type": "application/json;" };

    let options = {
      method: "POST",
      mode: "cors",
      cache: "default",
      body: dataCampos,
      header: headers,
    };

    fetch(url, options)
      .then((response) => response.text())
      .then((texto) => {
        console.log(texto);
        this.setState({ project: [] });
      })
      .catch((err) => console.log(err));
  };

  /**
   * Delete bad inventario of BD on temporary table
   * @param {*} dataCampos
   */
  deleteBadDB = (dataCampos) => {
    console.log("Delete Inventario Erroneo");
    let url = URL_SERVICES + `inventario/bad`;

    let headers = { "Content-type": "application/json;" };

    let options = {
      method: "DELETE",
      mode: "cors",
      cache: "default",
      header: headers,
    };

    fetch(url, options)
      .then((response) => response.text())
      .then((texto) => {
        console.log(texto);
        this.setState({ projectid: 0, project: [] });
      })
      .catch((err) => console.log(err));
  };

  clickUpload = (e) => {
    e.preventDefault();
    console.log("active inputfile");
    var input_file = document.getElementById("input-fileInv");
    input_file.click();
  };

  /**
   * Event submit of form
   */
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.projectid > 0) {
      const form = e.currentTarget;

      if (form.checkValidity() === false) {
        e.stopPropagation();

        this.setState({ validated: false });
      } else {
        const dataCampos = new FormData(form);
        var apaterno = "";
        var amaterno = "";
        var nombres = "";

        dataCampos.append("proyectoid", this.state.projectid);
        dataCampos.append("proyecto", this.state.project[0].proyecto);
        dataCampos.append(
          "proyectodescripcion",
          this.state.project[0].proyectodescripcion
        );
        dataCampos.append("estatus", "Nuevo");

        // Nombre Usuario
        apaterno =
          dataCampos.get("apaterno") === null ? "" : dataCampos.get("apaterno");
        amaterno =
          dataCampos.get("amaterno") === null ? "" : dataCampos.get("amaterno");
        nombres =
          dataCampos.get("nombres") === null ? "" : dataCampos.get("nombres");
        dataCampos.append(
          "nombrecompleto",
          nombres + " " + apaterno + " " + amaterno
        );

        // Nombre jefe
        apaterno =
          dataCampos.get("apellidosjefe") === null
            ? ""
            : dataCampos.get("apellidosjefe");
        amaterno =
          dataCampos.get("apellidos2jefe") === null
            ? ""
            : dataCampos.get("apellidos2jefe");
        nombres =
          dataCampos.get("nombresjefe") === null
            ? ""
            : dataCampos.get("nombresjefe");
        dataCampos.append(
          "nombrecompletojefe",
          nombres + " " + apaterno + " " + amaterno
        );

        // Nombre Resguardo
        apaterno =
          dataCampos.get("apellidosresguardo") === null
            ? ""
            : dataCampos.get("apellidosresguardo");
        amaterno =
          dataCampos.get("apellidos2resguardo") === null
            ? ""
            : dataCampos.get("apellidos2resguardo");
        nombres =
          dataCampos.get("nombresresguardo") === null
            ? ""
            : dataCampos.get("nombresresguardo");
        dataCampos.append(
          "nombrecompletoresguardo",
          nombres + " " + apaterno + " " + amaterno
        );

        // Nombre Responsable
        apaterno =
          dataCampos.get("apellidosresponsable") === null
            ? ""
            : dataCampos.get("apellidosresponsable");
        amaterno =
          dataCampos.get("apellidos2responsable") === null
            ? ""
            : dataCampos.get("apellidos2responsable");
        nombres =
          dataCampos.get("nombresresponsable") === null
            ? ""
            : dataCampos.get("nombresresponsable");
        dataCampos.append(
          "nombrecompletoresponsable",
          nombres + " " + apaterno + " " + amaterno
        );

        // Nombre Pemex
        apaterno =
          dataCampos.get("apellidospemex") === null
            ? ""
            : dataCampos.get("apellidospemex");
        amaterno =
          dataCampos.get("apellidos2pemex") === null
            ? ""
            : dataCampos.get("apellidos2pemex");
        nombres =
          dataCampos.get("nombrespemex") === null
            ? ""
            : dataCampos.get("nombrespemex");
        dataCampos.append(
          "nombrecompletopemex",
          nombres + " " + apaterno + " " + amaterno
        );

        // Datos Ubicacion
        var value;
        if (dataCampos.get("estadoinput") !== "") {
          value = dataCampos.get("estadoinput");
          dataCampos.delete("estado");
          dataCampos.delete("estadoinput");
          dataCampos.append("estado", value);
        }

        if (dataCampos.get("localidadinput") !== "") {
          value = dataCampos.get("localidadinput");
          dataCampos.delete("localidad");
          dataCampos.delete("localidadinput");
          dataCampos.append("localidad", value);
        }

        if (dataCampos.get("coloniainput") !== "") {
          value = dataCampos.get("coloniainput");
          dataCampos.delete("colonia");
          dataCampos.delete("coloniainput");
          dataCampos.append("colonia", value);
        }

        this.loadToDBInventario(dataCampos);
      }

      this.setState({ validated: true });
    } else {
      alert("Selecciona un Proyecto");
    }
  };

  /**
   * Event reset of form
   */
  handleReset = (e) => {
    console.log("Reset Form");

    this.setState({ validated: false }); // Reset select option
    this.cleanSelectOptions(); // Clean Select options

    //this.setState({ validated: false, projectid: 0, project: [] }); // Reset select option if needs delete te current proyect selected
  };

  /**
   * Select type of load, File or by Form
   * @param {*} e
   */
  selectTypeLoad = (e) => {
    if (this.state.typeofload === "Formulario") {
      if (this.state.projectid > 0) {
        var btnclean = document.getElementById("btn-clean");

        if (btnclean) btnclean.click();

        console.log(this.state.projectid);
        console.log(this.state.project);

        this.setState({ validated: false });
        this.obtenerFormCampos(this.state.projectid);
        this.setState({ typeofload: "Archivo", banderatypeofload: true });
      } else {
        alert("Selecciona un Proyecto");
      }
    } else {
      this.setState({ typeofload: "Formulario", banderatypeofload: false });
    }
  };

  /**
   * Load data of Form to Database
   */
  loadToDBInventario = (dataCampos) => {
    console.log("Alta de inventario, por proyecto");
    let url = URL_SERVICES + `inventario`;

    let headers = { "Content-type": "application/json;" };

    let options = {
      method: "POST",
      mode: "cors",
      cache: "default",
      body: dataCampos,
      header: headers,
    };

    fetch(url, options)
      .then((response) => response.text())
      .then((texto) => {
        console.log(texto);
        this.cleanForm();
        alert("Inventario Cargado");
      })
      .catch((err) => console.log(err));
  };

  /**
   * Event on elements to update value of data
   */
  onSelectChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const idmarca = e.target.options[e.target.selectedIndex].id; // Id de la marca, ya que el value trae el valor en texto
    const selectdepend = e.target.dataset.selectdepend;
    const tipocampo = e.target.dataset.tipocampo; // Tipo campo, donde se especifica si corresponde a un select
    const catalogoid = e.target.dataset.catalogoid;

    if (name === "estado" || name === "colonia" || name === "localidad") {
      var input = document.getElementsByName(name + "input")[0];

      if (value === "") {
        e.target.required = false;
        input.required = true;
      } else {
        input.value = "";
        e.target.required = true;
        input.required = false;
      }
    }

    if (value !== "") {
      if (idmarca > 0) {
        if (selectdepend == 1) {
          this.obtenerSelectedModelos(idmarca, name.replace("marca", "modelo"));
        }
      } else {
        this.setState({ [name.replace("marca", "modelo")]: [] });
      }
    } else if (value === "" && selectdepend == 1) {
      this.setState({ [name.replace("marca", "modelo")]: [] });
    }
  };

  /**
   *
   * @param {*} e
   */
  onInputFocus = (e) => {
    this.setState({ inputsBeforeValue: e.target.value });
  };

  /**
   *
   * @param {*} e
   */
  onInputBlur = (e) => {
    var value = e.target.value;
    var name = e.target.name;

    if (value !== "") {
      this.refs[e.target.name].setCustomValidity("");
      e.target.value = e.target.value.trim();
    }

    if (name == "correo" && value != "") {
      var patternStr = e.target.pattern;
      var pattern = new RegExp(patternStr === "*" ? "/*/" : patternStr);

      if (!pattern.test(value)) {
        const alert = e.target.dataset.alerta;

        e.target.setCustomValidity(alert);
        e.target.reportValidity();
      } else {
        e.target.setCustomValidity("");
      }
    }

    this.setState({ inputsBeforeValue: "" });
  };

  /**
   * Event onBlur, Codigo Postal element to update selects
   * @param {*} e
   */
  onInputChange = (e) => {
    var name = e.target.name;
    var value = e.target.value.toUpperCase();

    if (name === "cp") {
      if (value !== "") this.getLocations(value);
    } else if (
      name === "estadoinput" ||
      name === "coloniainput" ||
      name === "localidadinput"
    ) {
      var select = document.getElementsByName(name.replace("input", ""))[0];

      if (value === "") {
        select.required = true;
        e.target.required = true;
      } else {
        select.selectedIndex = "0";
        select.required = false;
      }
    } else {
      if (e.target.required) {
        var patternStr = e.target.pattern;

        if (patternStr === "*") patternStr = "/*/";

        if (patternStr !== "no pattern") {
          var pattern = new RegExp(patternStr);

          if (name != "correo") {
            if (value != "" && !pattern.test(value)) {
              const alert = e.target.dataset.alerta;

              e.target.value = this.state.inputsBeforeValue;
              e.target.setCustomValidity(alert);
              e.target.reportValidity();
            } else {
              if (value !== "") e.target.setCustomValidity("");

              e.target.value = value.toUpperCase();

              this.setState({
                inputsBeforeValue:
                  name != "correo" ? value : value.toUpperCase(),
              });
            }
          }
        }
      } else {
        if (name != "correo") e.target.value = value.toUpperCase();
      }
    }
  };

  getLocations = async (cp) => {
    let url = URL_SERVICES + `localidades/cp/${cp}`;

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
      .then((locations) => {
        console.log(locations);

        console.log(locations[0]); // Estados
        console.log(locations[1]); // Localidades

        this.setState({
          estado: locations[0],
          localidad: locations[1],
          colonia: locations[2],
        });
      })
      .catch((err) => console.log(err));
  };

  /**
   *
   */
  cleanForm = () => {
    var btnclean = document.getElementById("btn-clean");

    this.setState({
      validated: false,
      projectid: 0,
      project: [],
      formcampos: [],
    });

    this.cleanSelectOptions(); // Clean Select options

    if (btnclean) btnclean.click(); // Clean inputs
  };

  /**
   * Clean All select option into form
   */
  cleanSelectOptions = () => {
    this.setState({
      modeloequipo: [],
      modelomonitor: [],
      modeloteclado: [],
      modelomause: [],
      modeloups: [],
      modelomaletin: [],
      estado: [], // Select optios :: Lista de estados
      colonia: [], // Select optios :: Lista de colonias
      localidad: [],
    });
  };

  topScroll = () => function (refgroup) {};

  render() {
    return (
      <>
        <NavBar perfilid={this.state.perfilid} history={this.props.history} />

        <div id="readproyect" className="manage-container">
          <input
            id="input-fileInv"
            hidden
            type="file"
            name="avatar"
            accept=".xlsx"
            onChange={this.fileChangedHandler.bind(this)}
          />

          <div className="main-container">
            <div className="header-container">
              <div>
                <h3>Validar Archivo - Proyecto</h3>
              </div>
            </div>

            <div className="container">
              <hr></hr>

              <div className="row">
                <div className="col-sm-6">
                  <Button onClick={this.selectTypeLoad.bind(this)}>
                    {this.state.typeofload}
                  </Button>
                </div>
              </div>

              <hr></hr>

              <Row className="">
                <Col sm="6" className="">
                  <Form.Label>Proyecto:</Form.Label>
                  <Form.Control
                    id="combo-projects"
                    as="select"
                    name="projectid"
                    value={this.state.projectid}
                    onChange={this.SelectProjec.bind(this)}
                    required
                  >
                    <option value="0">Seleccionar Proyecto..</option>
                    {this.state.projectsIds.map((item) => (
                      <option key={item[0]} value={item[0]}>
                        {item[1]}
                      </option>
                    ))}
                  </Form.Control>
                </Col>

                {!this.state.banderatypeofload ? (
                  <Col sm="6" className="">
                    <Form.Label>Carga Archivo:</Form.Label>
                    <div>
                      <Button onClick={this.clickUpload.bind(this)}>
                        <BsUpload />
                      </Button>
                    </div>
                  </Col>
                ) : null}
              </Row>

              {this.state.banderatypeofload ? (
                <Form
                  id="formCampos"
                  noValidate
                  name="validate"
                  validated={this.state.validated}
                  onSubmit={this.handleSubmit.bind(this)}
                  onReset={this.handleReset.bind(this)}
                >
                  <Form.Row>
                    <React.Fragment>
                      <Accordion>
                        {this.state.formcampos.map((item) => (
                          <Card
                            data-numcampos={item.listCampos.length}
                            id={`card-group-` + item.agrupacionid}
                            key={`card-group` + item.agrupacionid}
                          >
                            <Card.Header
                              ref={`card-header-` + item.agrupacionid}
                            >
                              <CustomToggle
                                refgroupid={item.agrupacionid}
                                refgroup={`card-group-` + item.agrupacionid}
                                eventKey={item.agrupacionid}
                              >
                                {item.agrupacion}
                              </CustomToggle>
                            </Card.Header>

                            <Accordion.Collapse eventKey={item.agrupacionid}>
                              <Card.Body className="row">
                                {item.listCampos.map((campos) =>
                                  this.state.project.length > 0 &&
                                  this.state.project[0][campos.columnname] ? (
                                    <Form.Group
                                      key={`group` + campos.campoid}
                                      as={Col}
                                      md="6"
                                      controlId={`formcampo` + campos.campoid}
                                    >
                                      <Form.Label
                                        key={`label` + campos.campoid}
                                      >
                                        {campos.campo}
                                      </Form.Label>

                                      {
                                        // Se despliega un elemento select
                                        //campos.catalogoData || campos.selectdepend === 2 ?
                                        Number.isInteger(
                                          Number.parseInt(campos.catalogoid)
                                        ) || campos.selectdepend === 2 ? (
                                          <>
                                            <Form.Control
                                              key={`select` + campos.campoid}
                                              as="select"
                                              onChange={this.onSelectChange.bind(
                                                this
                                              )}
                                              ref={campos.columnname}
                                              name={campos.columnname}
                                              data-alerta={campos.alerta}
                                              data-selectdepend={
                                                campos.selectdepend
                                              } // Tipo de Select [(NUll, 0) = Simple] [(1) = Select Padre "Marca"] [(2) = Select Hijo "Modelo"]
                                              data-catalogoid={
                                                campos.catalogoid
                                              } // Almacena: Select = ID del Catalogo
                                              data-tipocampo={campos.tipocampo} // Almacena: Select = ID del Catalogo, Input: Tipo Campo "Numerico", "Alfanumerico"
                                              required={
                                                this.state.project.length > 0
                                                  ? this.state.project[0][
                                                      campos.columnname
                                                    ]
                                                    ? true
                                                    : false
                                                  : false
                                              }
                                              data-required={
                                                this.state.project.length > 0
                                                  ? this.state.project[0][
                                                      campos.columnname
                                                    ]
                                                  : "no required"
                                              }
                                              data-pattern={
                                                campos.pattern
                                                  ? campos.pattern
                                                  : "no pattern"
                                              }
                                              disabled={
                                                campos.columnname ===
                                                  "estado" ||
                                                campos.columnname ===
                                                  "colonia" ||
                                                campos.columnname ===
                                                  "localidad"
                                                  ? this.state[
                                                      campos.columnname
                                                    ].length > 0
                                                    ? false
                                                    : true
                                                  : false
                                              }
                                            >
                                              <option value="">
                                                {`SELECCIONAR ` + campos.campo}
                                                ..
                                              </option>
                                              {
                                                // Opcion 2, select que depende de otro elemento (Marca -> Modelo, Codigo Postal)
                                                campos.selectdepend === 2
                                                  ? this.state[
                                                      campos.columnname
                                                    ].map((modelo) => (
                                                      <option
                                                        key={
                                                          modelo.idmarcamodelo
                                                        }
                                                        id={
                                                          modelo.idmarcamodelo
                                                        }
                                                        value={modelo.modelo}
                                                      >
                                                        {modelo.modelo}
                                                      </option>
                                                    ))
                                                  : // Datos Ubicación
                                                  campos.columnname ===
                                                      "estado" ||
                                                    campos.columnname ===
                                                      "colonia" ||
                                                    campos.columnname ===
                                                      "localidad"
                                                  ? campos.columnname ===
                                                    "estado"
                                                    ? this.state.estado.map(
                                                        (cat) => (
                                                          <option
                                                            key={cat.cestado}
                                                            id={cat.cestado}
                                                            value={cat.estado}
                                                          >
                                                            {cat.estado}
                                                          </option>
                                                        )
                                                      )
                                                    : campos.columnname ===
                                                      "localidad"
                                                    ? this.state.localidad.map(
                                                        (cat) => (
                                                          <option
                                                            key={cat.mnpio}
                                                            id={cat.mnpio}
                                                            value={
                                                              cat.mnpiodEstado
                                                            }
                                                          >
                                                            {cat.mnpiodEstado}
                                                          </option>
                                                        )
                                                      )
                                                    : campos.columnname ===
                                                      "colonia"
                                                    ? this.state.colonia.map(
                                                        (cat) => (
                                                          <option
                                                            key={
                                                              cat.idAsentacpcons
                                                            }
                                                            id={
                                                              cat.idAsentacpcons
                                                            }
                                                            value={cat.asenta}
                                                          >
                                                            {cat.asenta}
                                                          </option>
                                                        )
                                                      )
                                                    : null
                                                  : // Select Es un select sin dependencias, se llena con el contenido del respectivo catalog
                                                    campos.catalogoData.map(
                                                      (cat) => (
                                                        <option
                                                          key={cat.idcatalogo}
                                                          id={cat.idcatalogo}
                                                          value={
                                                            cat.descripcion
                                                          }
                                                        >
                                                          {cat.descripcion}
                                                        </option>
                                                      )
                                                    )
                                              }
                                            </Form.Control>

                                            {campos.columnname === "estado" ||
                                            campos.columnname === "colonia" ||
                                            campos.columnname ===
                                              "localidad" ? (
                                              <Form.Control
                                                key={`input` + campos.campoid}
                                                type="text"
                                                onChange={this.onInputChange.bind(
                                                  this
                                                )}
                                                onFocus={this.onInputFocus.bind(
                                                  this
                                                )}
                                                ref={campos.columnname}
                                                name={
                                                  campos.columnname + `input`
                                                }
                                                data-tipocampo={
                                                  campos.tipocampo
                                                } // Almacena: Input: Tipo Campo "Numerico", "Alfanumerico"
                                                data-alerta={campos.alerta}
                                                required={
                                                  this.state[campos.columnname]
                                                    .length > 0
                                                    ? false
                                                    : true
                                                } //
                                                data-required={
                                                  this.state.project.length > 0
                                                    ? this.state.project[0][
                                                        campos.columnname
                                                      ]
                                                    : "no required"
                                                }
                                                data-pattern={
                                                  campos.pattern
                                                    ? campos.pattern
                                                    : "no pattern"
                                                }
                                                pattern={
                                                  this.state.project.length > 0
                                                    ? this.state.project[0][
                                                        campos.columnname
                                                      ]
                                                      ? campos.pattern
                                                      : "*" // Verifica si el campo se valida con REDEXP
                                                    : "*"
                                                }
                                                placeholder={campos.campo}
                                              />
                                            ) : null}
                                          </>
                                        ) : (
                                          <>
                                            <Form.Control
                                              key={`input` + campos.campoid}
                                              onChange={this.onInputChange.bind(
                                                this
                                              )}
                                              onFocus={this.onInputFocus.bind(
                                                this
                                              )}
                                              onBlur={this.onInputBlur.bind(
                                                this
                                              )}
                                              ref={campos.columnname}
                                              name={campos.columnname}
                                              data-tipocampo={campos.tipocampo} // Almacena: Input: Tipo Campo "Numerico", "Alfanumerico"
                                              data-alerta={campos.alerta}
                                              required={
                                                this.state.project.length > 0
                                                  ? this.state.project[0][
                                                      campos.columnname
                                                    ]
                                                    ? true
                                                    : false
                                                  : false
                                              }
                                              data-required={
                                                this.state.project.length > 0
                                                  ? this.state.project[0][
                                                      campos.columnname
                                                    ]
                                                  : "no required"
                                              }
                                              data-pattern={
                                                campos.pattern
                                                  ? campos.pattern
                                                  : "no pattern"
                                              }
                                              pattern={
                                                this.state.project.length > 0
                                                  ? this.state.project[0][
                                                      campos.columnname
                                                    ]
                                                    ? campos.pattern
                                                    : "*" // Verifica si el campo se valida con REDEXP
                                                  : "*"
                                              }
                                              type={
                                                campos.tipocampo === "FECHA"
                                                  ? "date"
                                                  : "text"
                                              }
                                            />

                                            <Form.Control.Feedback
                                              key={`feed` + campos.campoid}
                                              type="invalid"
                                            >
                                              {campos.alerta}
                                            </Form.Control.Feedback>
                                          </>
                                        )
                                      }
                                    </Form.Group>
                                  ) : null
                                )}
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        ))}
                      </Accordion>
                    </React.Fragment>
                  </Form.Row>

                  {this.state.formcampos.length > 0 ? (
                    <Form.Row className="justify-content-end">
                      <Col sm="auto" className="mb-2">
                        <Button
                          id="btn-clean"
                          className="float-right"
                          variant="primary"
                          type="reset"
                        >
                          Limpiar <BsFillTrashFill />
                        </Button>
                      </Col>

                      <Col sm="auto" className="mb-2">
                        <Button
                          id="brn-save"
                          className="float-right"
                          variant="primary"
                          type="submit"
                        >
                          Guardar <MdSave />
                        </Button>
                      </Col>
                    </Form.Row>
                  ) : null}
                </Form>
              ) : null}
            </div>
            <a
              id="inventario_bad"
              className="hide"
              href={URL_SERVICES + `inventario/bad/download`}
            >
              Descargar
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default ReadFile;
