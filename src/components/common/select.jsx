import React from 'react';
const Select = ({name, label, options, ...rest}) => {
    
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select className="form-control" {...rest}>
                <option key='' value='' disabled></option>
                {
                options.map(opt => <option key={opt._id}>{opt.name}</option>)
                }
            </select>
        </div>
    )
}
export default Select;