import React, { Suspense, useEffect } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/checkout/checkout";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions";
import Spinner from "./components/UI/Spinner/Spinner";

const Auth = React.lazy(() => import("./containers/Auth/Auth"));
const Orders = React.lazy(() => import("./containers/Orders/Orders"));

const App = (props)=> {

    useEffect(() => {
        props.onIsUserAuthenticated();
    }, []);

        let routes = (
            <Switch>
                <Route path='/auth'
                       render={(props) => <Suspense fallback={<Spinner/>}> <Auth {...props}/></Suspense>}/>
                <Route path='/orders'
                       render={(props) => <Suspense fallback={<Spinner/>}> <Orders {...props}/></Suspense>}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/" exact component={BurgerBuilder}/>
                <Redirect to="/"/>
            </Switch>
        );
        if (props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path='/orders'
                           render={(props) => <Suspense fallback={<Spinner/>}> <Orders {...props}/></Suspense>}/>
                    <Route path='/auth'
                           render={(props) => <Suspense fallback={<Spinner/>}> <Auth {...props}/></Suspense>}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/" exact component={BurgerBuilder}/>
                    <Redirect to="/"/>
                </Switch>
            );
        }
        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: !!state.auth.token,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIsUserAuthenticated: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
