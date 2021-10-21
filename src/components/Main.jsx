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
	const [firstRender, setFirstRender] = useState(true);
	const [favList, setFavList] = useState(() => {
		const getList = localStorage.getItem('savedFav');
		if (!getList) return [];
		return JSON.parse(getList);
	});

	useEffect(() => {
		getData();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (firstRender) {
			setFirstRender(false);
			return;
		}
		localStorage.setItem('savedFav', JSON.stringify(favList));
		// eslint-disable-next-line
	}, [favList, favList.length]);

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

	const removeFav = title => {
		const newFav = favList.filter(fav => title !== fav);
		setFavList(newFav);
	};

	if (loading) return loadingMsg;
	if (error) return 'Oops! a wookiee got in the way...';

	const handleFav = e => {
		e.preventDefault();
		if (favList && favList.includes(title)) {
			setYoda(outYoda);
			setFavMsg('Add to favorites');
			removeFav(title);
		} else {
			setYoda(filledYoda);
			setFavMsg('Remove from favorites');
			setFavList([...favList, title]);
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
							setTitle(movie.title);
							setDate(movie.release_date);
							setDirector(movie.director);
							setAbstract(movie.opening_crawl);
							if (favList && favList.includes(movie.title)) setYoda(filledYoda);
							else setYoda(outYoda);
						}}>
						{movie.title}
					</p>
				))}
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
