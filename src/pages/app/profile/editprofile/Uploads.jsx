import React from "react";
import PropTypes from "prop-types";
import CVFile from "./uploads/CvFile";
import { storage } from "@/firebase";

// Import React FilePond and file type validation for it
import { FilePond, File, registerPlugin } from "react-filepond";
import FilepondPluginFileValidateType from "filepond-plugin-file-validate-type";
registerPlugin(FilepondPluginFileValidateType);

// Import FilePond styles
import "filepond/dist/filepond.min.css";

export default class Uploads extends React.PureComponent {
  static propTypes = {
    removeFile: PropTypes.func.isRequired,
    profileChange: PropTypes.func.isRequired,
    profile: PropTypes.shape({
      photo: PropTypes.string.isRequired,
      cvFile: PropTypes.shape({
        name: PropTypes.string,
        path: PropTypes.string
      }).isRequired
    }).isRequired
  };

  fileName = oldName => {
    let { profile } = this.props;
    return (
      `${profile.firstName}_${profile.lastName}_CV.` +
        oldName.slice(((oldName.lastIndexOf(".") - 1) >>> 0) + 2) || "txt"
    );
  };

  handleProcessing = (
    fieldName,
    file,
    metadata,
    load,
    error,
    progress,
    abort
  ) => {
    let rename = this.fileName(file.name);
    let uploadTask = storage.uploadFile(file, rename);
    progress(true, 0, 1);
    uploadTask.on(
      `state_changed`,
      snapshot => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progress(true, percentage, 1);
      },
      error => {
        console.log(error);
        abort();
      }
    );

    uploadTask.then(snapshot => {
      snapshot.ref.getDownloadURL().then(downloadURL => {
        load(downloadURL);

        const cvFile = {
          path: downloadURL,
          name: rename
        };

        this.props.profileChange("cvFile", cvFile);
      });
    });
  };

  render() {
    let { profile } = this.props;

    return (
      <React.Fragment>
        <div className="form-group">
          <label htmlFor="surnameInput">Upload your CV:</label>
          {profile.cvFile.path !== "" ? (
            <CVFile
              source={profile.cvFile.path}
              filename={profile.cvFile.name}
              removeFile={this.props.removeFile}
            />
          ) : (
            <FilePond
              allowFileTypeValidation={true}
              acceptedFileTypes={[
                "application/msword",
                "application/vnd.oasis.opendocument.text",
                "application/rtf",
                "text/plain",
                "application/pdf"
              ]}
              allowMultiple={false}
              maxFiles={1}
              labelIdle={
                'Drag & Drop or <span class="filepond--label-action"> Browse </span>'
              }
              server={{ process: this.handleProcessing, revert: this.props.removeFile}}
            />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="surnameInput">Upload your photo:</label>
          <FilePond
            allowFileTypeValidation={true}
            acceptedFileTypes={["image/jpeg", "image/png"]}
            allowMultiple={false}
            maxFiles={1}
            labelIdle={
              'Drag & Drop or <span class="filepond--label-action"> Browse </span>'
            }
            server="/api/upload">
          </FilePond>
        </div>
      </React.Fragment>
    );
  }
}
