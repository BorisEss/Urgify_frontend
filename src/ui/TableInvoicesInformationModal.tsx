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
  },
  th: {
    fontFamily: 'Poppins-medium',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '24px',
    textTransform: 'uppercase',
    color: '#777777',
    borderBottom: 'none',
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
});

function createData(
  date: string,
  description: string,
  amount: string,
  dueDate: string,
) {
  return { date, description, amount,dueDate};
}

const rows = [
  createData('9/23/2021', 'Medical care', '$78,000','30 days'),
  createData('to 9/27/2021', 'Lab test', '$1,005.3',''),
];

const TableInvoicesInformationModal = () => {
  const {classes} = useStyles();

  return (
    <TableContainer>
      <MaterialTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.th}>date</TableCell>
            <TableCell align="left" className={classes.th}>description</TableCell>
            <TableCell align="left" className={classes.th}>amount</TableCell>
            <TableCell align="left" className={classes.th}>due date</TableCell>
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
              <TableCell className={classes.td}>
                <span className={classes.tdTitle}>
                  {row.description}
                </span>
              </TableCell>
              <TableCell className={classes.td}>
                <span className={classes.tdTitle}>
                  {row.amount}
                </span>
              </TableCell>
              <TableCell className={classes.td}>
                <span className={classes.tdTitle}>
                  {row.dueDate}
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
