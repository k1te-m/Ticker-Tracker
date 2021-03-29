import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, loadUser } from "../auth/authSlice";
import Footer from "../footer/Footer";
import Search from "./search/Search";
import Sidebar from "./sidebar/Sidebar";

const Dashboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  console.log(auth);

  useEffect(() => {
    if (!auth.user) {
      dispatch(loadUser());
    }
  }, [auth.user, dispatch]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 p-0">
            <Sidebar />
          </div>
          <div className="col p-0">
            <Search />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
