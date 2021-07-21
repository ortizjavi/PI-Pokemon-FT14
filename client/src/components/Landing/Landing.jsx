import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import s from './Landing.module.css';

const setColorBack = () => {
	document.getElementsByTagName('body')[0]
		.style.backgroundColor = `var(--app-landing)`;
}

const Landing = () => {
	const backCircle = useRef();
	useEffect(() => {
		setColorBack();
	}, [])

	function onMouseOver(e) {
   		backCircle.current.style.backgroundColor = '#B5EBE6';
  	}

  	function onMouseLeave(e) {
  		backCircle.current.style.backgroundColor = 'var(--app-default)';
  	}

	return (
		<>
		<div ref={backCircle} className={s.backgroundCircle}></div>
		<div className={s.container}>
			<div className={s.pokemonLogo}>
				<img src="./pokemon-logo.png" alt="Logo pokemon"/>
			</div>
			<div onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}
			className={`${s.pokeballTop} ${s.pokeball}`}>
				<Link to='/home'>
					<img src="./landing/pokeball-top.svg" alt="Pokeball Landing"/>
				</Link>
			</div>
			<div onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} 
			className={`${s.pokeballBottom} ${s.pokeball}`}>
				<Link to='/home'>
					<img src="./landing/pokeball-bottom.svg" alt="Pokeball Landing"/>
				</Link>
			</div>
			<Link to='/home' className={s.linkPokeCenter}>
				<div onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}
				className={s.pokeballCenter}></div>
			</Link>
		</div>
		</>
	);
}

export default Landing;