import { FunctionComponent } from 'react';

interface UIDividerProps {
  className?: string;
}

const UIDivider: FunctionComponent<UIDividerProps> = ({ className }) => {
  return <div className={`h-[1px] w-full bg-border-card ${className}`} />;
};

export default UIDivider;
