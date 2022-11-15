import type {Theme} from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

import images from '../images';
import {ReactComponent as CircleCheckWhite} from '../images/circle-checkwhite.svg';
import {ReactComponent as UploadPDFIcon} from '../images/file-pdf.svg';

const useStyles = makeStyles<{error?: boolean}>()((_theme: Theme, { error}) => ({
  dropzone: {
    padding: '14px 22px',
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',
    color: ' #777777',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#fff',
    border: !error ? '2px dashed #DBDBDB' : '2px dashed #F93822',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'relative',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,

    '& path': {
      fill: ' #777777',
    },
  },
  invisible: {
    display: 'none',
  },
  withFile: {
    padding: '14px 22px',
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',
    color: ' #777777',
    width: '100%',
    display: 'flex',
    backgroundColor: '#fff',
    border: !error ? '2px dashed #DBDBDB' : '2px dashed #F93822',
    alignItems: 'center',
    position: 'relative',
  },
  fileItem: {
    fontFamily: 'Poppins-semibold',
    fontSize: 16,
    lineHeight: '24px',
    color: '#2B364D',
    textDecoration: 'underline',
    display: 'flex',
    gap: 8,
  },
  checkIcon: {
    '& path': {
      fill: ' #2FC77B',
    },
  },
  closeIcon: {
    position: 'absolute',
    right: 12,
    top: 16,
    cursor: 'pointer',
    lineHeight: 0,
  },
}));

type Props = {
  url?: string;
  file?: File | null;
  setFile?: (file: File | null) => void;
  error?: boolean;
  errorText?: string;
}

const DropzoneInput: React.FC<Props> = ({
  url,
  file,
  setFile,
  error,
}) => {
  const {classes} = useStyles({error});
  const inputField = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) {
      return;
    }
    if (setFile) setFile(e.currentTarget.files[0]);
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
      if (setFile) setFile(e.dataTransfer.files[0]);
    }
  };
  // remove File
  const handleRemoveFile = () => {
    if (setFile) setFile(null);
  };

  return (
    <>
      { file || url ? (
        <div className={classes.withFile}>
          <div className={classes.fileItem}>
            <CircleCheckWhite className={classes.checkIcon} />
            <p>{url}</p>
          </div>
          <div onClick={handleRemoveFile} className={classes.closeIcon}>
            <img src={images.closeIcon} />
          </div>
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
            <UploadPDFIcon className= {classes.icon} />
            <span>Upload EOB (Explanation of Benefits)</span>
          </div>
          <input
            ref={inputField}
            onChange={handleFileUpload}
            type="file"
            accept=""
            style={{ display: 'none' }}
            className={classes.invisible}
          />
        </form>
      )}
    </>
  );
};

export default DropzoneInput;
