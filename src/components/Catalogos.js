import * as XLSX from "xlsx";
import React from "react";
import "../assets/css/Catalogos.css";
import { Form, Col, Row, Button } from "react-bootstrap";
import { BsUpload } from "react-icons/bs";
import * as ApiServices from "../Services/ApiServices";
import { NavBar } from "./NavBar";
import { URL } from "../constants/contants.js";

// SpreadJS imports
import "@grapecity/spread-sheets-react";
/* eslint-disable */
import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css";

class ModeloCatalogos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectSelectP: 0,
      catalogsModels: [],
      projectsListP: [],
      datos : [],
      habilitarBtn: true,
      usuarioid: JSON.parse(this.props.userdata).usuarioid,
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
      filteroptions: {
        1: 1,
        2: 2,
      },
      perfilid: JSON.parse(this.props.userdata).perfilid,
    };
    
    this.getListProjectsP();
  }

  componentDidMount() {
    this.getCatalogsModel();
    
  }

  getListProjectsP() {

    
    var idusuario = this.state.usuarioid
    let url= `${URL}lista/SinAsignacion/proyecto/${idusuario}`;
    console.log(url);

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
      })
      .catch((err) => console.log(err));
  }

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

  /**
   * Evento of Input File
   * @param {*} e
   */

  fileChanged = async(event)=>{
    event.preventDefault();

    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    const this2 = this
    var f = target.files[0]
    this.setState({
      [name]: value
    })
    let hojas = []
    if(name === 'file'){
      let reader = new FileReader()
      reader.readAsArrayBuffer(f)
      reader.onloadend= (e)=>{
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, {type: 'array'});

        workbook.SheetNames.forEach(function(sheetName){
          var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
          hojas.push({
            data: XL_row_object,
            sheetName
          })
        })

        console.log(JSON.stringify(hojas[0].data))                
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(hojas[0].data)
        };
        //TODO: cambiar la direccion del enlace
        fetch(`http://localhost:8180/catalogo/guardar/${this.state.projectSelectP}`, requestOptions)
          .then(async response => {
              const isJson = response.headers.get('content-type')?.includes('application/json');
              const datos = isJson && await response.json();
  
              // check for error response
              if (!response.ok) {
                  // get error message from body or default to response status
                  const error = (data && data.message) || response.status;
                  return Promise.reject(error);
              }
  
          })
          .catch(error => {
              this.setState({ errorMessage: error.toString() });
              console.error('Existe un error!', error);
          });

      }

    }
    
    // alert("Archivo cargado Correctamente!");
  }

  mandarDatos(dato){

    
    console.log(this.state.datos)

    // console.log(datos)
    // let url = "http://localhost:8180/catalogo/guardar";
    // let options = {
    //   method: "POST",
    //   mode: "cors",
    //   cache: "default",
    //   body: datos,
    // };

    // fetch(url, options)
    //   .then((response) => response.json())
    //   .then((respuesta) => {
    //     console.log(respuesta);
        
    //   })
    //   .catch((err) => console.log(err));
  }

  fileChangedHandler = async (e) => {
    e.preventDefault();

    if (e.target.files.length > 0) {
      var f = e.target.files[0];
      let dataCampos = new FormData();
      dataCampos.append("file", f);

      let result = await ApiServices.loadGeneralCatalogsFile(dataCampos);

      if (result) {
        this.refs.refCatalogo.cleanFiltered();
        this.refs.refDescription.cleanFiltered();
        this.refs.refModel.cleanFiltered();
        this.refs.refTipo.cleanFiltered();

        if (result.size > 0) {
          var bad = document.getElementById("inventario_bad");
          bad.href = URL.createObjectURL(result);
          bad.setAttribute("download", "Error_Catalogos.xlsx");
          bad.click();

          alert("Archivo presenta Errores!");
        } else {
          if (result.ok) {
            alert("Archivo cargado Correctamente!");
            this.getCatalogsModel();
          } else {
            alert("Error en la carga del Archivo!");
          }
        }
      }

      var inpf = this.refs.fileInput;
      inpf.value = "";
    } else {
      console.log("No File");
    }
  };

  /**
   * Even to open FileUpload
   * @param {*} e
   */

  clickU= (e) =>{
    e.preventDefault();
    this.refs.subirArchivo.click();
  }

  clickUpload = (e) => {
    e.preventDefault();
    this.refs.fileInput.click();
  };

  /**
   *
   */
  getCatalogsModel = async () => {
    let result = await ApiServices.getCatModel();
    console.log(result);
    if (result !== null) this.setState({ catalogsModels: result });
  };

  render() {

    return (
      <>
        <NavBar perfilid={this.state.perfilid} history={this.props.history} />

        <div id="catalogs" className="manage-container">
          <input
          hidden
            type= "file"
            name= "file"
            accept=".xlsx"
            id = "file"
            onChange ={this.fileChanged.bind(this)}
            placeholder="Archivo de excel"
            ref="subirArchivo"
          />
          <input
            id="input-file"
            hidden
            type="file"
            type="file"
            name="upload_project"
            accept=".xlsx"
            onChange={this.fileChangedHandler.bind(this)}
            ref="fileInput"
          />

          <div className="main-container">
            <div className="header-container">
              <div>
                <h3>Catalogos</h3>
              </div>
            </div>

            <div className="container body-container" >

            <Row className="justify-content-center">
                <Col sm="6" className="">
                  <Row>
                    <Form.Label column sm="4">
                      Proyectos
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
                    
                      <Form.Label column sn ="4">
                       
                      </Form.Label>

                      <Col sm={8}>
                        <br/>
                      <Button
                      onClick={this.clickU.bind(this)}
                      disabled={this.state.habilitarBtn}
                    >
                      Subir Archivo <BsUpload />
                    </Button>
                      </Col>
                    
                  </Row>
                </Col>
              </Row>

            </div>

            <div className="container body-container">
              <Row>
                <Col>
                  <div className="btn-action">
                    <Button
                      onClick={this.clickUpload.bind(this)}
                      disabled={this.state.show_btn_alta}
                    >
                      Archivo <BsUpload />
                    </Button>
                    
                  </div>
                </Col>
              </Row>

              <div className={"row content-table"}>
                <div className="col-sm-12">
                  <BootstrapTable
                    ref="tablecatalogs"
                    id="tablecatalogs"
                    className="tablecatalogs"
                    striped={true}
                    data={this.state.catalogsModels}
                    keyField="idmarcamodelo"
                    version="4"
                    pagination
                    options={this.state.options}
                  >
                    <TableHeaderColumn
                      dataField="idcatalogo"
                      hidden
                      className="active-column-header"
                      columnClassName="active-column-data"
                    >
                      ID CATALOGO
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="idmarcamodelo"
                      hidden
                      className="active-column-header"
                      columnClassName="active-column-data"
                    >
                      ID MODELO
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      ref="refCatalogo"
                      dataField="nombrecatalogo"
                      className="active-column-header"
                      filter={{ type: "TextFilter", placeholder: "CATALOGO" }}
                      columnClassName="active-column-data"
                    >
                      CATALOGO
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      ref="refDescription"
                      dataField="descripcion"
                      className="active-column-header"
                      filter={{
                        type: "TextFilter",
                        placeholder: "DESCRIPCIÓN/MARCA",
                      }}
                      columnClassName="active-column-data"
                    >
                      DESCRIPCIÓN/MARCA
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      ref="refModel"
                      dataField="modelo"
                      className="active-column-header"
                      filter={{ type: "TextFilter", placeholder: "MODELO" }}
                      columnClassName="active-column-data"
                    >
                      MODELO
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      ref="refTipo"
                      dataField="tipo"
                      className="active-column-header"
                      filter={{
                        type: "SelectFilter",
                        selectText: "",
                        options: this.state.filteroptions,
                      }}
                      columnClassName="active-column-data"
                    >
                      TIPO
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="idmarca"
                      hidden
                      className="active-column-header"
                      columnClassName="active-column-data"
                    >
                      FOLIO
                    </TableHeaderColumn>
                  </BootstrapTable>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a id="inventario_bad" className="hide">
          Descargar
        </a>
      </>
    );
  }
}

export default ModeloCatalogos;
