import React from "react";

class EducationPage extends React.Component {
  render() {
    let sectionStyle = {
      background: "url('images/education.png') no-repeat top center fixed",
      backgroundSize: "cover",
      backgroundColor: "#fff",
      backgroundBlendMode: "overlay"
    };

    return (
      <section id="education" style={sectionStyle}>
        <div className="container">
          <div className="row fadeInUp">
            <h2 className="none">Education</h2>
            <div className="col-md-4">
              <div className="single-education">
                <div className="education-history text-center">
                  <p>
                    <i className="fa fa-graduation-cap" />
                    <br /> 2014 - 2016
                  </p>
                </div>
                <div className="degree">
                  <ul>
                    <li>
                      <i className="fa fa-file-text" /> Software Engneering
                    </li>
                    <li>
                      <i className="fa fa-university" /> Oxford University
                    </li>
                  </ul>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  semper lacus tortor, quis bibendum odio mattis vitae. Cras
                  porta massa pretium auctor congue. Suspendisse ante massa,
                  euismod sit amet sem sed, viverra tristique diam.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="single-education">
                <div className="education-history text-center">
                  <p>
                    <i className="fa fa-graduation-cap" />
                    <br /> 2012 - 2014
                  </p>
                </div>
                <div className="degree">
                  <ul>
                    <li>
                      <i className="fa fa-file-text" /> Software Engneering
                    </li>
                    <li>
                      <i className="fa fa-university" /> Oxford University
                    </li>
                  </ul>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  semper lacus tortor, quis bibendum odio mattis vitae. Cras
                  porta massa pretium auctor congue. Suspendisse ante massa,
                  euismod sit amet sem sed, viverra tristique diam.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="single-education">
                <div className="education-history text-center">
                  <p>
                    <i className="fa fa-graduation-cap" />
                    <br /> 2010 - 2012
                  </p>
                </div>
                <div className="degree">
                  <ul>
                    <li>
                      <i className="fa fa-file-text" /> Software Engneering
                    </li>
                    <li>
                      <i className="fa fa-university" /> Oxford University
                    </li>
                  </ul>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  semper lacus tortor, quis bibendum odio mattis vitae. Cras
                  porta massa pretium auctor congue. Suspendisse ante massa,
                  euismod sit amet sem sed, viverra tristique diam.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="single-education">
                <div className="education-history text-center">
                  <p>
                    <i className="fa fa-graduation-cap" />
                    <br /> 2008 - 2010
                  </p>
                </div>
                <div className="degree">
                  <ul>
                    <li>
                      <i className="fa fa-file-text" /> Software Engneering
                    </li>
                    <li>
                      <i className="fa fa-university" /> Oxford University
                    </li>
                  </ul>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  semper lacus tortor, quis bibendum odio mattis vitae. Cras
                  porta massa pretium auctor congue. Suspendisse ante massa,
                  euismod sit amet sem sed, viverra tristique diam.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="single-education">
                <div className="education-history text-center">
                  <p>
                    <i className="fa fa-graduation-cap" />
                    <br />> 2004 - 2008
                  </p>
                </div>
                <div className="degree">
                  <ul>
                    <li>
                      <i className="fa fa-file-text" /> Software Engneering
                    </li>
                    <li>
                      <i className="fa fa-university" /> Oxford University
                    </li>
                  </ul>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  semper lacus tortor, quis bibendum odio mattis vitae. Cras
                  porta massa pretium auctor congue. Suspendisse ante massa,
                  euismod sit amet sem sed, viverra tristique diam.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="single-education">
                <div className="education-history text-center">
                  <p>
                    <i className="fa fa-graduation-cap" />
                    <br />> 2000 - 2004
                  </p>
                </div>
                <div className="degree">
                  <ul>
                    <li>
                      <i className="fa fa-file-text" /> Software Engneering
                    </li>
                    <li>
                      <i className="fa fa-university" /> Oxford University
                    </li>
                  </ul>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  semper lacus tortor, quis bibendum odio mattis vitae. Cras
                  porta massa pretium auctor congue. Suspendisse ante massa,
                  euismod sit amet sem sed, viverra tristique diam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export { EducationPage };