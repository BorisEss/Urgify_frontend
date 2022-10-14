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
import { numberFormat } from '../utils/numberFormat';
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
    paddingLeft: 4,
    paddingRight: 4,
    width: '100%',
  },
  doubleWrap: {
    position: 'relative',
  },
  colouredBlocks: {
    width: '100%',
    height: 24,
    position: 'absolute',
    zIndex: -1,
  },
  colouredGreen: {
    backgroundColor: '#2FC77B',
    height: '100%',
    display: 'inline-block',
    borderRadius: '99px 0 0 99px',
  },
  colouredRed: {
    backgroundColor: '#F93822',
    height: '100%',
    display: 'inline-block',
    borderRadius: '0 99px 99px 0',
  },
  fullyRounded: {
    borderRadius: 99,
  },
  textsBlock: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: 4,
    paddingRight: 12,
    gap: 8,
  },
  coloured: {
    display: 'flex',
    paddingLeft: 4,
    paddingRight: 11,
  },
  priceText: {
    color: '#fff',
  },
  remainItem: {
    paddingLeft: 65,
  },
  iconDollar: {
    marginRight: 6,
  },
});

function createData(
  medicalNumber: string,
  ssn: string,
  name: string,
  total: number,
  paid: number,
) {
  return { medicalNumber, ssn, name, total, paid};
}

const rows = [
  createData('SD9212969', '999-88-7777', 'Bastian Schweinsteiger', 567890, 247890),
  createData('SD9212969', '010-14-1234', 'Annette Black', 1574.09, 943.65),
  createData('SD9212969', '010-87-6541', 'Savannah Nguyen', 778.35, 778.35),
  createData('BA9212320', '321-67-6541', 'Brooklyn Simmons', 475.22, 0),
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
              <TableCell
                align="left"
                className={cx(classes.th,)}>
                <span>Paid</span>
                <span className={classes.remainItem}>Remain</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const unpaid = row.total - row.paid;
              const paidPercent = (100 * row.paid) / row.total;
              const unpaidPercent = `calc(100% - ${paidPercent}%)`;
              return (
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
                      <img className={classes.iconDollar} src={images.dollarSign} />
                      {numberFormat(+row.total.toFixed(2))}
                    </span>
                  </TableCell>
                  <TableCell width={216} align="left" className={classes.td}>
                    <div className={classes.doubleWrap}>
                      <div className={classes.colouredBlocks}>
                        <div
                          className={cx(classes.colouredGreen, paidPercent === 100 && classes.fullyRounded)}
                          style={{width: paidPercent + '%'}}
                        />
                        <div
                          className={cx(classes.colouredRed, paidPercent === 0 && classes.fullyRounded)}
                          style={{width: unpaidPercent}}
                        />
                      </div>
                      <div className={classes.textsBlock}>
                        <span className={cx(classes.tdTitle, classes.priceText)}>
                          <img className={classes.iconDollar} src={images.dollarSign} />
                          {unpaid === row.total ? numberFormat(+unpaid.toFixed(2)) : numberFormat(+row.paid.toFixed(2))}
                        </span>
                        <span className={cx(classes.tdTitle, classes.priceText)}>
                          {unpaid === row.total ? 'Unpaid' : unpaid === 0 ? 'Paid' : numberFormat(+unpaid.toFixed(2)) }
                        </span>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
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
