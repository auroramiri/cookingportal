import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import FilterLink from '../link/link'
import {userSignIn} from '../../Actions/signinActions'
import connect from 'react-redux/es/connect/connect'
import axios from 'axios'



class SignIn extends React.Component {

	constructor(props) {
		super(props)
		this.signIn = this.signIn.bind(this)
		this.handleEmailChange = this.handleEmailChange.bind(this)
		this.handlePasswordChange = this.handlePasswordChange.bind(this)
		this.state = {
			email:'',
			password:'',
			token: ''
		}
	}

	signIn(){
		axios.post('http://localhost:8080/signin', {
			email: this.state.email,
			password: this.state.password
		})
			.then(function (res) {
				this.props.dispatch(userSignIn(JSON.parse(res.data)))
			})
	}
	handleEmailChange(e){
		this.setState({email:e.target.value})
	}
	handlePasswordChange(e){
		this.setState({password:e.target.value})
	}
	render() {
		const styles = (theme) => ({
			main: {
				width: 'auto',
				display: 'block', // Fix IE 11 issue.
				marginLeft: theme.spacing.unit * 3,
				marginRight: theme.spacing.unit * 3,
				[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
					width: 400,
					marginLeft: 'auto',
					marginRight: 'auto',
				},
			},
			paper: {
				marginTop: theme.spacing.unit * 8,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
			},
			avatar: {
				margin: theme.spacing.unit,
				backgroundColor: theme.palette.secondary.main,
			},
			form: {
				width: '100%', // Fix IE 11 issue.
				marginTop: theme.spacing.unit,
			},
			submit: {
				marginTop: theme.spacing.unit * 3,
				textDecoration: 'none'
			},

			link: {
				textDecoration: 'none'
			},
		})

		return (
			<main className={styles.main}>
				<CssBaseline />
				<Paper className={styles.paper}>
					<Avatar className={styles.avatar}>
						<LockIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Вход
					</Typography>
					<form className={styles.form}>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="email">Адрес электронной почты</InputLabel>
							<Input  onChange={this.handleEmailChange} id="email" name="email" autoComplete="email" autoFocus />
						</FormControl>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="password">Пароль</InputLabel>
							<Input onChange={this.handlePasswordChange} name="password" type="password" id="password" autoComplete="current-password" />
						</FormControl>
						<FilterLink filter="album"  >
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={styles.submit}
								onClick={this.signIn}
							>
								Войти
							</Button>
							{console.log(this.props)}
						</FilterLink>
					</form>
				</Paper>
			</main>
		)
	}
}


SignIn.propTypes = {
	classes: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
	return {
		user: state.user

	}
}

export default connect(mapStateToProps)(SignIn)
