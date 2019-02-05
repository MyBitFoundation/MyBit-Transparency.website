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

export default class Questionnaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.projectId,
            project: {},
            questionnaireId: this.props.questionnaireId,
            questionnaire: [],
            isEmpty: false
        }
        this.reviewIfEmpty = this.reviewIfEmpty.bind(this);
    }
    backToProject() {
        const { projectId } = this.props;
        route(`/project/${projectId}`)
    }
    goToQuestion(questionId) {
        const { projectId, questionnaireId } = this.props;
        route(`/project/${projectId}/questionnaire/${questionnaireId}/question/${questionId}`)
    }
    async componentWillMount() {
		const { API, questionnaireId, projectId } = this.props;
		const project = await API.getProject(projectId);
        const questionnaire = await API.getQuestionnaire(projectId, questionnaireId);
 		this.setState({ project, questionnaire })
		setTimeout(this.reviewIfEmpty, API.WAITING_TIME_IN_MS);
	}
	reviewIfEmpty() {
	    const { questionnaire } = this.state;
	    this.setState({ isEmpty: !questionnaire.length > 0 })
	}
    render() {
        const { questionnaire, project, isEmpty } = this.state;
        const { API } = this.props;
        return (
            <Page>
                <NavigationTitle top onClick={() => this.backToProject()}><img src={leftCaret} />Back to { project.name }</NavigationTitle>
				<Title>Questionnaire for { project.name || 'Loading...' }</Title>
				<Grid>
        			<Inner>
        			<Cell desktopCols="12" tabletCols="8" phoneCols="4" align="middle">
        			    <CardWrapper center>
        			        {
        			            questionnaire.length > 0 ?
        			            <Grid full>
        			                <Inner>
        			                    { 
        			                        questionnaire.map( component => (
        			                            <Cell desktopCols="4" tabletCols="8" phoneCols="4" align="top" padded left>
        			                                <ComponentTitle>
        			                                    { component.title }
        			                                </ComponentTitle>
        			                                <DescriptionWrapper dangerouslySetInnerHTML={{ __html:component.description }}/>
        			                                <NavigationTitle left onClick={() => this.goToQuestion(component.id)}>
        			                                    See responses
        			                                </NavigationTitle>
        			                            </Cell>
        			                        ))
        			                    }
        			                </Inner>
        			            </Grid> :
        			            isEmpty ?
        			            <CardHeader>
    							    <ProjectTitle>There are currently no todo lists.</ProjectTitle>
    							    <p style={{ margin: '16px' }}>We couldn’t find any questionnaires in this project, see another one.</p>
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