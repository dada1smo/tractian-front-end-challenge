import { FocusEventHandler, FunctionComponent, Ref } from 'react';
import { FieldError } from 'react-hook-form';
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from '@radix-ui/react-radio-group';
import styles from './styles.module.css';

export interface UIRadioOptionProps {
  label: string;
  value: string;
}

export interface UIRadioProps {
  value?: string;
  onChange?: (e: string) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  name: string;
  inputRef?: Ref<HTMLInputElement>;
  label?: string;
  placeholder?: string;
  error?: FieldError;
  options: UIRadioOptionProps[];
}

const UIRadio: FunctionComponent<UIRadioProps> = ({
  value,
  onBlur,
  onChange,
  options,
}) => {
  return (
    <RadioGroup
      value={value}
      onValueChange={(e: string) => {
        if (onChange) onChange(e);
      }}
      onBlur={onBlur}
      className="flex gap-4 py-2 px-2"
    >
      {options.map((option) => (
        <div key={option.value} className="flex items-center gap-2">
          <RadioGroupItem
            value={option.value}
            id={option.value}
            className={styles.option}
          >
            <RadioGroupIndicator className={styles.indicator} />
          </RadioGroupItem>
          <label htmlFor={option.value} className="text-sm">
            {option.label}
          </label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default UIRadio;
