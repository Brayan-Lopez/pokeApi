import React, { useEffect, useState } from 'react'
import Baner from '../components/pokedex/Baner'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const PokemonId = () => {

  const [pokemon, setPokemon] = useState()

  const {id} = useParams()

  const classByType = pokemon?.types[0].type.name

  const movements = pokemon?.moves.slice(3, 25)

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`
    
    axios.get(URL)
    .then(({data}) => {
      setPokemon(data)
    })
    .catch((err) => console.log(err))
  }, [])
  

  return (
    <article>

      <section >
        <Baner/>
        <div className='vanerImg-id'>
          <img src="/images/title.png" />
        </div>
      </section>
      
      <section className='pokemon id-data'>
        <div className={`dataImg ${classByType}-gradient`}>
          <img src={`${pokemon?.sprites.other["official-artwork"].front_default}`} />
        </div>
        <div className='data'>
        <h3 className={`id ${pokemon?.types[0].type.name}-color`}>{`#${pokemon?.id}`}</h3>
        <div className='name'>
          <div className='name-div'></div>
          <h3 className={`${pokemon?.types[0].type.name}-color`}>{`${pokemon?.name}`}</h3>
          <div className='name-div'></div>
        </div>
        </div>
        <div className='dataHeight'>
          <p>Peso<span>{pokemon?.weight}</span></p>
          <p>Altura<span>{pokemon?.height}</span></p>
        </div>
        <article className='dataType'>

            <div className='skills'>
              <h4>Tipo</h4>
              <div>
                {
                  pokemon?.types.slice(0, 2).map((type) => <h5 className={`${type.type.name}-background`} key={type.type.name}>{type.type.name}</h5>)
                }
              </div>
            </div>

            <div className='skills'>
              <h4>Habilidades</h4>
              <div>
                {
                  pokemon?.abilities.slice(0, 2).map((ability) => <h5 key={ability.ability.name}>{ability.ability.name}</h5>)
                }
              </div>
            </div>
            
        </article>

        <article className='stats-section'>
          <div className='stats-title'>
            <h3>Stats</h3>
            <div></div>
          </div>
          <ul className='list-stats'>
            {
              pokemon?.stats.map((stat) => (
                <li key={stat.stat.name}>
                  <div>
                  <h4>{stat.stat.name}:</h4>
                  <h4>{stat.base_stat}/150</h4>
                  </div>
                  <div className='progress-box' >
                    <div className='progres' style={{width: (stat.base_stat * 100)/150 + "%"}} ></div>
                  </div>
                </li>
              ))
            }
          </ul>
        </article>
      </section>

      <section className='pokemon movements-data'>
        <div className='stats-title'>
          <h3>Movements</h3>
          <div></div>
        </div>
        <div>
          <ul className='movements-list'>
            {
              movements?.map((move) => <li key={move.move.url}>{move.move.name}</li>)
            }
          </ul>
        </div>
      </section>
    </article>
  )
}

export default PokemonId