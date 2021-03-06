import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { nextGeneration } from "../genetic/population";
import { updateGeneration, updateMembers } from "../redux/slices/dynamicState";
import { RootState } from "../redux/store";
import { Button } from "../styles/UIComponents/Button";

type Member = {
	genome: Array<String>;
	fitness: number;
	mutated:boolean;
};

const ControlButtons = () => {
	const targetWord = useSelector<RootState, string>(
		state => state.population.targetWord
	);
	const members = useSelector<RootState, Array<Member>>(
		state => state.dynamicState.members
	);

	const currentGeneration = useSelector<RootState, number>(
		state => state.dynamicState.currentGeneration
	);

	const active = useSelector<RootState, boolean>(
		state => state.dynamicState.active
	);

	const mutations = useSelector<RootState,number>(
		state => state.dynamicState.mutations
	)

	const dispatch = useDispatch();

	const handleNextGeneration = () => {
		const newGeneration = nextGeneration({
			members, targetWord
		});
		dispatch(updateMembers(newGeneration));
		dispatch(updateGeneration());
	};

	return (
		<SControlButtons>
			<p>current generation is: {currentGeneration} </p>
			<p>number of mutations: {mutations}</p>
			<div>
				<Button onClick={handleNextGeneration} disabled={!active}>
					next generation
				</Button>
			</div>
		</SControlButtons>
	);
};

export default ControlButtons;

const SControlButtons = styled.div`
	p {
		font-weight: bold;
		line-height: 1.7;
	}

	& > div {
		display: flex;
		align-items: center;
		gap: 2rem;
		flex: 1 1 20%;
		margin-top: 0.8rem;
	}
`;
