import { ComponentMeta } from '@storybook/react';
import { InputWithIcon } from '@components/index';
import { IInputWithIcon } from '@utils/types/componentTypes';

import { Doc } from './InputWithIcon.stories.mdx';

export default {
	title: 'Example/Input',
	parameters: {
		componentSubtitle: 'Input With Icon Component',
		docs: {
			page: Doc,
		},
	},
	component: InputWithIcon,
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
} as ComponentMeta<typeof InputWithIcon>;

export const WithIcon = (args: IInputWithIcon) => <InputWithIcon {...args} />;
WithIcon.args = {
	placeholder: '값을 입력해주세요',
	onChange: (result: object) => {
		console.log(result);
	},
	id: 'inputWithIconId',
};