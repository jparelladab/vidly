
import React from 'react';

const ListGroup = (props) => {
  const {items, textProperty, valueProperty, onItemSelect, selectedItem} = props;
  return (

        <div className="movies-filter">
          <ul className="list-group">
            <li key="all" className={ (selectedItem) ? "list-group-item" : "list-group-item active"}><a href="#" onClick={() => onItemSelect('')} >All genres</a></li>
            { items.map ( item =>
            <li key={item[valueProperty]} className={(selectedItem === item) ? "list-group-item active" : "list-group-item"}><a href="#" onClick={() => onItemSelect(item)}>{item[textProperty]}</a></li>
            )}
          </ul>
        </div>


    )
}

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id'
};

export default ListGroup;




