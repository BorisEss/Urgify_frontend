import { Table as MaterialTable } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import {makeStyles} from 'tss-react/mui';


const useStyles = makeStyles()({
  tr: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(184, 184, 184, 0.2)',
    },
  },
  th: {
    fontFamily: 'Poppins-medium',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '24px',
    textTransform: 'uppercase',
    color: '#777777',
    borderBottom: '8px solid #2B364D',
    padding: 8,
  },
  td: {
    padding: '16px 8px',
    lineHeight: 0,
  },
  tdTitle: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',
    color: '#2B364D',
  },
  tdRight: {
    textAlign: 'right',
  },
});

function createData(
  date: string,
  sum: string,
  paymentType: string,
) {
  return { date, sum, paymentType};
}

const rows = [
  createData('11/22/2022', '$67,890', 'MasterCard*2589',),
  createData('11/15/2022', '$90,000', 'MasterCard*2589',),
  createData('10/22/2022', '$90,000', 'MasterCard*2589',),
  createData('9/24/2022', '$320,000', 'Visa**4589',),
];

const TableInvoicesInformationModal = () => {
  const {cx,classes} = useStyles();

  return (
    <TableContainer>
      <MaterialTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.th}>payment history</TableCell>
            <TableCell align="left" className={classes.th} />
            <TableCell align="left" className={classes.th} />
            <TableCell align="left" className={classes.th} />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              className={classes.tr}
              key={row.date}
              sx={{ '& td, & th': { border: 0 } }}
            >
              <TableCell className={classes.td}>
                <span className={classes.tdTitle}>
                  {row.date}
                </span>
              </TableCell>
              <TableCell align="left" className={classes.td}>
                <span className={classes.tdTitle}>
                  {row.sum}
                </span>
              </TableCell>
              <TableCell align="left" className={cx(classes.td, classes.tdRight)}>
                <span className={classes.tdTitle}>
                  {row.paymentType}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MaterialTable>
    </TableContainer>
  );
};

export default TableInvoicesInformationModal;
