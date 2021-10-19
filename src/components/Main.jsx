import { useEffect, useState } from 'react';
import './Main.css';
import axios from 'axios';

const Main = () => {
	const baseURL = 'https://swapi.dev/api/films/';
	const [titles, setTitles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		await axios
			.get(baseURL)
			.then(response => {
				setTitles(response.data.results);
			})
			.catch(error => {
				console.error('error getting data', error);
				setError(error);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	if (loading) return 'Stars are far, give it a sec please...';
	if (error) return 'Oops! a wookiee got in the way...';

	return (
		<div className='main'>
			<div className='navbar'>
				<span className='navTitles'>MOVIES</span>
				{titles.map(movie => (
					<p key={movie.episode_id}>{movie.title}</p>
				))}
				<span className='navTitles'>FAVORITES</span>
			</div>

			<div className='content'>CONTENT</div>
		</div>
	);
};

export default Main;
