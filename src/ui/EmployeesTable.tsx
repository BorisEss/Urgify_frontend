import { Table as MaterialTable } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import {makeStyles} from 'tss-react/mui';

import type { EmployeesArray } from '../api/apiTypes';
import EmployeeTableRow from './EmployeeTableRow';

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
});

type Props = {
  employees: EmployeesArray;
};

const EmployeesTable: React.FC<Props> = ({
  employees,
}) => {
  const {classes} = useStyles();
  return (
    <TableContainer>
      <MaterialTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.th}>Name</TableCell>
            <TableCell align="left" className={classes.th}>Email</TableCell>
            <TableCell align="left" className={classes.th}>Phone</TableCell>
            <TableCell align="left" className={classes.th}>Status</TableCell>
            <TableCell align="left" className={classes.th}>Attribution</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => <EmployeeTableRow key={employee.id} employee={employee} />)}
        </TableBody>
      </MaterialTable>
    </TableContainer>
  );
};

export default EmployeesTable;
