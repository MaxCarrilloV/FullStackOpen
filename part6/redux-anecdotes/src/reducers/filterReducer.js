export const filterChange = (filter) => {
    return {
        type: 'Set_Filter',
        payload: filter,
    }
}
const filterReducer = (state = null, action) => {
    switch (action.type) {
      case 'Set_Filter':
        return action.payload
      default:
        return state
    }
}
export default filterReducer