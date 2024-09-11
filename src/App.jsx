import React, { useState } from 'react'
import './App.css'

function App() {
	const [boards, setBoards] = useState([
		{
			id: 1,
			title: 'To do',
			items: [
				{ id: 1, title: 'Task 1', description: 'Desc 1' },
				{ id: 2, title: 'Task 2', description: 'Desc 2' },
				{ id: 3, title: 'Task 3', description: 'Desc 3' },
			],
		},
		{
			id: 2,
			title: 'Done',
			items: [
				{ id: 4, title: 'Task 4', description: 'Desc 4' },
				{ id: 5, title: 'Task 5', description: 'Desc 5' },
				{ id: 6, title: 'Task 6', description: 'Desc 6' },
			],
		},
	])
	const [currentBoard, setCurrentBoard] = useState(null)
	const [currentItem, setCurrentItem] = useState(null)

	function dragOverHandler(e) {
		e.preventDefault()
		if (e.target.className == 'item') { 
			e.target.style.background = 'lightgray'
		}
	}

	function dragLeaveHandler(e) { 
		e.target.style.background = 'none'
	}

	function dragStartHandler(e, board, item) {
		setCurrentBoard(board)
		setCurrentItem(item)
	}

	function dragEndHandler(e) {
		e.target.style.background = 'none'
	}

	function dropHandler(e, board, item) {
		e.preventDefault()
		 
		const currentIndex = currentBoard.items.indexOf(currentItem)
		currentBoard.items.splice(currentIndex, 1)

		const dropIndex = board.items.indexOf(item)
 
		if (
			e.clientY <
			e.target.getBoundingClientRect().y + e.target.offsetHeight / 2
		) {
			board.items.splice(dropIndex, 0, currentItem)  
		} else {
			board.items.splice(dropIndex + 1, 0, currentItem)  
		}

		setBoards(
			boards.map(b => {
				if (b.id === board.id) {
					return board
				}
				
				if (b.id === currentBoard.id) {
					return currentBoard
				}
				return b
			})
		)
		e.target.style.background = 'none'
	}

	function dropCardHandler(e, board) { 
		if (!e.target.classList.contains('item')) {
			board.items.push(currentItem)

			const currentIndex = currentBoard.items.indexOf(currentItem)
			currentBoard.items.splice(currentIndex, 1)

			setBoards(
				boards.map(b => {
					if (b.id === board.id) {
						return board
					}

					if (b.id === currentBoard.id) {
						return currentBoard
					}
					return b
				})
			)
		}
		e.target.style.background = 'none'
	}

	return (
		<div className='app'>
			{boards.map(board => (
				<div
					className='board'
					onDragOver={e => dragOverHandler(e)}
					onDrop={e => dropCardHandler(e, board)}
				>
					<div className='board__title' key={board.id}>
						{board.title}
					</div>
					{board.items.map(item => (
						<div
							key={item.id}
							onDragOver={e => dragOverHandler(e)}
							onDragLeave={e => dragLeaveHandler(e)}
							onDragStart={e => dragStartHandler(e, board, item)}
							onDragEnd={e => dragEndHandler(e)}
							onDrop={e => dropHandler(e, board, item)}
							draggable={true}
							className='item'
						>
							<div className='item__title'>{item.title}</div>
							<div className='item__description'>{item.description}</div>
						</div>
					))}
				</div>
			))}
		</div>
	)
}

export default App
