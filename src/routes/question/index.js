import { h, Component } from 'preact';
import { route } from 'preact-router';
import dayjs from 'dayjs';
import { Grid, Page, Inner, Cell } from '../../components/layout';
import { Title, ProjectTitle, NavigationTitle } from '../../components/typography';
import { CollapsableAnswers } from '../../components/collapse';
import { CardWrapper, CardHeader } from '../../components/card';
import leftCaret from '../../assets/svgs/icons/leftCaret.svg';
import { Spinner } from '../../components/spinner';

const DAY_FORMAT = 'dddd, MMMM DD YYYY'

export default class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.projectId,
            project: {},
            questionnaire: {},
            questionId: this.props.questionId,
            answers: [],
            isEmpty: false,
            title: 'Loading...'
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
    async componentDidMount() {
        const { hasLoaded } = this.props;
		hasLoaded();
    }
    async componentWillMount() {
		const { API, questionId, projectId, questionnaireId } = this.props;
		const project = await API.getProject(projectId);
        const answers = await API.getQuestion(projectId, questionId);
        const title = answers[0] ? answers[0].title : 'No questions had been found';

        const groupedAnswers = answers.reduce(
            (accum, currentAnswer) => {
                const day = dayjs(currentAnswer.created_at)
                const groupedByDay = day.format(DAY_FORMAT)
                const currentAnswers = accum[groupedByDay] || []
                currentAnswers.push(currentAnswer);
                accum[groupedByDay] = currentAnswers;
                return accum;
            }, 
            {}
        )
        

 		this.setState({ answers, groupedAnswers, title })
		setTimeout(this.reviewIfEmpty, API.WAITING_TIME_IN_MS);
	}
	reviewIfEmpty() {
	    const { answers } = this.state;
	    this.setState({ isEmpty: !answers.length > 0 })
	}
    render() {
        const { answers, groupedAnswers, isEmpty, title } = this.state;
        const today = dayjs().format(DAY_FORMAT)
        const { API } = this.props;
        return (
            <Page>
                <NavigationTitle top onClick={() => this.backToQuestionnaire()}><img src={leftCaret} />Back to questionnaire</NavigationTitle>
				<Title>{ title }</Title>
				<Grid>
        			<Inner>
        			<Cell desktopCols="12" tabletCols="8" phoneCols="4" align="middle">
        			    <CardWrapper center>
        			        {
        			            answers.length > 0 ?
        			            <Grid full>
        			                <CollapsableAnswers groupedAnswers={groupedAnswers} selectedAnswer={today} />
        			            </Grid> :
        			            isEmpty ?
        			            <CardHeader>
    							    <ProjectTitle>There are currently no answers for this questionnaire.</ProjectTitle>
    							    <p style={{ margin: '16px' }}>We couldn’t find any answers in this question, see another one.</p>
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
        		<NavigationTitle top onClick={() => this.backToQuestionnaire()}><img src={leftCaret} />Back to questionnaire</NavigationTitle>
        	</Page>
        )
    }
}