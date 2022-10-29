import React from 'react';
import {makeStyles} from 'tss-react/mui';

import images from '../../images';

const useStyles = makeStyles()((_theme) => ({
  downloadPdfButton: {
    backgroundColor: '#2FC77B',
    borderRadius: 4,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 16,
    cursor: 'pointer',
  },
  item: {
    fontFamily: 'Poppins-semibold',
    fontSize: 16,
    lineHeight: '24px',
    color: '#FFFFFF',
    textDecoration: 'underline',
    display: 'flex',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  widthCloser: {
    flex:'0 0 30%',
  },
}));

type DownloadPdfButtonType = {
  url: string;
};

const DownloadPdfButton: React.FC<DownloadPdfButtonType> = ({url}) => {
  const {cx,classes} = useStyles();
  return (
    <a
      href={url}
      download
      target="_blank"
      rel="noopener noreferrer"
      className={classes.downloadPdfButton}
    >
      <div className={classes.item}>
        <img className={classes.icon} src={images.circleCheckWhite}/>
        <p>{url}</p>
      </div>
      <div className={cx(classes.item,classes.widthCloser)}>
        <img className={classes.icon} src={images.cloudDown}/>
        <p>Download</p>
      </div>
    </a>
  );
};

export default DownloadPdfButton;
