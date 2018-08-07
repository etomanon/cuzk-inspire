import React from 'react';
import ReactDOM from 'react-dom';
import Provider from 'src/main/provider';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider />, div);
  ReactDOM.unmountComponentAtNode(div);
});
