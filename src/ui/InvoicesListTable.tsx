import { Table as MaterialTable } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import {makeStyles} from 'tss-react/mui';

import images from '../images';
import {ReactComponent as ArrowIcon} from '../images/arrow-up.svg';
import Modal from '../ui/Modal';
import TextButton from './Buttons/TextButton';
import InvoicesInformationModal from './InvoicesInformationModal';


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
    fontSize: 16,
    lineHeight: '24px',
    color: '#2B364D',
    display: 'flex',
  },
  itemWrap: {
    display: 'flex',
    alignItems: 'center',
  },
  arrowIcon: {
    width: 16,
    height: 16,
    marginLeft: 8,

    '& path': {
      fill: ' #777777',
    },
  },
  paid: {
    color: '#777777',
  },
  remainUnpaid: {
    color: '#F93822',
  },
  actionsSent: {
    textDecoration: 'none',
    color: '#777777',
    fontFamily: 'Poppins-regular',
  },
  icon: {
    width:24,
    height:24,
    marginRight: 8,
  },
});

function createData(
  invoiceId: string,
  issuedDate: string,
  invoiceAmount: string,
  paid: string,
  remain: string,
  actions: string,
) {
  return { invoiceId, issuedDate,  invoiceAmount, paid, remain, actions };
}

const rows = [
  createData('#123456', '9/23/2021','$567,890', '$247,890', '$320,000', 'Send reminder'),
  createData('#ABH678', '8/2/2019','$1,574.09', '$943.65', '$630.44', 'Reminder was sent'),
  createData('#456789', '3/5/2010','$778.35', 'Unpaid', '$778.35', 'Send invoice again'),
  createData('#234567', '5/19/1964','$567.890', '$567.890', 'Paid', ''),
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
              <TableCell align="left" className={classes.th}>
                <div className={classes.itemWrap}>
                  <span>Issued Date</span>
                  <ArrowIcon className={classes.arrowIcon} />
                </div>
              </TableCell>
              <TableCell align="left" className={classes.th}>
                <div className={classes.itemWrap}>
                  <span>Invoice Amount</span>
                  <ArrowIcon className={classes.arrowIcon} />
                </div>
              </TableCell>
              <TableCell align="left" className={classes.th}>
                <div className={classes.itemWrap}>
                  <span>Paid</span>
                  <ArrowIcon className={classes.arrowIcon} />
                </div>
              </TableCell>
              <TableCell align="left" className={classes.th}>
                <div className={classes.itemWrap}>
                  <span>Remain</span>
                  <ArrowIcon className={classes.arrowIcon} />
                </div>
              </TableCell>
              <TableCell align="left" className={classes.th}>Actions</TableCell>
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
                    {row.invoiceAmount}
                  </span>
                </TableCell>
                <TableCell align="left" className={classes.td}>
                  <span className={cx(classes.tdTitle,classes.paid)}>
                    <img className={classes.icon} src={images.error}/>
                    {row.paid}
                  </span>
                </TableCell>
                <TableCell align="left" className={classes.td}>
                  <span className={cx(classes.tdTitle,)}>
                    <img className={classes.icon} src={images.circleCheck}/>
                    {row.remain}
                  </span>
                </TableCell>
                <TableCell align="left" className={classes.td}>
                  <TextButton
                    title={row.actions}
                    color="black"
                    fontWeight="semibold"
                  />
                  {/* <span className={cx(classes.tdTitle,classes.actionsSent)}>Reminder was sent</span> */}
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
