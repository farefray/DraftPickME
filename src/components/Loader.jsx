import React from "react";

export class Loader extends React.Component {
  // Maybe thats a stupid way to solve Loading issues? Aswell as animating, read this: https://reactjs.org/docs/animation.html
  // Need another loader. This one looks too bad to emulate its displaying
  state = { loading: false, loaded: false };

  constructor(props) {
    super(props);

    this.emulateLoading();
  }

  emulateLoading() {
    // Very bad way to handle this, but I can't find any better for now :) TODO!
    setTimeout(() => {
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loaded: true });
      }, 500);
    }, 1000);
  }

  render() {
    let animationClasses = this.state.loading
      ? "loading fadeOut animated"
      : "loading";

    let animationStyle = { display: this.state.loaded ? "none" : "table" };
    return (
      <div className={animationClasses} style={animationStyle}>
        <div className="table-cell">
          <div className="cp-spinner cp-round" />
        </div>
      </div>
    );
  }
}
