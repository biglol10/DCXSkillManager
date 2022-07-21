import { useState } from 'react';
import wrapper from '@store/rootReducer';
import { useRouter } from 'next/router';
import axios from 'axios';
import { parseCookies, destroyCookie } from 'nookies';
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Icon, Table, Pagination } from 'semantic-ui-react';
import Image from 'next/image';
import { Avatar, AvatarGroup } from '@components/index';
import { techImage } from '@utils/constants/techs';
import Style from './dashboard.module.scss';

interface IProps {
	[name: string]: any;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'January1',
	'February1',
	'March1',
	'April1',
	'May1',
	'June1',
	'July1',
];

const options = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			position: 'top' as const,
		},
		title: {
			display: true,
			text: 'Chart.js Bar Chart',
		},
	},
};

const imageList = [
	'https://ca.slack-edge.com/T02SCQ38A22-U039FT91QTD-g0ca8cf5c8e6-24',
	'https://ca.slack-edge.com/T02SCQ38A22-U02U080JHC2-29078f07fef3-24',
	'https://ca.slack-edge.com/T02SCQ38A22-USLACKBOT-sv41d8cd98f0-24',
	'https://ca.slack-edge.com/T02SCQ38A22-U02U2GTV8J0-3c397712af98-24',
	'https://ca.slack-edge.com/T02SCQ38A22-U0310788JFR-c2ebf48cb030-24',
	'https://ca.slack-edge.com/T02SCQ38A22-U039JQGH1M3-g396a0215b62-48',
	'https://ca.slack-edge.com/T02SCQ38A22-U02U08XSSAX-g106a193d8a0-48',
];

const TableExampleCelledStriped = () => {
	return (
		<>
			<Table celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell colSpan="1">Skill</Table.HeaderCell>
						<Table.HeaderCell colSpan="1">Members</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body className={Style['skillTableBody']}>
					<Table.Row>
						<Table.Cell>
							<Avatar
								labelSize="large"
								src={techImage['React']}
								color="black"
								content="React"
							/>
						</Table.Cell>
						<Table.Cell>
							<AvatarGroup imageList={imageList} divHeight={20} />
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>
							<Avatar
								labelSize="large"
								src={techImage['Node']}
								color="black"
								content="Node"
							/>
						</Table.Cell>
						<Table.Cell>
							<AvatarGroup imageList={imageList} divHeight={20} />
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>
							<Avatar
								labelSize="large"
								src={techImage['Vue']}
								color="black"
								content="Vue"
							/>
						</Table.Cell>
						<Table.Cell>
							<AvatarGroup imageList={imageList} divHeight={20} />
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>
							<Avatar
								labelSize="large"
								src={techImage['Typescript']}
								color="black"
								content="Typescript"
							/>
						</Table.Cell>
						<Table.Cell>
							<AvatarGroup imageList={imageList} divHeight={20} />
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>
							<Avatar
								labelSize="large"
								src={techImage['Spring']}
								color="black"
								content="Spring"
							/>
						</Table.Cell>
						<Table.Cell>
							<AvatarGroup imageList={imageList} divHeight={20} />
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>
							<Avatar
								labelSize="large"
								src={techImage['ASPNET']}
								color="black"
								content="ASPNET"
							/>
						</Table.Cell>
						<Table.Cell>
							<AvatarGroup imageList={imageList} divHeight={20} />
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell>
							<Avatar
								labelSize="large"
								src={techImage['ASPNET']}
								color="black"
								content="ASPNET"
							/>
						</Table.Cell>
						<Table.Cell>
							<AvatarGroup imageList={imageList} divHeight={20} />
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
			<div className={Style['paginationDiv']}>
				<Pagination
					defaultActivePage={1}
					firstItem={null}
					lastItem={null}
					pointing
					secondary
					totalPages={2}
				/>
			</div>
		</>
	);
};

interface ITeamSkillData {
	subject: string;
	count: number;
}

const Index = ({ teamSkillData }: { teamSkillData: ITeamSkillData[] }) => {
	const router = useRouter();

	const data = {
		labels: teamSkillData.map((item) => item.subject),
		datasets: [
			{
				label: 'Dataset 1',
				data: teamSkillData.map((item) => item.count),
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
			},
		],
	};

	return (
		<>
			<div className={Style['dashboardTopMain']}>
				<div className={Style['skillOverview']}>
					<Bar options={options} data={data} />
				</div>
				<div className={Style['recentArticleArea']}>
					<TableExampleCelledStriped />
				</div>
			</div>
		</>
	);
};

export const getServerSideProps = async (context: any) => {
	const { token } = parseCookies(context);

	const axiosData = await axios
		.get('http://localhost:3066/api/dashboard/getTeamSkills', {
			headers: { Authorization: token },
		})
		.then((response) => {
			return response.data.teamSkillData;
		})
		.catch((err) => {
			return [];
		});

	return {
		props: {
			teamSkillData: axiosData,
		},
	};
};

// export const getServerSideProps = wrapper.getServerSideProps(
// 	(store) =>
// 		async ({ req, res, ...etc }) => {
// 			const GET_PUBLIC_TASKS_KEY = '';
// 			const GET_GOALS_BY_IDS_KEY = '';

// 			console.log('store auth value is ');
// 			console.log(store);
// 			console.log(store.getState());
// 			console.log(store.getState().auth);

// 			const token = store.getState().auth.userToken;

// 			console.log('token value is');
// 			console.log(token);

// 			const axiosData = await axios
// 				.get('http://localhost:3066/api/dashboard/getTeamSkills')
// 				.then((response) => {
// 					console.log('response.data success');
// 					console.log(response.data);
// 					return response.data;
// 				})
// 				.catch((err) => {
// 					console.log('error response');
// 					return {};
// 				});

// 			// // 액션 디스패치 하기
// 			// store.dispatch(
// 			// 	dataActionCreators[DataActionType.GET_PUBLIC_TASKS]({
// 			// 		author: undefined,
// 			// 		key: GET_PUBLIC_TASKS_KEY,
// 			// 		startTime: new Date('1999-11-11'),
// 			// 		endTime: new Date('2222-11-11'),
// 			// 	}),
// 			// );

// 			// // 데이터 fetch 완료될때까지 기다리기
// 			// await waitDuringLoading(store, {
// 			// 	actionType: DataActionType.GET_PUBLIC_TASKS,
// 			// 	key: GET_PUBLIC_TASKS_KEY,
// 			// });

// 			// // state 에서 값 읽기
// 			// const tasksGoal = store
// 			// 	.getState()
// 			// 	.data[DataActionType.GET_PUBLIC_TASKS][GET_PUBLIC_TASKS_KEY].data?.map(
// 			// 		(item) => item.goal,
// 			// 	);

// 			// ...
// 			return { props: { axiosData } };
// 		},
// );

// export const getServerSideProps = wrapper.getServerSideProps({ store }=> {
// 	const state = store.getState();
// 	console.log('state', state);

// 	return {
// 		props: {},
// 	};
// });

export default Index;
