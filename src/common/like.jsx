import React, {Component} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




class Like extends Component {
  render(){
    if (this.props.isLiked){

      return(
        <React.Fragment>

          <FontAwesomeIcon icon="heart" onClick={()=>{this.props.onLike(this.props.movie)}} />

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
