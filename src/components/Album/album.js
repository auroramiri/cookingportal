import React from 'react'
import classNames from 'classnames'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import RecipeReviewCard from '../card/card'
import '../../Assets/CSS/Album.css'

const cards = [1, 2, 3, 4, 5, 6]

function Album(props) {

	return (
		<React.Fragment>
			<CssBaseline />
			<main>
				{/* Hero unit */}
				<div className={'heroUnit'}>
					<div className={'heroContent'}>
						<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Album layout
						</Typography>
						<Typography variant="h6" align="center" color="textSecondary" paragraph>
                            Something short and leading about the collection below—its contents, the creator, etc.
                            Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                            entirely.
						</Typography>
					</div>
				</div>
				<div className={classNames('layout', 'cardGrid')}>
					{/* End hero unit */}
					<Grid container spacing={40}>
						{cards.map(() => (
							<div className={'card'}>
								<RecipeReviewCard/>
							</div>
						))}
					</Grid>
				</div>
			</main>
		</React.Fragment>
	)
}


export default (Album)