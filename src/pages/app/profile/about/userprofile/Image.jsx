import React from "react";
import PropTypes from "prop-types";

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  static propTypes = {
    alt: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired
  };

  render() {
    const {
      state: { loaded },
      props: { className, src, alt }
    } = this;

    let preloadClass = "image-preload image-preload-" + loaded;
    return (
      <div className="image-component">
        <div className={preloadClass} alt="preload" />
        <img
          className={className}
          src={src}
          alt={alt}
          onLoad={() => {
            this.setState({loaded: true});
          }}
        />
      </div>
    );
  }
}

export default Image;
