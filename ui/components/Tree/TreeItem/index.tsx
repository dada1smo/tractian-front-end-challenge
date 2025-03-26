'use client';

import { FunctionComponent, ReactNode, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import { TreeCategoryType } from '@/modules/global/types/CategoryType';
import Image from 'next/image';
import styles from './styles.module.css';

export interface UITreeItemProps {
  id: string;
  name: string;
  category: TreeCategoryType;
  children: UITreeItemProps[];
  onOpenChange?: () => void;
  content?: ReactNode;
}

const UITreeItem: FunctionComponent<{ item: UITreeItemProps }> = ({ item }) => {
  const [open, setOpen] = useState<boolean>(false);

  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  const determineIcon = (category: TreeCategoryType) => {
    switch (category) {
      case 'location':
        return '/location.svg';
      case 'asset':
        return '/asset.svg';
      case 'component':
        return '/component.svg';
      default:
        return '/location.svg';
    }
  };

  return (
    <Collapsible
      open={hasChildren ? open : false}
      onOpenChange={(isOpen: boolean) => {
        item.onOpenChange?.();
        setOpen(isOpen);
      }}
    >
      <CollapsibleTrigger className="text-sm flex items-center gap-1 py-1">
        {hasChildren && (
          <Image
            src="/chevron.svg"
            alt=""
            width={10}
            height={10}
            className="mr-1"
          />
        )}
        <Image
          src={determineIcon(item.category)}
          alt=""
          width={16}
          height={16}
        />
        {item.name}
      </CollapsibleTrigger>
      {hasChildren && (
        <CollapsibleContent
          className={`${styles.content} pl-7 ml-1 border-l border-border-card`}
        >
          <div className="pt-1 flex flex-col gap-1">{item.content}</div>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
};

export default UITreeItem;
