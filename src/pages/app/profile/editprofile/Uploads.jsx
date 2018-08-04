import React from "react";
import PropTypes from "prop-types";
import CVFile from "./uploads/CvFile";
import { storage } from "@/firebase";

// Import React FilePond and file type validation for it
import { FilePond, registerPlugin } from "react-filepond";
import FilepondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilepondPluginImagePreview from "filepond-plugin-image-preview";
import FilepondPluginFileRename from 'filepond-plugin-file-rename';
registerPlugin(FilepondPluginFileValidateType);
registerPlugin(FilepondPluginImagePreview);
registerPlugin(FilepondPluginFileRename);

// Import FilePond styles
import "filepond/dist/filepond.min.css";

export default class Uploads extends React.PureComponent {
  static propTypes = {
    removeFile: PropTypes.func.isRequired,
    onSuccessfullUpload: PropTypes.func.isRequired,
    profile: PropTypes.shape({
      photo: PropTypes.string.isRequired,
      cvFile: PropTypes.shape({
        name: PropTypes.string,
        path: PropTypes.string
      }).isRequired
    }).isRequired
  };

  fileRename = (fileInfo) => {
    let { profile } = this.props;
    return `${profile.firstName}_${profile.lastName}${fileInfo.extension}`;
  }
  
  handleProcessing = (type, file, load, progress, abort) => {
    let uploadTask = storage.uploadFile(file, type);
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

        if (type == "cvFile") {
          const cvFile = {
            path: downloadURL,
            name: file.name
          };
          console.log(this.props);
          this.props.onSuccessfullUpload("cvFile", cvFile);
        } else {
          this.props.onSuccessfullUpload("photo", downloadURL);
        }
      });
    });
  };

  render() {
    let { profile } = this.props;

    let cvFile = { ...profile.cvFile };
    return (
      <React.Fragment>
        <div className="form-group">
          {cvFile.path !== "" ? (
            <CVFile
              source={cvFile.path}
              filename={"Uploaded CV file: " + cvFile.name}
              removeFile={() => this.props.removeFile("cvFile")}
            />
          ) : (
            <React.Fragment>
              <label htmlFor="surnameInput">Upload your CV:</label>
              <FilePond
                allowFileTypeValidation={true}
                acceptedFileTypes={[
                  "application/msword",
                  "application/vnd.oasis.opendocument.text",
                  "application/rtf",
                  "text/plain",
                  "application/pdf"
                ]}
                allowFileRename={true}
                fileRenameFunction={this.fileRename}
                allowMultiple={false}
                maxFiles={1}
                labelIdle={
                  'Drag & Drop or <span class="filepond--label-action"> Browse </span>'
                }
                server={{
                  process: (
                    fieldName,
                    file,
                    metadata,
                    load,
                    error,
                    progress,
                    abort
                  ) =>
                    this.handleProcessing(
                      "cvFile",
                      file,
                      load,
                      progress,
                      abort
                    ),
                  revert: () => this.props.removeFile("cvFile")
                }}
              />
            </React.Fragment>
          )}
        </div>
        <div className="form-group">
          {profile.photo !== "" ? (
            <CVFile
              source={profile.photo}
              filename="Photo uploaded!"
              removeFile={() => this.props.removeFile("photo")}
            />
          ) : (
            <React.Fragment>
              <label htmlFor="surnameInput">Upload your photo:</label>
              <FilePond
                allowImagePreview={true}
                imagePreviewMaxFileSize="5MB"
                imagePreviewMinHeight={44}
                imagePreviewMaxHeight={256}
                allowFileTypeValidation={true}
                allowFileRename={true}
                fileRenameFunction={this.fileRename}
                acceptedFileTypes={["image/jpeg", "image/png"]}
                allowMultiple={false}
                maxFiles={1}
                labelIdle={
                  'Drag & Drop or <span class="filepond--label-action"> Browse </span>'
                }
                server={{
                  process: (
                    fieldName,
                    file,
                    metadata,
                    load,
                    error,
                    progress,
                    abort
                  ) =>
                    this.handleProcessing("photo", file, load, progress, abort),
                  revert: () => this.props.removeFile("photo")
                }}
              />
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}
