import React from 'react'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Link } from 'react-router-dom'
import '../../Assets/CSS/Card.css'

class RecipeReviewCard extends React.Component {
    state = { expanded: false };

    render() {
    	return (
    		<Card className={'card'}>
    			<CardHeader

    				avatar={
    					<Avatar aria-label="Recipe" className={'avatar'} component={Link} to="/user">
                            R
    					</Avatar>
    				}
    				title="Shrimp and Chorizo Paella"
    				subheader="September 14, 2016"
    			/>
    			<CardMedia
    				className={'media'}
    				image="https://material-ui.com/static/images/cards/paella.jpg"
    				title="Paella dish"
    			/>
    			<CardContent>
    				<Typography component="p">
                        This impressive paella is a perfect party dish and a fun meal to cook together with your
                        guests. Add 1 cup of frozen peas along with the mussels, if you like.
    				</Typography>
    			</CardContent>
    			<CardActions className={'actions'} disableActionSpacing>
    				<IconButton
    					className={classnames('expand', {
    						'expandOpen': this.state.expanded,
    					})}
    					aria-expanded={this.state.expanded}
    					aria-label="Show more"
    					component={Link} to="/recipe"
    				>
    					<ExpandMoreIcon />
    				</IconButton>
    			</CardActions>
    		</Card>
    	)
    }
}


export default (RecipeReviewCard)