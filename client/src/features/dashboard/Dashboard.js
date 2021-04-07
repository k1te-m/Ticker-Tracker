import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, loadUser } from "../auth/authSlice";
import { selectSearch } from "./search/searchSlice";
import Footer from "../footer/Footer";
import Search from "./search/Search";
import SearchResults from "./searchResults/SearchResults";
import Sidebar from "./sidebar/Sidebar";
import Home from "./home/Home";

const Dashboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const search = useSelector(selectSearch);

  useEffect(() => {
    if (!auth.user) {
      dispatch(loadUser());
    }
  }, [auth.user, dispatch]);

  if (!search.currentTicker) {
    return (
      <>
        <div className="dashboard container-fluid">
          <div className="row">
            <div className="col-2 p-0">
              <Sidebar />
            </div>
            <div className="col-10 p-0">
              <Home />
            </div>
          </div>
        </div>
        <div className="row">
          <Footer />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="dashboard container-fluid">
          <div className="row">
            <div className="col-2 p-0">
              <Sidebar />
            </div>
            <div className="col-10 p-0">
              <Search />
              <SearchResults />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
};

export default Dashboard;
