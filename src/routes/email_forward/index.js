import { h, Component } from 'preact';
import { route } from 'preact-router';
import { Grid, Page, Inner, Cell, DocumentWrapper } from '../../components/layout';
import { Figure } from '../../components/figure';
import { Title, ProjectTitle, NavigationTitle, ProfileTitle } from '../../components/typography';
import { CardWrapper, CardHeader } from '../../components/card';
import leftCaret from '../../assets/svgs/icons/leftCaret.svg';
import { Spinner } from '../../components/spinner';
import Replies from '../../components/replies';


export default class Document extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.projectId,
            project: {},
            emailId: this.props.emailId,
            email: {},
            isEmpty: false
        }
        this.reviewIfEmpty = this.reviewIfEmpty.bind(this);
    }
    backToProject() {
        const { projectId } = this.props;
        route(`/project/${projectId}`)
    }
    backToParent() {
        const { projectId, inboxeId } = this.props;
        route(`/project/${projectId}/inbox/${inboxeId}`)
    }
    async componentDidMount() {
        const { hasLoaded } = this.props;
		hasLoaded();
    }
    async componentWillMount() {
		const { API, emailId, projectId } = this.props;
		const project = await API.getProject(projectId);
        const email = await API.getEmail(projectId, emailId);
 		this.setState({ project, email })
		setTimeout(this.reviewIfEmpty, API.WAITING_TIME_IN_MS);
	}
	reviewIfEmpty() {
	    const { email } = this.state;
	    this.setState({ isEmpty: !email.content })
	}
    render() {
        const { email, isEmpty } = this.state;
        const { API, projectId } = this.props;
        return (
            <Page>
                <NavigationTitle top onClick={() => this.backToParent()}><img src={leftCaret} />Back to inbox</NavigationTitle>
				<Title>{ email.title || 'Loading...' }</Title>
				<Grid>
        			<Inner>
        			<Cell desktopCols="12" tabletCols="8" phoneCols="4" align="middle">
        			    <CardWrapper center>
        			        {
        			            email.content ?
        			            <Grid full padded>
        			                <Inner>
			                            <Cell desktopCols="12" tabletCols="8" phoneCols="4" align="middle" padded left>
			                                <DocumentWrapper dangerouslySetInnerHTML={{ __html:email.content }}/>
			                                <ProfileTitle>
                                                <Figure creator={email.creator} />
                                                {/* <Replies 
                                                    API={API} 
                                                    projectId={projectId} 
                                                    comments_count={email.replies_count}
                                                    id={email.id}
                                                />*/}
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
        		<NavigationTitle top onClick={() => this.backToParent()}><img src={leftCaret} />Back to inbox</NavigationTitle>
        	</Page>
        )
    }
}