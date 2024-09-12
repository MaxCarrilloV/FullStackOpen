import { useState, forwardRef, useImperativeHandle } from 'react'

const Toggable = forwardRef((props, refs) => {
  const [visible, setVissible] = useState(false)

  const hidden = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVissible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hidden}>
        <button onClick={toggleVisibility}>{props.buttonlabel}</button>
      </div>
      <div style={show}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})
Toggable.displayName = 'Toggable'

export default Toggable
