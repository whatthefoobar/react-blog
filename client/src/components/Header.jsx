import React from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <div className="headerImageContainer">
        <section id="hero">
          <div class="container">
            <div class="hero-box">
              <h1 class="hero-heading">Save the planet one step at a time</h1>
              <p class="hero-desc">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
                blanditiis nisi nobis odio voluptas fugiat? Quam eos ea adipisci
                provident fugiat? Iste nihil qui minima nostrum numquam,
                molestias voluptate placeat!
              </p>
              <div class="btn-box">
                <Link
                  to="/post/62eb7eef4b261b36f5e0d1d2"
                  className="cta-btn try"
                >
                  Start here
                </Link>
              </div>
            </div>
          </div>
        </section>
  
      </div>
      <Sidebar />
    </div>
  );
}
