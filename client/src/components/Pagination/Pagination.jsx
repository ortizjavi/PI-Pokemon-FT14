import React, { Component } from 'react';
import { connect } from 'react-redux';
import { POKEMONS_PER_PAGE } from '../../config';
import s from './Pagination.module.css';
import Pokemons from '../Pokemons/Pokemons';

class Pagination extends Component{
	constructor(props){
		super(props);
		this.state = {
			actualPage : 1
		}
	}

	handlePageChange = (pageId) => {
		this.setState({actualPage: pageId})
	};

	handlePreviousPage = () => {
		this.handlePageChange(this.state.actualPage - 1);
	}

	handleNextPage = () => {
		this.handlePageChange(this.state.actualPage + 1);
	}

	render(){
		const {filtered, pokemons} = this.props;
		const {actualPage} = this.state;

		if (pokemons.length){
			const pages = Math.ceil(pokemons.length / POKEMONS_PER_PAGE);
			const startIndex = (actualPage - 1) * POKEMONS_PER_PAGE;
			const endIndex = actualPage * POKEMONS_PER_PAGE;
			const pokemonsToRender = pokemons.slice(startIndex, endIndex);

			// por si cambian de página y luego filtran...
			if (pokemons.length && !pokemonsToRender.length){
				this.handlePageChange(1);
			} 

			return (
				<>
				<Pokemons pokemons={pokemonsToRender}/>
				<div className={s.container}>
					<ul>
					{ 
						actualPage - 1 ?
					 	<li className={s.item} onClick={this.handlePreviousPage}> Prev </li>
					 	 : null
					}
					{[...Array(pages)].map((page, idx) => (
						<li 
							onClick={() => this.handlePageChange(idx+1)} 
							className={s.item} 
							key={idx}> {idx+1} 
						</li>
					))}
					{ 
						actualPage + 1 <= pages ?
				 		<li className={s.item} onClick={this.handleNextPage} > Next </li> 
					 	: null
					}
					</ul>
				</div>
				</>
			);
		}
		if (filtered)
			return (
				<div> No hay pokemons bajo esos filtros </div>
			);
		return <div> Lo siento, no hay pokemons hoy :( </div>;
	}
}

const mapStateToProps = (state) => {
	return {
		filtered: state.filter,
		pokemons : state.filter ? state.filteredPokemons : state.pokemons
	}
}

export default connect(mapStateToProps)(Pagination);