import React from "react";

export class Loader extends React.Component {
  // Maybe thats a stupid way to solve Loading issues? Aswell as animating, read this: https://reactjs.org/docs/animation.html
  // Need another loader. This one looks too bad to emulate its displaying
  state = {
    loading: false
  };

  constructor(props) {
    super(props);

    this.emulateLoading();
  }

  emulateLoading() {
    setTimeout(() => {
      this.setState({
        loading: true
      });
    }, 1000);
  }

  render() {
    let animationClasses = this.state.loading
      ? "loading fadeOut animated"
      : "loading";
    return (
      <div className={animationClasses}>
        <div className="table-cell">
          <div className="cp-spinner cp-round" />
        </div>
      </div>
    );
  }
}
