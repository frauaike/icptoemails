'use client';

import { forwardRef } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { Input } from './input';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps extends Omit<ReactDatePickerProps, 'onChange'> {
  onChange: (date: Date | null) => void;
  placeholder?: string;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ onChange, placeholder = 'Select date', ...props }, ref) => {
    return (
      <ReactDatePicker
        customInput={<Input ref={ref} placeholder={placeholder} />}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        {...props}
      />
    );
  }
);

DatePicker.displayName = 'DatePicker'; 