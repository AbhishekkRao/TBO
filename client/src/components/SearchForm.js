import React, { useState } from 'react';
import FlightSearch from './FlightSearch';
import StaySearch from './StaySearch';
import Packages from './Packages';

import wedimg from '../assets/wedding-form-bg.png';
import weddingDecor1 from '../assets/wedding-decor1.svg';
import weddingDecor2 from '../assets/wedding-decor2.svg';
import weddingDecor3 from '../assets/wedding-decor3.svg';
import weddingAvatar from '../assets/wed-avatar.png';

import vacimg from '../assets/vacation-form-bg.png';
import vacationDecor1 from '../assets/vacation-decor1.svg';
import vacationDecor2 from '../assets/vacation-decor2.svg';
import vacationDecor3 from '../assets/vacation-decor3.svg';
import vacationAvatar from '../assets/vac-avatar.png';

import medimg from '../assets/med-form-bg.png';
import medicalDecor1 from '../assets/medical-decor1.svg';
import medicalDecor2 from '../assets/medical-decor2.svg';
import medicalDecor3 from '../assets/medical-decor3.svg';
import medicalAvatar from '../assets/med-avatar.png';

import meetimg from '../assets/meeting-form-bg.png';
import meetingDecor1 from '../assets/meeting-decor1.svg';
import meetingDecor2 from '../assets/meeting-decor2.svg';
import meetingDecor3 from '../assets/meeting-decor3.svg';
import meetingAvatar from '../assets/meet-avatar.png';

