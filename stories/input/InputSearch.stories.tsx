import { ComponentMeta } from '@storybook/react';
import { InputSearch } from '@components/index';
import { IInputSearch } from '@utils/types/componentTypes';

import { Doc } from './InputSearch.stories.mdx';

export default {
	title: 'Example/Input',
	parameters: {
		componentSubtitle: 'Input Search Component',
		docs: {
			page: Doc,
		},
	},
	component: InputSearch,
	argTypes: {
		size: {
			defaultValue: 'small',
			description: 'InputDefault의 크기',
			options: ['mini', 'small', 'large', 'big', 'huge', 'massive'],
			control: { type: 'radio' },
			table: { defaultValue: { summary: 'small' } },
		},
		type: {
			defaultValue: 'default',
			description: 'Input의 형태',
			options: ['default', 'password'],
			control: { type: 'radio' },
			table: { defaultValue: { summary: 'default' } },
		},
		value: {
			defaultValue: '',
			description: 'Input 값 세팅',
			table: { defaultValue: { summary: '' } },
		},
		validationRegex: {
			defaultValue: undefined,
			description: 'Input value Regex',
			control: { type: 'regex' },
			table: { defaultValue: { summary: undefined } },
		},
		errorLabelPosition: {
			defaultValue: 'bottom',
			description: '에러표시 Label의 위치 (bottom 또는 right)',
			options: ['bottom', 'right'],
			control: { type: 'radio' },
			table: { defaultValue: { summary: 'bottom' } },
		},
	},
} as ComponentMeta<typeof InputSearch>;

export const Search = (args: IInputSearch) => {
	const onSearchIconClick = () => {
		console.log('search icon clicked');
	};

	return <InputSearch {...args} onSearchIconClick={onSearchIconClick}></InputSearch>;
};
Search.args = {
	placeholder: '값을 입력해주세요',
	onChange: (result: object) => {
		console.log(result);
	},
	id: 'inputSearchId',
};