
import React from 'react';

const ListGroup = (props) => {
  const {items, textProperty, valueProperty, onItemSelect, selectedItem} = props;
  return (
    <div className="movies-filter">
      <ul className="list-group">
        { items.map ( item =>
          <li onClick={() => onItemSelect(item)} key={item[valueProperty]} className={(selectedItem === item) ? "list-group-item active" : "list-group-item"}>{item[textProperty]}</li>
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




