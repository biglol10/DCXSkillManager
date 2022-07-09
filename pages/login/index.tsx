/** ****************************************************************************************
 * @설명     : 로그인 페이지
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                      변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱      2022-07-06     feature/JW/loginpage       최초작성
 * 2      변지욱      2022-07-08     feature/JW/loginApi        loginApi request 적용
 * 3      변지욱      2022-07-09     feature/JW/divscroll       div scroll 예시적용 (필요없으면 롤백 예정)
 ********************************************************************************************/

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { Button, InputLayout, Label, InputWithIcon } from '@components/index';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import LeftBackground1 from '@public/background/loginLeft.png';
import LeftBackground2 from '@public/background/loginLeft2.png';
import LeftBackground3 from '@public/background/loginLeft3.png';
import DLogo from '@public/images/DLogo2.png';
import Style from './Login.module.scss';

const Login = () => {
	const labelSize = 'h4';

	const router = useRouter();

	const dispatch = useDispatch();

	const cx = classNames.bind(Style);
	const leftBackground = [LeftBackground1, LeftBackground2, LeftBackground3];
	const iconColorList = ['white', 'black', 'cadetblue'];

	const [leftBackgroundIndex, setLeftBackgroundIndex] = useState(0);

	const [idInputValue, setIdInputValue] = useState('');
	const [idInputError, setIdInputError] = useState(false);
	const [pwInputValue, setPwInputValue] = useState('');
	const [pwInputError, setPwInputError] = useState(false);

	const userIdRef = useRef<any>();
	const userPwRef = useRef<any>();

	useEffect(() => {
		userIdRef.current && userIdRef.current.focus();
	}, []);

	const userLogin = () => {
		dispatch({
			type: 'AUTH_SETTING',
			setIdInputError,
			setPwInputError,
			userSetting: {
				userId: idInputValue,
				password: pwInputValue,
			},
			callbackFn: (data: string) => {
				data === 'success' ? router.push('/') : alert('Login Failed');
			},
		});
	};

	const loginMainRightRef = useRef<any>();
	const loginMainRightDivScrollRef = useRef<any>();
	const [heightSimilar, setHeightSimilar] = useState<boolean>(false);

	useEffect(() => {
		const loginMainRightHeight = loginMainRightRef.current.getBoundingClientRect().height;
		const loginMainRightDivScrollHeight =
			loginMainRightDivScrollRef.current.getBoundingClientRect().height;

		setHeightSimilar(loginMainRightHeight - loginMainRightDivScrollHeight <= 70);
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
				<div ref={loginMainRightRef} className={Style['loginMainRight']}>
					<div
						ref={loginMainRightDivScrollRef}
						className={Style['loginMainRightDivScroll']}
					>
						<Label
							content="Dtech App"
							iconOrImage="image"
							nextImage={<Image src={DLogo} width={48} height={48} />}
							size="massive"
							spacing={heightSimilar ? 70 : 0}
						/>
						<InputLayout
							error={idInputError}
							errorMsg="아이디를 올바르게 입력해주세요"
							stretch={true}
							inputLabel="아이디"
							inputLabelSize={labelSize}
							showInputLabel={true}
							autoFitErrorLabel={true}
							spacing={32}
						>
							<InputWithIcon
								id="inputId"
								ref={userIdRef}
								placeholder="아이디를 입력해주세요 (이메일)"
								value={idInputValue}
								size="large"
								onChange={(obj: { value: string }) => {
									setIdInputValue(obj.value);

									setIdInputError(false);
								}}
								className={Style['inputIdField']}
								inputIcon={<Icon name="user" />}
								onEnter={() => userPwRef.current && userPwRef.current.focus()}
							/>
						</InputLayout>

						<InputLayout
							error={pwInputError}
							errorMsg="비밀번호를 올바르게 입력해주세요"
							stretch={true}
							inputLabel="비밀번호"
							inputLabelSize={labelSize}
							showInputLabel={true}
							autoFitErrorLabel={true}
							spacing={7}
						>
							<InputWithIcon
								id="inputPw"
								ref={userPwRef}
								placeholder="비밀번호를 입력해주세요"
								value={pwInputValue}
								size="large"
								onChange={(obj: { value: string }) => {
									setPwInputValue(obj.value);

									setPwInputError(false);
								}}
								className={Style['inputPwField']}
								inputIcon={<Icon name="lock" />}
								type="password"
								onEnter={() => userLogin()}
							/>
						</InputLayout>

						<Button
							className={Style['loginButton']}
							spacing={7}
							content="로그인"
							size="large"
							onClick={() => userLogin()}
						/>

						<div className={Style['divider']}>
							<span></span>
							<span>No Account ?</span>
							<span></span>
						</div>

						<Button
							className={Style['registerButton']}
							content="회원가입"
							size="large"
							color="google plus"
							buttonType="none"
						/>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Login;