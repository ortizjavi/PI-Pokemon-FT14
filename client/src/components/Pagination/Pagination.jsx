import { useState } from 'react';
import { POKEMONS_PER_PAGE } from '../../config';
import s from './Pagination.module.css';
import Pokemons from '../Pokemons/Pokemons';


const Pagination = ({ pokemonList }) => {
	const [actualPage, setActualPage] = useState(1);
	const { length } = pokemonList;
	const pages = Math.ceil(length / POKEMONS_PER_PAGE);


	function handlePageChange(event){
		setActualPage(parseInt(event.target.key) + 1)
	};

	function handlePreviousPage(){
		setActualPage(page => page -1);
	}

	function handleNextPage(){
		setActualPage(page => page + 1);
	}
	
	const startIndex = (actualPage - 1) * POKEMONS_PER_PAGE;
	const endIndex = actualPage * POKEMONS_PER_PAGE;

	return (
		<>
		<Pokemons pokemons={pokemonList.slice(startIndex, endIndex)}/>
		<div className={s.container}>
			<ul>
			{ 
				actualPage - 1 ?
			 	<li className={s.item} onClick={handlePreviousPage}> Prev </li>
			 	 : null
			}
			{[...Array(pages)].map((page, idx) => (
				<li onClick={handlePageChange} className={s.item} key={idx}> {idx+1} </li>
			))}
			{ 
				actualPage + 1 <= pages ?
		 		<li className={s.item} onClick={handleNextPage} > Next </li> 
			 	: null
			}
			</ul>
		</div>
		</>
	);
}

export default Pagination;