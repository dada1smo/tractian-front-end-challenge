'use client';

import { FunctionComponent, ReactNode, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import Image from 'next/image';
import styles from './styles.module.css';
import { TreeItem } from '@/modules/utils/tree';

export interface UITreeItemProps {
  id: string;
  name: string;
  children: UITreeItemProps[];
  lineage: string[];
  category: string;
  onOpenChange?: () => void;
  onSelectItem?: (item: TreeItem) => void;
  isSelected?: boolean;
  content?: ReactNode;
  iconStart?: string;
  iconEnd?: string;
  initial?: boolean;
}

const UITreeItem: FunctionComponent<{ item: UITreeItemProps }> = ({ item }) => {
  const [open, setOpen] = useState<boolean>(!!item.initial);

  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  return (
    <Collapsible
      open={hasChildren ? open : false}
      onOpenChange={(isOpen: boolean) => {
        item.onOpenChange?.();
        setOpen(isOpen);
      }}
    >
      <CollapsibleTrigger
        className={`text-sm flex items-center gap-1 py-1 px-2 w-full ${
          item.isSelected ? 'bg-primary-500' : ''
        }`}
        onClick={() => {
          if (!hasChildren && item.onSelectItem) {
            item.onSelectItem(item as TreeItem);
          }
        }}
        disabled={item.isSelected}
      >
        {hasChildren && (
          <Image
            src="/chevron.svg"
            alt=""
            width={10}
            height={10}
            className="mr-1"
          />
        )}
        {item.iconStart && (
          <Image src={item.iconStart} alt="" width={16} height={16} />
        )}
        {item.name}
        {item.iconEnd && (
          <Image src={item.iconEnd} alt="" width={16} height={16} />
        )}
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
