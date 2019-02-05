import { h, Component } from 'preact';
import { route } from 'preact-router';
import { Grid, Page, Inner, Cell } from '../../components/layout';
import { Title, ProjectTitle } from '../../components/typography';
import { CardWrapper, CardHeader } from '../../components/card';
import { Spinner } from '../../components/spinner';


export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projects: []
		}
	}
	
	goToProject(projectId) {
		route(`/project/${projectId}`)
	}
	
	async componentWillMount() {
		const { API } = this.props;
		const projects = await API.getProjects()
		projects.sort((a, b) => a.name <= b.name ? a.name === b.name ? 0 : -1 : 1 );
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
						<Cell desktopCols="3" tabletCols="4" phoneCols="4" align="middle" style={{ height: '100%' }}>
							<CardWrapper onClick={() => this.goToProject(project.id)} pointer>
								<CardHeader>
									<ProjectTitle>{ project.name }</ProjectTitle>
									<p style={{ margin: '16px' }}>{ project.description }</p>
								</CardHeader>
							</CardWrapper>
						</Cell>
					)) :
					<Cell desktopCols="12" tabletCols="8" phoneCols="4" align="middle" style={{ textAlign: 'center' }}>
						<CardWrapper>
							<CardHeader>
								<Spinner />
								<ProjectTitle> Loading... </ProjectTitle>
							</CardHeader>
						</CardWrapper>
					</Cell>
				}
					</Inner>
				</Grid>
			</Page>
		);
	}
}
