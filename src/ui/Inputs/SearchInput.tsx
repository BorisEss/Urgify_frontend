import React from 'react';
import {makeStyles} from 'tss-react/mui';

import images from '../../images';

const useStyles = makeStyles()({

  search: {
    border: '2px solid #DBDBDB',
    width: '100%',
    borderRadius: 4,
    paddingLeft: 48,
    paddingTop: 16,
    paddingBottom: 16,

    '&::placeholder' : {
      fontFamily: 'Poppins-regular',
      fontWeight: 500,
      fontSize: 16,
      lineHeight: '24px',
      color: '#777777',
      textTransform: 'uppercase',
    },
  },
  searchImg: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 167,
    left: 231,
  },
  inputWrap: {
    position: 'relative',
  },
});


const SearchInput = () => {
  const {classes} = useStyles();

  return (
    <>
    <div className={classes.inputWrap}>
      <input
          placeholder="search"
          className={classes.search}
        />
    </div>
      <img className={classes.searchImg} src={images.search} />
    </>
  );
};

export default SearchInput;
