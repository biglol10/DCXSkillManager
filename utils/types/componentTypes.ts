import { ReactNode } from 'react';
import { ButtonProps } from 'semantic-ui-react';

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

export interface IButton {
	buttonType?: 'primary' | 'secondary' | 'none';
	content?: string;
	basic?: boolean;
	color?: ButtonProps['color'];
	size?: IInputDefault['size'];
	loading?: boolean;
	onClick?: any;
}

export interface ICheckboxDefault {
	id: string;
	disabled?: boolean;
	checked?: boolean;
	size?: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive';
	label?: string;
	labelPosition?: 'top' | 'right' | undefined;
	onChange?: any;
	items?: Array<{ id: string; label: string; checked: boolean }>;
}
