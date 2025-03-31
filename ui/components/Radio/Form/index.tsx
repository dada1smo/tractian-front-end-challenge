/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionComponent } from 'react';
import UIRadio, { UIRadioProps } from '../Base';
import { Control, Controller } from 'react-hook-form';

interface UIFormRadioProps extends UIRadioProps {
  name: string;
  control: Control<any, any>;
}

const UIFormRadio: FunctionComponent<UIFormRadioProps> = ({
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
        <UIRadio
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

export default UIFormRadio;
