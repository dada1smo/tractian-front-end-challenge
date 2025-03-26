import {
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@radix-ui/react-scroll-area';
import { FunctionComponent, ReactNode } from 'react';
import styles from './styles.module.css';

interface UIScrollAreaProps {
  children: ReactNode;
}

const UIScrollArea: FunctionComponent<UIScrollAreaProps> = ({ children }) => {
  return (
    <ScrollArea className={`${styles.root} h-full`}>
      <ScrollAreaViewport className="h-full p-3">{children}</ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="vertical" className={styles.scrollbar}>
        <ScrollAreaThumb className={styles.thumb} />
      </ScrollAreaScrollbar>
    </ScrollArea>
  );
};

export default UIScrollArea;
