import React, {Component} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




class Like extends Component {
  render(){
    if (this.props.liked){

      return(
        <React.Fragment>

          <FontAwesomeIcon icon={['fas', 'heart']} onClick={()=>{this.props.onLike(this.props.movie)}} />

        </React.Fragment>
        );
    } else {
      return(
        <FontAwesomeIcon
          icon={['far', 'heart']}
          onClick={()=>{this.props.onLike(this.props.movie)}}
        />
      );
    }
  }
}

export default Like;
