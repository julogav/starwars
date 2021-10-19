import './App.css';
import Footer from './components/Footer';
import PageTitle from './components/Header';
import Main from './components/Main.jsx';

function App() {
	return (
		<div className='App'>
			<PageTitle />
			<Main />
			<Footer />
		</div>
	);
}

export default App;
