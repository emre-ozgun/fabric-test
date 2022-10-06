import React from 'react'
import "./CanvasParameters.css";

const parameters = [
  {
    title: "name"
  },
  {
    title: "surname"
  },
  {
    title: "companyName"
  },
  {
    title: "email"
  }
];

const CanvasParameters = ({ handleAddFormParameterToCanvas }) => {
  return (
    <section className="section section-parameter">
      <h2 className="parameters-title">Parametreler</h2>
      {
        parameters.map(parameter => (
          <article className="single-parameter" key={parameter.title}>
            <button className="single-parameter__title" onClick={() => handleAddFormParameterToCanvas(parameter.title)}>
              {`{{${parameter.title}}}`}
            </button>
          </article>
        ))
      }
    </section>
  )
}

export default CanvasParameters