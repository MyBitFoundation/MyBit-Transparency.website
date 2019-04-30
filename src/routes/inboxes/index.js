import { h, Component } from 'preact';
import { route } from 'preact-router';
import { Grid, Page, Inner, Cell } from '../../components/layout';
import { Title, ProjectTitle, NavigationTitle, ComponentTitle } from '../../components/typography';
import { CardWrapper, CardHeader } from '../../components/card';
import { Spinner } from '../../components/spinner';
import leftCaret from '../../assets/svgs/icons/leftCaret.svg';


export default class Vault extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.projectId,
            project: {},
            inboxeId: this.props.inboxeId,
            emails: [],
            isEmpty: false
        }
        this.reviewIfEmpty = this.reviewIfEmpty.bind(this);
    }
    backToProject() {
        const { projectId } = this.props;
        route(`/project/${projectId}`)
    }
    goToDocument(emailId) {
        const { projectId, inboxeId } = this.props;
        route(`/project/${projectId}/inbox/${inboxeId}/email/${emailId}`)
    }
    async componentDidMount() {
        const { hasLoaded } = this.props;
		hasLoaded();
    }
    async componentWillMount() {
		const { API, inboxeId, projectId } = this.props;
		const project = await API.getProject(projectId);
        const emails = await API.getEmailsFromInbox(projectId, inboxeId);
 		this.setState({ project, emails })
		setTimeout(this.reviewIfEmpty, API.WAITING_TIME_IN_MS);
	}
	reviewIfEmpty() {
	    const { emails } = this.state;
	    this.setState({ isEmpty: !emails.length > 0 })
	}
    render() {
        const { emails, project, isEmpty } = this.state;
        const { API } = this.props;
        return (
            <Page>
                <NavigationTitle top onClick={() => this.backToProject()}><img src={leftCaret} />Back to { project.name }</NavigationTitle>
				<Title>Emails for { project.name || 'Loading...' }</Title>
				<Grid>
        			<Inner>
        			<Cell desktopCols="12" tabletCols="8" phoneCols="4" align="middle">
        			    <CardWrapper center>
        			        {
        			            emails.length > 0 ?
        			            <Grid full>
        			                <Inner>
        			                    { 
        			                        emails.map( component => (
        			                            <Cell desktopCols="4" tabletCols="8" phoneCols="4" align="top" padded left>
        			                                <ComponentTitle>
        			                                    { component.title }
        			                                </ComponentTitle>
        			                                <NavigationTitle left onClick={() => this.goToDocument(component.id)}>
        			                                    See email
        			                                </NavigationTitle>
        			                            </Cell>
        			                        ))
        			                    }
        			                </Inner>
        			            </Grid> :
        			            isEmpty ?
        			            <CardHeader>
    							    <ProjectTitle>There are currently no emails in this project.</ProjectTitle>
    							    <p style={{ margin: '16px' }}>We couldn’t find any emails in this project, see another one.</p>
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