import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import FilterLink from '../link/link'
import axios from 'axios'
import '../../Assets/CSS/Signin.css'
import {Link} from "react-router-dom";



class SignUp extends React.Component {
	constructor(props) {
		super(props)
		this.signUp = this.signUp.bind(this)
		this.handleEmailChange = this.handleEmailChange.bind(this)
		this.handleUsernameChange = this.handleUsernameChange.bind(this)
		this.handlePasswordChange = this.handlePasswordChange.bind(this)
		this.state = {
			email:'',
			username:'',
			password:'',
			role: 2
		}
	}
	signUp(){
		axios.post('http://localhost:8080/signup', {
			email: this.state.email,
			username: this.state.username,
			password: this.state.password,
			roles: this.state.roles
		})
			.then(function (response) {
				console.log(response)
			})
	}
	handleEmailChange(e){
		this.setState({email:e.target.value})
	}
	handleUsernameChange(e){
		this.setState({username:e.target.value})
	}
	handlePasswordChange(e){
		this.setState({password:e.target.value})
	}
	render() {

		return (
			<main className={'main'}>
				<CssBaseline />
				<Paper className={'paper'}>
					<Avatar className={'avatar'}>
						<LockIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Регистрация
					</Typography>
					<form className={'form'}>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="email">Адрес электронной почты</InputLabel>
							<Input  onChange={this.handleEmailChange} id="email" name="email" autoComplete="email" autoFocus />
						</FormControl>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="email">Имя пользователя</InputLabel>
							<Input  onChange={this.handleUsernameChange} id="email" name="email" autoComplete="email" />
						</FormControl>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="password">Пароль</InputLabel>
							<Input onChange={this.handlePasswordChange} name="password" type="password" id="password" autoComplete="current-password" />
						</FormControl>

							<Button
								fullWidth
								variant="contained"
								color="primary"
								className={'submit'}
								onClick={this.signUp}
							>
								Зарегистрироваться
							</Button>

					</form>
				</Paper>
			</main>
		)
	}
}

export default (SignUp)
