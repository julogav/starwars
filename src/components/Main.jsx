import React from 'react';
import './Main.css';
import axios from 'axios';

const Main = () => {
	const baseURL = 'http swapi.dev/api/films/';
	return (
		<div className='main'>
			<div className='navbar'>NAVBAR</div>
			<div className='content'>CONTENT</div>
		</div>
	);
};

export default Main;
