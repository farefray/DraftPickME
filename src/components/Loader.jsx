import React from "react";

export class Loader extends React.Component {
  // Maybe thats a stupid way to solve Loading issues? Aswell as animating, read this: https://reactjs.org/docs/animation.html
  // Need another loader. This one looks too bad to emulate its displaying
  state = { loading: true };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => { this.setState({loading:false}) }, 2500)
  }

  render() {
    let animationClasses = this.state.loading
      ? "loading fadeOut animated"
      : "loading";

    let animationStyle = { display: !this.state.loading ? "none" : "table" };
    return (
      <div className={animationClasses} style={animationStyle}>
        <div className="table-cell">
          <div className="cp-spinner cp-round" />
        </div>
      </div>
    );
  }
}

