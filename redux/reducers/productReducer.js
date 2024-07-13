import { ADD_PRODUCT } from '../actions/types';
const initialState = {
  productName: '',
  places: []
};
const productReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        places: state.places.concat({
          key: Math.random(),
          value: action.payload
        })
      };
    default:
      return state;
  }
}
export default productReducer;