import { h, Component } from 'preact';
import { route } from 'preact-router';
import { Grid, Page, Inner, Cell } from '../../components/layout';
import { Figure } from '../../components/figure';
import { 
    Title,
    ProjectTitle,
    NavigationTitle,
    ComponentTitle,
    Subline,
    ComponentIcon,
    ProfileTitle
} from '../../components/typography';
import { CardWrapper, CardHeader } from '../../components/card';
import leftCaret from '../../assets/svgs/icons/leftCaret.svg';
import { Spinner } from '../../components/spinner';
import Comments from '../../components/comments';


export default class Todolist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.projectId,
            project: {},
            todolistId: this.props.todolistId,
            todolist: [],
            comments: [],
            isEmpty: false
        }
        this.reviewIfEmpty = this.reviewIfEmpty.bind(this);
        this.loadComment = this.loadComment.bind(this);
    }
    backToProject() {
        const { projectId } = this.props;
        route(`/project/${projectId}`)
    }
    backToTodoset() {
        const { projectId, todosetId } = this.props;
        route(`/project/${projectId}/todoset/${todosetId}`)
    }
    async loadComment(commentId) {
        this.setState({ comments: [] });
        const { API, projectId } = this.props;
        const comments = await API.getComments(projectId, commentId);
        this.setState({ comments })
    }
    async componentDidMount() {
        const { hasLoaded } = this.props;
		hasLoaded();
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
        const { todolist, project, isEmpty, comments } = this.state;
        const { API, projectId } = this.props;
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
        			            <Grid full padded>
        			                <Inner>
        			                    { 
        			                        todolist.map( component => (
        			                            <Cell desktopCols="12" tabletCols="8" phoneCols="4" align="middle" padded left>
        			                                <ComponentTitle start noMargin>
        			                                    <ComponentIcon>{ component.completed ? 'check_box' : 'check_box_outline_blank' }</ComponentIcon>
        			                                    { component.content }
        			                                    <Subline date right>
                                                            { component.due_on }
                                                        </Subline>
        			                                </ComponentTitle>
        			                                <ProfileTitle noMargin>
                                                        <Figure small leftMargin creator={component.creator} />
                                                        <Comments 
                                                            API={API} 
                                                            projectId={projectId} 
                                                            comments_count={component.comments_count}
                                                            id={component.id}
                                                        />
                                                    </ProfileTitle>
                                                    
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
        			                <Spinner />
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