import React from 'react';
import Sidebar from './Sidebar';
// import '../css/components/header.scss';

export default function Header() {
  return (
    <div className="header">
      <div className="headerImageContainer">
        <div className="headerTitles">
          <span className="headerTitleSmall">Final warning:</span>
          <span className="headerTitleLarge">No planet B</span>
        </div>
        <div className="headerImg">
          <img
            src="https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt="nature"
          />
        </div>
      </div>
      <Sidebar />
    </div>
  );
}
