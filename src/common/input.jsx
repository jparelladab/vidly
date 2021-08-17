import React from 'react';

const Input = ({name, value, onChange, id, type, classes, label, error}) => {
    // const  = this.props;
    // const autofocus = this.props.autofocus ? 'autofocus' : '';
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            {/* input fields have their own state, and we want to avoid it because we want a single source of truth. */}
            {/* so we tie their value to the component state and we update the component state with the input onChange */}
            <input 
                name={name}
                value={value} 
                onChange={onChange}
                // autofocus
                // ref={this.username} 
                id={id}
                type={type}
                className={classes}
            />
            {/* two different syntaxes */}
            {/* {error ? <div className="alert alert-danger">{error}</div> : ''} */}
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default Input;