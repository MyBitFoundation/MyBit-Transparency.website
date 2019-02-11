import { h, Component } from 'preact';
import { route } from 'preact-router';
import Dialog from 'preact-material-components/Dialog';
import 'preact-material-components/Dialog/style.css';
import { Grid, Page, Inner, Cell, DescriptionWrapper } from '../../components/layout';
import { Figure } from '../../components/figure';
import { 
    Title, 
    ProjectTitle, 
    NavigationTitle, 
    ComponentTitle, 
    Subline, 
    ComponentIcon, 
    ProfileTitle, 
    CommentWrapper,
    CommentTitle,
    CommentContentWrapper
} from '../../components/typography';
import { CardWrapper, CardHeader } from '../../components/card';
import leftCaret from '../../assets/svgs/icons/leftCaret.svg';
import { Spinner } from '../../components/spinner';


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
        			                            <Cell desktopCols="12" tabletCols="8" phoneCols="4" align="middle" padded left>
        			                                <ComponentTitle start>
        			                                    <ComponentIcon>{ component.completed ? 'check_box' : 'check_box_outline_blank' }</ComponentIcon>
        			                                    { component.content }
        			                                </ComponentTitle>
        			                                <DescriptionWrapper dangerouslySetInnerHTML={{ __html:component.description }}/>
        			                                <ProfileTitle>
                                                        <Figure creator={component.creator} />
                                                        <Subline>
                                                            { component.comments_count } comments
                                                        </Subline>
                                                    </ProfileTitle>
                                                    {
                                                        component.comments_count > 0 && 
                                                        <NavigationTitle left onClick={()=>{
                                                            this.loadComment(component.id);
                                                            this.scrollingDlg.MDComponent.show();
                                                        }}>
                                                           See comments
                                                        </NavigationTitle>
                                                    }
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
                <Dialog ref={ scrollingDlg => this.scrollingDlg = scrollingDlg }>
                  <Dialog.Header>Comments</Dialog.Header>
                  <Dialog.Body scrollable={true}>
                    <div>
                    {
                        comments.length > 0 ?
                        comments.map( comment => (
                            <CommentWrapper>
                                <CommentTitle>
                                    <Figure creator={comment.creator} />
                                </CommentTitle>
                                <CommentContentWrapper dangerouslySetInnerHTML={{ __html:comment.content }}/>
                            </CommentWrapper>
                        )) :
                        <p>Loading...</p>
                    }
                    </div>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.FooterButton accept={true}>Close</Dialog.FooterButton>
                  </Dialog.Footer>
                </Dialog>
        	</Page>
        )
    }
}