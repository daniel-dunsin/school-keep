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
import { useSearchParams } from '@/lib/hooks/use-search-params';

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
  searchParam?: string;
}

const SearchField: FC<Props> = ({
  onSearch,
  searchParam = 'search',
  ...props
}) => {
  const { setParam, searchParams, removeParam } = useSearchParams();
  const [value, setValue] = React.useState(props.initialValue);

  React.useEffect(() => {
    setValue(props.initialValue);
  }, [props.initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(value);
      value ? setParam(searchParam, value!) : removeParam(searchParam);
    }, 500);

    return () => clearTimeout(timeout);
  }, [value]);

  React.useEffect(() => {
    const searchValue = searchParams.get(searchParam);
    if (searchValue) {
      setValue(searchValue);
    }
  }, []);

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
