import React, { useEffect, useReducer, useRef, useState } from 'react'
import styles from './drop.module.css'
import OutsideClickHandler from 'react-outside-click-handler'

function setIsActive(isActive, action) {
  switch (action.type) {
    case 'true':
      return true
    case 'false':
      return false
  }
}

function setInput(input, action) {
  switch (action.type) {
    case 'input':
      return action.payload
  }
}

function DropDown(props) {
  const [isActive, dispatch] = useReducer(setIsActive, false)
  const [input, _dispatch] = useReducer(setInput, '')
  // const [isActive, setIsActive] = useState(false)
  //const [input, setInput] = useState('')
  const items = ['Ocean', 'Purple', 'Blue', 'Yellow', 'Black', 'Brown']
  const inputRef = useRef()
  //ref input
  //ref.current.focus()
  function focus() {
    inputRef.current.focus()
  }
  useEffect(() => {
    if (isActive) focus()
  }, [isActive])

  return (
    <div className={styles.dropdown}>
      <OutsideClickHandler
        onOutsideClick={() => {
          dispatch({ type: 'false' })
        }}
      >
        {!isActive ? (
          <div className={styles.span}>
            <span
              onClick={(e) => {
                dispatch({ type: 'true' })
              }}
            >
              {props.selected && props.selected.length > 0 ? props.selected : 'Select a value'}
            </span>
            <button
              className={styles.reset}
              onClick={(e) => {
                props.dispatch({ type: 'reset' })
              }}
            >
              Reset
            </button>
          </div>
        ) : (
          <input
            ref={inputRef}
            className={styles.dropdown_btn}
            type="text"
            value={input}
            placeholder="Search"
            onChange={(e) => _dispatch({ type: 'input', payload: e.target.value })}
          />
        )}
        {isActive && ( //if isactive=="true" then div will run
          <div className={styles.dropdown_content}>
            {items
              .filter((item) => {
                if (input == '') return item
                else if (item.toLowerCase().includes(input.toLowerCase())) return item
              })
              .map((item, i) => (
                <div
                  key={i}
                  onClick={(e) => {
                    props.dispatch({ type: 'item', payload: item })
                    dispatch({ type: 'false' })
                  }}
                  className={styles.dropdown_item}
                >
                  {item}
                </div>
              ))}
          </div>
        )}
      </OutsideClickHandler>
    </div>
  )
}
export default DropDown
