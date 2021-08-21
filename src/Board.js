import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - numRows: number of rows of board
 * - numColumns: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 *
 */
class Board extends Component 
{
	static defaultProps = 
	{
		numColumns: 5,
		numRows: 5,
		chanceLightStartsOn: 0.6 // The higher the value, the more chance lights will be on
	}
	constructor(props) 
	{
		super(props);
		this.state = 
		{
			board: this.createBoard(),
			hasWon: false
		};

		this.createBoard = this.createBoard.bind(this);
		this.flipCellsAround = this.flipCellsAround.bind(this);
	}

	/**
	 * create a board numRows high/numColumns wide, each cell randomly lit or unlit 
	 */
	createBoard() 
	{
		let board = [];
		
		// MY SOLUTION
		// while( board.length < 5 )
		// {
		// 	const line = new Array(5);
		// 	for( let i = 0; i < line.length; i++ )
		// 	{
		// 		const num = this.props.chanceLightStartsOn * (Math.random() * 2);
		// 		const random = Math.floor( num );
		// 		line[i] = random === 1 ? true : false;
		// 	}
			
		// 	board.push(line);
		// }

		for ( let x = 0; x < this.props.numRows; x++ )
		{
			let row = [];
			for ( let y = 0; y < this.props.numColumns; y++ )
			{
				row.push(Math.random() < this.props.chanceLightStartsOn)
			}
			board.push(row);
		}

		return board
	}
	

  	/** handle changing a cell: update board & determine if winner */
	flipCellsAround( coord ) 
	{
		// Creating variables numColumns and numRows to equal this.props.numColumns
		let {numColumns, numRows} = this.props;
		let board = this.state.board;
		let [x, y] = coord.split("-").map(Number);


		function flipCell( x, y ) 
		{
			// if this coord is actually on board, flip it
			if (x >= 0 && x < numColumns && y >= 0 && y < numRows) 
			{
				board[x][y] = !board[x][y];
			}
		}
		
		// TODO: flip this cell and the cells around it
		flipCell( x, y );
		flipCell( x, y-1 );
		flipCell( x, y+1 );
		flipCell( x-1, y );
		flipCell( x+1, y );

		// let hasWon = board.every(row => row.every(cell => !cell));
		let hasWon = true;
		board.forEach(row => 
		{
			row.forEach( cell => 
			{
				if( cell === true )
				{
					console.log(false);
					hasWon = false;
				}
			})
		});

		this.setState(
		{
			board: board, 
			hasWon: hasWon
		});
	}

	/** Render game board or winning message. */
	render() 
	{
		// if (this.state.hasWon)
		// {
		// 	return (
		// 		<div className='Winning'>
		// 			<div className='neon-orange'>You</div>
		// 			<div className='neon-blue'>Win</div>
		// 		</div>
		// 	)
		// }

		this.createBoard();
		// this.flipCellsAround('1-1')
		// if the game is won, just show a winning msg & render nothing else
		// let tableBoard = this.state.board.map( (row, xIndex) => 
		// 	<tr key={ xIndex.toString() }>
		// 	{	
		// 		row.map( (light, yIndex) =>
		// 			<Cell 
		// 				key={`${xIndex}-${yIndex}`}
		// 				isLit={ light } 
		// 				flipCellsAroundMe={ this.flipCellsAround } 
		// 				x={ xIndex } 
		// 				y={ yIndex }/>
		// 		)
		// 	}
		// 	</tr>
		// )

		let tableBoard = [];
		for ( let x = 0; x < this.props.numRows; x++ )
		{
			let row = [];
			for( let y = 0; y < this.props.numColumns; y++ )
			{
				let coord = `${x}-${y}`;
				row.push(
					<Cell 
						key={ `${x}-${y}` } 
						isLit={ this.state.board[x][y] }
						flipCellsAroundMe={ () => this.flipCellsAround(coord) }
					/>)
			}
			tableBoard.push(<tr key={ x.toString() }>{ row }</tr>);
		}

		// TODO: Key
		return(
			<div>
				{
					this.state.hasWon 
					? 
					(
						<div className='Winning'>
							<div className='neon-orange'>You</div>
							<div className='neon-blue'>Win</div>
						</div>
					) 
					: 
					(	
						<div className='content-container'>
							<div className='Board-title'>
								<div className='neon-orange'>Lights</div>
								<div className='neon-blue'>Out</div>
							</div>
							<table className='Board'>
								<tbody>{ tableBoard }</tbody>
							</table>
						</div>
					)
				}
			</div>
		)
	}
}


export default Board;
