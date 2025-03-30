import { FunctionComponent } from 'react';

interface UIAvatarProps {
  name: string;
  displayName?: boolean;
}

const UIAvatar: FunctionComponent<UIAvatarProps> = ({ name, displayName }) => {
  const initial = name.split('')[0];

  return (
    <div className="flex gap-2 items-center">
      <div className="h-5 w-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
        {initial}
      </div>
      {displayName && <div>{name}</div>}
    </div>
  );
};

export default UIAvatar;
