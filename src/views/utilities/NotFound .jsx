import React from "react";
import '../../../src/assets/scss/Notfound.css'
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div>
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-12   text-center">
                <div className="four_zero_four_bg">
                <img src="https://i.postimg.cc/L6fcH5R7/pngtree-page-not-found-error-404-concept-with-people-trying-to-fix-png-image-2157908-removebg-previe.png" alt="404image" />
                </div>
                <div className="contant_box_404">
                  <h3 className="h2">OPPS!PAGE NOT FOUND</h3>
                  <p className="mb-2">The page you are looking for not avaible!</p>
                  <Link to="/" className="link_404">
                    Go to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotFound;
