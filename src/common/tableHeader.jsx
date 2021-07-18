import React, { Component } from 'react';
class TableHeader extends Component {
    
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
                    <th key={column.path || column.key } onClick={() => this.raiseSort(column.path)} className="col cursor-pointer">{column.label}</th>  )}
                </tr>
              </thead>
        );
    }
}
 
export default TableHeader;