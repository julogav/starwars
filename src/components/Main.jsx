import { useEffect, useState } from 'react';
import './Main.css';
import axios from 'axios';

const Main = () => {
	const baseURL = 'https://swapi.dev/api/films/';
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [title, setTitle] = useState();
	const [director, setDirector] = useState();
	const [date, setDate] = useState();
	const [abstract, setAbstract] = useState();
	const loadingMsg = 'Stars are far, give it a sec please...';

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		await axios
			.get(baseURL)
			.then(response => {
				setData(response.data.results);
			})
			.catch(error => {
				console.error('error getting data', error);
				setError(error);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	if (loading) return loadingMsg;
	if (error) return 'Oops! a wookiee got in the way...';

	return (
		<div className='main'>
			<div className='navbar'>
				<span className='navTitles'>MOVIES</span>
				{data.map(movie => (
					<p
						key={movie.episode_id}
						onClick={() => {
							setTitle(movie.title);
							setDate(movie.release_date);
							setDirector(movie.director);
							setAbstract(movie.opening_crawl);
						}}>
						{movie.title}
					</p>
				))}
				<span className='navTitles'>FAVORITES</span>
			</div>
			<div className='content'>
				{loading && <span className='loadingTxt'>{loadingMsg}</span>}
				{error && <span>'OOOps! a wookiee got in the way!'</span>}

				<div className='filmInfo'>
					<span className='filmDetails'>Title: {title}</span>
					<span className='filmDetails'>Director: {director}</span>
					<span className='filmDetails'>Date: {date}</span>
				</div>

				<div className='abstract'>{abstract}</div>
			</div>
		</div>
	);
};

export default Main;
