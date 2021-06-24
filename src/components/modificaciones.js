import React from "react";
import {BootstrapTable, 
    TableHeaderColumn} from 'react-bootstrap-table';
import "../assets/css/Users.css";
import "../assets/css/ListProjects.css";
import NavBar from "./NavBar";


class Modificaciones extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = { modificaciones: [] };
  }

  componentWillMount() {
    fetch('https://www.cookysoft.com/serving-web-content-0.0.1-SNAPSHOT/inventario/Modificado/')
      .then((response) => {
        return response.json()
      })
      .then((respuesta) => {
        this.setState({ modificaciones: respuesta })
      })
      this.resize();
    }
    
    resize() {
        this.setState({hideNav: window.innerWidth <= 760});
    }
  render() {
    var selectRowProp = {
      mode: "checkbox",
      clickToSelect: true,
      bgColor: "rgb(15 175 204 / 18%)" 
    };
    return (
      <>
      
        <NavBar inHome={false} history={this.props.history} />

        <div id="manage-mod" className="manage-container">
          <div className="main-container">
            <div className="header-container">
              <div>
                <h3>Modificaciones</h3>
                {//}<iframe width="500" height="500"  src="https://danae.cookysoft.com/#/" frameborder="0" allowfullscreen></iframe>
              }
              </div>
            </div>

            <div className="container">
              <div>
              <div className="col-sm-12 content-table">
                <BootstrapTable
                  data={this.state.modificaciones}
                  version ='4'
                  selectRow={selectRowProp}
                  keyField = "inventarioid"
                  hover
                  condensed
                  search
                  exportCSV
                  noDataIndication="Table is Empty"
                  csvFileName="Modificaciones.csv">
                    <TableHeaderColumn 
                      width="10%"
                      dataField="inventarioid" 
                      dataAlign="center">
                        Inventario ID
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                      width="10%"
                      dataField="folio"  
                      dataAlign="center">
                        Folio
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                      width="10%"
                      dataField="proyecto" 
                      dataAlign="center" >
                        Proyecto
                    </TableHeaderColumn>
                    <TableHeaderColumn
                       width="10%"
                      dataField="usuario" 
                      dataAlign="center" >
                        usuario
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                      width="15%"
                      dataField="fecha" 
                      dataAlign="center" >
                        Fecha
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                      width="10%"
                      dataField="hora" 
                      dataAlign="center" >
                        hora
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                      width="10%"
                      dataField="campoedit" 
                      dataAlign="center">
                        Campo editado
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                      width="10%"
                      dataField="valora" 
                      dataAlign="center">
                        Valor anterior
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                      width="10%"
                      dataField="valorn" 
                      dataAlign="center">
                        Valor nuevo
                    </TableHeaderColumn>
                </BootstrapTable>
              </div>  
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

}


export default Modificaciones;
