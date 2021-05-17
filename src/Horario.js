import React, { useState } from 'react'
import { Button, Collapse } from 'react-bootstrap'

// Esta app oculta y muestra los horarios de atención de los lugares, de igual forma se usa react-bootstrap

export default function Horario(props) {

  const [open, setOpen] = useState(false);
  var horarios='';

  if (props.horarios){
    const abierto = props.horarios.weekday_text.map((horario,index) => {
        return <div key={index} className='card-text text-center'>
                 {horario}
               </div>;
    })
    horarios=<div className='row d-flex justify-content-center'>
                <div className='col-10 col-md-8 col-lg-4 p-4 card'>
                  {abierto}
                </div>
             </div>
  }else{
    horarios=<div className='row d-flex justify-content-center'>
                <div className='col-10 col-lg-4 p-4 card'>
                  <strong className='text-center'>Horario no disponible</strong>
                </div>
            </div>;
  }

  const nombreBoton = open ? 'Ocultar Horarios' : 'Ver Horarios';

  return (
    <>
      <Button
        className='my-4'
        variant='dark'
        onClick={() => setOpen(!open)}
        aria-controls="collapse-text"
        aria-expanded={open}
      >
        {nombreBoton}
      </Button>
      <Collapse in={open}>
        <div id="collapse-text" className='mb-5'>
          {horarios}
        </div>
      </Collapse>
    </>
  )
}