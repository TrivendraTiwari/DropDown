import React, { useReducer, useState } from 'react'
import DropDown from './DropDown'
function reducer(selected, action) {
  switch (action.type) {
    case 'reset':
      return ''
    case 'item':
      return action.payload
  }
}

function index() {
  const [selected, dispatch] = useReducer(reducer, 'Select...')
  //const [selected, setSelected] = useState('Select..')
  return (
    <div>
      <DropDown selected={selected} dispatch={dispatch} />
    </div>
  )
}

export default index
