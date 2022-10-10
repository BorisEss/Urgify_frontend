import { Table as MaterialTable } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import {makeStyles} from 'tss-react/mui';

import images from '../images';
import Modal from '../ui/Modal';
import PatientInformationModal from './PatientInformationModal';


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
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  total: {
    backgroundColor: '#2B364D',
    borderRadius: 99,
    color: '#fff',
    gap: 6,
    paddingLeft: 4,
    paddingRight: 4,
  },
  paid: {
    backgroundColor: '#2FC77B',
    borderRadius: 99,
    color: '#fff',
    gap: 6,
    paddingLeft: 4,
  },
  coloured: {
    display: 'flex',
    paddingLeft: 4,
    paddingRight: 11,
  },
});

function createData(
  medicalNumber: string,
  ssn: string,
  name: string,
  total: string,
  paidRemain: string,
) {
  return { medicalNumber, ssn, name, total, paidRemain};
}

const rows = [
  createData('SD9212969', '999-88-7777', 'Bastian Schweinsteiger', '$567,890', '$247,890 $320,000'),
  createData('SD9212969', '010-14-1234', 'Annette Black', '$1,574.09', '$943.65 $630.44'),
  createData('SD9212969', '010-87-6541', 'Savannah Nguyen', '$778.35', '$778.35 Unpaid'),
  createData('BA9212320', '321-67-6541', 'Brooklyn Simmons', '$475.22', '$475.22 Paid'),
];

const TablePatients = () => {
  const {classes,cx} = useStyles();
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
              <TableCell className={classes.th}>Medical Record Number</TableCell>
              <TableCell align="left" className={classes.th}>SSN</TableCell>
              <TableCell align="left" className={classes.th}>Name</TableCell>
              <TableCell align="left" className={classes.th}>Total</TableCell>
              <TableCell align="left" className={classes.th}>Paid Remain</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                className={classes.tr}
                key={row.name}
                sx={{ '& td, & th': { border: 0 } }}
                onClick={handleClickOpen}
              >
                <TableCell className={classes.td}>
                  <span className={classes.tdTitle}>
                  <img className={classes.icon} src={images.show}/>
                  {row.medicalNumber}
                  </span>
                </TableCell>
                <TableCell align="left" className={classes.td}>
                  <span className={classes.tdTitle}>
                    {row.ssn}
                  </span>
                </TableCell>
                <TableCell align="left" className={classes.td}>
                  <span className={classes.tdTitle}>
                    {row.name}
                  </span>
                </TableCell>
                <TableCell align="left" className={cx(classes.td,classes.coloured)}>
                  <span className={cx(classes.tdTitle, classes.total)}>
                    <img src={images.dollarSign} />
                    {row.total}
                  </span>
                </TableCell>
                <TableCell align="left" className={classes.td}>
                  <span className={cx(classes.tdTitle,classes.paid)}>
                    <img src={images.dollarSign} />
                    {row.paidRemain}
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
          <PatientInformationModal handleClose={handleClose}  />
        }
      />
    </>
  );
};

export default TablePatients;
