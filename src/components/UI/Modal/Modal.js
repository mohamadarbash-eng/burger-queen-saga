import React, { Component } from "react";
import { CSSTransition } from 'react-transition-group';
import classes from "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";


class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        return (
            <React.Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
            <CSSTransition
                in={this.props.show}
                timeout={1000}
                mountOnEnter
                classNames={'fade-modal'}
                unmountOnExit>
                      <div className={'Modal'}>
                          {this.props.children}
                      </div>
            </CSSTransition>
            </React.Fragment>
        )
    }
}

export default Modal;