const SearchForm = ({ sector }) => {
	const [stayFormVisible, setStayFormVisible] = useState(false);
	const [flightsFormVisible, setFlightsFormVisible] = useState(true);
	const [packagesVisible, setPackagesVisible] = useState(false);
	const [formDetails, setFormDetails] = useState();
	const [packagesData, setPackagesData] = useState(null);
	const [recievedContent, setRecievedContent] = useState(null);

	let decoration1,
		decoration2,
		decoration3,
		chooseBgImage,
		chooseFontColor,
		chooseButtonColor,
		chooseBorderColor,
		avatar,
		sectorNumber;

	if (sector === 'medical') {
		sectorNumber = 3;
		decoration1 = medicalDecor1;
		decoration2 = medicalDecor2;
		decoration3 = medicalDecor3;
		chooseBgImage = medimg;
		chooseFontColor = 'text-medical-text';
		chooseButtonColor = 'bg-medical-button';
		chooseBorderColor = 'border-medical-text';
		avatar = medicalAvatar;
	} else if (sector === 'vacation') {
		sectorNumber = 1;
		decoration1 = vacationDecor1;
		decoration2 = vacationDecor2;
		decoration3 = vacationDecor3;
		chooseBgImage = vacimg;
		chooseFontColor = 'text-vacation-text';
		chooseButtonColor = 'bg-vacation-button';
		chooseBorderColor = 'border-vacation-text';
		avatar = vacationAvatar;
	} else if (sector === 'wedding') {
		sectorNumber = 0;
		decoration1 = weddingDecor1;
		decoration2 = weddingDecor2;
		decoration3 = weddingDecor3;
		chooseBgImage = wedimg;
		chooseFontColor = 'text-wedding-text';
		chooseButtonColor = 'bg-wedding-button';
		chooseBorderColor = 'border-wedding-text';
		avatar = weddingAvatar;
	} else if (sector === 'meeting') {
		sectorNumber = 2;
		decoration1 = meetingDecor1;
		decoration2 = meetingDecor2;
		decoration3 = meetingDecor3;
		chooseBgImage = meetimg;
		chooseFontColor = 'text-meeting-text';
		chooseButtonColor = 'bg-meeting-button';
		chooseBorderColor = 'border-meeting-text';
		avatar = meetingAvatar;
	}

	const handleStayClick = () => {
		setStayFormVisible(true);
		setFlightsFormVisible(false);
	};

	const handleFlightsClick = () => {
		setFlightsFormVisible(true);
		setStayFormVisible(false);
	};

	const handleFormDetails = async (flightDetails) => {
		setFormDetails(flightDetails);

		if (flightDetails) {
			const {
				arrivalDate,
				departureDate,
				flightAdditionalInputs,
				flightAdults,
				flightChildren,
				fromLocation,
				toLocation,
			} = flightDetails;

			const newFlightAdditionalInputs = flightAdditionalInputs.replace(
				/ /g,
				'%'
			);

			// Construct the API URL
			const apiUrl = `https://axisapi.onrender.com/makepack?source=${fromLocation}&no_of_people=${
				flightAdults + flightChildren
			}&recommend=${newFlightAdditionalInputs}&destination=${toLocation}&date1=${departureDate}&date2=${arrivalDate}&event=${sectorNumber}`;

			const response = await fetch(apiUrl);

			if (!response.ok) {
				throw new Error(`Failed to fetch data. Status: ${response.status}`);
			}

			const data = await response.json();
			setRecievedContent(data.content);
			console.log('Fetched data:', data.content);

			// Fetch data from the second API
			const secondApiUrl = `https://axisapi.onrender.com/packdetail?package=${data.content}`;
			const secondResponse = await fetch(secondApiUrl);

			if (!secondResponse.ok) {
				throw new Error(
					`Failed to fetch second API data. Status: ${secondResponse.status}`
				);
			}

			const secondApiData = await secondResponse.json();
			console.log('Second API Data:', secondApiData.content);

			// Pass the second API data to the Packages component
			setPackagesData(secondApiData);
			showPackages();
		}
	};

	const showPackages = () => {
		setFlightsFormVisible(false);
		setPackagesVisible(true);
	};

	const handleGoBack = () => {
		setFlightsFormVisible(true);
		setPackagesVisible(false);
	};

	return (
		<div className={'flex justify-center'}>
			<div className='relative bg-white bg-opacity-50 w-1/2 rounded-3xl p-10 my-20'>
				{decoration1 && (
					<img
						src={decoration1}
						alt='Decoration 1'
						className='absolute top-0 left-0 transform -translate-x-2/4 -translate-y-2/4 '
					/>
				)}
				{decoration2 && (
					<img
						src={decoration2}
						alt='Decoration 2'
						className='absolute bottom-0 left-0 transform -translate-x-2/4 translate-y-1/4 z-20'
					/>
				)}
				{decoration3 && (
					<img
						src={decoration3}
						alt='Decoration 3'
						className='absolute bottom-0 right-0 transform translate-x-2/4 translate-y-1/4 z-20'
					/>
				)}
				{avatar && (
					<img
						src={avatar}
						alt='Avatar'
						className='absolute -top-4 right-0 -translate-x-12 -translate-y-60 z-20 '
					/>
				)}
				<div
					className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cover bg-center opacity-50'
					style={{ backgroundImage: `url(${chooseBgImage})` }}></div>
				<div className='relative -top-6 z-10 w-full h-full'>
					{!packagesVisible && (
						<div className='gap-x-10 flex justify-center'>
							{/* <span
								className={`${chooseFontColor} cursor-pointer ${
									stayFormVisible
										? `border-b-2 ${chooseBorderColor} font-semibold`
										: ''
								}`}
								onClick={handleStayClick}>
								Stay
							</span> */}
							<span
								className={`${chooseFontColor} cursor-pointer ${
									flightsFormVisible
										? `border-b-2 ${chooseBorderColor} font-semibold`
										: ''
								}`}
								onClick={handleFlightsClick}>
								Search
							</span>
						</div>
					)}
					{stayFormVisible && (
						<StaySearch
							fontColor={chooseFontColor}
							buttonColor={chooseButtonColor}
						/>
					)}

					{flightsFormVisible && (
						<FlightSearch
							fontColor={chooseFontColor}
							buttonColor={chooseButtonColor}
							showPackages={showPackages}
							handleFormDetails={handleFormDetails}
						/>
					)}

					{packagesVisible && (
						<Packages
							fontColor={chooseFontColor}
							buttonColor={chooseButtonColor}
							handleGoBack={handleGoBack}
							packagesData={packagesData}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default SearchForm;
