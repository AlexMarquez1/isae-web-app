import React, { useState } from 'react';
import { Link } from "react-router-dom";
import auth from "./Login/auth";
import loginImg from "../assets/images/logo_isae.png";
import './NavigationBar.css';
import {
    BsHouseDoorFill,
    BsList,
    BsChevronBarRight,
    BsFolderPlus,
    BsMap,
    BsUpload,
    BsSearch,
    BsFillPersonCheckFill,
    BsFillPersonPlusFill,
    BsFillInboxFill,
    BsFillGrid3X3GapFill,
    BsPower,
} from "react-icons/bs";
import { RiHealthBookLine } from "react-icons/ri";
import { IconContext } from 'react-icons';

class NavigationBar extends useState {

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
    render() {

        const [sidebar, setSidebar] = useState(false);

        const showSidebar = () => setSidebar(!sidebar);
        const closeSession = (e) => {
            console.log("Close Session");
            auth.logout(() => {
                this.props.history.push("/");
            });
        }

        return (
            <>
                <div id="globalnav" className='navbar nav-home'>
                    <div className="container-md">
                        <div>
                            <Link className="option" to="/Home">
                                <BsHouseDoorFill />
                            </Link>
                        </div>
                        <div className="content-logo">
                            <img src={loginImg} alt="ISAE"></img>
                        </div>
                        <IconContext.Provider value={{ color: '#fff' }}>
                            <Link to='#' className='menu-bars'>
                                <BsList onClick={showSidebar} />
                            </Link>
                            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                                <ul className='nav-menu-items' onClick={showSidebar}>
                                    <li className='navbar-toggle'>
                                        <Link to='#' className='menu-bars'>
                                            <BsChevronBarRight />
                                        </Link>
                                    </li>
                                    <li className='nav-text'>
                                        <Link to='/Home'>
                                            <BsHouseDoorFill />
                                            <span>Inicio</span>
                                        </Link>
                                    </li>
                                    {this.state.perfilid === 1 ? (
                                        <li className='nav-text'>
                                            <Link to='/Project'>
                                                <BsMap />
                                                <span>Proyectos</span>
                                            </Link>
                                        </li>
                                    ) : null}
                                    <li className='nav-text'>
                                        <Link to='/Home'>
                                            <BsMap />
                                            <span>Ubicaciones</span>
                                        </Link>
                                    </li>
                                    <li className='nav-text'>
                                        <Link to='/Home'>
                                            <BsUpload />
                                            <span>Read File</span>
                                        </Link>
                                    </li>
                                    <li className='nav-text'>
                                        <Link to='/Home'>
                                            <BsSearch />
                                            <span>Lista de Proyectos</span>
                                        </Link>
                                    </li>
                                    <li className='nav-text'>
                                        <Link to='/Home'>
                                            <BsFillPersonCheckFill />
                                            <span>Asignaciones</span>
                                        </Link>
                                    </li>
                                    <li className='nav-text'>
                                        <Link to='/Home'>
                                            <BsFillPersonPlusFill />
                                            <span>Usuarios</span>
                                        </Link>
                                    </li>
                                    <li className='nav-text'>
                                        <Link to='/Home'>
                                            <RiHealthBookLine />
                                            <span>Catalogos</span>
                                        </Link>
                                    </li>
                                    <li className='nav-text'>
                                        <Link to='/Home'>
                                            <BsFillGrid3X3GapFill />
                                            <span>Dashboard</span>
                                        </Link>
                                    </li>
                                    <li className='nav-text'>
                                        <Link className="close-session" to="/" onClick={closeSession}>
                                            <BsPower />
                                            <span>Cerrar Sesión</span>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </IconContext.Provider>
                    </div>
                </div>
            </>
        );
    }
}
export default NavigationBar;
