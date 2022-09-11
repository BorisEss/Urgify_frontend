import { Table as MaterialTable } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import {makeStyles} from 'tss-react/mui';

import Modal from '../ui/Modal';
import InvoicesInformationModal from './InvoicesInformationModal';
import InvoicesListDropdown from './InvoicesListDropdown';

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
    display: 'flex',
  },
  status: {
    padding: '3px 8px',
    borderRadius: 2,
    fontSize: 12,
    lineHeight:'18px',
    color: '#fff',
    display: 'inline-block',
    textAlign: 'center',
    width: 73,
  },
  statusPaid: {
    background: '#2FC77B',
  },
  statusUnpaid: {
    background: '#F93822',
  },
  statusOngoing: {
    background: '#F1DF37',
  },
  dispute: {
    padding: '3px 8px',
    background: '#B8B8B8',
    borderRadius: 2,
    fontSize: 12,
    lineHeight:'18px',
    color: '#fff',
    display: 'inline-block',
  },
  disputeOutlined: {
    color: '#2B364D',
    border: '2px solid #2B364D',
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
});

function createData(
  invoiceId: string,
  issuedDate: string,
  dueDate: string,
  invoiceAmount: string,
  status: string,
  dispute: string,
) {
  return { invoiceId, issuedDate, dueDate, invoiceAmount, status, dispute };
}

const rows = [
  createData('#123456', '9/23/2021', '11/23/2022', '$567,890', 'Paid', 'Open dispute'),
  createData('#ABH678', '8/2/2019', '10/2/2019', '$1,890', 'Paid', 'Open dispute'),
  createData('#456789', '3/5/2010', '6/20/2022', '$57,344', 'Unpaid', 'Open dispute'),
  createData('#234567', '5/19/1964', '5/19/1964', '$79', 'On going', 'Open dispute'),
];

const InvoicesListTable = () => {
  const {classes, cx} = useStyles();
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TableContainer>
        <MaterialTable sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.th}>Invoice Id</TableCell>
              <TableCell align="left" className={classes.th}>Issued Date</TableCell>
              <TableCell align="left" className={classes.th}>Due Date</TableCell>
              <TableCell align="left" className={classes.th}>Invoice Amount</TableCell>
              <TableCell align="left" className={classes.th}>
                <InvoicesListDropdown />
              </TableCell>
              <TableCell align="left" className={classes.th} />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                className={classes.tr}
                key={row.invoiceId}
                sx={{ '& td, & th': { border: 0 } }}
                onClick={handleClickOpen}
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
                  <span className={cx(classes.tdTitle, classes.status, classes.statusPaid)}>
                    {row.status}
                  </span>
                </TableCell>
                <TableCell align="left" className={classes.td}>
                  <span className={cx(classes.tdTitle, classes.dispute, classes.disputeOutlined)}>
                    {row.dispute}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MaterialTable>
      </TableContainer>
      <Modal
        open={open}
        handleClose={handleClose}
        borderRadius={4}
        children={
          <InvoicesInformationModal handleClose={handleClose}  />
        }
      />
    </>
  );
};

export default InvoicesListTable;
