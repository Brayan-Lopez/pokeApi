import React from 'react'
import { setNameTrainer } from '../store/slices/nameTrainer.slice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handlesubmit = (e) => {
    e.preventDefault()
    dispatch(setNameTrainer(e.target.nameTrainer.value))
    navigate("/pokedex")
  }

  return (
    <section className='login'>
      <section className='loginSection'>

        <img src="/images/title.png" />

        <div className='loginBody'>
          <h2>Hellow trainer!</h2>

          <form onSubmit={handlesubmit} className='loginForm'>
            <input id='nameTrainer' type="text" placeholder='Give me your name to start'/>
            <button>Click to start!</button>
          </form>

        </div>
        
      </section>

      <img className='pokebola' src="/images/pokebola.png" />

    </section>
  )
}

export default Home