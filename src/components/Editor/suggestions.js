import React from 'react';
import {normalizeIndex} from '../../util/utils';
import './App.css'
class SuggestionList extends React.Component {

  render() {
    const styles ={
      suggestions:{
          borderRadius: 3,
          margin: 0,
          padding: 0,
          background: 'white',
          boxShadow: '0 0 0 1px rgba(0, 0, 0, .1), 0 1px 10px rgba(0, 0, 0, .35)',
          listStyleType: 'none'
      }
    }
    const {
      suggestionsState
    } = this.props;
    const {
      left,
      top,
      array,
      selectedIndex
    } = suggestionsState;

    const style = Object.assign({}, styles.suggestions, {
      position: 'absolute',
      left,
      top
    });
    if (!array) {
      return null;
    }
    const normalizedIndex = normalizeIndex(
      selectedIndex, array.length
    );
    return ( < ul style = {style}> {
      array.map((person, index) => {
        const {
          suggestionsState
        } = this.props;
        return ( < li key = {
            person
          } className={ index === normalizedIndex ?
                'selectedPerson' : 'person'}> {
            person
          } </li>
        );
      }, this)
    } </ul>);
  }
}

export default SuggestionList;