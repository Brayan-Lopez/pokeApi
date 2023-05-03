import React, { useEffect, useRef, useState } from 'react'
import Baner from '../components/pokedex/Baner'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import PokemonCard from '../components/pokedex/PokemonCard'
import { setNameTrainer } from '../store/slices/nameTrainer.slice'
import { BsBoxArrowUp } from 'react-icons/bs';

const Pokedex = () => {

  const [pokemonName, setPokemonName] = useState("")
  const [pokemons, setPokemons] = useState([])
  const [types, setTypes] = useState([])
  const [currentType, setCurrentType] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const input = useRef(null)

  const nameTrainer = useSelector((store) => store.nameTrainer)

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    setPokemonName(e.target.namePokemon.value)
  }

  const pokemonsByName = pokemons?.filter(pokemon => pokemon.name.
    toLowerCase().includes(pokemonName?.toLowerCase()))

    const paginationLogic = () => {
      const pokemons_per_page = 12
      //pokemons que se val mostrar en la pagina actual
      const sliceStart = (currentPage -1) * pokemons_per_page
      const sliceEnd = sliceStart + pokemons_per_page
      const pokemonsInPage = pokemonsByName.slice(sliceStart, sliceEnd)

      //ultima pagina
      const lastPage = Math.ceil(pokemonsByName.length / pokemons_per_page) || 1

      //bloque actual
      const pages_per_block = 5
      const actualBlock = Math.ceil(currentPage / pages_per_block)

      //paginas que se van a mostrar en el bloque actual
      const pagesInBlock = []
      const minPage = (actualBlock - 1) * pages_per_block + 1 
      const maxPage = actualBlock * pages_per_block

      for(let i=minPage; i<=maxPage;i++){
        if(i <= lastPage){
          pagesInBlock.push(i)
        }
      }
      return {pokemonsInPage, lastPage, pagesInBlock}
    }

    const {pokemonsInPage, lastPage, pagesInBlock} = paginationLogic()

    const handleClickPreviusPage = () => {
      const newCurrentPage = currentPage - 1
      if(newCurrentPage >= 1){
        setCurrentPage(newCurrentPage)
      }
    }

    const handleClickNextPage = () => {
      const newCurrentPage = currentPage + 1
      if(newCurrentPage <= lastPage){
        setCurrentPage(newCurrentPage)
      }
    }

  const handleClickLogout = () => {
    dispatch(setNameTrainer(""))
  }

  useEffect(() => {
    if(!currentType){
      const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281"

      axios.get(URL)
      .then(({data}) => setPokemons(data.results))
      .catch((err) => console.log(err))
    }
  }, [currentType])
  
  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type"

    axios.get(URL)
    .then(({data}) => {
      const allTypes = data.results.map(type => type.name)
      setTypes(allTypes)
    })
    .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if(currentType){
      const URL = `https://pokeapi.co/api/v2/type/${currentType}/`

      axios.get(URL)
        .then(({data}) => {
          const pokemonsByType = data.pokemon.map(pokemon => pokemon.pokemon)
          setPokemons(pokemonsByType)
        })
        .catch((err) => console.log(err))
    }
  }, [currentType])
  
  useEffect(() => {
    setCurrentPage(1)
  }, [pokemonName, currentType])
  
  useEffect(() => {
    setPokemonName("")
    input.current.value = ""
  }, [currentType])
  

  return (
    <section className='component'>

      <header className='header'>
        <Baner/>
        <button className='logout' onClick={handleClickLogout}><BsBoxArrowUp/></button>
        <div className='vanerImg'>
          <img src="/images/title.png" />
        </div>
        <div className='header-form'>

          <form onSubmit={handleSubmit}>
            <div>
              <input ref={input} id='namePokemon' type="text" placeholder='Search Pokémon'/>
              <button>Search</button>
            </div>
            <select onChange={(e) => setCurrentType(e.target.value)}>
              <option value="">All</option>
              {
                types.map(type => <option value={type} key={type}>{type}</option>)
              }
            </select>
          </form>

        </div>
      </header>
      <article className='saludo'>
        <h3><span>{`Bienvenido ${nameTrainer}`}</span>, aquí puedes encontrar tu pokémon favorito</h3>
      </article>
      <section>

        <ul className='list-pages'>
        <li className='page-control' onClick={() => setCurrentPage(1)}>{"<<"}</li>
          <li  className='page-control' onClick={handleClickPreviusPage}>{"<"}</li>
          {
            pagesInBlock.map(numberPage => <li style={{backgroundColor: numberPage === currentPage && "#970606", color: numberPage === currentPage && "#fff"}} onClick={() => setCurrentPage(numberPage)} key={numberPage}>{numberPage}</li>)
          }
          <li className='page-control' onClick={handleClickNextPage}>{">"}</li>
          <li className='page-control' onClick={() => setCurrentPage(lastPage)}>{">>"}</li>
        </ul>

      </section>
      <div className='spacer'></div>
      <section className='list-pokemon'>
        {
          pokemonsInPage.map(pokemon => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />)
        }
      </section>
      
    </section>
  )
}

export default Pokedex