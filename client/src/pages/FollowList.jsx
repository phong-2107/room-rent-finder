import React from "react";
import "../styles/FollowList.scss";
import { ContentFollowList } from '../components/List/ContentFollowList';

export const FollowList = () => {
  return (
    <div className="save-post">
      <div className="div-2">
        <div className="banner">
          <img
            className="rectangle"
            alt="Rectangle"
            src="https://c.animaapp.com/Ymmzxs8x/img/rectangle-3.png"
          />
        </div>
        <ContentFollowList />
      </div>
    </div>
  );
};
