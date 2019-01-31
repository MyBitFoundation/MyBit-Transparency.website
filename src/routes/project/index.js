import { h, Component } from 'preact';
import { route } from 'preact-router';
import { Grid, Page, Inner, Cell } from '../../components/layout';
import { Title, NavigationTitle, ProjectTitle, ColoredIcon } from '../../components/typography';
import { CardWrapper, CardHeader } from '../../components/card';
import leftCaret from '../../assets/svgs/icons/leftCaret.svg';
import styled from 'styled-components';


export default class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.projectId,
            project: {},
            components: []
        }
    }
    backToProjects() {
        route(`/`)
    }
    
    goToCategory(category, categoryId) {
        const { projectId } = this.props;
        route(`/project/${projectId}/${category}/${categoryId}`)
    }
    async componentWillMount() {
		const { API, projectId } = this.props;
		const project = await API.getProject(projectId);
		const components = project.dock;
		this.setState({ project, components })
	}
    render() {
        const { project, components } = this.state;
        const { API } = this.props;
        return (
            <Page>
                <NavigationTitle top onClick={() => this.backToProjects()}><img src={leftCaret} />Back to all projects</NavigationTitle>
				<Title>{ project.name || 'Loading...'}</Title>
				<h3 style={{ textAlign: "center" }}>
				    { 
				        project.description || 
				        'Loading project description...' 
				    }
				</h3>
				<Grid>
        			<Inner>
        			<Cell desktopCols="12" tabletCols="8" phoneCols="4" align="middle">
        			    <CardWrapper center>
        			        {
        			            components.length > 0 ?
        			            <Grid full>
        			                <Inner>
        			                    { 
        			                        components.map( component => (
        			                            <Cell desktopCols="4" tabletCols="4" phoneCols="4" align="middle" padded left>
        			                                <div>
                                                        <ColoredIcon>{ API.getIconFromCategory(component.name) }</ColoredIcon>
        			                                </div>
        			                                <h4>{ component.title }</h4>
        			                                <p>{ API.getDescriptionFromCategory(component.name) }</p>
                                                    {
                                                        API.getStatusFromCategory(component.name) ?
                                                        <NavigationTitle left onClick={() => this.goToCategory(component.name, component.id)}>
                                                            See { component.title }
                                                        </NavigationTitle> :
                                                        <NavigationTitle left disabled>
                                                            Not yet available
                                                        </NavigationTitle>
                                                    }
        			                            </Cell>
        			                        ))
        			                    }
        			                </Inner>
        			            </Grid> :
        			            <CardHeader>
    							    <ProjectTitle>Loading...</ProjectTitle>
    							    <p style={{ margin: '16px' }}>Should take a few secs.</p>
    						    </CardHeader>
        			        }
    					</CardWrapper>
        			</Cell>
        			</Inner>
        		</Grid>
        		<NavigationTitle onClick={() => this.backToProjects()}><img src={leftCaret} />Back to all projects</NavigationTitle>
        	</Page>
        )
    }
}