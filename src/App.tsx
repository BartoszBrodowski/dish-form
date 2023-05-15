import './App.css';
import DishForm from './components/DishForm';

function App() {
	return (
		<div className='flex flex-col justify-center items-center gap-8 h-screen bg-[#2c2c2c]'>
			<h1 className='text-4xl font-semibold bg-gradient-to-r from-off-green via-primary-green to-primary-green-hover text-transparent bg-clip-text leading-loose'>
				Choose your dish!
			</h1>
			<DishForm />
		</div>
	);
}

export default App;
