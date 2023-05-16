import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useState } from 'react';
import axiosInstance from '../../config/axiosConfig';

type FormData = {
	name: string;
	hours: number;
	minutes: number;
	seconds: number;
	type: string;
	numberOfSlices?: number;
	diameter?: number;
	spicinessScale?: number;
	slicesOfBread?: number;
};

export const DishForm = () => {
	const [type, setType] = useState('');

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			type: '',
		},
	});

	const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setType(e.target.value);
	};

	const onSubmit = handleSubmit(async (data) => {
		try {
			const {
				name,
				hours,
				minutes,
				seconds,
				type,
				numberOfSlices,
				diameter,
				spicinessScale,
				slicesOfBread,
			} = data;
			const preparationTime = `${hours}:${minutes}:${seconds}`;
			const dish = {
				name,
				preparation_time: preparationTime,
				type,
				...(numberOfSlices && { no_of_slices: numberOfSlices }),
				...(diameter && { diameter }),
				...(spicinessScale && { spiciness_scale: spicinessScale }),
				...(slicesOfBread && { slices_of_bread: slicesOfBread }),
			};
			console.log(dish);
			await axiosInstance.post('/', dish);
			reset();
			setType('');
		} catch (error) {
			console.log(error);
		}
	});

	return (
		<div className='bg-form-gray p-8 w-1/5 shadow-form rounded'>
			<form onSubmit={onSubmit} className='flex flex-col [&>label]:mt-2'>
				<label>Name</label>
				<input
					className='focus:outline-none rounded p-2 shadow-input text-xl'
					type='text'
					aria-invalid={errors.name ? 'true' : 'false'}
					{...register('name', {
						required: 'Name is required',
						minLength: { value: 5, message: 'Name must be at least 5 characters long' },
						maxLength: { value: 30, message: 'Name cannot be longer than 30 characters' },
					})}
				/>
				{errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
				<label>Preparation Time</label>
				<div className='flex justify-between'>
					<input
						className='w-20 focus:outline-none rounded p-2 shadow-input text-center text-xl'
						type='number'
						aria-invalid={errors.hours ? 'true' : 'false'}
						maxLength={2}
						{...register('hours', {
							required: 'Hours is required',
							min: { value: 0, message: 'Minumum value of hours is 0' },
							max: { value: 23, message: 'Maximum of hours is 23' },
							maxLength: 2,
						})}
					/>
					<div className='text-4xl text-bold'>:</div>
					<input
						className='w-20 focus:outline-none rounded p-2 shadow-input text-center text-xl'
						type='number'
						aria-invalid={errors.minutes ? 'true' : 'false'}
						maxLength={2}
						{...register('minutes', {
							required: 'Minutes is required',
							min: { value: 0, message: 'Value cannot be less than 0' },
							max: { value: 59, message: 'Value must be less than 60' },
							maxLength: 2,
						})}
					/>
					<div className='text-4xl text-bold'>:</div>
					<input
						className='w-20 focus:outline-none rounded p-2 shadow-input text-center text-xl'
						type='number'
						aria-invalid={errors.seconds ? 'true' : 'false'}
						maxLength={2}
						{...register('seconds', {
							required: 'Seconds is required',
							min: { value: 0, message: 'Value cannot be less than 0' },
							max: { value: 59, message: 'Value must be less than 60' },
							maxLength: 2,
						})}
					/>
				</div>
				{errors.hours && <p className='text-red-500 text-sm'>{errors.hours.message}</p>}
				{errors.minutes && <p className='text-red-500 text-sm'>{errors.minutes.message}</p>}
				{errors.seconds && <p className='text-red-500 text-sm'>{errors.seconds.message}</p>}
				<label>Type</label>
				<select
					placeholder='Dish type'
					className='focus:outline-none rounded p-2 shadow-input bg-white text-xl'
					{...register('type', { required: 'Dish type is required' })}
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
							type='number'
							aria-invalid={errors.numberOfSlices ? 'true' : 'false'}
							{...register('numberOfSlices', {
								required: 'Number of slices is required',
								min: { value: 1, message: 'Must be at least 1 slice' },
							})}
						/>
						<label className='mt-2'>Diameter</label>
						<input
							className='focus:outline-none rounded p-2 shadow-input text-xl'
							type='number'
							aria-invalid={errors.diameter ? 'true' : 'false'}
							{...register('diameter', {
								required: 'Diameter is required',
								pattern: {
									value: /^\d+(\.\d{0,2})?$/,
									message: 'Number should have exactly 2 decimal digits after the dot',
								},
							})}
						/>
					</div>
				)}
				{type === 'soup' && (
					<div className='flex flex-col'>
						<label className='mt-2'>Spiciness scale</label>
						<input
							className='focus:outline-none rounded p-2 shadow-input text-xl'
							type='number'
							aria-invalid={errors.spicinessScale ? 'true' : 'false'}
							{...register('spicinessScale', {
								required: 'Spiciness scale is required',
								min: 1,
								max: 10,
								maxLength: 1,
							})}
						/>
					</div>
				)}
				{type === 'sandwich' && (
					<div className='flex flex-col'>
						<label className='mt-2'>Slices of bread</label>
						<input
							className='focus:outline-none rounded p-2 shadow-input text-xl'
							type='number'
							aria-invalid={errors.slicesOfBread ? 'true' : 'false'}
							{...register('slicesOfBread', { required: 'Slices of bread is required' })}
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
