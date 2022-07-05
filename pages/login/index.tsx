import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { InputLayout, InputDefault, InputWithIcon } from '@components/index';
import classNames from 'classnames/bind';

import LeftBackground1 from '@public/background/loginLeft.png';
import LeftBackground2 from '@public/background/loginLeft2.png';
import LeftBackground3 from '@public/background/loginLeft3.png';
import DLogo from '@public/images/DLogo2.png';
import Style from './Login.module.scss';

const Login = () => {
	const regEmail =
		/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

	const cx = classNames.bind(Style);
	const leftBackground = [LeftBackground1, LeftBackground2, LeftBackground3];
	const iconColorList = ['white', 'black', 'cadetblue'];

	const [leftBackgroundIndex, setLeftBackgroundIndex] = useState(0);

	const [idInputValue, setIdInputValue] = useState('');
	const [idInputError, setIdInputError] = useState(false);
	const [pwInputValue, setPwInputValue] = useState('');
	const [pwInputError, setPwInputError] = useState(false);

	const userIdRef = useRef<any>();

	useEffect(() => {
		userIdRef.current && userIdRef.current.focus();
	}, []);

	return (
		<div className={cx('loginDiv')}>
			<main className={cx('loginMain')}>
				<div
					className={cx('loginMainLeft')}
					style={{ backgroundImage: `url(${leftBackground[leftBackgroundIndex].src})` }}
				>
					{leftBackgroundIndex === 0 && (
						<article className={cx('loginCenterArticle', 'article1')}>
							<p>
								<Image src={DLogo} width={48} height={48} /> Dtech App
							</p>
							<p>Explore your team&apos;s</p>
							<p>skill-set & share info</p>
						</article>
					)}

					{leftBackgroundIndex === 1 && (
						<article className={cx('loginCenterArticle', 'article2')}>
							<p>Whom to ask?</p>
							<p>Who has what skill?</p>
							<p>Find it here!</p>
						</article>
					)}

					{leftBackgroundIndex === 2 && (
						<article className={cx('loginCenterArticle', 'article3')}>
							<p>Explore the app now!</p>
						</article>
					)}

					<aside className={cx('loginBottomAside')}>
						<Icon
							name="arrow alternate circle left outline"
							size="huge"
							className={cx('loginBottomAside_icon')}
							style={{
								'--iconColor': `${iconColorList[leftBackgroundIndex]}`,
							}}
							onClick={() =>
								setLeftBackgroundIndex((prev) => {
									if (prev - 1 < 0) {
										return leftBackground.length - 1;
									} else {
										return prev - 1;
									}
								})
							}
						/>
						<Icon
							name="arrow alternate circle right outline"
							size="huge"
							className={cx('loginBottomAside_icon')}
							onClick={() =>
								setLeftBackgroundIndex((prev) => {
									if (prev + 1 > leftBackground.length - 1) {
										return 0;
									} else {
										return prev + 1;
									}
								})
							}
							style={{
								'--iconColor': `${iconColorList[leftBackgroundIndex]}`,
							}}
						/>
					</aside>
				</div>
				<div className={Style['loginMainRight']}>
					<InputLayout
						error={idInputError}
						errorMsg="아이디를 제대로 입력해주세요"
						stretch={true}
						inputLabel="아이디"
						inputLabelSize="h2"
						showInputLabel={true}
						autoFitErrorLabel={true}
					>
						<InputWithIcon
							id="inputId"
							ref={userIdRef}
							placeholder="아이디를 입력해주세요 (이메일)"
							value={idInputValue}
							size="large"
							onChange={(obj: { value: string }) => {
								setIdInputValue(obj.value);
								obj.value.length !== 0 &&
									setIdInputError(!regEmail.test(obj.value));
							}}
							className={Style['inputIdField']}
							inputIcon={<Icon name="user" />}
						/>
					</InputLayout>

					<InputLayout
						stretch={true}
						inputLabel="비밀번호"
						inputLabelSize="h2"
						showInputLabel={true}
						spacing={7}
					>
						<InputWithIcon
							id="inputPw"
							placeholder="비밀번호를 입력해주세요"
							value={pwInputValue}
							size="large"
							onChange={(obj: { value: string }) => {
								setPwInputValue(obj.value);
								obj.value.length === 0 && setPwInputError(true);
							}}
							className={Style['inputPwField']}
							inputIcon={<Icon name="lock" />}
						/>
					</InputLayout>
				</div>
			</main>
		</div>
	);
};

export default Login;