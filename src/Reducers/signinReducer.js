import {USER} from '../Constants/signinConstants'

const user = (state = [], action) => {
	switch (action.type) {
	case USER.SIGN_IN:
		state = action.user

		return state

	case USER.LOGIN_FAILED:
		return state.filter((item) => item.board.id !== action.board.id)
	default:
		return state
	}
}

export default user