import React from 'react';

const Input = ({name, label, error, ...rest}) => {
    // const autofocus = this.props.autofocus ? 'autofocus' : '';
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            {/* input fields have their own state, and we want to avoid it because we want a single source of truth. */}
            {/* so we tie their value to the component state and we update the component state with the input onChange */}
            <input 
                name={name}
                {...rest}
                // value={value} 
                //onchange ex. <select onchange="myFunction()">
                // myFunction here is the event handler function, that always by default has the (e) event as argument
                // onChange={onChange}
                // autofocus
                // ref={this.username} 
                // id={id}
                // type={type}
                className="form-control"
            />
            {/* two different syntaxes */}
            {/* {error ? <div className="alert alert-danger">{error}</div> : ''} */}
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default Input;