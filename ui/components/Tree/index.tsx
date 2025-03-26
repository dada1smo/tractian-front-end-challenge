import { FunctionComponent } from 'react';
import UITreeItem, { UITreeItemProps } from './TreeItem';

interface UITreeProps {
  items: UITreeItemProps[];
}

const UITree: FunctionComponent<UITreeProps> = ({ items }) => {
  return (
    <div className="flex flex-col gap-1">
      {items.map((item) => (
        <UITreeItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default UITree;
