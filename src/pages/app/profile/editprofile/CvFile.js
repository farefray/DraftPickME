import React from 'react';
import PropTypes from "prop-types";

const CVFile = (props) => {
  return (<div className="filepond--wrapper">
  <div className="filepond--root filepond--hopper uploaded-csv">
      <div className="filepond--list-scroller">
          <ul className="filepond--list" role="list">
              <li className="filepond--item">
                  <fieldset className="filepond--file-wrapper">
                      <div className="filepond--file">
                          <div className="filepond--processing-complete-indicator">
                              <svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.293 9.293a1 1 0 0 1 1.414 1.414l-7.002 7a1 1 0 0 1-1.414 0l-3.998-4a1 1 0 1 1 1.414-1.414L12 15.586l6.294-6.293z" fill="currentColor" fillRule="nonzero"></path>
                            </svg>
                          </div>
                          <a href={props.source} target="_blank" rel="noopener noreferrer">
                          <div className="filepond--file-info"><span className="filepond--file-info-main" aria-hidden="true">
                            {props.filename}
                          </span></div>
                          </a>
                          <button className="filepond--file-action-button filepond--action-remove-item" type="button" title="Remove" onClick={(e)=> {
                              props.removeFile();
                              e.stopPropagation();
                          }} >
                            <svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.586 13l-2.293 2.293a1 1 0 0 0 1.414 1.414L13 14.414l2.293 2.293a1 1 0 0 0 1.414-1.414L14.414 13l2.293-2.293a1 1 0 0 0-1.414-1.414L13 11.586l-2.293-2.293a1 1 0 0 0-1.414 1.414L11.586 13z" fill="currentColor" fillRule="nonzero"></path>
                            </svg>
                        </button>
                      </div>
                  </fieldset>
                  <div className="filepond--panel filepond--item-panel" data-scalable="true">
                      <div className="filepond--panel-top filepond--item-panel"></div>
                      <div className="filepond--panel-center filepond--item-panel"></div>
                      <div className="filepond--panel-bottom filepond--item-panel"></div>
                  </div>
              </li>
          </ul>
      </div>
  </div>
</div>);
}

CVFile.propTypes = {
  removeFile: PropTypes.func.isRequired,
  filename: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired
};

export default CVFile;
