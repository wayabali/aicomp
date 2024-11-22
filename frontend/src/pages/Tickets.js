import React from 'react'
import NextButton from '../components/NextButton'
import PreceButton from '../components/PreceButton'
import '../styles/Ticket.css'
const Tickets = () => {
  return (
    <div>
      <div className='ticket-container'>
      <h1>CURRENT TICKET</h1>
          <div className='number-container'>
            <div className='number'>
                  <p>75</p>
            </div>
          </div>
          <div className='informations'>
              <p>Nom : Bali Mohammed Ryad</p>
              <p>Type de l'opération : Retrait d'argent</p>
              <p>Handicap : Non</p>
            </div>
          <div>
          <PreceButton/>
          <NextButton/>
          </div>
      </div>
    </div>
  )
}

export default Tickets
