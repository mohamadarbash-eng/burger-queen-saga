import React, { Component } from "react";

import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
      const  cssClasses = [classes.Modal, this.props.show ? classes.ModalOpen : classes.ModalClose];
        return (
            <React.Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div
                    className={cssClasses.join(' ')}>
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}

export default Modal;
