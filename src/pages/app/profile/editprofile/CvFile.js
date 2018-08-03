import React from 'react';
import PropTypes from "prop-types";

let mainStyle = {
    height: "60px"
}

let innerStyle = {
    height: "40px"
}

let middlePanel = {
    transform: 'translate3d(0px, 5px, 0) scale3d(1, 0.3, 1)'
}

let bottomPanel = {
    transform:'translate3d(0px, 35px, 0)'
}

let paddingClass = {
    paddingLeft: '25px'
}
const CVFile = (props) => {
  return <div className="filepond--wrapper" onClick={(e) => {
      props.removeFile();
      e.stopPropagation();
  }}>
  
  <div className="filepond--root filepond--hopper" style={mainStyle}>
      <div className="filepond--list-scroller" >
          <ul className="filepond--list" role="list">
              <li className="filepond--item" style={innerStyle}>
                  <fieldset className="filepond--file-wrapper" style={paddingClass}>
                      <legend>Maksym_Fedan (1).html</legend>
                      <div className="filepond--file">
                          <button className="filepond--file-action-button filepond--action-remove-item" type="button" title="Remove" disabled="disabled" >
                              <svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M11.586 13l-2.293 2.293a1 1 0 0 0 1.414 1.414L13 14.414l2.293 2.293a1 1 0 0 0 1.414-1.414L14.414 13l2.293-2.293a1 1 0 0 0-1.414-1.414L13 11.586l-2.293-2.293a1 1 0 0 0-1.414 1.414L11.586 13z" fill="currentColor" fillRule="nonzero"></path>
                              </svg>
                          </button>
                          <div className="filepond--file-info" ><span className="filepond--file-info-main" aria-hidden="true">Maksym_Fedan (1).html</span></div>
                          <div className="filepond--processing-complete-indicator" >
                              <svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M18.293 9.293a1 1 0 0 1 1.414 1.414l-7.002 7a1 1 0 0 1-1.414 0l-3.998-4a1 1 0 1 1 1.414-1.414L12 15.586l6.294-6.293z" fill="currentColor" fillRule="nonzero"></path>
                              </svg>
                          </div>
                      </div>
                  </fieldset>
                  <div className="filepond--panel filepond--item-panel" data-scalable="true">
                      <div className="filepond--panel-top filepond--item-panel"></div>
                      <div className="filepond--panel-center filepond--item-panel" style={middlePanel}></div>
                      <div className="filepond--panel-bottom filepond--item-panel" style={bottomPanel}></div>
                  </div>
              </li>
          </ul>
      </div>
      </div>
</div>
}

CVFile.propTypes = {
  removeFile: PropTypes.func.isRequired,
  source: PropTypes.string.isRequired
};

export default CVFile;
