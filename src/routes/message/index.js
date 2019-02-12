import { h, Component } from 'preact';
import { route } from 'preact-router';
import { Grid, Page, Inner, Cell, DocumentWrapper } from '../../components/layout';
import { Figure } from '../../components/figure';
import { Title, ProjectTitle, NavigationTitle, ProfileTitle } from '../../components/typography';
import { CardWrapper, CardHeader } from '../../components/card';
import leftCaret from '../../assets/svgs/icons/leftCaret.svg';
import { Spinner } from '../../components/spinner';


export default class Document extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.projectId,
            project: {},
            messageId: this.props.documentId,
            message: {},
            isEmpty: false
        }
        this.reviewIfEmpty = this.reviewIfEmpty.bind(this);
    }
    backToProject() {
        const { projectId } = this.props;
        route(`/project/${projectId}`)
    }
    backToMessageBoard() {
        const { projectId, messageBoardId } = this.props;
        route(`/project/${projectId}/message_board/${messageBoardId}`)
    }
    async componentDidMount() {
        const { hasLoaded } = this.props;
		hasLoaded();
    }
    async componentWillMount() {
		const { API, messageId, projectId } = this.props;
		const project = await API.getProject(projectId);
        const message = await API.getMessage(projectId, messageId);
 		this.setState({ project, message })
		setTimeout(this.reviewIfEmpty, API.WAITING_TIME_IN_MS);
	}
	reviewIfEmpty() {
	    const { message } = this.state;
	    this.setState({ isEmpty: !message.content })
	}
    render() {
        const { message, isEmpty } = this.state;
        const { API } = this.props;
        return (
            <Page>
                <NavigationTitle top onClick={() => this.backToMessageBoard()}><img src={leftCaret} />Back to message board</NavigationTitle>
				<Title>{ message.title || 'Loading...' }</Title>
				<Grid>
        			<Inner>
        			<Cell desktopCols="12" tabletCols="8" phoneCols="4" align="middle">
        			    <CardWrapper center>
        			        {
        			            message.content ?
        			            <Grid full padded>
        			                <Inner>
			                            <Cell desktopCols="12" tabletCols="8" phoneCols="4" align="middle" padded left>
			                                <DocumentWrapper dangerouslySetInnerHTML={{ __html:message.content }}/>
			                                <ProfileTitle>
                                                <Figure creator={message.creator} />
                                            </ProfileTitle>
			                            </Cell>
        			                </Inner>
        			            </Grid> :
        			            isEmpty ?
        			            <CardHeader>
    							    <ProjectTitle>This message does not exist.</ProjectTitle>
    							    <p style={{ margin: '16px' }}>We couldn’t find the message you were looking for.</p>
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
        		<NavigationTitle top onClick={() => this.backToMessageBoard()}><img src={leftCaret} />Back to message board</NavigationTitle>
        	</Page>
        )
    }
}