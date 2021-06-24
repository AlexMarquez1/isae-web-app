import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../../components/Login/Login';
import ChangePass from '../../components/Login/ChangePass';
import '../../assets/css/App.css'

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true,
      firstAccess: false,
      resetPassword: false,
      iduser: null
    };

  }

  componentDidMount() {
    console.log("componentDidMount");
    this.rightSide.classList.add("right"); // Add .right class by default
  }

  /**
   * Change the state for Login - Change Password
   */
  changeState() {
    const { isLogginActive } = this.state;
    
    if (isLogginActive) {      
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
      this.setState({ firstAccess: false, resetPassword: false });
    }

    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }

  /**
   * Set a flag to detect First Access
   * @param {*} iduser 
   */
  setFirstAccess(flag, iduser){
    this.setState({ firstAccess: flag, iduser: iduser });
  }

  setResetPass(flag, iduser){    
    this.setState({ resetPassword: flag, iduser: iduser });
  }

  render() {
    const { isLogginActive, firstAccess  } = this.state;    
    const current = isLogginActive ? "Cambiar Contraseña" : "Inicia Sesion";
    const currentActive = isLogginActive ? "login" : "changepass";
    return (
      <div className="App">
        <div className="login">
          <div className="container" ref={ref => (this.container = ref)}>
            {isLogginActive && (
              <Login history={this.props.history} containerRef={ref => (this.current = ref)} setfirstAccess={this.setFirstAccess.bind(this)}
                setResetPass={this.setResetPass.bind(this)} 
                onClick={this.changeState.bind(this)} />
            )}
            {!isLogginActive && (
              <ChangePass containerRef={ref => (this.current = ref)} 
                isfirstAccess={firstAccess} isresetPassword={this.state.resetPassword}
                iduser={this.state.iduser} setfirstAccess={this.setFirstAccess.bind(this)} 
                onClick={this.changeState.bind(this)}/>
            )}
          </div>
          
          <RightSide
            current={current}
            currentActive={currentActive}
            containerRef={ref => (this.rightSide = ref)}
            onClick={this.changeState.bind(this)}
          />
        </div>
      </div>
    );
  }
}

const RightSide = props => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="row inner-container">
        <div className="text col-sm-5">{props.current}</div>
      </div>
    </div>
  );
};

export default LoginPage;
