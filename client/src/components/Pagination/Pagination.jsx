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
		const pages = Math.ceil(pokemons.length / POKEMONS_PER_PAGE);


		if (pokemons.length){
			const startIndex = (actualPage - 1) * POKEMONS_PER_PAGE;
			const endIndex = actualPage * POKEMONS_PER_PAGE;
			return (
				<>
				<Pokemons pokemons={pokemons.slice(startIndex, endIndex)}/>
				<div className={s.container}>
					<ul>
					{ 
						actualPage - 1 ?
					 	<li className={s.item} onClick={this.handlePreviousPage}> Prev </li>
					 	 : null
					}
					{[...Array(pages)].map((page, idx) => (
						<li onClick={() => this.handlePageChange(idx+1)} className={s.item} key={idx}> {idx+1} </li>
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
		pokemons : state.filter ? state.filteredPokemons : state.pokemons
	}
}

export default connect(mapStateToProps)(Pagination);