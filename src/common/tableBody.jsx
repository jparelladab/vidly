import React, { Component } from 'react';
import Movie from '../components/movie';

class TableBody extends Component {
    render() {
        const {data, columns} = this.props
        return (  
            <tbody className="table-striped">
            { data.map (item =>
              <Movie
                movie={item}
                key={item._id}
                columns={columns}
            />
              ) }
        </tbody>
        );
    }
}
 
export default TableBody;