import React from "react";

class PortfolioPage extends React.Component {
  render() {
    let sectionStyle = {
      background: "url('/images/portfolio.png') no-repeat top center fixed",
      backgroundSize: "cover"
    };

    return (
      <section id="portfolio" style={sectionStyle}>
        <div className="container">
          <div className="row">
            <h2 className="none">Portfolio</h2>
            <ul className="simplefilter text-center">
              <li className="active" data-filter="all">
                All
              </li>
              <li data-filter="1">Web Design</li>
              <li data-filter="2">Web Develop</li>
              <li data-filter="3">Responsive</li>
              <li data-filter="4">Wordpress</li>
            </ul>
          </div>
          <div className="filtr-container">
            <div className="row">
              <div className="col-md-4 filtr-item" data-category="1, 4">
                <img
                  className="img-responsive img-portfolio"
                  alt="items"
                  src="http://placehold.it/1920x1280"
                />
                <a
                  className="icon-1 image-popup-vertical-fit text-center"
                  href="http://placehold.it/1920x1280"
                >
                  <i className="fa fa-search" />
                </a>
                <a className="icon-2" href="#" target="_blank">
                  <i className="fa fa-link" />
                </a>
              </div>
              <div className="col-md-4 filtr-item" data-category="2, 4">
                <img
                  className="img-responsive img-portfolio"
                  alt="items"
                  src="http://placehold.it/1920x1280"
                />
                <a
                  className="icon-1 image-popup-vertical-fit text-center"
                  href="http://placehold.it/1920x1280"
                >
                  <i className="fa fa-search" />
                </a>
                <a className="icon-2" href="#" target="_blank">
                  <i className="fa fa-link" />
                </a>
              </div>
              <div className="col-md-4 filtr-item" data-category="3, 2">
                <img
                  className="img-responsive img-portfolio"
                  alt="items"
                  src="http://placehold.it/1920x1280"
                />
                <a
                  className="icon-1 image-popup-vertical-fit text-center"
                  href="http://placehold.it/1920x1280"
                >
                  <i className="fa fa-search" />
                </a>
                <a className="icon-2" href="#" target="_blank">
                  <i className="fa fa-link" />
                </a>
              </div>
              <div className="col-md-4 filtr-item" data-category="2, 1">
                <img
                  className="img-responsive img-portfolio"
                  alt="items"
                  src="http://placehold.it/1920x1280"
                />
                <a
                  className="icon-1 image-popup-vertical-fit text-center"
                  href="http://placehold.it/1920x1280"
                >
                  <i className="fa fa-search" />
                </a>
                <a className="icon-2" href="#" target="_blank">
                  <i className="fa fa-link" />
                </a>
              </div>
              <div className="col-md-4 filtr-item" data-category="1, 2">
                <img
                  className="img-responsive img-portfolio"
                  alt="items"
                  src="http://placehold.it/1920x1280"
                />
                <a
                  className="icon-1 image-popup-vertical-fit text-center"
                  href="http://placehold.it/1920x1280"
                >
                  <i className="fa fa-search" />
                </a>
                <a className="icon-2" href="#" target="_blank">
                  <i className="fa fa-link" />
                </a>
              </div>
              <div className="col-md-4 filtr-item" data-category="1, 4">
                <img
                  className="img-responsive img-portfolio"
                  alt="items"
                  src="http://placehold.it/1920x1280"
                />
                <a
                  className="icon-1 image-popup-vertical-fit text-center"
                  href="http://placehold.it/1920x1280"
                >
                  <i className="fa fa-search" />
                </a>
                <a className="icon-2" href="#" target="_blank">
                  <i className="fa fa-link" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export { PortfolioPage };
