import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux-og';
import storeToolkit from './redux-toolkit';
import './index.css';

ReactDOM.render(
	<Provider store={storeToolkit}>
		<App />
	</Provider>,
	document.getElementById('root')
);
