import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from 'semantic-ui-react'
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
        <Button color='black' onClick={toggleVisibility}>{props.buttonlabel}</Button>
      </div>
      <div style={show}>
        {props.children}
        <Button  color='black' onClick={toggleVisibility}>Cancel</Button>
      </div>
    </div>
  )
})
Toggable.displayName = 'Toggable'

export default Toggable
