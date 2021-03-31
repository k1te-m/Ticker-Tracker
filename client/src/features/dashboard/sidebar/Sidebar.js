import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowedSymbols, selectSearch } from "../search/searchSlice";
import { selectAuth } from "../../auth/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);
  const auth = useSelector(selectAuth);

  const { userFollowedSymbols } = search;

  console.log(userFollowedSymbols);

  const id = auth.user._id;

  useEffect(() => {
    dispatch(getFollowedSymbols(id));
  }, [dispatch]);

  let symbolList;

  if (userFollowedSymbols) {
    symbolList = userFollowedSymbols.map((symbol) => (
      <li className="list-group-item card">
        <span>{symbol}</span>
      </li>
    ));
  }

  return (
    <div className="container sidebar">
      <ul className="list-group pt-2">
        <li className="list-group-item card">
          <i class="fas fa-home"></i>
        </li>
        {symbolList}
      </ul>
    </div>
  );
};

export default Sidebar;
