import React, { useEffect, useState } from "react";
import Modal from "../../components/UI/Modal/Modal";
import axiosInstance from "../../axios-orders";


const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, setError] = useState(null);
        const reqInterceptors = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        });
        const resInterceptors = axios.interceptors.response.use(res => res, error => {
            setError({error});
        });

        useEffect(() => {

            return () => {
                axiosInstance.interceptors.request.eject(reqInterceptors);
                axiosInstance.interceptors.response.eject(resInterceptors);
            }
        }, [reqInterceptors, resInterceptors]);

        const errorConfirmedHandler = () => {
            this.setState({error: null});
        };

        return (
            <React.Fragment>
                <Modal show={!!error} modalClosed={errorConfirmedHandler}>
                    {!!error ? error.message : null}
                </Modal>
                <WrappedComponent {...props}/>
            </React.Fragment>
        );
    }
};


export default withErrorHandler;
