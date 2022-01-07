import React from 'react';

const Search = ({...rest}) => {
    // const autofocus = this.props.autofocus ? 'autofocus' : '';
    return (
        <input 
            className="form-control my-3" 
            type="search" 
            aria-label="Search"
            {...rest}
        />
    );
}

export default Search;