import { h, Component } from 'preact';
import { route } from 'preact-router';
import dayjs from 'dayjs';
import { Grid, Page, Inner, Cell } from '../../components/layout';
import { Title, ProjectTitle, NavigationTitle } from '../../components/typography';
import { CollapsableAnswers } from '../../components/collapse';
import { CardWrapper, CardHeader } from '../../components/card';
import leftCaret from '../../assets/svgs/icons/leftCaret.svg';
import rightCaret from '../../assets/svgs/icons/rightCaret.svg';
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
            pageNumber: this.props.pageNumber,
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
    loadPage({ type }) {
        const { projectId, questionnaireId, pageNumber, questionId } = this.props;
        /*
        * I usually dislike obscure code, but this one liner was just too tempting
        * to not have it. Pretty much we use the double bit-wise operator to ensure
        * we always get an integer or 0. Afterwards we increase it by one via the
        * ++ operator which we can’t use directly against the bitwise due it being
        * an invalid left-hand expression. Thus, we wrap it as a variable in a
        * annonymous function that we call immediately to get the evaluation.
        */
        const page = pageNumber ? ((pn) => type === 'next' ? ++pn : --pn)(~~pageNumber) : 2;
        route(`/project/${projectId}/questionnaire/${questionnaireId}/question/${questionId}?pageNumber=${page > 0 ? page : 1}`, true)
        this.loadData();
        this.hasLoaded();
    }
    async componentDidMount() {
        this.hasLoaded();
    }
    hasLoaded() {
        const { hasLoaded } = this.props;
		hasLoaded();
    }
    async loadData() {
        this.setState({ answers: [], isEmpty: false })
        const { API, questionId, projectId, pageNumber } = this.props;
		await API.getProject(projectId);
        const answers = await API.getQuestion(projectId, questionId, pageNumber);
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
    async componentWillMount() {
		this.loadData();
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
        			<Cell desktopCols="6" tabletCols="4" phoneCols="2" align="middle">
        			    <NavigationTitle top onClick={() => this.loadPage({ type: 'previous' })}><img src={leftCaret} />Previous page</NavigationTitle>
        			</Cell>
        			<Cell desktopCols="6" tabletCols="4" phoneCols="2" align="middle">
        			    <NavigationTitle rightCaret top onClick={() => this.loadPage({ type: 'next' })}>Next page<img src={rightCaret} /></NavigationTitle>
        			</Cell>
        			</Inner>
        		</Grid>
        		<NavigationTitle top onClick={() => this.backToQuestionnaire()}><img src={leftCaret} />Back to questionnaire</NavigationTitle>
        	</Page>
        )
    }
}