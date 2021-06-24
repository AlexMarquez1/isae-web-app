import React from "react";
import "../assets/css/App.css";
import NavBar from "./NavBar";
import Datos from './Datos';

class DashboardIsae extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            perfilid: JSON.parse(this.props.userdata).perfilid,
        };
    }

    render(){
        return (
            <>
                <NavBar perfilid={this.state.perfilid} history={this.props.history} />
                    <div id="manage-mod" className="manage-container">
                        <div className="main-container">
                            <div className="header-container">
                                <div>
                                    <h3>Dashboard</h3>
                                </div>
                            </div>
                            <div className = "container-dashboard">
                                <Datos/>
                            </div>
                        </div>
                    </div>
            </>
        );
    }

}

export default DashboardIsae;