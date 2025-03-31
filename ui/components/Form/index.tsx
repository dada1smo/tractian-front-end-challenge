import { FormEventHandler, FunctionComponent, ReactNode } from 'react';

interface UIFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
  className?: string;
}

const UIForm: FunctionComponent<UIFormProps> = ({
  onSubmit,
  children,
  className,
}) => {
  return (
    <form onSubmit={onSubmit} noValidate className={className}>
      {children}
    </form>
  );
};

export default UIForm;
