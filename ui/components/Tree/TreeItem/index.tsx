'use client';

import { FunctionComponent, ReactNode, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import Image from 'next/image';
import styles from './styles.module.css';

export interface UITreeItemProps {
  id: string;
  name: string;
  children: UITreeItemProps[];
  lineage: string[];
  category: string;
  onOpenChange?: () => void;
  onSelectItem?: (itemId: string, category: string) => void;
  isSelected?: boolean;
  content?: ReactNode;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
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
        className={`text-sm text-left flex items-center gap-1 py-1 px-2 w-full transition duration-300 ease-in-out ${
          item.isSelected ? 'bg-primary-500 text-white' : ''
        }`}
        onClick={() => {
          if (!hasChildren && item.onSelectItem) {
            item.onSelectItem(item.id, item.category);
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
        {item.iconStart && item.iconStart}
        {item.name}
        {item.iconEnd && item.iconEnd}
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
