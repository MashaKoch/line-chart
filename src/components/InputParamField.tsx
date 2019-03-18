import React from "react";

interface IInputParamFieldProps {
  label: string;
  id: string;
  value: number;
  onChange(event: any): void;
}

  const InputParamField = (props: IInputParamFieldProps)  => (
  <div>
      {props.label}
      <input
        type="text"
        id={props.id}
        value={props.value}
        onChange={ e => props.onChange(e) }
      />
  </div>
);

export default InputParamField;