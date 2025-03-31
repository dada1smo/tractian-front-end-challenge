import {
  ChangeEventHandler,
  FocusEventHandler,
  FunctionComponent,
  HTMLInputTypeAttribute,
  Ref,
} from 'react';
import { FieldError } from 'react-hook-form';

export interface UIInputProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  name: string;
  inputRef?: Ref<HTMLInputElement>;
  label?: string;
  placeholder?: string;
  error?: FieldError;
  type?: HTMLInputTypeAttribute;
  inputMode?:
    | 'email'
    | 'search'
    | 'tel'
    | 'text'
    | 'url'
    | 'none'
    | 'numeric'
    | 'decimal';
  autoFocus?: boolean;
}

const UIInput: FunctionComponent<UIInputProps> = ({
  error,
  inputRef,
  ...props
}) => {
  return (
    <div className="w-full py-2 px-2 flex flex-col justify-stretch border-1 border-white focus-within:border-1 focus-within:border-primary-500">
      <input
        {...props}
        ref={inputRef}
        className="w-full ring-0 focus:ring-0 focus:outline-none"
      />
      {error?.message && (
        <span className="text-xs text-feedback-danger">{error?.message}</span>
      )}
    </div>
  );
};

export default UIInput;
