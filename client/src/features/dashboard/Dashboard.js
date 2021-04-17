import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, loadUser } from "../auth/authSlice";
import { selectSearch } from "./search/searchSlice";
import Footer from "../footer/Footer";
import Search from "./search/Search";
import SearchResults from "./searchResults/SearchResults";
import Sidebar from "./sidebar/Sidebar";
import Home from "./home/Home";
import Sticky from "react-stickynode";

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
            <div className="col-2 col-lg-1 p-0">
              <Sticky bottomBoundary="#bottom">
                <Sidebar />
              </Sticky>
            </div>
            <div className="col-10 col-lg-11 p-0" id="bottom">
              <Home />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <div className="dashboard container-fluid">
          <div className="row">
            <div className="col-2 col-lg-1 p-0">
              <Sticky bottomBoundary="#bottom">
                <Sidebar />
              </Sticky>
            </div>
            <div className="col-10 col-lg-11 p-0" id="bottom">
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
