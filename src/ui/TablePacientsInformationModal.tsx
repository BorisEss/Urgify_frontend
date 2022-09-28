import { Table as MaterialTable } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import {makeStyles} from 'tss-react/mui';

const useStyles = makeStyles()({
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
  status: {
    padding: '3px 22px',
    background: '#2FC77B',
    borderRadius: 2,
    fontSize: 12,
    lineHeight:'18px',
    color: '#fff',
  },
  dispute: {
    padding: '3px 8px',
    background: '#B8B8B8',
    borderRadius: 2,
    fontSize: 12,
    lineHeight:'18px',
    color: '#fff',
  },
  disputeWrap: {
    textAlign: 'end',
  },
});

function createData(
  invoiceId: string,
  issuedDate: string,
  dueDate: string,
  invoiceAmount: string,
  status: string,
  openDispute: string,
) {
  return { invoiceId, issuedDate, dueDate, invoiceAmount, status, openDispute};
}

const rows = [
  createData('#123456', '9/23/2021', '11/23/2022', '$567,890', 'Paid','Open Dispute'),
  createData('#123456', '9/23/2021', '11/23/2022', '$567,890', 'Paid', 'Open Dispute',),
];

const TablePacientsInformationModal = () => {
  const {classes, cx} = useStyles();

  return (
    <TableContainer>
      <MaterialTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.th}>invoice id</TableCell>
            <TableCell align="left" className={classes.th}>issued DATE</TableCell>
            <TableCell align="left" className={classes.th}>due DATE</TableCell>
            <TableCell align="left" className={classes.th}>INVOICE AMOUNT</TableCell>
            <TableCell align="left" className={classes.th}>Status</TableCell>
            <TableCell align="left" className={classes.th} />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.invoiceId}
              sx={{ '& td, & th': { border: 0 } }}
            >
              <TableCell className={classes.td}>
                <span className={classes.tdTitle}>
                  {row.invoiceId}
                </span>
              </TableCell>
              <TableCell align="left" className={classes.td}>
                <span className={classes.tdTitle}>
                  {row.issuedDate}
                </span>
              </TableCell>
              <TableCell align="left" className={classes.td}>
                <span className={classes.tdTitle}>
                  {row.dueDate}
                </span>
              </TableCell>
              <TableCell align="left" className={classes.td}>
                <span className={classes.tdTitle}>
                  {row.invoiceAmount}
                </span>
              </TableCell>
              <TableCell align="left" className={classes.td}>
                <span className={cx(classes.tdTitle, classes.status)}>
                  {row.status}
                </span>
              </TableCell>
              <TableCell align="left" className={cx(classes.td,classes.disputeWrap)}>
                <span className={cx(classes.tdTitle, classes.dispute)}>
                  {row.openDispute}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MaterialTable>
    </TableContainer>
  );
};

export default TablePacientsInformationModal;
