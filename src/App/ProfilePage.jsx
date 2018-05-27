import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ProfilePage extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="col-md-6 col-md-offset-3">
        <p>Here we place profile editing f.e.</p>
        <Link to="/">Back</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };
