import {USER} from '../Constants/signinConstants'


const userSignIn = (user) => ({
	type: USER.SIGN_IN,
	user
})



export {
	userSignIn,

}