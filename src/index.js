import React from 'react';
import ReactDOM from 'react-dom';

const HelloMessage = (props) => <div>Hello {props.name}</div>;

var mountNode = document.getElementById('root');
ReactDOM.render(<HelloMessage name="Juno" />, mountNode);
