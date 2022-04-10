import React from 'react'
import styled from 'styled-components'

const Menu = ({ setLineColor, setLineWidth,
	setLineOpacity, resetCanvas }) => {
	return (
		<MenuContainer>
			<label>Brush Color </label>
			<input
				type="color"
				defaultValue={'black'}
				onChange={(e) => {setLineColor(e.target.value);}}
			/>
			<label>Brush Width </label>
			<input
				defaultValue={5}
				type="range"
				min="3"
				max="20"
				onChange={(e) => {setLineWidth(e.target.value);}}
			/>
			<label>Brush Opacity</label>
			<input
				type="range"
				min="1"
				max="100"
				defaultValue={50}
				onChange={(e) => {setLineOpacity(e.target.value / 100);}}
			/>
			<button onClick={resetCanvas}>Clean Draw</button>
		</MenuContainer>
	);
};

export default Menu;

const MenuContainer = styled.div`
	width: 750px;
	height: 50px;
	display: flex;
	justify-content: space-evenly;
	border-radius: 5px;
	align-items: center;
	background-color: #a3a3a32d;
	margin: auto;
	margin-top: 10px;

	user-select: none;

	@media (max-width: 750px) {
		transform: scale(0.5) translate(-50%);
	}



`