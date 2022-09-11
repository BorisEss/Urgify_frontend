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
});

function createData(
  name: string,
  email: string,
  phone: string,
  birthDate: string,
  ssn: string,
) {
  return { name, email, phone, birthDate, ssn };
}

const rows = [
  createData('Bastian Schweinsteiger', 'sample@mail.com', '(201) 555-0124', '9/23/2016', '999-88-7777'),
  createData('Courtney Henry', 'binhan628@gmail.com', '(209) 555-0104', '8/2/2019', '111-22-3333'),
];

const TablePatients = () => {
  const {classes} = useStyles();
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
              <TableCell className={classes.th}>Name</TableCell>
              <TableCell align="left" className={classes.th}>Email</TableCell>
              <TableCell align="left" className={classes.th}>Birth Date</TableCell>
              <TableCell align="left" className={classes.th}>SSN</TableCell>
              <TableCell align="left" className={classes.th}>Phone</TableCell>
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
                  {row.name}
                  </span>
                </TableCell>
                <TableCell align="left" className={classes.td}>
                  <span className={classes.tdTitle}>
                    {row.email}
                  </span>
                </TableCell>
                <TableCell align="left" className={classes.td}>
                  <span className={classes.tdTitle}>
                    {row.birthDate}
                  </span>
                </TableCell>
                <TableCell align="left" className={classes.td}>
                  <span className={classes.tdTitle}>
                    {row.ssn}
                  </span>
                </TableCell>
                <TableCell align="left" className={classes.td}>
                  <span className={classes.tdTitle}>
                    {row.phone}
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
