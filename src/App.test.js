import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Editor/editor';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
