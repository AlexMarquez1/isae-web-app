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

export const NavBar = props => {

    const closeSession = (e) => {
        console.log("Close Session");
        auth.logout(() => {
            props.history.push("/");
        });
    }
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
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
                            {props.perfilid === 1 ? (
                                <li className='nav-text'>
                                    <Link to='/Project'>
                                        <BsFolderPlus />
                                        <span>Proyectos</span>
                                    </Link>
                                </li>
                            ) : null}
                            {props.perfilid === 1 ||
                                props.perfilid === 2 ||
                                props.perfilid === 3 ||
                                props.perfilid === 5 ? (
                                <li className='nav-text'>
                                    <Link to='/Ubicacion'>
                                        <BsMap />
                                        <span>Ubicaciones</span>
                                    </Link>
                                </li>
                            ) : null}
                            {props.perfilid === 1 ||
                                props.perfilid === 2 ||
                                props.perfilid === 3 ||
                                props.perfilid === 4 ? (
                                <li className='nav-text'>
                                    <Link to='/ReadFile'>
                                        <BsUpload />
                                        <span>Read File</span>
                                    </Link>
                                </li>
                            ) : null}

                            {props.perfilid === 1 ||
                                props.perfilid === 2 ||
                                props.perfilid === 3 ||
                                props.perfilid === 4 ||
                                props.perfilid === 5 ? (
                                <li className='nav-text'>
                                    <Link to='/ListProjects'>
                                        <BsSearch />
                                        <span>Lista de Proyectos</span>
                                    </Link>
                                </li>
                            ) : null}

                            {props.perfilid === 1 ||
                                props.perfilid === 2 ||
                                props.perfilid === 3 ? (
                                <li className='nav-text'>
                                    <Link to='/Asignacion'>
                                        <BsFillPersonCheckFill />
                                        <span>Asignaciones</span>
                                    </Link>
                                </li>
                            ) : null}

                            {props.perfilid === 1 || props.perfilid === 2 ? (
                                <li className='nav-text'>
                                    <Link to='/Users'>
                                        <BsFillPersonPlusFill />
                                        <span>Usuarios</span>
                                    </Link>
                                </li>
                            ) : null}

                            {props.perfilid === 1 || props.perfilid === 2 ? (
                                <li className='nav-text'>
                                    <Link to='/Catalogos'>
                                        <RiHealthBookLine />
                                        <span>Catalogos</span>
                                    </Link>
                                </li>
                            ) : null}

                            {props.perfilid === 1 || props.perfilid === 2 ? (
                                <li className='nav-text'>
                                    <Link to='/Dashboardisae'>
                                        <BsFillGrid3X3GapFill />
                                        <span>Dashboard</span>
                                    </Link>
                                </li>
                            ) : null}
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


    );
};

export default NavBar;



/*
 *   <nav id="globalnav" className="nav-home">
            <div className="container-md">
                <div>
                    <Link className="option" to="/Home">
                        <BsHouseDoorFill />
                    </Link>
                </div>
                <div className="content-logo">
                    <img src={loginImg} alt="ISAE"></img>
                </div>

                <Dropdown >
                    <Dropdown.Toggle id="dropdown-custom-1"><BsList></BsList></Dropdown.Toggle>
                    <Dropdown.Menu className="super-colors">
                        <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                        <Dropdown.Item eventKey="3" active>
                            Active Item
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>


                {
                <Link className="close-session" to="/" onClick={closeSession}>Cerrar Sesión</Link>

                <div className="info-user">

                <div className="image"></div>

                <div>Nombre: </div>
            </div>    }
            </div>
        </nav>
 *
 *
 */