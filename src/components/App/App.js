import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import SearchAppBar from '../app-bar/SearchAppBar'
import SignIn from '../signin/SignIn'
import SignUp from '../signup/SignUp'
import Album from '../Album/album'
import Footer from '../footer/footer'
import Recipe from '../Recipe/Recipe'
import User from '../user/user'
import Admin from '../admin/admin'
import CreateRecipe from '../createrecipe/createrecipe'
import store from '../../Store/store'
import {Provider} from 'react-redux'

const App = () => (
	<Provider store={store}>
		<Router>
			<div>
				<SearchAppBar/>
				<Route path="/Album" component={Album}/>
				<Route path="/SignIn" component={SignIn}/>
				<Route path="/SignUp" component={SignUp}/>
				<Route path="/Recipe" component={Recipe}/>
				<Route path="/User" component={User}/>
				<Route path="/Admin" component={Admin}/>
				<Route path="/CreateRecipe" component={CreateRecipe}/>
				<Footer/>
			</div>
		</Router>
	</Provider>
)


export default App
