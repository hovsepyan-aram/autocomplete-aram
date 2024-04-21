import React, {
  KeyboardEventHandler,
  MouseEventHandler,
  forwardRef,
} from 'react';
import './TextInput.css';

interface ITextInputProps {
  value: string;
  onChange: (value: string) => unknown;
  className?: string;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
  onClick?: MouseEventHandler<HTMLInputElement>;
}

export const TextInput = forwardRef<HTMLInputElement, ITextInputProps>(
  ({ value, onChange, className, onKeyDown, placeholder, onClick }, ref) => (
    <input
      ref={ref}
      type="text"
      className={`text-input ${className ?? ''}`.trim()}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      autoComplete="off"
      placeholder={placeholder}
      onClick={onClick}
    />
  ),
);
