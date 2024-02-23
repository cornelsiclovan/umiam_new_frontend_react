import { render } from "@testing-library/react";
import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import "./NavigationItems.css";

const navItems = [
    { id: "feed", text: "Feed", link: "/", auth: true },
    { id: "login", text: "Login", link: "/", auth: false},
    { id: "signup", text: "Signup", link: "signup", auth: false}
];

const navigationItems = (props) => [
    ...navItems.filter(item => item.auth === props.isAuth).map(item => (
      <li
        key={item.id}
        className={['navigation-item', props.mobile ? 'mobile': ''].join(' ')}
        >
            <NavLink to={item.link}  onClick={props.onChoose}>
                {item.text}
            </NavLink>
      </li> 
    )),
    props.isAuth && (
        <li className="navigation-item" key="tables">
            <NavLink to="/places/1/tables">
                Tables
            </NavLink>
        </li>
    ),
    props.isAuth && (
        <li className="navigation-item" key="logout">
            <button onClick={props.onLogout}>Logout</button>
        </li>
    ),
    props.isOwner && (
        <li className="navigation-item" key="management">
            <NavLink to="/owner">
                Management
            </NavLink>
        </li>
    ) 
];



export default navigationItems;