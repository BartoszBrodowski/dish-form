import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axiosInstance from '../../config/axiosConfig';
import { ToastContainer, toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import 'react-toastify/dist/ReactToastify.css';

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
	const [isLoading, setIsLoading] = useState(false);

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

	const onSubmit = handleSubmit(async (data: FormData) => {
		setIsLoading(true);
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
			await axiosInstance.post('/', dish);
			reset();
			setIsLoading(false);
			setType('');
			toast.success('Dish added successfully!', {});
		} catch (error: any) {
			const data = error.response.data;
			console.log(data);
			toast.error('An error occured while adding the dish. Please try again later', {});
		}
	});

	return (
		<div className='bg-form-gray p-8 w-full md:w-3/5 lg:w-2/5 shadow-form rounded'>
			<form onSubmit={onSubmit} className='flex flex-col [&>label]:mt-2'>
				<label>Name</label>
				<input
					className='focus:outline-none rounded p-2 shadow-input text-xl'
					type='text'
					aria-invalid={errors.name ? 'true' : 'false'}
					aria-label='Name input'
					{...register('name', {
						required: 'Name is required',
						minLength: { value: 3, message: 'Name must be at least 3 characters long' },
						maxLength: { value: 30, message: 'Name cannot be longer than 30 characters' },
					})}
				/>
				{errors.name && <span className='text-red-500 text-sm'>{errors.name.message}</span>}
				<label>Preparation Time (Hours | Minutes | Seconds)</label>
				<div className='flex flex-wrap gap-4 justify-between'>
					<input
						className='flex-auto w-full sm:w-1/2 md:w-1/3 lg:w-1/4 focus:outline-none rounded p-2 shadow-input text-center text-xl disable-number-styling'
						type='number'
						aria-invalid={errors.hours ? 'true' : 'false'}
						aria-label='Hours input'
						maxLength={2}
						placeholder='Hours'
						{...register('hours', {
							required: 'Hours is required',
							min: { value: 0, message: 'Minumum value of hours is 0' },
							max: { value: 23, message: 'Maximum of hours is 23' },
							maxLength: 2,
						})}
					/>
					<input
						className='flex-auto w-full sm:w-1/2 md:w-1/3 lg:w-1/4 focus:outline-none rounded p-2 shadow-input text-center text-xl disable-number-styling'
						type='number'
						aria-invalid={errors.minutes ? 'true' : 'false'}
						aria-label='Minutes input'
						maxLength={2}
						placeholder='Minutes'
						{...register('minutes', {
							required: 'Minutes is required',
							min: { value: 0, message: 'Value cannot be less than 0' },
							max: { value: 59, message: 'Value must be less than 60' },
							maxLength: 2,
						})}
					/>
					<input
						className='flex-auto w-full sm:w-1/2 md:w-1/3 lg:w-1/4 focus:outline-none rounded p-2 shadow-input text-center text-xl disable-number-styling'
						type='number'
						aria-invalid={errors.seconds ? 'true' : 'false'}
						aria-label='Seconds input'
						maxLength={2}
						placeholder='Seconds'
						{...register('seconds', {
							required: 'Seconds is required',
							min: { value: 0, message: 'Value cannot be less than 0' },
							max: { value: 59, message: 'Value must be less than 60' },
							maxLength: 2,
						})}
					/>
				</div>
				{errors.hours && <span className='text-red-500 text-sm'>{errors.hours.message}</span>}
				{errors.minutes && <span className='text-red-500 text-sm'>{errors.minutes.message}</span>}
				{errors.seconds && <span className='text-red-500 text-sm'>{errors.seconds.message}</span>}
				<label>Type</label>
				<select
					placeholder='Dish type'
					className='focus:outline-none rounded p-2 shadow-input bg-white text-xl'
					aria-invalid={errors.type ? 'true' : 'false'}
					aria-label='Type select'
					{...register('type', { required: 'Dish type is required' })}
					onChange={handleTypeChange}>
					<option value='pizza' aria-label='Pizza option'>
						Pizza
					</option>
					<option value='soup' aria-label='Soup option'>
						Soup
					</option>
					<option value='sandwich' aria-label='Sandwich option'>
						Sandwich
					</option>
				</select>
				{errors.type && type == '' && (
					<span className='text-red-500 text-sm'>{errors.type.message}</span>
				)}
				{type === 'pizza' && (
					<div className='flex flex-col'>
						<label className='mt-2'>Number of slices</label>
						<input
							className='focus:outline-none rounded p-2 shadow-input text-xl disable-number-styling'
							type='number'
							aria-invalid={errors.numberOfSlices ? 'true' : 'false'}
							aria-label='Number of slices input'
							{...register('numberOfSlices', {
								required: 'Number of slices is required',
								min: { value: 1, message: 'Must be at least 1 slice' },
							})}
						/>
						{errors.numberOfSlices && (
							<span className='text-red-500 text-sm'>{errors.numberOfSlices.message}</span>
						)}
						<label className='mt-2'>Diameter</label>
						<input
							className='focus:outline-none rounded p-2 shadow-input text-xl'
							aria-invalid={errors.diameter ? 'true' : 'false'}
							aria-label='Diameter input'
							{...register('diameter', {
								required: 'Diameter is required',
								pattern: {
									value: /^\d+(\.\d{0,2})?$/,
									message: 'Input should be a number and have max 2 decimal points',
								},
							})}
						/>
						{errors.diameter && (
							<span className='text-red-500 text-sm'>{errors.diameter.message}</span>
						)}
					</div>
				)}
				{type === 'soup' && (
					<div className='flex flex-col'>
						<label className='mt-2'>Spiciness scale</label>
						<input
							className='focus:outline-none rounded p-2 shadow-input text-xl disable-number-styling'
							type='number'
							aria-invalid={errors.spicinessScale ? 'true' : 'false'}
							aria-label='Spiciness scale input'
							maxLength={2}
							{...register('spicinessScale', {
								required: 'Spiciness scale is required',
								min: { value: 1, message: 'Must be at least 1' },
								max: { value: 10, message: 'Must be at most 10' },
								maxLength: 2,
							})}
						/>
						{errors.spicinessScale && (
							<span className='text-red-500 text-sm'>{errors.spicinessScale.message}</span>
						)}
					</div>
				)}
				{type === 'sandwich' && (
					<div className='flex flex-col'>
						<label className='mt-2'>Slices of bread</label>
						<input
							className='focus:outline-none rounded p-2 shadow-input text-xl disable-number-styling'
							type='number'
							aria-invalid={errors.slicesOfBread ? 'true' : 'false'}
							aria-label='Slices of bread input'
							{...register('slicesOfBread', { required: 'Slices of bread is required' })}
						/>
						{errors.slicesOfBread && (
							<span className='text-red-500 text-sm'>{errors.slicesOfBread.message}</span>
						)}
					</div>
				)}
				<button
					className='flex items-center gap-2 justify-center text-xl bg-primary-green hover:-translate-y-1 shadow-input hover:bg-primary-green-hover duration-300 rounded p-2 mt-8'
					type='submit'>
					{isLoading && (
						<ClipLoader
							color={'#000000'}
							loading={true}
							size={20}
							aria-label='Loading Spinner'
							data-testid='loader'
						/>
					)}
					Submit
				</button>
				<ToastContainer />
			</form>
		</div>
	);
};

export default DishForm;
