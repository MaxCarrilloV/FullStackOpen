import { createContext, useReducer, useContext } from 'react'
const loginReducer = (state, action) => {
  switch (action.type) {
    case 'newLogin':
      return action.payload
    case 'logout':
      return null
    default:
      return state
  }
}
const loginContext = createContext()
export const LoginContextProvider = (props) => {
  const [login, loginDispatch] = useReducer(loginReducer, null)
  return (
    <loginContext.Provider value={[login, loginDispatch]}>
      {props.children}
    </loginContext.Provider>
  )
}
export const useLoginValue = () => {
  const loginAndDispatch = useContext(loginContext)
  return loginAndDispatch[0]
}
export const useLoginDispatch = () => {
  const loginAndDispatch = useContext(loginContext)
  return loginAndDispatch[1]
}
export default loginContext