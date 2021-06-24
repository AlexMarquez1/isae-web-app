import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  BsFolderPlus,
  BsMap,
  BsUpload,
  BsSearch,
  BsFillPersonCheckFill,
  BsFillPersonPlusFill,
  BsFillInboxFill,
  BsFillGrid3X3GapFill,
} from "react-icons/bs";
import { RiHealthBookLine } from "react-icons/ri";
import NavBar from "./NavBar";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: true,
      toHome: false,
      usuarioid: props.usuarioid,
      usuario: props.usuario,
      nombrecompleto: props.nombrecompleto,
      perfilid: JSON.parse(this.props.userdata).perfilid,
    };
  }

  componentDidMount() {}

  // componentWillUpdate() {
  //   console.log("componentWillUpdate");
  //     var session = JSON.parse(localStorage.getItem('isae_session'));
  //     console.log(session);
  // }

  // componentWillUnmount() {
  //   console.log("componentWillUnmount");
  //     var session = JSON.parse(localStorage.getItem('isae_session'));
  //     console.log(session);
  // }

  // componentWillMount() {
  //   console.log("componentWillMount");
  //     var session = JSON.parse(localStorage.getItem('isae_session'));
  //     console.log(session);
  // }

  render() {
    return (
      <>
        <NavBar perfilid={this.state.perfilid} history={this.props.history} />
        <div>
          <div id="home-options" className="content-options container-md">
            <div>

              <div className="row">
                {this.state.perfilid === 1? (
                  <Link className="option col-sm-4 col-6" to="/Project">
                    <BsFolderPlus className= "circulo"/>
                    <p><b>Proyectos</b></p>
                  </Link>
                ) : null}

                {this.state.perfilid === 1 ||
                this.state.perfilid === 2 ||
                this.state.perfilid === 3 ||
                this.state.perfilid === 5 ? (
                  <Link className="option col-sm-4 col-6" to="/Ubicacion">
                    <BsMap className= "circulo"/>
                    <p><b>Ubicaciones</b></p>
                  </Link>
                ) : null}

                {this.state.perfilid === 1 ||
                this.state.perfilid === 2 ||
                this.state.perfilid === 3 ||
                this.state.perfilid === 4 ? (
                  <Link className="option col-sm-4 col-6" to="/ReadFile">
                    <BsUpload className= "circulo"/>
                    <p><b>Read File</b></p>
                  </Link>
                ) : null}

                {this.state.perfilid === 1 ||
                this.state.perfilid === 2 ||
                this.state.perfilid === 3 ||
                this.state.perfilid === 4 ||
                this.state.perfilid === 5 ? (
                  <Link className="option col-sm-4 col-6" to="/ListProjects">
                    <BsSearch className= "circulo"/>
                    <p><b>Lista de Proyectos</b></p>
                  </Link>
                ) : null}

                {this.state.perfilid === 1 ||
                this.state.perfilid === 2 ||
                this.state.perfilid === 3 ? (
                  <Link className="option col-sm-4 col-6" to="/Asignacion">
                    <BsFillPersonCheckFill className= "circulo"/>
                    <p><b>Asignaciones</b></p>
                  </Link>
                ) : null}

                {this.state.perfilid === 1 || this.state.perfilid === 2 ? (
                  <Link className="option col-sm-4 col-6" to="/Users">
                    <BsFillPersonPlusFill className= "circulo" />
                    <p><b>Usuarios</b></p>
                  </Link>
                ) : null}

                    {this.state.perfilid === 1 || this.state.perfilid === 2 ? (
                      <Link className="option col-sm-4 col-6" to="/Modificaciones">
                        <BsFillInboxFill className= "circulo"/>
                        <p><b>Modificaciones</b></p>
                      </Link>
                    ) : null}
 
                {/* Desarrollo de mantenimiento de catalogos solo para Marca-Modelo
            {this.state.perfilid === 1 ?            
              <Link title='Modelo Catalogos' className='option col-sm-4 col-6' to="/ModeloCatalogos">
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-journal-plus" fill="#10afcd" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                  <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                  <path fillRule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"/>
                </svg>
              </Link>
              : null
            } */}
                  {this.state.perfilid === 1 ||this.state.perfilid === 2 ? (
                      <Link
                        className="option col-sm-4 col-6 "
                        title="Catalogos"
                        to="/Catalogos"
                      >
                        <RiHealthBookLine className= "circulo"/>
                        <p><b>Catalogos</b></p>
                      </Link>
                    ) : null}
                    
                      {this.state.perfilid === 1 || this.state.perfilid === 2 ? (
                      <Link className="option col-sm-4 col-6" to="/Dashboardisae" title= "Dashboard" >
                        <BsFillGrid3X3GapFill className="circulo"/>
                        <p><b>Dashboard</b></p>
                      </Link>
                    ) : null} 

              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
