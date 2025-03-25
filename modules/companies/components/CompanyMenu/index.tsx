import { FunctionComponent } from 'react';
import { CompanyType } from '../../types/CompanyType';
import { UIButton } from '@/ui/components/Button';

interface CompanyMenuProps {
  companies: CompanyType[];
}

const CompanyMenu: FunctionComponent<CompanyMenuProps> = ({ companies }) => {
  return (
    <div className="flex gap-4">
      {companies.map((company) => (
        <UIButton
          key={company.id}
          size="sm"
          icon={{ position: 'before', src: '/company.svg', size: 16 }}
          link={{ href: `/companies` }}
        >{`${company.name} Unit`}</UIButton>
      ))}
    </div>
  );
};

export default CompanyMenu;
