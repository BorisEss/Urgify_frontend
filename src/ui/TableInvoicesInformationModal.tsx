import { Table as MaterialTable } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import {makeStyles} from 'tss-react/mui';

import { formatApiDate } from '../utils/formatters';

const useStyles = makeStyles()({
  tr: {
    verticalAlign: 'top',
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
  },
  tdTitle: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 16,
    color: '#2B364D',
  },
  totalChargesTr: {

  },
  totalChargesTd: {
    padding: '16.5px 8px',
    background: 'rgba(184, 184, 184, 0.2)',
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
  createData('9/23/2021 to 9/27/2021', 'Medical care', '$78,000','30 days'),
  // createData('9/23/2021 to 9/27/2021', 'Lab test', '$1,005.3',''),
];

type Props = {
  withTotalChargesLine?: boolean;
}

const TableInvoicesInformationModal:React.FC<Props> = ({
  withTotalChargesLine,
}) => {
  const {classes, cx} = useStyles();

  const totalCharges = '$79,005.3';
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [date, setDate] = React.useState<number>(Date.now());

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
              <TableCell className={classes.td} width={174}>
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
          {withTotalChargesLine ? (
            <TableRow
              className={cx(classes.tr, classes.totalChargesTr)}
              key="totalCharges"
              sx={{ '& td, & th': { border: 0 } }}
            >
              <TableCell className={cx(classes.td, classes.totalChargesTd)} />

              <TableCell className={cx(classes.td, classes.totalChargesTd)}>
                <span className={classes.tdTitle}>
                  Total Charges
                </span>
              </TableCell>
              <TableCell className={cx(classes.td, classes.totalChargesTd)}>
                <span className={classes.tdTitle}>
                  {totalCharges}
                </span>
              </TableCell>
              <TableCell className={cx(classes.td, classes.totalChargesTd)}>
                <span className={classes.tdTitle}>
                  Due {formatApiDate(date, 'M/dd/yyyy')}
                </span>
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </MaterialTable>
    </TableContainer>
  );
};

export default TableInvoicesInformationModal;
