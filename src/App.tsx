import DishForm from './components/DishForm';

function App() {
	return (
		<div className='flex flex-col justify-center items-center gap-8 h-screen'>
			<h1 className='text-4xl font-semibold text-off-green'>Choose your dish!</h1>
			<DishForm />
		</div>
	);
}

export default App;
