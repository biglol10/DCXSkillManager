const inputArgTypes = {
	error: {
		defaultValue: false,
		description: 'error 유무',
		options: [false, true],
		control: { type: 'radio' },
		table: { defaultValue: { summary: false } },
	},
	stretch: {
		defaultValue: false,
		description: 'width 100% 유무',
		options: [false, true],
		control: { type: 'radio' },
		table: { defaultValue: { summary: false } },
	},
	labelSize: {
		defaultValue: 'h2',
		description: 'label 크기',
		options: ['h2', 'h3', 'h4', 'h5', 'h6'],
		control: { type: 'radio' },
		table: { defaultValue: { summary: 'small' } },
	},
	showInputLabel: {
		defaultValue: false,
		description: 'label 표시 유무',
		options: [false, true],
		control: { type: 'radio' },
		table: { defaultValue: { summary: false } },
	},
	autoFitErrorLabel: {
		defaultValue: false,
		description: '에러 표시를 위한 공간 확보 유무',
		options: [false, true],
		control: { type: 'radio' },
		table: { defaultValue: { summary: false } },
	},
	errorLabelPosition: {
		defaultValue: 'bottom',
		description: '에러표시 Label의 위치 (bottom 또는 right)',
		options: ['bottom', 'right'],
		control: { type: 'radio' },
		table: { defaultValue: { summary: 'bottom' } },
	},
	// Input
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
	loading: {
		default: false,
		description: 'Loading 상태',
		options: [false, true],
		control: { type: 'radio' },
		table: { defaultValue: { summary: false } },
	},
};

export default inputArgTypes;