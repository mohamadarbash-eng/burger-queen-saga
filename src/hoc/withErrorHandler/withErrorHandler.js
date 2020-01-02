import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import axiosInstance from "../../axios-orders";


const withErrorHandler =  (WrappedComponent, axios) => {
    return class  extends  Component  {
        constructor(props) {
            super(props);
          this.reqInterceptors =  axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptors =  axios.interceptors.response.use(res => res, error => {
                this.setState({error});
            });
        }
        state = {
            error: null
        };

        componentWillUnmount() {
            axiosInstance.interceptors.request.eject(this.reqInterceptors);
            axiosInstance.interceptors.response.eject(this.resInterceptors);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        };

        render() {
            return (
                <React.Fragment>
                    <Modal show={!!this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {!!this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </React.Fragment>
            );
        }
    }
};


export default withErrorHandler;
