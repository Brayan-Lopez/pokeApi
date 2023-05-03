import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PokemonCard = ({pokemonUrl}) => {

  const [pokemon, setPokemon] = useState()

  const navigate = useNavigate()

  const redirectId = () => {
    navigate(`/pokedex/${pokemon?.id}`)
  }
  
  const types = pokemon?.types.slice(0, 2).map((type)=>type.type.name).join(" / ")

  const classByType = pokemon?.types[0].type.name

  useEffect(() => {
    const URL = pokemonUrl

    axios.get(URL)
    .then(({data}) => {
      setPokemon(data)
    })
    .catch((err) => console.log(err))
  }, [])
  return (
    <article onClick={redirectId} className={`card ${classByType}-border`}>

      <section>
        <div className={`cardImage ${classByType}-gradient`}>
          <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
        </div>
      </section>

      <section className='cardStart'>
        <h3 className={`${classByType}-color`}>{pokemon?.name}</h3>
        <h4>{types}</h4>
        <span>type</span>
      </section>

        <hr />

      <section className='stats'>
        {
          pokemon?.stats.map(stat => (
            <div key={stat.stat.name}>
              <h5>{stat.stat.name}</h5>
              <span className={`${classByType}-color`}>{stat.base_stat}</span>
            </div>
          ))
        }
      </section>
      

    </article>
  )
}

export default PokemonCard