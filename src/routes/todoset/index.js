import { h, Component } from 'preact';
import { route } from 'preact-router';
import { Grid, Page, Inner, Cell } from '../../components/layout';
import { Title, ProjectTitle, NavigationTitle } from '../../components/typography';
import { CardWrapper, CardHeader } from '../../components/card';
import leftCaret from '../../assets/svgs/icons/leftCaret.svg';
import Icon from 'preact-material-components/Icon';
import styled from 'styled-components';

const DescriptionWrapper = styled.div`
    figure {
        display: inline;
        margin: 0;
    }
    figcaption {
        display: inline;
    }
`

export default class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.projectId,
            project: {},
            todosetId: this.props.todosetId,
            todoset: {},
            todolists: [],
            isEmpty: false
        }
        this.reviewIfEmpty = this.reviewIfEmpty.bind(this);
    }
    backToProject() {
        const { projectId } = this.props;
        route(`/project/${projectId}`)
    }
    async componentWillMount() {
		const { API, todosetId, projectId } = this.props;
		const project = await API.getProject(projectId);
        const todoset = await API.getTodosetLists(projectId, todosetId);
 		this.setState({ project, todoset })
		setTimeout(this.reviewIfEmpty, API.WAITING_TIME_IN_MS);
	}
	reviewIfEmpty() {
	    const { todoset } = this.state;
	    this.setState({ isEmpty: !todoset.length > 0 })
	}
    render() {
        const { todoset, project, isEmpty } = this.state;
        const { API } = this.props;
        return (
            <Page>
                <NavigationTitle top onClick={() => this.backToProject()}><img src={leftCaret} />Back to { project.name }</NavigationTitle>
				<Title>Todo tasks for { project.name || 'Loading...' }</Title>
				<Grid>
        			<Inner>
        			<Cell desktopCols="12" tabletCols="8" phoneCols="4" align="middle">
        			    <CardWrapper center>
        			        {
        			            todoset.length > 0 ?
        			            <Grid full>
        			                <Inner>
        			                    { 
        			                        todoset.map( component => (
        			                            <Cell desktopCols="4" tabletCols="4" phoneCols="2" align="middle" padded>
        			                                <h4>{ component.title }</h4>
        			                                <DescriptionWrapper dangerouslySetInnerHTML={{ __html:component.description }}/>
        			                                <p>Comments: { component.comments_count }</p>
        			                                <p>Creator: { component.creator.name }</p>
        			                                <p>Completed: { component.completed ? 'Yes' : 'No' }</p>
        			                                <p>Tasks: { component.completed_ratio }</p>
        			                                <NavigationTitle onClick={() => this.goToCategory(component.name, component.id)}>
        			                                    See { component.title }
        			                                </NavigationTitle>
        			                            </Cell>
        			                        ))
        			                    }
        			                </Inner>
        			            </Grid> :
        			            isEmpty ?
        			            <CardHeader>
    							    <ProjectTitle>There are currently no todo lists.</ProjectTitle>
    							    <p style={{ margin: '16px' }}>We couldn’t find any todos in this project, see another one.</p>
    						    </CardHeader> :
        			            <CardHeader>
    							    <ProjectTitle>Loading...</ProjectTitle>
    							    <p style={{ margin: '16px' }}>Should take a few secs.</p>
    						    </CardHeader>
        			        }
    					</CardWrapper>
        			</Cell>
        			</Inner>
        		</Grid>
        		<NavigationTitle top onClick={() => this.backToProject()}><img src={leftCaret} />Back to { project.name }</NavigationTitle>
        	</Page>
        )
    }
}