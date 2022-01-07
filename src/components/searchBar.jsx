import React, { Component } from 'react';
import Form from './common/form';
import Search from './common/search';

const SearchBar = ({searchTerm, onChange}) => {
    return (
        <Search
            onChange={e => onChange(e.currentTarget.value)}
            value={searchTerm}
            placeholder="Search..." 
        />);
}
 
export default SearchBar;