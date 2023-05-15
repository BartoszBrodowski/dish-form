import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axiosInstance from '../../config/axiosConfig';

type FormData = {
	name: string;
	hour: number;
	minute: number;
	second: number;
	type: string;
	numberOfSlices: number;
	diameter: number;
	spicinessScale: number;
	slicesOfBread: number;
};

export const DishForm = () => {
	const [type, setType] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			type: '',
		},
	});

	const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setType(e.target.value);
	};

	const onSubmit = handleSubmit((data) => {
		axiosInstance.post('/dishes', data);
	});

	return (
		<div className='bg-form-gray p-8 w-1/5 shadow-form rounded'>
			<form onSubmit={onSubmit} className='flex flex-col [&>label]:mt-2'>
				<label>Name</label>
				<input
					className='focus:outline-none rounded p-2 shadow-input text-xl'
					type='text'
					{...register('name', { required: true, maxLength: 30 })}
				/>
				<label>Preparation Time</label>
				<div className='flex justify-between'>
					<input
						className='w-20 focus:outline-none rounded p-2 shadow-input text-center text-xl'
						{...register('hour', { required: true, maxLength: 3 })}
					/>
					<div className='text-4xl text-bold'>:</div>
					<input
						className='w-20 focus:outline-none rounded p-2 shadow-input text-center text-xl'
						{...register('minute', { required: true, max: 59, maxLength: 2 })}
					/>
					<div className='text-4xl text-bold'>:</div>
					<input
						className='w-20 focus:outline-none rounded p-2 shadow-input text-center text-xl'
						{...register('second', { required: true, max: 59, maxLength: 2 })}
					/>
				</div>
				<label>Type</label>
				<select
					placeholder='Dish type'
					className='focus:outline-none rounded p-2 shadow-input bg-white text-xl'
					{...register('type', { required: true })}
					onChange={handleTypeChange}>
					<option value='pizza'>Pizza</option>
					<option value='soup'>Soup</option>
					<option value='sandwich'>Sandwich</option>
				</select>
				{type === 'pizza' && (
					<div className='flex flex-col'>
						<label className='mt-2'>Number of slices</label>
						<input
							className='focus:outline-none rounded p-2 shadow-input text-xl'
							{...register('numberOfSlices', { required: true })}
						/>
						<label className='mt-2'>Diameter</label>
						<input
							className='focus:outline-none rounded p-2 shadow-input text-xl'
							{...register('diameter', { required: true })}
						/>
					</div>
				)}
				{type === 'soup' && (
					<div className='flex flex-col'>
						<label className='mt-2'>Spiciness scale</label>
						<input
							className='focus:outline-none rounded p-2 shadow-input text-xl'
							{...register('spicinessScale', { required: true, min: 1, max: 10 })}
						/>
					</div>
				)}
				{type === 'sandwich' && (
					<div className='flex flex-col'>
						<label className='mt-2'>Slices of bread</label>
						<input
							className='focus:outline-none rounded p-2 shadow-input text-xl'
							{...(register('slicesOfBread'), { required: true })}
						/>
					</div>
				)}
				<button
					className='text-xl bg-primary-green hover:-translate-y-2 shadow-input hover:bg-primary-green-hover duration-300 rounded p-2 mt-8'
					type='submit'>
					SetValue
				</button>
			</form>
		</div>
	);
};

export default DishForm;
