import { postPokemon, resetCreated } from '../../redux/actions/'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useRef, useEffect } from 'react'
import s from './PokeFactory.module.css'
import { GiWeight } from 'react-icons/gi';
import { FaRulerVertical } from 'react-icons/fa';


const ALL_TYPES = 'ALL';

const _initialValue = {
    name:'',
    attack:0,
    speed:0,
    defense:0,
    hp:0,
    weight:0,
    height:0,
    img:'',
    types:[]
}

const Factory = () => {
    const dispatch = useDispatch()
    const types = useSelector(state => state.types)
    const created = useSelector(state => state.createdPokemon)
    const formRef = useRef();
    const [values,setValues] = useState(_initialValue)
    const [submitted, setSubmitted] = useState(false);
    
    const onChange = (e) => {
        setValues(values => (
         	{...values, [e.target.name] : e.target.value}
        ))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const stats = document.querySelectorAll("input[type='range']");
        const statsValues = Array.from(stats)
            .reduce((stats, el) => {
                stats[el.name] = el.value;
                return stats;
            }, {})

        setValues(values => (
            {...values, ...statsValues}
        ))

        setSubmitted(true);
   }

    const onChangeType = (e) => {
        const { target: { value } } = e;
        if (value !== ALL_TYPES && !values.types.includes(value))
         setValues(values =>(
          	{...values, types : values.types.concat([value])}
          )) 
    }

    const handleRemove = (category) => {
        setValues(values =>(
              {...values, types : values.types.filter(val => val !== category)}
         ));
    }

    useEffect(() => {
        if(submitted)
            dispatch(postPokemon(values));
        setSubmitted(false);
    // eslint-disable-next-line
    }, [submitted])

    useEffect(() => {
        if (created) {
            console.log(created);
            if (created.data) {
                alert(created.data);
            } else {
                alert(`Tu pokemon fue creado correactamente con el id ${created.id}`)
                formRef.current.reset();
                setValues(_initialValue);
            }
            dispatch(resetCreated());
        }
    // eslint-disable-next-line
    }, [created])


    return (
    	<div className={s.container}>
    	<form id="form" className={s.form} onSubmit={handleSubmit} ref={formRef}> 
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
                <span 
                    key={idx} value={type} 
                    onClick={() => handleRemove(type)}
                    className={s.selectedType}
                    style={{ color: `var(--${type})`, border: `1px solid var(--${type})`}}
                >
                 {type} 
                </span>
                )) : null}
             </div>
              </div>

             <div className={s.relative}>
                 <GiWeight/>
                 <input 
                    className={s.inputNumber}
                    type='number' min="1" max="200" 
                    name='attack'placeholder='Fuerza'
                    onChange={onChange}
                 />
             </div>

             <div className={s.relative}>
                 <FaRulerVertical/>
                 <input 
                     className={s.inputNumber}
                     name='height' placeholder='Altura'
                     type='number' min="1" max="200" 
                     onChange={onChange}
                 />
             </div>
             <StatInput name='hp' placeHolder='Vida'/>
             <StatInput name='speed' placeHolder='Velocidad'/>
             <StatInput name='attack' placeHolder='Ataque'/>
             <StatInput name='defense' placeHolder='Defensa'/>
         </div>
         <div className={s.column}>
             <input
                 className={s.inputImage} 
                 type='text' 
                 placeholder='Imagen' 
                 name='img' 
                 onChange={onChange}
             />
             <input 
                 className={s.submitBtn}
                 type="submit" 
                 value="Crear"
             />
         </div>
        </form>
        </div>
     )


}
export default Factory;


function StatInput({name, placeHolder}) {
    const [value, setValue] = useState(0);
    const handleChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <div className={s.inputStat}>
            <span className={s.statName}> {placeHolder} </span>
            <input
                 type='range' 
                 name={name} min="1" max="200"
                 onChange={handleChange}
            />
            <div className={s.valueContainer}>
              <span className={s.valueStat}> {value} </span>
            </div>
         </div>
    );
}