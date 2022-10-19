import React from 'react';
import style from '../../assets/scss/ui.module.scss';

interface InputProps {
  pad?: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  height?: string; 
}

const Input: React.FC<InputProps> = ({ pad, type, placeholder, value, onChange, height }) => {
  return (
    <input
      style={{ paddingLeft: pad, height: height }}
      className={style.input}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required
    />
  );
};

export default Input;
