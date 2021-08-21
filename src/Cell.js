import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component
{
	constructor( props )
	{
		super( props );
		this.handleClick = this.handleClick.bind( this );
	}

	handleClick( evt )
	{
		// Call to flip cells around cell
		const coordString = `${this.props.x}-${this.props.y}`;
		this.props.flipCellsAroundMe( coordString );
	}

	render()
	{
		let classes = 'Cell' + ( this.props.isLit ? " Cell-lit" : "" );
		return(
			<td 
				key={ this.props.cellKey }
				className={ classes } 
				onClick={ this.handleClick } 
			/>
		);
	}
}

export default Cell;