/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionComponent } from 'react';
import UIInput, { UIInputProps } from '../Base';
import { Control, Controller } from 'react-hook-form';

interface UIFormInputProps extends UIInputProps {
  name: string;
  control: Control<any, any>;
}

const UIFormInput: FunctionComponent<UIFormInputProps> = ({
  control,
  name,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <UIInput
          {...props}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          inputRef={ref}
          error={error}
        />
      )}
    />
  );
};

export default UIFormInput;
