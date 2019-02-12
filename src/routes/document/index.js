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
            documentId: this.props.documentId,
            doc: {},
            isEmpty: false
        }
        this.reviewIfEmpty = this.reviewIfEmpty.bind(this);
    }
    backToProject() {
        const { projectId } = this.props;
        route(`/project/${projectId}`)
    }
    backToDocuments() {
        const { projectId, vaultId } = this.props;
        route(`/project/${projectId}/vault/${vaultId}`)
    }
    async componentDidMount() {
        const { hasLoaded } = this.props;
		hasLoaded();
    }
    async componentWillMount() {
		const { API, documentId, projectId } = this.props;
		const project = await API.getProject(projectId);
        const doc = await API.getDocument(projectId, documentId);
 		this.setState({ project, doc })
		setTimeout(this.reviewIfEmpty, API.WAITING_TIME_IN_MS);
	}
	reviewIfEmpty() {
	    const { doc } = this.state;
	    this.setState({ isEmpty: !doc.content })
	}
    render() {
        const { doc, project, isEmpty } = this.state;
        const { API } = this.props;
        return (
            <Page>
                <NavigationTitle top onClick={() => this.backToDocuments()}><img src={leftCaret} />Back to documents</NavigationTitle>
				<Title>{ doc.title || 'Loading...' }</Title>
				<Grid>
        			<Inner>
        			<Cell desktopCols="12" tabletCols="8" phoneCols="4" align="middle">
        			    <CardWrapper center>
        			        {
        			            doc.content ?
        			            <Grid full>
        			                <Inner>
			                            <Cell desktopCols="12" tabletCols="8" phoneCols="4" align="middle" padded left>
			                                <DocumentWrapper dangerouslySetInnerHTML={{ __html:doc.content }}/>
			                                <ProfileTitle>
                                                <Figure creator={doc.creator} />
                                            </ProfileTitle>
			                            </Cell>
        			                </Inner>
        			            </Grid> :
        			            isEmpty ?
        			            <CardHeader>
    							    <ProjectTitle>This document does not exist.</ProjectTitle>
    							    <p style={{ margin: '16px' }}>We couldn’t find the document you were looking for.</p>
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
        		<NavigationTitle top onClick={() => this.backToDocuments()}><img src={leftCaret} />Back to documents</NavigationTitle>
        	</Page>
        )
    }
}