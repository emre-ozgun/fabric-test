import React from 'react'
import './EventCardInstructions.css';

const EventCardInstructions = () => {
  return (
    <div className="wrapper">
      <ul className="StepProgress">
        <li className="StepProgress-item is-done"><strong>Post a contest</strong></li>
        <li className="StepProgress-item is-done"><strong>Award an entry</strong>
          Got more entries that you love? Buy more entries anytime! Just hover on your favorite entry and click the Buy button Got more entries that you love? Buy more entries anytime! Just hover on your favorite entry and click the Buy button
        </li>
        <li className="StepProgress-item current"><strong>Post a contest</strong></li>
        <li className="StepProgress-item"><strong>Handover</strong></li>
        <li className="StepProgress-item"><strong>Provide feedback</strong></li>
      </ul>
    </div>
  )
}

export default EventCardInstructions