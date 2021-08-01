import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

library.add(faSortUp, faSortDown);

class TableHeader extends Component {
    renderSortIcon = column => {
      const {path, order} = this.props.sortColumn;
      if (column.path !== path){
        return null;
      }
      else {
        if (order == 'asc') {
          return <FontAwesomeIcon icon={faSortUp} />;
        } else {
          return <FontAwesomeIcon icon={faSortDown } />;
        }
        
      }
    }
    raiseSort = path => {
        const sortColumn = {...this.props.sortColumn};
        if (sortColumn.path === path){
          if (sortColumn.order === 'asc'){
            sortColumn.order = 'desc';
          } else {
            sortColumn.order = 'asc';
          }
        } else {
          sortColumn.path = path;
          sortColumn.order = 'asc';
        }
        this.props.onSort(sortColumn);
      };
    
    render() { 
        return (  
            <thead className="thead-dark">
                <tr>
                  {this.props.columns.map(column => 
                    <th key={column.path || column.key } onClick={() => this.raiseSort(column.path)} className="col cursor-pointer">{column.label} {this.renderSortIcon(column)} </th>  )}
                </tr>
              </thead>
        );
    }
}
 
export default TableHeader;