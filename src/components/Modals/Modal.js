import React, {Component} from 'react';
import "../../assets/css/Modals.css"

class Modal extends Component{
    constructor(props) {

        super(props)
        this.state= {
            showModal: "no se"
         }

         console.log(this.state.showModal);

      }

      showHide = (e) => {
          e.preventDefault();
          var mm = document.querySelector("#modal-listP");
         // mm.remove();
          /*mm.classList.toggle("show");*/
          //this.setState({ showModal: "hidden" });
      }

    render(){

        return(   
            <div id="modal-listP" className={`modal ` + this.props.showModal}>
                        
                <div className="modal-container">
                    <button onClick={this.showHide.bind(this)}>
                        <svg class="bi bi-x-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>
                            <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clip-rule="evenodd"/>
                            <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clip-rule="evenodd"/>
                        </svg>
                    </button>
                </div>

            </div>
        )
    }

}
export default Modal;




