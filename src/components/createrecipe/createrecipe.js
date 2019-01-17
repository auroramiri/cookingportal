import React from 'react'
import MarkDown from '../markdown/markdown'
import DialogSelect from '../selects/Selects'
import withStyles from '@material-ui/core/styles/withStyles'
import IntegrationReactSelect from  '../ingridients/ingridients'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import axios from "axios";

const styles = (theme) => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 1,
		marginRight: theme.spacing.unit * 1,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 1000,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	button: {
		margin: theme.spacing.unit,
	},
})

class CreateRecipe extends React.Component {
	constructor(props) {
		super(props)
		this.createRecipes = this.createRecipes.bind(this)
		this.handleHeadChange = this.handleHeadChange.bind(this)
		this.handleSummaryChange = this.handleSummaryChange.bind(this)
		this.state = {
			head: '',
			summary: '',
			ingridients: '',
			category: '',
			description: ''
		}
	}
	handleHeadChange(e){
		this.setState({head:e.target.value})
	}
	handleSummaryChange(e){
		this.setState({summary:e.target.value})
	}
	createRecipes() {
		axios.post('http://localhost:8080/CreateRecipe', {
			head: this.state.head,
			summary: this.state.summary
		})
			.then(function (response) {
				console.log(response)
			})
			.catch(function (error) {
				console.log(error)
			})
	}

	render() {
		const {classes} = this.props

		return (
			<Grid className={classes.container}>
				<FormControl margin="normal" required fullWidth>
					<InputLabel>Заголовок</InputLabel>
					<Input onChange={this.handleHeadChange} id="head" name="head" autoComplete="head" autoFocus/>
				</FormControl>
				<FormControl margin="normal" required fullWidth>
					<InputLabel>Краткое содержание</InputLabel>
					<Input onChange={this.handleSummaryChange} id="summary" name="summary" autoComplete="summary"/>
				</FormControl>
				<IntegrationReactSelect/>
				<DialogSelect/>
				<main className={classes.main}>
					<MarkDown/>
				</main>
				<Button variant={'contained'} color="primary" onClick={this.createRecipes}>Сохранить</Button>

			</Grid>


		)
	}
}

export default  withStyles(styles)(CreateRecipe)