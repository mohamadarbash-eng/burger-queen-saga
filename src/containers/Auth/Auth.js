import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "./../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { checkValidity } from "../../shared/utility";

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your Email"
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true,
                },
                touched: false,
                valid: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Your Password"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6,
                },
                touched: false,
                valid: false
            },
        },
        isSignUp: true
    };

    componentDidMount() {
        if (!this.props.building && this.props.authRedirect) {
            this.props.onAuthRedirect();
        }
    }

    setTouched = (key) => {
        this.setState((prevState) => {
            const updatedForm = {
                ...prevState.controls
            };
            updatedForm[key].touched = true;
            return {controls: updatedForm};
        });
    };

    inputChangeHandler = (event, key) => {
        const {value} = event.target;

        this.setState((prevState) => {
            const updatedForm = {
                ...prevState.controls
            };
            updatedForm[key].valid = checkValidity(value, updatedForm[key].validation);
            updatedForm[key].touched = true;
            updatedForm[key].value = value;
            let formIsValid = true;
            for (const _key in updatedForm) {
                formIsValid = updatedForm[_key].valid && formIsValid;
            }


            return {controls: updatedForm, formIsValid};
        });
    };

    authHandler = (event) => {
        event.preventDefault();
        const authData = {};
        for (let element in this.state.controls) {
            authData[element] = this.state.controls[element].value;
        }
        this.props.onAuth(authData.email, authData.password, this.state.isSignUp);
    };

    switchAuthModHandler = () => {
        this.setState((prevState) => {
            return {isSignUp: !prevState.isSignUp}
        });
    };

    render() {
        let redirect, form, error = null;
        if (this.props.isAuth) {
            redirect = <Redirect to={this.props.authRedirect}/>
        } else {
            const orderFormArray = [];
            for (let key in this.state.controls) {
                orderFormArray.push({id: key, config: this.state.controls[key]})
            }
            form = (<React.Fragment>
                <form onSubmit={this.authHandler}>
                    {orderFormArray.map(element => (
                        <Input key={element.id}
                               invalid={!element.config.valid}
                               elementType={element.config.elementType}
                               value={element.config.value}
                               shouldValidate={!!element.config.validation}
                               touched={element.config.touched}
                               setTouched={() => this.setTouched(element.id)}
                               change={(event) => this.inputChangeHandler(event, element.id)}
                               elementConfig={element.config.elementConfig}/>
                    ))}
                    <Button btnType={this.state.formIsValid ? "Success" : "Danger"}
                            disabled={!this.state.formIsValid}>{this.state.isSignUp ? "Sign Up" : "Sign In"}</Button>
                </form>
                <Button btnType={this.state.formIsValid ? "Success" : "Danger"} clicked={this.switchAuthModHandler}>Switch
                    to {this.state.isSignUp ? "Sign In" : "Sign Up"}</Button>
            </React.Fragment>);
            if (this.props.loading) {
                form = <Spinner/>;
            }
            if (this.props.error) {
                error = <p style={{color: "red"}}>{this.props.error.message}</p>
            }
        }
        return (
            <div className={classes.Auth}>
                {error}
                {form}
                {redirect}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: !!state.auth.token,
        authRedirect: state.auth.authRedirect,
        building: state.ingredient.building
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onAuthRedirect: () => dispatch(actions.setAuthRedirect("/"))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
