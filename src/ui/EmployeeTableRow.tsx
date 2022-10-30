import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { IMask } from 'react-imask';
import {makeStyles} from 'tss-react/mui';

import type { DepartmentEmployeeType } from '../api/apiTypes';
import { employeeAttributes, patientStatuses } from '../constants/employee';
import type { EmployeeAttributeItem } from '../types';
import AttributionDropdown from './AttributionDropdown';

const useStyles = makeStyles()({
  td: {
    padding: '16px 8px',
    lineHeight: 0,
  },
  attributeCell: {
    width: 144,
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
    borderRadius: 2,
    fontSize: 12,
    lineHeight:'18px',
  },
  yellow: {
    background: '#F1DF37',
  },
  green: {
    background: '#2FC77B',
  },
  gray: {
    background: '#B8B8B8',
  },
});

type Props = {
  employee: DepartmentEmployeeType;
};

const EmployeeTableRow: React.FC<Props> = ({
  employee,
}) => {
  const {classes, cx} = useStyles();
  const [attributes, setAttributes] = React.useState<EmployeeAttributeItem[]>([
    {
      id: 1,
      title: employeeAttributes.Finance,
      description: 'Person who manage all invoices',
      checked: employee.attribution === employeeAttributes.Finance,
    },
    {
      id: 2,
      title: employeeAttributes.Patients,
      description: 'Person who first interact with the patient',
      checked: employee.attribution === employeeAttributes.Patients,
    },
    {
      id: 3,
      title: employeeAttributes.Editor,
      description: 'At ornare in viverra tellus suspendisse etiam at. Quis vel.',
      checked: employee.attribution === employeeAttributes.Editor,
    },
  ].sort((a) => {
    if (a.checked) return -1;
    else return 1;
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case patientStatuses.Pending: return 'yellow';
      case patientStatuses.Active: return 'green';
      default: return 'gray';
    }
  };

  const convertCellPhone = (phone: string) => {
    var masked = IMask.createMask({
      mask: '{(}000{) }000{-}0000',
    });
    return masked.resolve(phone);
  };

  return (
    <TableRow
      sx={{ '& td, & th': { border: 0 } }}
    >
      <TableCell className={classes.td}>
        <span className={classes.tdTitle}>
          {employee.fullName}
        </span>
      </TableCell>
      <TableCell align="left" className={classes.td}>
        <span className={classes.tdTitle}>
          {employee.email}
        </span>
      </TableCell>
      <TableCell align="left" className={classes.td}>
        <span className={classes.tdTitle}>
          {convertCellPhone(employee.phone)}
        </span>
      </TableCell>
      <TableCell align="left" className={classes.td}>
        <span className={cx(classes.tdTitle, classes.status, classes[getStatusColor(employee.status)])}>
          {employee.status}
        </span>
      </TableCell>
      <TableCell align="left" className={cx(classes.td, classes.attributeCell)}>
        <AttributionDropdown
          attributes={attributes}
          setAttributes={setAttributes}
        />
      </TableCell>
    </TableRow>
  );
};

export default EmployeeTableRow;
