'use client';
import React, {
  FC,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactElement,
  useState,
} from 'react';
import TextField from './text-field';
import { cn } from '@/lib/utils';

interface Props extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  LabelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  InputProps?: InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;
  helperText?: string;
  helperTextProps?: HTMLAttributes<HTMLHeadingElement>;
  multiline?: boolean;
  inputSuffix?: ReactElement;
  onSearch(search?: string): void;
  initialValue?: string;
}

const SearchField: FC<Props> = ({ onSearch, ...props }) => {
  const [value, setValue] = React.useState(props.initialValue);

  React.useEffect(() => {
    setValue(props.initialValue);
  }, [props.initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(value);
    }, 500);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <TextField
      {...props}
      InputProps={{
        ...props.InputProps,
        value,
        onChange: (e) => {
          setValue(e.target.value);
        },
        className: cn(
          props.InputProps?.className,
          'border-[1.5px] border-gray-400'
        ),
      }}
    />
  );
};

export default SearchField;
