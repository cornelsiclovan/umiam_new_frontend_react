import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import MobileToggle from "../MobileToggle/MobileToggle";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

import "./MainNavigation.css";

const mainNavigation = (props) => {

  return (
    <nav className="main-nav">
      <MobileToggle onOpen={props.onOpenMobileNav} />
      <div className="main-nav__logo">
        <NavLink to="/">
          <Logo />
        </NavLink>
      </div>
      <div className="spacer" />
      <ul className="main-nav__items">
        <NavigationItems
          isAuth={props.isAuth}
          onLogout={props.onLogout}
          isOwner={props.isOwner}
          isAdmin={props.isAdmin}
        />
      </ul>
    </nav>
  );
};

export default mainNavigation;
