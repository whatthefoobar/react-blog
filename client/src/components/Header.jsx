import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <div className="headerImageContainer">
        <section id="hero">
          <div className="container">
            <div className="hero-box">
              <h1 className="hero-heading">
                Save the planet one step at a time
              </h1>
              <p className="hero-desc">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
                blanditiis nisi nobis odio voluptas fugiat? Quam eos ea adipisci
                provident fugiat? Iste nihil qui minima nostrum numquam,
                molestias voluptate placeat!
              </p>
              <div className="btn-box">
                <Link
                  to="/post/668527a1835a0d5437fe3518"
                  className="cta-btn try"
                >
                  Start here
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
