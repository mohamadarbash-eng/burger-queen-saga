import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => {
    const auth = props.isAuth ? <NavigationItem link="/logout">Logout</NavigationItem> : (<NavigationItem link="/auth">Auth</NavigationItem>);
   return (
       <ul className={classes.NavigationItems}>
           <NavigationItem link="/" exact>Burger Builder</NavigationItem>
           <NavigationItem link="/orders">Orders</NavigationItem>
           {auth}
       </ul>
   )
};

export default navigationItems;
