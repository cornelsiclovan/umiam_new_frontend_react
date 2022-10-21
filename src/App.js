import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { connect, Provider } from "react-redux";
import Cart from "./components/Cart/Cart";
import Filter from "./components/Filter/Filter";
import Products from "./components/Products/Products";
import store from "./store";
import SignupPage from "./pages/Auth/Signup";
import LoginPage from "./pages/Auth/Login";
import Layout from "./components/Layout/Layout";
import Toolbar from "./components/Toolbar/Toolbar";
import MainNavigation from "./components/Navigation/MainNavigation/MainNavigation";
import MobileNavigation from "./components/Navigation/MobileNavigation/MobileNavigation";
import Backdrop from "./components/Backdrop/Backdrop";
import { logout, cancelError } from "./actions/authActions";
import { clearOrder } from "./actions/orderActions";
import ErrorHandler from "./components/ErrorHandler/ErrorHandler";
import TokenRegistryConfirmation from "./pages/Auth/TokenRegistryConfirmation";
import RecoverPassword from "./pages/Auth/RecoverPassword";
import ChangePassword from "./pages/Auth/ChangePassword";
import CheckEmailConfirmation from "./pages/Auth/CheckEmailConfirmation";
import Places from "./pages/Admin/Places/Places";
import Place from "./pages/Admin/Places/Place/Place";
import PlaceList from "./pages/Home/PlaceList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBackdrop: false,
      showMobileNav: false,
      token: null,
      userId: null,
      isAuth: false,
      authLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if(!token || !expiryDate) {
      return;
    }

    if(new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }

    const remainingMilliseonds = new Date(expiryDate).getTime() - new Date().getTime();
    this.setAutoLogout(remainingMilliseonds);
  }

  setAutoLogout = miliseconds => {
    setTimeout(() => {
      this.logoutHandler();
      this.props.clearOrder();
    }, miliseconds);
  }

  mobileNavHandler = (isOpen) => {
    this.setState({ showMobileNav: isOpen, showBackdrop: isOpen });
  };

  backdropClickHandler = () => {
    this.setState({ showBackdrop: false, showMobileNav: false, error: null });
  };

  logoutHandler = () => {
    this.props.logout();
  };

  errorHandler = () => {
    this.props.cancelError();
  };

  
  render() {
    const { isAuth, token, isAdmin, isOwner } = this.props;

    let routes = (
      <Routes>
        <Route path="/" exact element={<LoginPage />} />
        <Route path="/signup" exact element={<SignupPage />} />
        <Route
          path="/confirmRegistrationToken"
          exact
          element={<TokenRegistryConfirmation />}
        />
        <Route path="/forgot-password" exact element={<RecoverPassword />} />
        <Route path="/change-password/:token" exact element={<ChangePassword/>} />
        <Route path="/check-email-confirmation" exact element={<CheckEmailConfirmation />} />
      </Routes>
    );
    if (isAuth) {
      routes = (
        <Routes>
           <Route
            path="/"
            exact
            element={
              <div className="content">
                <div className="main">
                  <PlaceList />
                </div>
                <div className="sidebar">
                  <Cart />
                </div>
              </div>
            }
          />
          {/* <Route
            path="/"
            exact
            element={
              <div className="content">
                <div className="main">
                  <Filter />
                  <Products />
                </div>
                <div className="sidebar">
                  <Cart />
                </div>
              </div>
            }
          /> */}
        </Routes>
      );
    }

    if(isOwner && isAuth) {
      routes = (
       <Routes>
        <Route
            path="/"
            exact
            element={
              <div className="content">
                <div className="main">
                  <PlaceList  />                 
                </div>
                <div className="sidebar">
               
                </div>
              </div>
            }
          />
           <Route
              path="/places/:placeId"
              exact
              element={
                <div className="content">
                  <div className="main">
                    <Filter />
                    <Products />
                  </div>
                  <div className="sidebar">
                    <Cart />
                  </div>
                </div>
              }
            /> 
          <Route
          path="/owner/places/:placeId"
          element = {
            <Place />
          }
          />
         <Route
          path="/owner"
          exact
          element = {
            <Places />
          }
         />
         
       </Routes>
      )
    }

    return (

      <Fragment>
        {this.state.showBackdrop && (
          <Backdrop onClick={this.backdropClickHandler} />
        )}
        <ErrorHandler
          error={this.props.error}
          userId={this.props.userId}
          onHandle={this.errorHandler}
        />

        <div className="grid-container">
          <Layout
            header={
              <Toolbar>
                <MainNavigation
                  onOpenMobileNav={this.mobileNavHandler.bind(this, true)}
                  onLogout={() => this.props.logout()}
                  isAuth={isAuth}
                  isOwner={isOwner}
                />
              </Toolbar>
            }
            mobileNav={
              <MobileNavigation
                open={this.state.showMobileNav}
                mobile
                onChooseItem={this.mobileNavHandler.bind(this, false)}
                onLogout={this.logoutHandler}
                isAuth={isAuth}
              />
            }
          />
          <main>{routes}</main>
          <footer>All rights is reserved</footer>
        </div>
      </Fragment>
    );
  }
}

export default connect(
  (state) => ({
    token: state.auth.token,
    isAuth: state.auth.isAuth,
    error: state.auth.error,
    userId: state.auth.userId,
    isAdmin: state.auth.isAdmin,
    isOwner: state.auth.isOwner
  }),
  {
    logout,
    cancelError,
    clearOrder
  }
)(App);
