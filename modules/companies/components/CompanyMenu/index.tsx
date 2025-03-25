'use client';

import { FunctionComponent } from 'react';
import { CompanyType } from '../../types/CompanyType';
import { UIButton } from '@/ui/components/Button';
import { usePathname } from 'next/navigation';

interface CompanyMenuProps {
  companies: CompanyType[];
}

const CompanyMenu: FunctionComponent<CompanyMenuProps> = ({ companies }) => {
  const pathname = usePathname();

  return (
    <div className="flex gap-4">
      {companies.map((company) => (
        <UIButton
          key={company.id}
          size="sm"
          icon={{ position: 'before', src: '/company.svg', size: 16 }}
          link={{ href: `/${company.id}` }}
          variant={
            pathname.includes(company.id) || pathname === '/'
              ? 'default'
              : 'inactive'
          }
        >{`${company.name} Unit`}</UIButton>
      ))}
    </div>
  );
};

export default CompanyMenu;
