/** ****************************************************************************************
 * @설명 : 회원가입 페이지
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      장보영      2022-07-20     feature/BY/register        최초작성
 ********************************************************************************************/

import Image from 'next/image';
import { Label } from '@components/index';
import {
	RegisterStep1,
	RegisterStep2,
	RegisterStep3,
	RegisterStep4,
	RegisterStep5,
} from '@components/customs';
import { Stepper, Step, StepLabel } from '@mui/material';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import DLogo from '@public/images/DLogo2.png';
import Style from './Register.module.scss';

const RegisterPage = (props: any) => {
	const cx = classNames.bind(Style);
	const [stepNum, setStepNum] = useState(1);
	const [registerData, setRegisterData] = useState({});
	const [resultData, setResultData] = useState({});

	const getStep1Data = (data: any) => {
		setRegisterData({
			...registerData,
			user_id: data.idInputValue,
			name: data.nameInputValue,
			passwd: data.pwInputValue,
			id_confirmed: data.idConfirm,
		});
		setStepNum(2);
	};
	const getStep2Data = (data: any) => {
		setRegisterData({
			...registerData,
			team: data.teamSelectValue,
			title: data.titleSelectValue,
			phonenum: data.phoneNumValue,
		});
		if (data.goNext) {
			setStepNum((prev) => prev + 1);
		} else {
			setStepNum((prev) => prev - 1);
		}
	};
	const getStep3Data = (data: any) => {
		setRegisterData({
			...registerData,
			detail: data.detail,
		});
		if (data.goNext) {
			setStepNum((prev) => prev + 1);
		} else {
			setStepNum((prev) => prev - 1);
		}
	};

	const getStep4Data = (data: any) => {
		setRegisterData({
			...registerData,
			image: data.image,
		});
		if (data.goNext) {
			setResultData(data.registerResult);
			setStepNum((prev) => prev + 1);
		} else {
			setStepNum((prev) => prev - 1);
		}
	};

	const registerStep = (
		<div className={cx('loginMainCenter')}>
			<Label
				content="회원가입"
				iconOrImage="image"
				nextImage={<Image src={DLogo} width={48} height={48} />}
				size="massive"
			/>
			<Stepper activeStep={stepNum - 1} alternativeLabel className={cx('registerStepper')}>
				<Step key="1">
					<StepLabel></StepLabel>
				</Step>
				<Step key="2">
					<StepLabel></StepLabel>
				</Step>
				<Step key="3">
					<StepLabel></StepLabel>
				</Step>
				<Step key="4">
					<StepLabel></StepLabel>
				</Step>
				<Step key="5">
					<StepLabel></StepLabel>
				</Step>
			</Stepper>
			{stepNum === 1 && (
				<RegisterStep1 propFunction={getStep1Data} registerData={registerData} />
			)}
			{stepNum === 2 && (
				<RegisterStep2 propFunction={getStep2Data} registerData={registerData} />
			)}
			{stepNum === 3 && (
				<RegisterStep3 propFunction={getStep3Data} registerData={registerData} />
			)}
			{stepNum === 4 && (
				<RegisterStep4 propFunction={getStep4Data} registerData={registerData} />
			)}
			{stepNum === 5 && <RegisterStep5 resultData={resultData} />}
		</div>
	);

	return (
		<div className={cx('loginDiv')}>
			<main className={cx('loginMain')}>{registerStep}</main>
		</div>
	);
};

// export const getServerSideProps = async (context: any) => {
// 	// console.log(context);
// 	// console.log(context.req.cookies);

// 	const axiosData = await axios.get('http://localhost:3066/api/register/get').then((response) => {
// 		if (response) {
// 			return response.data;
// 		}
// 	});

// 	return { props: { axiosData } };
// };

export default RegisterPage;
