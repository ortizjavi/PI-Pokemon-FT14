import { postPokemon } from '../../redux/actions/'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useRef } from 'react'
import s from './PokeFactory.module.css'
import { GiWeight } from 'react-icons/gi';
import { FaRulerVertical } from 'react-icons/fa';


const ALL_TYPES = 'ALL';

const Factory = () => {
    const dispatch =useDispatch()
    const types = useSelector(state=>state.types)
    const formRef = useRef();
    const [values,setValues]=useState({
        name:'',
        attack:0,
        speed:0,
        defense:0,
        hp:0,
        weight:0,
        height:0,
        img:'',
        types:[]
    })
    
    const onChange = (e) => {
        setValues(values => (
         	{...values, [e.target.name] : e.target.value}
        ))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
		dispatch(postPokemon(values))
		formRef.current.reset();
    }
    const onChangeType = (e) => {
        if (e.target.value !== ALL_TYPES)
         setValues(values =>(
          	{...values, types : values.types.concat([e.target.value])}
          )) 
    }

    const handleRemove = (category) => {
        setValues(values =>(
              {...values, types : values.types.filter(val => val !== category)}
         ));
    }

    return (
    	<div className={s.container}>
    	<form id={s.form} onSubmit={handleSubmit} ref={formRef}> 
         <div className={s.column}>
             <input 
                 className={s.inputText}
                 type='text' 
                 placeholder='Nombre' 
                 name='name' 
                 onChange={onChange} 
                 required
              />

             <div className={s.types}>
             <select 
                 onChange={onChangeType} 
                 value={ALL_TYPES} 
                 data-filter="type" 
                 className={s.selectTypes}
              >
              <option value={ALL_TYPES} key="0"> Tipo </option>
              { types.map(type => (
                <option value={type.name} key={type.id}> {type.name} </option>
               ))}
             </select>
             <div className={s.selectedTypes}>
                 { values.types.length ? values.types.map((type, idx) => (
                <span key={idx} value={type} onClick={() => handleRemove(type)}> {type} </span>
                )) : null}
             </div>
              </div>

             <div className={s.relative}>
                 <GiWeight/>
                 <input 
                 className={s.inputNumber}
                 type='number' min="1" max="200" 
                 name='attack'placeholder='Fuerza'
                 onChange={onChange}/>
             </div>

             <div className={s.relative}>
                 <FaRulerVertical/>
                 <input 
                 className={s.inputNumber}
                 name='height' placeholder='Altura'
                 type='number' min="1" max="200" 
                 onChange={onChange}/>
             </div>
             { statInput(values.hp, 'hp', 'Vida', onChange)}
             { statInput(values.speed, 'speed', 'Velocidad', onChange)}
             { statInput(values.attack, 'attack','Ataque', onChange)}
             { statInput(values.defense, 'defense', 'Defensa', onChange)}
         </div>
         <div className={s.column}>
             <input
             className={s.inputImage} 
             type='text' 
             placeholder='Imagen' 
             name='img' 
             onChange={onChange}/>
             <input 
             className={s.submitBtn}
             type="submit" 
             value="Crear"/>
         </div>
        </form>
        </div>
     )


}
export default Factory;


function statInput(value, name, placeHolder, onChange) {
    return (
        <div className={s.inputStat}>
            <span className={s.statName}> {placeHolder} </span>
            <input
             type='range' 
             name={name} min="1" max="200"
             onInput={onChange}/>
             <div className={s.valueContainer}>
              <span className={s.valueStat}> {value} </span>
             </div>
         </div>
    );
}