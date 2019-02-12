import { h, Component } from 'preact';
import { route } from 'preact-router';
import { Grid, Page, Inner, Cell } from '../../components/layout';
import { Title, ProjectTitle, NavigationTitle, ComponentTitle,CommentWrapper,CommentContentWrapper } from '../../components/typography';
import { CardWrapper, CardHeader } from '../../components/card';
import { Spinner } from '../../components/spinner';
import leftCaret from '../../assets/svgs/icons/leftCaret.svg';


export default class MessageBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.projectId,
            project: {},
            messageBoardId: this.props.messageBoardId,
            messageBoard: [],
            message: {},
            isEmpty: false
        }
        this.reviewIfEmpty = this.reviewIfEmpty.bind(this);
        this.loadMessage = this.loadMessage.bind(this);
    }
    backToProject() {
        const { projectId } = this.props;
        route(`/project/${projectId}`)
    }
    goToMessage(messageId) {
        const { projectId, messageBoardId } = this.props;
        route(`/project/${projectId}/message_board/${messageBoardId}/message/${messageId}`)
    }
    async componentDidMount() {
        const { hasLoaded } = this.props;
		hasLoaded();
    }
    async componentWillMount() {
		const { API, messageBoardId, projectId } = this.props;
		const project = await API.getProject(projectId);
        const messageBoard = await API.getMessageBoard(projectId, messageBoardId);
 		this.setState({ project, messageBoard })
		setTimeout(this.reviewIfEmpty, API.WAITING_TIME_IN_MS);
	}
	loadMessage(message) {
	    console.log('Message', message)
	    this.setState({ message })    
	}
	reviewIfEmpty() {
	    const { messageBoard } = this.state;
	    this.setState({ isEmpty: !messageBoard.length > 0 })
	}
    render() {
        const { messageBoard, project, isEmpty, message } = this.state;
        const { API } = this.props;
        return (
            <Page>
                <NavigationTitle top onClick={() => this.backToProject()}><img src={leftCaret} />Back to { project.name }</NavigationTitle>
				<Title>Message Board for { project.name || 'Loading...' }</Title>
				<Grid>
        			<Inner>
        			<Cell desktopCols="12" tabletCols="8" phoneCols="4" align="middle">
        			    <CardWrapper center>
        			        {
        			            messageBoard.length > 0 ?
        			            <Grid full>
        			                <Inner>
        			                    { 
        			                        messageBoard.map( component => (
        			                            <Cell desktopCols="4" tabletCols="8" phoneCols="4" align="top" padded left>
        			                                <ComponentTitle>
        			                                    { component.title }
        			                                </ComponentTitle>
        			                                <NavigationTitle left onClick={()=>this.goToMessage(component.id)}>
                                                       See message
                                                    </NavigationTitle>
        			                            </Cell>
        			                        ))
        			                    }
        			                </Inner>
        			            </Grid> :
        			            isEmpty ?
        			            <CardHeader>
    							    <ProjectTitle>There are currently no messages in this message board.</ProjectTitle>
    							    <p style={{ margin: '16px' }}>We couldn’t find any messages in this project, see another one.</p>
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