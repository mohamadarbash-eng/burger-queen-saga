import React from "react";
import { CSSTransition } from "react-transition-group";
import classes from "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";


const Modal = props => {

    /*  shouldComponentUpdate(nextProps, nextState) {
          return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
      }
      */

    return (
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <CSSTransition
                in={props.show}
                timeout={1000}
                mountOnEnter
                classNames={"fade-modal"}
                unmountOnExit>
                <div className={"Modal"}>
                    {props.children}
                </div>
            </CSSTransition>
        </React.Fragment>
    )
}

export default React.memo(Modal, (preProp, nexProp) => nexProp.show === preProp.show && nexProp.children === preProp.children);
