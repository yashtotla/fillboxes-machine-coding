import React, { useEffect, useState } from "react";
import "./App.css";

let ORDER = 0;
let ALL_CLICKED = false;

function App() {

	const getBoxes = (type) => {
		let boxesData = [];
		const boxes = [0, 1, 2].map((i) => {
			return [0, 1, 2].map((j) => {
				if (!(i === 1 && j > 0)) {
					if (type === 'init') {
						return boxesData.push({ i, j, isClicked: false, order: null })
					}
					return (
						<div style={{
							backgroundColor: boxState?.find((item) => {
								return item.i === i && item.j === j;
							})?.isClicked && 'green'
						}} onClick={() => changeColor(i, j)} className="box"></div>
					)
				}
				return <div></div>;
			});
		});
		if (type === 'init') {
			return boxesData;
		}
		return boxes;
	};

	const changeColor = (i, j) => {
		let b = [...boxState]
		const selectedBox = b.find((item) => {
			return item.i === i && item.j === j
		})
		selectedBox.isClicked = true
		selectedBox.order = ++ORDER
		b.sort((a, b) => a.order > b.order ? 1 : -1)
		setBoxState(b)
	};

	const [boxState, setBoxState] = useState(getBoxes('init'))

	useEffect(() => {
		if (boxState.some((b) => {
			return b.isClicked === false
		})) {
			ALL_CLICKED = false
		} else {
			ALL_CLICKED = true;
		}

		if (ALL_CLICKED) {
			boxState.forEach((b, i) => {
				return setTimeout(() => {
					let b = [...boxState]
					b[i].isClicked = false
					setBoxState(b)
				}, (i + 1) * 1000)
			})
		}

	}, [boxState])

	return (
		<div className="App">
			<div className="box-container">{getBoxes()}</div>
		</div>
	);
}

export default App;
