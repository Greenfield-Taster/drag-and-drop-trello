import React, { useState } from 'react'
import './App.css'
import boardsData from "./data/boards.json"

function App() {
	const [boards, setBoards] = useState(boardsData)
	const [currentBoard, setCurrentBoard] = useState(null)
	const [currentItem, setCurrentItem] = useState(null)
	const [status, setStatus] = useState("")

	function dragOverHandler(e) {
		e.preventDefault()
		if (e.target.className == 'item') {
			e.target.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.2)'
			e.target.style.transform = 'scale(1.05)'
		}
	}

	function dragLeaveHandler(e) {
		e.target.style.boxShadow = 'none'
		e.target.style.transform = 'scale(1)'
	}

	function dragStartHandler(e, board, item) {
		setCurrentBoard(board)
		setCurrentItem(item)
	}

	function dragEndHandler(e) {
		e.target.style.boxShadow = 'none'
		e.target.style.transform = 'scale(1)'
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
		e.target.style.boxShadow = 'none'
		e.target.style.transform = 'scale(1)'
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
		e.target.style.boxShadow = 'none'
		e.target.style.transform = 'scale(1)'
	}

	function getStatusClass(boardTitle){
		return boardTitle === 'To do' ? 'status-red' : 'status-green'
	}

	return (
		<div className='app'>
			<header>Pet project "Trello"</header>
			<div className='wrapper'>
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
								<div>
									<div className='item__title'>{item.title}</div>
									<div className='item__description'>{item.description}</div>
								</div>
								<div className={getStatusClass(board.title)}></div>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	)
}

export default App
