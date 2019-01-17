import {createStore} from 'redux'
import MainReducer from '../Reducers/MainReducer'
import {loadState, saveState} from './localStorage'


const persistedState = loadState()
const store = createStore(MainReducer, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),)
store.subscribe(() => {
	saveState({
		user: store.getState().user,
	})
})


export default (store)