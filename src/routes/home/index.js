import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import 'preact-material-components/LayoutGrid/style.css';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import styled from 'styled-components';
import { Grid, Page, Inner, Cell } from '../../components/layout';

const Title = styled.h2`
	font-family: Gilroy;
	font-style: normal;
	font-weight: bold;
	line-height: 40px;
	font-size: 32px;
	text-align: center;
`

const ProjectTitle = styled.h3`
	font-family: Gilroy;
	font-style: normal;
	font-weight: bold;
	line-height: 22px;
	font-size: 18px;
	margin: 0;
	padding: 16px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`

const StyledCard = styled(Card)`
	height: 125px;
	width: 100%:
`

const StyledCardHeader = styled.div`
	margin: auto;
	width: 100%;
`


export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projects: []
		}
	}
	
	async componentWillMount() {
		const { API } = this.props;
		const projects = await API.getProjects();
		this.setState({ projects })
	}
	render() {
		const { projects } = this.state;
		return (
			<Page>
				<Title>Projects</Title>
				<Grid>
        			<Inner>
        		{ 
        			projects.length > 0 ?
					projects.map( project => (
						<Cell desktopCols="3" tabletCols="4" phoneCols="4" align="middle">
							<StyledCard>
								<StyledCardHeader>
									<ProjectTitle>{ project.name }</ProjectTitle>
									<p style={{ margin: '16px' }}>{ project.description }</p>
								</StyledCardHeader>
							</StyledCard>
						</Cell>
					)) :
					<Cell phoneCols="4" align="middle">
						<StyledCard>
							<StyledCardHeader>
								<ProjectTitle> Loading... </ProjectTitle>
							</StyledCardHeader>
						</StyledCard>
					</Cell>
				}
					</Inner>
				</Grid>
			</Page>
		);
	}
}
