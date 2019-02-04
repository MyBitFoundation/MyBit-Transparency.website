import { h, Component } from 'preact';
import { Cell, DescriptionWrapper, Inner } from '../layout';
import { ComponentTitle, Subline, ColoredIcon, ProfileTitle } from '../typography';
import { Figure } from '../figure';
import styled from 'styled-components';

const HideableCell = styled(Cell)`
  ${ props => props.hidden && 'display: none;' }
  padding: 0;
`

const SelectableCell = styled(Cell)`
  padding-top: 0;
  padding-bottom: 0;
`

export class CollapsableAnswers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAnswer: this.props.selectedAnswer
    }
    this.selectAnswer = this.selectAnswer.bind(this);
  }
  selectAnswer(selectedAnswer) {
    const currentAnswer = this.state.selectedAnswer;
    this.setState({ selectedAnswer: currentAnswer === selectedAnswer ? null : selectedAnswer })
  }
  render() {
    const { groupedAnswers } = this.props;
    const { selectedAnswer } = this.state;
    const isDaySelectedAnswer = (day) => day !== selectedAnswer;
    console.log('[ CollapsableAnswers ] render - selectedAnswer', selectedAnswer);
    const rendereableAnswers = (groupedAnswers) =>
      (
        Object.keys(groupedAnswers).map( day =>
        <SelectableCell
          desktopCols="12"
          tabletCols="8"
          phoneCols="4"
          align="middle"
          padded left
          onClick={() => this.selectAnswer(day)}
          style={{ cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <ComponentTitle>
              { day }
            </ComponentTitle>
            <ColoredIcon>
            { isDaySelectedAnswer(day) ? 'keyboard_arrow_right' : 'keyboard_arrow_down' }
            </ColoredIcon>
          </div>
          {
              groupedAnswers[day].map( component => (
                  <HideableCell 
                    desktopCols="12"
                    tabletCols="8"
                    phoneCols="4"
                    align="middle"
                    padded
                    left
                    hidden={ isDaySelectedAnswer(day) }
                  >
                      <ProfileTitle>
                          <Figure creator={component.creator} />
                          <Subline>{ component.group_on }</Subline>
                      </ProfileTitle>
                      <DescriptionWrapper dangerouslySetInnerHTML={{ __html:component.content }}/>
                      <br/>
                  </HideableCell>
              ))
          }
        </SelectableCell>
      )
	  )
	  return (
	    <Inner>
	    { rendereableAnswers(groupedAnswers) }
  	  </Inner>
  	)
  }
}

