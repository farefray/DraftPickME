import React from 'react';
import { Link } from 'react-router-dom';

const Forbidden = () =>
  <section id="username_404">
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-md-offset-2 container-404">
          <h2>403 - Forbidden.</h2>
          <hr className="container-404-hr" />
          <div className="container-404-form">Access restricted.</div>
          <p>&nbsp;</p>
          <Link to="/" className="btn btn-link">
            Return
          </Link>
        </div>
      </div>
    </div>
  </section>

export default Forbidden;
