import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { ProtectedRoute } from "./protected.route";
import LoginPage from "./components/Login/LoginPage";
import Home from "./components/Home";
import Project from "./components/Project";
import ReadFile from "./components/ReadFile";
import ListProjects from "./components/ListProjects";
import Users from "./components/Users";
import Modificaciones from "./components/modificaciones";
import Asignacion from "./components/Asignacion";
import Catalogos from "./components/Catalogos";
import ModeloCatalogos from "./components/ModeloCatalogos";
import Geolocation from "./components/Geolocation";
import DashboardIsae from "./components/Dashboardisae";
import PageNotFound from "./components/PageNotFound";

class App extends React.Component {
  render() {
    return (
      <Switch>
        <ProtectedRoute exact path="/Home" component={Home} />
        <ProtectedRoute exact path="/Ubicacion" component={Geolocation} />
        <ProtectedRoute exact path="/Project" component={Project} />
        <ProtectedRoute exact path="/ReadFile" component={ReadFile} />
        <ProtectedRoute exact path="/ListProjects" component={ListProjects} />
        {/* <ProtectedRoute exact path='/ListProjects' 
            component={() => <ListProjects 
            usuarioid={this.state.usuarioid} usuario={this.state.usuario} nombrecompleto={this.state.nombrecompleto} />}/> */}
        <ProtectedRoute exact path="/Asignacion" component={Asignacion} />
        <ProtectedRoute exact path="/Users" component={Users} />
        <ProtectedRoute exact path="/Modificaciones" component={Modificaciones} />
        <ProtectedRoute exact path="/Dashboardisae" component={DashboardIsae}/>
        <ProtectedRoute
          exact
          path="/ModeloCatalogos"
          component={ModeloCatalogos}
        />
        <ProtectedRoute exact path="/Catalogos" component={Catalogos} />
        {/* <ProtectedRoute component={PageNotFound} to="/PageNotFound" /> */}
        <Route to="/" component={LoginPage} />
      </Switch>
    );
  }
}

export default App;
