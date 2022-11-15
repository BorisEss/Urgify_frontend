import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import images from '../images';
import { AddCustomersListRoute, InvoicesListRoute } from '../navigation/navTypes';
import type { DrawerLinkType } from '../types';
import Drawer from '../ui/Drawer';

type Props = {
  children: React.ReactNode;
}

const CompanyDashboardWrapper: React.FC<Props> = ({
  children,
}) => {
  let { companyId } = useParams();
  let location = useLocation();

  if (!companyId) return null;

  const links: DrawerLinkType[] = [
    {
      title: 'Customers',
      icon: images.idCard,
      to: AddCustomersListRoute(),
      pathParams: {
        companyId,
      },
      isActive: location.pathname.includes('/customers'),
    },
    {
      title: 'Invoices',
      icon: images.fileBlank,
      to: InvoicesListRoute(),
      pathParams: {
        companyId,
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
