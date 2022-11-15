import type {Theme} from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

import images from '../images';
import Button from './Buttons/Button';

const useStyles = makeStyles()((_theme: Theme) => ({
  dropzone: {
    width: '100%',
    height: 520,
    backgroundColor: '#fff',
    border: '2px dashed #DBDBDB',
    borderRadius: 4,
    display:' flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    cursor: 'pointer',
    position: 'relative',
    textAlign: 'center',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    maxWidth: 384,
    paddingTop: 8,
  },
  dropTitle: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 32,
    lineHeight: '48px',
    color: '#2B364D',
  },
  dropDescription: {
    fontFamily: 'Poppins-regular',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '24px',
    color: '#666666',
    paddingTop: 8,
    paddingBottom: 32,
  },
  icon: {
    width: 56,
    height: 56,
    color: '#2B364D',
  },
  invisible: {
    display: 'none',
  },
  withImage: {
    width: 268,
    height: 144,
    backgroundColor: '#fff',
    border: '2px solid #DBDBDB',
    borderRadius: 4,
    display:' flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',
  },
  uploadedImage: {
    width:'100%',
    height:'100%',
    objectFit: 'contain',
  },
  deleteContainer: {
    border: '2px solid #DBDBDB',
    borderRadius: 99,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 13,
    right: 17,
    width: 40,
    height: 40,
    cursor: 'pointer',
  },
  deleteTrash: {
    color: '#27263D',
  },
}));

type Props = {
  uploadedImage?: string;
  disableRemove?: boolean;
  image?: File | null;
  setImage?: (image: File | null) => void;
}

  const DropzoneCustomers: React.FC<Props> = ({ uploadedImage, disableRemove, image, setImage }) => {
  const {classes} = useStyles();
  const inputField = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) {
      return;
    }
    if (setImage) setImage(e.currentTarget.files[0]);
  };

  // handle drag events
  const handleDrag = function(e: React.DragEvent<HTMLDivElement | HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
  };

  // triggers when file is dropped
  const handleDrop = function(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (setImage) setImage(e.dataTransfer.files[0]);
    }
  };
  // remove File
  const handleRemoveFile = () => {
    if (setImage) setImage(null);
  };

  const srcImage = image ? URL.createObjectURL(image) : uploadedImage ? uploadedImage : '';
  return (
    <>
      { image || uploadedImage ? (
        <div className={classes.withImage}>
          <img
            src={srcImage}
            alt="logo"
            className={classes.uploadedImage} />
            {!disableRemove ? (
              <div
                className={classes.deleteContainer}
                onClick={handleRemoveFile}
              >
                <img
                  src={images.uploadTrash}
                  className={classes.deleteTrash}
                />
              </div>
            ) : null}

        </div>
      ) : (
        <form onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
          <div
            onClick={() => inputField && inputField.current ? inputField.current.click() : null}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={classes.dropzone}>
            <img
              alt="id-card"
              className={classes.icon}
              src={images.idCard}
            />
            <div className={classes.title}>
              <h2 className={classes.dropTitle}>Import customers</h2>
              <p className={classes.dropDescription}>Sit mi hendrerit nulla lobortis sed vitae id. Cras orci commodo diam dictumst adipiscing pellentesque. Quis ut et quam enim turpis.</p>
              <Button title="Import" />
            </div>
          </div>
          <input
            ref={inputField}
            onChange={handleFileUpload}
            type="file"
            style={{ display: 'none' }}
            className={classes.invisible}
          />
        </form>
      )}
    </>
  );
};

export default DropzoneCustomers;
