import { Table as MaterialTable } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import {makeStyles} from 'tss-react/mui';

import type { EmployeesArray } from '../api/apiTypes';
import type { EmployeeAttributeItem } from '../types';
import AttributionDropdown from './AttributionDropdown';

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
    padding: '3px 8px',
    background: '#F1DF37',
    borderRadius: 2,
    fontSize: 12,
    lineHeight:'18px',
  },
});

function createData(
  name: string,
  email: string,
  phone: string,
  status: string,
  attribution: undefined,
) {
  return { name, email, phone, status, attribution };
}

const rows = [
  createData('Nataly Forestedd', 'nataly.ped@hospital.com', '(201) 555-0124', 'Pending', undefined),
  createData('Nataly Forested', 'nataly.ped@hospital.com', '(201) 555-0124', 'Pending', undefined),
];

type Props = {
  employees: EmployeesArray;
};

const EmployeesTable: React.FC<Props> = ({
  // employees,
}) => {
  const {classes, cx} = useStyles();
  const [attributes, setAttributes] = React.useState<EmployeeAttributeItem[]>([
    {
      id: '0',
      title: 'Finance',
      description: 'Person who manage all invoices',
      checked: true,
    },
    {
      id: '1',
      title: 'Patients',
      description: 'Person who first interact with the patient',
      checked: false,
    },
    {
      id: '2',
      title: 'Editor',
      description: 'At ornare in viverra tellus suspendisse etiam at. Quis vel.',
      checked: false,
    },
  ]);
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
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '& td, & th': { border: 0 } }}
            >
              <TableCell className={classes.td}>
                <span className={classes.tdTitle}>
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
                  {row.phone}
                </span>
              </TableCell>
              <TableCell align="left" className={classes.td}>
                <span className={cx(classes.tdTitle, classes.status)}>
                  {row.status}
                </span>
              </TableCell>
              <TableCell align="left" className={classes.td}>
                <AttributionDropdown
                  attributes={attributes}
                  setAttributes={setAttributes}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MaterialTable>
    </TableContainer>
  );
};

export default EmployeesTable;
