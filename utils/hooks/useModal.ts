import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IModalState } from '@utils/types/commTypes';

const useModal = () => {
	const modalState = useSelector((state: any) => state.modal);
	const dispatch = useDispatch();

	const handleModal = useCallback(
		(args: IModalState) => {
			// ...{args} λ μ λ¨Ήν
			dispatch({
				type: 'MODALCONTROL',
				...{
					modalOpen: args.modalOpen,
					modalContent: args.modalContent,
					modalSize: args.modalSize,
					modalTitle: args.modalTitle,
					modalIsBasic: args.modalIsBasic,
				},
			});
		},
		[dispatch],
	);

	return {
		modalState,
		handleModal,
	};
};

export default useModal;
