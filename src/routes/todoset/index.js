import { h, Component } from 'preact';
import { route } from 'preact-router';
import { Grid, Page, Inner, Cell } from '../../components/layout';
import { Title, ProjectTitle, NavigationTitle, Subline, ComponentTitle, ComponentIcon, ProfileTitle } from '../../components/typography';
import { CardWrapper, CardHeader } from '../../components/card';
import { Figure } from '../../components/figure';
import leftCaret from '../../assets/svgs/icons/leftCaret.svg';
import { Spinner } from '../../components/spinner';
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

export default class Todoset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.projectId,
            project: {},
            todosetId: this.props.todosetId,
            todoset: [],
            isEmpty: false
        }
        this.reviewIfEmpty = this.reviewIfEmpty.bind(this);
    }
    backToProject() {
        const { projectId } = this.props;
        route(`/project/${projectId}`)
    }
    goToTodolist(todolistId) {
        const { projectId, todosetId } = this.props;
        route(`/project/${projectId}/todoset/${todosetId}/todolist/${todolistId}`)
    }
    async componentDidMount() {
        const { hasLoaded } = this.props;
		hasLoaded();
    }
    async componentWillMount() {
		const { API, todosetId, projectId } = this.props;
		const project = await API.getProject(projectId);
        const todoset = await API.getTodoset(projectId, todosetId);
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
				<Title>Todo lists for { project.name || 'Loading...' }</Title>
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
        			                            <Cell desktopCols="12" tabletCols="8" phoneCols="4" align="middle" padded left>
        			                                <ComponentTitle left>
        			                                    <ComponentIcon>{ component.completed ? 'check_box' : 'check_box_outline_blank' }</ComponentIcon>
        			                                    { component.title }
        			                                    <Subline>{ component.completed_ratio } completed</Subline>
        			                                </ComponentTitle>
        			                                <DescriptionWrapper dangerouslySetInnerHTML={{ __html:component.description }}/>
                                                    <ProfileTitle>
                                                        <Figure creator={component.creator} />
                                                    </ProfileTitle>
        			                                <NavigationTitle left onClick={() => this.goToTodolist(component.id)}>
        			                                    See { component.title }
        			                                </NavigationTitle>
        			                            </Cell>
        			                        ))
        			                    }
        			                </Inner>
        			            </Grid> :
        			            isEmpty ?
        			            <CardHeader>
    							    <ProjectTitle>There are currently no todos.</ProjectTitle>
    							    <p style={{ margin: '16px' }}>We couldn’t find any todos in this project, see another one.</p>
    						    </CardHeader> :
        			            <CardHeader>
        			                <Spinner />
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