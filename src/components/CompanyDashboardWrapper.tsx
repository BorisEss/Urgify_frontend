import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import images from '../images';
import { AddPatientsListRoute, InvoicesListRoute } from '../navigation/navTypes';
import type { DrawerLinkType } from '../types';
import Drawer from '../ui/Drawer';

type Props = {
  children: React.ReactNode;
}

const CompanyDashboardWrapper: React.FC<Props> = ({
  children,
}) => {
  let { companyId, departmentId } = useParams();
  let location = useLocation();

  if (!companyId || !departmentId) return null;

  const links: DrawerLinkType[] = [
    {
      title: 'Patients',
      icon: images.idCard,
      to: AddPatientsListRoute(),
      pathParams: {
        companyId,
        departmentId,
      },
      isActive: location.pathname.includes('/patients'),
    },
    {
      title: 'Invoices',
      icon: images.fileBlank,
      to: InvoicesListRoute(),
      pathParams: {
        companyId,
        departmentId,
      },
      isActive: location.pathname.includes('/invoices-list'),
    },
  ];

  return (
    <Drawer
      children={children}
      links={links}
    />
  );
};

export default CompanyDashboardWrapper;
