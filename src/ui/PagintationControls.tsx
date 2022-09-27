import { Pagination } from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

import TextButton from './Buttons/TextButton';

const useStyles = makeStyles()({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ul: {
    // color: customTheme.color.stroke,
    // '& .MuiPaginationItem-outlined': {
    //   border: `2px solid ${customTheme.color.stroke}`,
    //   color: customTheme.color.grayscale,
    // },
    // '& .Mui-selected': {
    //   backgroundColor: 'transparent',
    //   borderColor: customTheme.color.lime,
    //   color: customTheme.color.lime,
    //   '&:hover': {
    //     backgroundColor: 'transparent',
    //   },
    // },
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
      <TextButton
        color={isNotFirstPage ? 'orange' : 'gray'}
        onClick={() => handleChange(null, props.currentPage - 1)}
        title="Previous"
        disabled={!isNotFirstPage}
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
      <TextButton
        color={isNotLastPage ? 'orange' : 'gray'}
        onClick={() => handleChange(null, props.currentPage + 1)}
        title="Next"
        disabled={!isNotLastPage}
      />
    </div>
  );
};

export default PaginationControls;
