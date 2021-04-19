import React, { useEffect } from "react";
import Footer from "../footer/Footer";
import Entry from "./entry/Entry";
import Jumbotron from "./jumbotron/Jumbotron";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, loadUser } from "../auth/authSlice";
import LandingSearch from "./landingSearch/LandingSearch";
import LandingSearchResults from "./landingSearch/LandingSearchResults";

const Landing = (props) => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
    if (!auth.user) {
      dispatch(loadUser());
    }
    window.scrollTo(0, 0);
  }, [auth.isAuthenticated, auth.user, props.history, dispatch]);

  return (
    <>
      <Jumbotron />
      <Entry />
      <LandingSearch />
      <LandingSearchResults />
      <Footer />
    </>
  );
};

export default Landing;
