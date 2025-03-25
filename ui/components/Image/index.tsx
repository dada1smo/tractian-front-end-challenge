import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { FunctionComponent } from 'react';

type ImageProps = NextImageProps;

const UIImage: FunctionComponent<ImageProps> = (props) => {
  return (
    <NextImage
      {...props}
      width={0}
      height={0}
      style={{ width: props.width, height: 'auto' }}
    />
  );
};

export default UIImage;
