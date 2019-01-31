import { h, Component } from 'preact';
import { route } from 'preact-router';
import { Grid, Page, Inner, Cell } from '../../components/layout';
import { Figure } from '../../components/figure';
import { Title, ProjectTitle, NavigationTitle, ComponentTitle, ComponentIcon } from '../../components/typography';
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

export default class Todolist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.projectId,
            project: {},
            todolistId: this.props.todolistId,
            todolist: {},
            isEmpty: false
        }
        this.reviewIfEmpty = this.reviewIfEmpty.bind(this);
    }
    backToProject() {
        const { projectId } = this.props;
        route(`/project/${projectId}`)
    }
    backToTodoset() {
        const { projectId, todosetId } = this.props;
        route(`/project/${projectId}/todoset/${todosetId}`)
    }
    async componentWillMount() {
		const { API, todolistId, projectId } = this.props;
		const project = await API.getProject(projectId);
        const todolist = await API.getTodolist(projectId, todolistId);
 		this.setState({ project, todolist })
		setTimeout(this.reviewIfEmpty, API.WAITING_TIME_IN_MS);
	}
	reviewIfEmpty() {
	    const { todolist } = this.state;
	    this.setState({ isEmpty: !todolist.length > 0 })
	}
    render() {
        const { todolist, project, isEmpty } = this.state;
        const { API } = this.props;
        return (
            <Page>
                <NavigationTitle top onClick={() => this.backToTodoset()}><img src={leftCaret} />Back to todo list</NavigationTitle>
				<Title>Todo tasks for { project.name || 'Loading...' }</Title>
				<Grid>
        			<Inner>
        			<Cell desktopCols="12" tabletCols="8" phoneCols="4" align="middle">
        			    <CardWrapper center>
        			        {
        			            todolist.length > 0 ?
        			            <Grid full>
        			                <Inner>
        			                    { 
        			                        todolist.map( component => (
        			                            <Cell desktopCols="4" tabletCols="8" phoneCols="4" align="middle" padded left>
        			                                <ComponentTitle>
        			                                    <ComponentIcon>{ component.completed ? 'check_box' : 'check_box_outline_blank' }</ComponentIcon>
        			                                    { component.content }
        			                                </ComponentTitle>
        			                                <DescriptionWrapper dangerouslySetInnerHTML={{ __html:component.description }}/>
        			                                <p>Created by <Figure creator={component.creator} /></p>
        			                            </Cell>
        			                        ))
        			                    }
        			                </Inner>
        			            </Grid> :
        			            isEmpty ?
        			            <CardHeader>
    							    <ProjectTitle>There are currently no todo tasks.</ProjectTitle>
    							    <p style={{ margin: '16px' }}>We couldn’t find any tasks in this todo list, see another one.</p>
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
        		<NavigationTitle top onClick={() => this.backToTodoset()}><img src={leftCaret} />Back to todo list</NavigationTitle>
        	</Page>
        )
    }
}