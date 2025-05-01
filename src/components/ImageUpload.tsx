// bootstrap elements
import { Spinner } from "reactstrap";
import { useEffect, useState } from "react";
// import { useTranslation } from 'react-i18next'

// fetch hock logic
// import linkGenerator from 'helpers/linkGenerator'
import React from "react";
import client from "../utils/client";

const ImageUpload = ({
  label,
  placeholder,
  model,
  theme = false,
  error,
  value,
  onUpload,
  onFininishUpload,
  type,
}: {
  label: string;
  placeholder?: string;
  model?: any;
  theme?: boolean;
  error?: any;
  value?: any;
  type?: string;
  onUpload?: () => void;
  onFininishUpload?: () => void;
}) => {
  // const { t } = useTranslation();

  const randomId = Math.random().toString(36).substring(7);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  // const [serverError, setServerEerror] = useState<boolean>(false)

  // watch value and update image
  useEffect(() => {
    setImage(value);
  }, [value]);

  const uploadFile = async (event: any) => {
    // Start loading
    setLoading(true);
    if (onUpload) onUpload();
    // Assign the file
    const file = event.target.files[0];

    // Add file name and file size
    const fileSize = Math.round(file.size / 1000);
    setFileName(file.name);
    setFileSize(fileSize);
    setImage(URL.createObjectURL(file));
    if (type) {
      if (file.type != "image/svg+xml") {
        showError();
        return;
      }
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("file", file);
    if (theme) formData.append("type", "theme");

    // Empty the input
    event.target.value = null;

    // Upload the image
    try {
      const response = await client.post(`mcp/store`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update value
      const name = model.name;
      model.onChange({
        target: {
          name,
          value: response.data.result,
        },
      });
      setFileName(response.data.result);
    } catch (error) {
      // Show error
      showError();
    }

    // Stop loading
    setLoading(false);
    if (onFininishUpload) onFininishUpload();
  };

  const removeFile = () => {
    setFileName("");
    setFileSize(0);
    setImage("");

    // Update value
    const name = model.name;
    model.onChange({
      target: {
        name,
        value: "",
      },
    });
  };

  const showError = () => removeFile();

  return (
    <div className="mb-3">
      <label htmlFor={randomId} className="form-label">
        {label}
      </label>
      <div
        className={
          error
            ? "is-invalid file-upload-container"
            : "is-invalid file-upload-container"
        }
      >
        {!image ? (
          <React.Fragment>
            <input
              type="file"
              className="mainInput"
              accept={
                type ? type : ".jpeg, .jpg, .jpe, .jfif, .jif, .png, .svg"
              }
              onChange={(event) => {
                uploadFile(event);
              }}
            />
            <div className="file-upload-content">
              <label>
                {placeholder ? (
                  placeholder
                ) : (
                  <React.Fragment>
                    {"Drag & Drop your files or"}{" "}
                    <span className="filepond--label-action"> {"Browse"} </span>
                  </React.Fragment>
                )}
              </label>
            </div>
          </React.Fragment>
        ) : (
          <div className="image-vieower">
            <img src={image} />
            <div className="overlay">
              <div className="image-details">
                {!!fileName && <h5>{fileName}</h5>}
                {!!fileSize && <p>{fileSize}</p>}
              </div>
              <div>
                {!loading ? (
                  <button
                    className="remove-btn"
                    type="button"
                    onClick={() => removeFile()}
                  >
                    <i className="ri-close-line"></i>
                  </button>
                ) : (
                  <button className="remove-btn" type="button">
                    <Spinner color="light" size="sm" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="invalid-feedback">{error?.message}</div>
    </div>
  );
};

export default ImageUpload;
