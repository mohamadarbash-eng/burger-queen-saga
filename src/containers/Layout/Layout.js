import React, { useState } from "react";

import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from 'react-redux';
const Layout = props => {
   const [showSideDrawer, setShowSideDrawer] = useState(false);

   const sideDrawerClosedHandler = () => {
        setShowSideDrawer( false);
    };

   const sideDrawerToggleHandler = () => {
            setShowSideDrawer(!showSideDrawer);
    };
        return (
            <React.Fragment>
                <Toolbar isAuth={props.isAuth} drawerToggleClicked={sideDrawerToggleHandler}/>
                <SideDrawer
                    isAuth={props.isAuth}
                    open={showSideDrawer}
                    closed={sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {props.children}
                </main>
            </React.Fragment>
        )
};

const mapStateToProps = state => {
    return {
        isAuth: !!state.auth.token
    }
};

export default connect(mapStateToProps)(Layout);
