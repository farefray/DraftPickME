import React from "react";

function Loader(props) {
  const loaderStyle = {
    backgroundColor: "#fff"
  }
  return (
      <div className="loading animated fadeOut" style={loaderStyle}>
        <div className="table-cell">
          <div className="cp-spinner cp-round" />
        </div>
      </div>
  );
};

export {Loader};

