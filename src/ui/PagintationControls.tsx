import { Pagination } from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

import PaginationButton from './Buttons/PaginationButton';

const useStyles = makeStyles()({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 0,
  },
  ul: {
    '& .MuiPaginationItem-outlined': {
      border: 'none',
      color: '#777777',
      borderRadius: 0,
      margin: 0,
      padding: 8,
      fontFamily: 'Poppins-semibold',
      fontWeight: 600,
      fontSize: 16,
      lineHeight: '24px',
      minWidth: 40,
      height: 40,
    },

    '& .Mui-selected': {
      backgroundColor: '#2B364D',
      color: '#fff',

      '&:hover': {
          backgroundColor: '#2B364D',
      },
    },
  },

});

interface IProps {
  totalProducts: number;
  currentPage: number;
  pageSize: number;
  onChangePage: (page: number) => void;
}

const PaginationControls: React.FC<IProps> = (props) => {
  const {classes} = useStyles();

  const handleChange = (event: React.ChangeEvent<unknown> | null, newPage: number) => {
    if (event) {
      event.preventDefault();
    }
    if (newPage === props.currentPage) return;

    window.scrollTo({top: 0, behavior: 'smooth'});
    props.onChangePage(newPage);
  };

  const totalPages: number = Math.ceil(props.totalProducts / props.pageSize);
  const isNotFirstPage: boolean = props.currentPage !== 1;
  const isNotLastPage: boolean = props.currentPage !== totalPages;

  if (totalPages === 1) return null;

  return (
    <div className={classes.root}>
       <PaginationButton
        title="Previous"
        disabled={!isNotFirstPage}
        onClick={() => handleChange(null, props.currentPage - 1)}
        isPrevious
      />
      <Pagination
        classes={{ul: classes.ul}}
        count={totalPages}
        page={props.currentPage}
        onChange={handleChange}
        hideNextButton
        hidePrevButton
        variant="outlined"
        shape="rounded"
        siblingCount={isNotFirstPage && isNotLastPage ? 1 : 0}
      />
      <PaginationButton
        title="Next"
        disabled={!isNotLastPage}
        onClick={() => handleChange(null, props.currentPage + 1)}
      />
    </div>
  );
};

export default PaginationControls;
