import { useEffect, useState } from 'react';
import './Main.css';
import axios from 'axios';
import outYoda from '../outlinedYoda.png';
import filledYoda from '../filledYoda.png';

const Main = () => {
	const baseURL = 'https://swapi.dev/api/films/';
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const loadingMsg = 'Stars are far, give it a sec please...';
	const [error, setError] = useState(null);
	const [title, setTitle] = useState();
	const [director, setDirector] = useState();
	const [date, setDate] = useState();
	const [abstract, setAbstract] = useState('Select a movie to see its details');

	const [yoda, setYoda] = useState(outYoda);
	const [favMsg, setFavMsg] = useState('Add to favorites');

	const [favList, setFavList] = useState(() => {
		const getList = localStorage.getItem('savedFav');
		if (getList == null) return getList;
		if (getList.length === 0) return [];
	});

	const [favorite, setFavorite] = useState(false);

	const checkStorage = () => {};

	const removeFav = title => {
		if (favList.length === 1) setFavList([]);
		else {
			const index = favList.indexOf(title);
			setFavList(favList.splice(index, 1));
			localStorage.setItem('savedFav', favList);
		}
	};

	useEffect(() => {
		getData();
		// eslint-disable-next-line
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

	const handleFav = e => {
		e.preventDefault();
		if (!favorite) {
			setFavorite(true);
			setYoda(filledYoda);
			setFavMsg('Remove from favorites');
			setFavList([...favList, title]);
			localStorage.setItem('savedFav', JSON.stringify(title));
		}
		if (favorite) {
			setFavorite(false);
			setYoda(outYoda);
			setFavMsg('Add to favorites');
			removeFav(title);
		}
	};

	return (
		<div className='main'>
			<div className='navbar'>
				<span className='navTitles'>MOVIES</span>
				{data.map(movie => (
					<p
						key={movie.episode_id}
						onClick={() => {
							checkStorage();
							setTitle(movie.title);
							setDate(movie.release_date);
							setDirector(movie.director);
							setAbstract(movie.opening_crawl);
							if (favList === null) setYoda(outYoda);
							else if (favList.includes(movie.title)) setYoda(filledYoda);
							else setYoda(outYoda);
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
					<span className='favorite'>
						<span className='favText'>{favMsg}</span>
						<button onClick={handleFav}>
							<img src={yoda} alt='yoda' />
						</button>
					</span>
				</div>

				<div className='abstract'>{abstract}</div>
			</div>
		</div>
	);
};

export default Main;
