import React from "react";
import Footer from "../footer/Footer";
import Description from "./description/Description";
import Entry from "./entry/Entry";
import Jumbotron from "./jumbotron/Jumbotron";

const Landing = () => {
  return (
    <>
      <Jumbotron />
      <Entry />
      <Description />
      <Footer />
    </>
  );
};

export default Landing;
