import { ReactNode } from 'react';

export interface IInputDefault {
	id: string;
	placeholder?: string;
	value?: string;
	onChange?: Function;
	size?: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive';
	regex?: RegExp;
	error?: boolean;
	loading?: boolean;
	errorMsg?: string;
	type?: 'default' | 'password';
	readOnly?: boolean;
	disabled?: boolean;
	maxLength?: undefined | number;
	errorLabelPosition?: 'bottom' | 'right';
	inputLabel?: string;
	inputLabelSize?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	showInputLabel?: boolean;
	ref?: any;
}

export interface IInputSearch extends IInputDefault {
	onSearchIconClick?: Function;
}

export interface IInputWithIcon extends IInputDefault {
	inputIcon?: ReactNode;
}
