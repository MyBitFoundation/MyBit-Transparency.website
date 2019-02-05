import { h, Component } from 'preact';
import { route } from 'preact-router';
import { Grid, Page, Inner, Cell } from '../../components/layout';
import { Title, ProjectTitle, NavigationTitle, ComponentTitle } from '../../components/typography';
import { CardWrapper, CardHeader } from '../../components/card';
import { Spinner } from '../../components/spinner';
import leftCaret from '../../assets/svgs/icons/leftCaret.svg';
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

export default class Vault extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.projectId,
            project: {},
            vaultId: this.props.vaultId,
            documents: [],
            isEmpty: false
        }
        this.reviewIfEmpty = this.reviewIfEmpty.bind(this);
    }
    backToProject() {
        const { projectId } = this.props;
        route(`/project/${projectId}`)
    }
    goToDocument(documentId) {
        const { projectId, vaultId } = this.props;
        route(`/project/${projectId}/vault/${vaultId}/document/${documentId}`)
    }
    async componentWillMount() {
		const { API, vaultId, projectId } = this.props;
		const project = await API.getProject(projectId);
        const documents = await API.getDocumentsFromVault(projectId, vaultId);
 		this.setState({ project, documents })
		setTimeout(this.reviewIfEmpty, API.WAITING_TIME_IN_MS);
	}
	reviewIfEmpty() {
	    const { documents } = this.state;
	    this.setState({ isEmpty: !documents.length > 0 })
	}
    render() {
        const { documents, project, isEmpty } = this.state;
        const { API } = this.props;
        return (
            <Page>
                <NavigationTitle top onClick={() => this.backToProject()}><img src={leftCaret} />Back to { project.name }</NavigationTitle>
				<Title>Documents for { project.name || 'Loading...' }</Title>
				<Grid>
        			<Inner>
        			<Cell desktopCols="12" tabletCols="8" phoneCols="4" align="middle">
        			    <CardWrapper center>
        			        {
        			            documents.length > 0 ?
        			            <Grid full>
        			                <Inner>
        			                    { 
        			                        documents.map( component => (
        			                            <Cell desktopCols="4" tabletCols="8" phoneCols="4" align="top" padded left>
        			                                <ComponentTitle>
        			                                    { component.title }
        			                                </ComponentTitle>
        			                                <NavigationTitle left onClick={() => this.goToDocument(component.id)}>
        			                                    See document
        			                                </NavigationTitle>
        			                            </Cell>
        			                        ))
        			                    }
        			                </Inner>
        			            </Grid> :
        			            isEmpty ?
        			            <CardHeader>
    							    <ProjectTitle>There are currently no documents in this project.</ProjectTitle>
    							    <p style={{ margin: '16px' }}>We couldn’t find any documents or files in this project, see another one.</p>
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