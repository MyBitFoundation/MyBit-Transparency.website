import { h, Component } from 'preact';
import { route } from 'preact-router';
import { Grid, Page, Inner, Cell, DescriptionWrapper } from '../../components/layout';
import { Figure } from '../../components/figure';
import { Title, ProjectTitle, NavigationTitle, ComponentTitle, Subline } from '../../components/typography';
import { CardWrapper, CardHeader } from '../../components/card';
import leftCaret from '../../assets/svgs/icons/leftCaret.svg';


export default class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.projectId,
            project: {},
            questionId: this.props.questionId,
            question: [],
            isEmpty: false
        }
        this.reviewIfEmpty = this.reviewIfEmpty.bind(this);
    }
    backToProject() {
        const { projectId } = this.props;
        route(`/project/${projectId}`)
    }
    backToQuestionnaire() {
        const { projectId, questionnaireId } = this.props;
        route(`/project/${projectId}/questionnaire/${questionnaireId}`)
    }
    async componentWillMount() {
		const { API, questionId, projectId } = this.props;
		const project = await API.getProject(projectId);
        const question = await API.getQuestion(projectId, questionId);
 		this.setState({ project, question })
		setTimeout(this.reviewIfEmpty, API.WAITING_TIME_IN_MS);
	}
	reviewIfEmpty() {
	    const { question } = this.state;
	    this.setState({ isEmpty: !question.length > 0 })
	}
    render() {
        const { question, project, isEmpty } = this.state;
        const { API } = this.props;
        return (
            <Page>
                <NavigationTitle top onClick={() => this.backToQuestionnaire()}><img src={leftCaret} />Back to questionnaire</NavigationTitle>
				<Title>Todo tasks for { project.name || 'Loading...' }</Title>
				<Grid>
        			<Inner>
        			<Cell desktopCols="12" tabletCols="8" phoneCols="4" align="middle">
        			    <CardWrapper center>
        			        {
        			            question.length > 0 ?
        			            <Grid full>
        			                <Inner>
        			                    { 
        			                        question.map( component => (
        			                            <Cell desktopCols="4" tabletCols="8" phoneCols="4" align="middle" padded left>
        			                                <ComponentTitle>
        			                                    { component.title }
        			                                    <Subline>{ component.group_on }</Subline>
        			                                </ComponentTitle>
        			                                <DescriptionWrapper dangerouslySetInnerHTML={{ __html:component.content }}/>
        			                                <p><Figure creator={component.creator} /></p>
        			                            </Cell>
        			                        ))
        			                    }
        			                </Inner>
        			            </Grid> :
        			            isEmpty ?
        			            <CardHeader>
    							    <ProjectTitle>There are currently no answers for this questionnaire.</ProjectTitle>
    							    <p style={{ margin: '16px' }}>We couldn’t find any answers in this questionnaire, see another one.</p>
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
        		<NavigationTitle top onClick={() => this.backToQuestionnaire()}><img src={leftCaret} />Back to questionnaire</NavigationTitle>
        	</Page>
        )
    }
}