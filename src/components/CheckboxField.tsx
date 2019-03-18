import React from "react";

interface ICheckboxFieldProps {
    label: any;
    idCbx: string;
    checked: boolean;
    onChange(event:any): void;
}

const CheckboxField = (props:ICheckboxFieldProps) => (
    <div>
            {props.label} 
            <input 
                type="checkbox" 
                id={props.idCbx} 
                checked={props.checked}
                onChange={ e => props.onChange(e) }
            /> 
    </div>
);

export default CheckboxField;