import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { authSetting, authReset } from '@store/authSlice';
import * as RCONST from '@utils/constants/reducerConstants';
import { fireLoginRequest, fireTokenRequest } from '@utils/api/auth/loginRequest';

interface authObjParamSetting {
	userId: string;
	password: string;
}

interface authObjParam {
	userSetting: authObjParamSetting;
	callbackFn: any;
	setIdInputError: any;
	setPwInputError: any;
	type: string;
}

interface ILoginResult {
	name: string | undefined;
	userId: string | undefined;
	time: any;
	token: string | undefined;
	result: string;
	errMessage?: string | undefined;
	errObj?: any | undefined;
}

const setAuthFunction = function* ({
	userSetting,
	callbackFn,
	setIdInputError,
	setPwInputError,
}: authObjParam) {
	const regEmail =
		/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

	const regPassword = new RegExp('^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})');

	setIdInputError(!regEmail.test(userSetting.userId));
	setPwInputError(!regPassword.test(userSetting.password));

	if (!regEmail.test(userSetting.userId) || !regPassword.test(userSetting.password)) {
		yield call(callbackFn, 'error');
		return;
	}

	const loginResult: ILoginResult = yield call(fireLoginRequest, userSetting);

	if (loginResult.result === 'success') {
		yield put(authSetting(loginResult));
	} else {
		yield put(authReset());
	}
	yield call(callbackFn, loginResult);
};

interface ITokenUser {
	USER_ID: string;
	NAME: string;
	TEAM_CD: string;
	TITLE: string;
	ADMIN: number;
}

interface ITokenResult {
	success: boolean;
	user: ITokenUser;
}

const getAuthFunction = function* ({ token }: any) {
	const tokenResult: ITokenResult = yield call(fireTokenRequest, token);

	if (tokenResult.success) {
		const loginResult = {
			userName: tokenResult.user.NAME,
			userId: tokenResult.user.USER_ID,
			userToken: token,
		};

		yield put(authSetting(loginResult));
	} else {
		yield put(authReset());
	}
};

const resetAuthFunction = function* () {
	yield put(authReset());
};

const setAuth = function* () {
	yield takeLatest(RCONST.AUTH_SETTING, setAuthFunction);
};

const resetAuth = function* () {
	yield takeLatest(RCONST.AUTH_RESET, resetAuthFunction);
};

const getAuthByToken = function* () {
	yield takeLatest(RCONST.AUTH_SETTING_BY_TOKEN, getAuthFunction);
};

export default function* authSaga() {
	yield all([fork(setAuth), fork(resetAuth), fork(getAuthByToken)]);
}
