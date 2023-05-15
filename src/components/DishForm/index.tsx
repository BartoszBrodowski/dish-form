import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';

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
	const [name, setName] = useState('');
	const [preparationTime, setPreparationTime] = useState('');
	const [type, setType] = useState('');

	const {
		register,
		setValue,
		handleSubmit,
		getValues,
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
		console.log({
			preparationTime: `${data.hour}:${data.minute}:${data.second}`,
		});
	});

	return (
		<div className='bg-form-gray p-8 w-1/5 shadow-form rounded'>
			<form onSubmit={onSubmit} className='flex flex-col [&>label]:mt-2'>
				<label>Name</label>
				<input
					className='focus:outline-none rounded p-2 shadow-input text-xl'
					{...register('name', { required: true, maxLength: 30 })}
				/>
				<label>Preparation Time</label>
				<div className='flex justify-between'>
					<input
						className='w-20 focus:outline-none rounded p-2 shadow-input text-center text-xl'
						{...(register('hour'), { required: true })}
					/>
					<div className='text-4xl text-bold'>:</div>
					<input
						className='w-20 focus:outline-none rounded p-2 shadow-input text-center text-xl'
						{...(register('minute'), { required: true, max: 59 })}
					/>
					<div className='text-4xl text-bold'>:</div>
					<input
						className='w-20 focus:outline-none rounded p-2 shadow-input text-center text-xl'
						{...(register('second'), { required: true, max: 59 })}
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
							{...(register('numberOfSlices'), { required: true })}
						/>
						<label className='mt-2'>Diameter</label>
						<input
							className='focus:outline-none rounded p-2 shadow-input text-xl'
							{...(register('diameter'), { required: true })}
						/>
					</div>
				)}
				{type === 'soup' && (
					<div className='flex flex-col'>
						<label className='mt-2'>Spiciness scale</label>
						<input
							className='focus:outline-none rounded p-2 shadow-input text-xl'
							{...(register('spicinessScale'), { required: true })}
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
					className='text-xl bg-primary-green hover:bg-primary-green-hover duration-100 rounded p-2 mt-8'
					type='submit'>
					SetValue
				</button>
			</form>
		</div>
	);
};

export default DishForm;
