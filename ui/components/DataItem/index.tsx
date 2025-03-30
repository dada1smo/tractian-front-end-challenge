import Image from 'next/image';
import { FunctionComponent, ReactNode } from 'react';

interface UIDataItemProps {
  label: string;
  content: ReactNode;
  iconStart?: string;
}

const UIDataItem: FunctionComponent<UIDataItemProps> = ({
  label,
  content,
  iconStart,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold">{label}</p>
      <div className="mb-4 text-neutrals-600 flex items-center gap-1">
        {iconStart && (
          <Image
            src={iconStart}
            alt=""
            width={20}
            height={20}
            className="mr-1"
          />
        )}
        {content}
      </div>
    </div>
  );
};

export default UIDataItem;
