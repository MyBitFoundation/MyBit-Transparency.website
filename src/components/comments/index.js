import { h, Component } from 'preact';
import Dialog from 'preact-material-components/Dialog';
import 'preact-material-components/Dialog/style.css';
import { Figure } from '../figure';
import styled from 'styled-components';
import { 
  NavigationTitle,
  CommentWrapper,
  CommentTitle,
  CommentContentWrapper
} from '../typography';


const Body = styled(Dialog.Body)`
  &.mdc-dialog__body {
    max-height: 60vh;  
  }
`

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    }
    this.loadComment = this.loadComment.bind(this);
  }
  async loadComment(commentId) {
    this.setState({ comments: [] });
    const { API, projectId } = this.props;
    const comments = await API.getComments(projectId, commentId);
    this.setState({ comments })
  }
  render() {
    const { comments_count, id } = this.props;
    const { comments } = this.state;
    return (
      <div>
        {
          comments_count > 0 && 
          <NavigationTitle noMargin left onClick={()=>{
              this.loadComment(id);
              this.scrollingDlg.MDComponent.show();
          }}>
             { comments_count } comments
          </NavigationTitle>
        }
        <Dialog ref={ scrollingDlg => this.scrollingDlg = scrollingDlg }>
          <Dialog.Header>Comments</Dialog.Header>
          <Body scrollable={true}>
            <div>
            {
                comments.length > 0 ?
                comments.map( comment => (
                    <CommentWrapper>
                        <CommentTitle style={{ alignSelf: 'flex-start' }}>
                            <Figure creator={comment.creator} time={comment.created_at} />
                        </CommentTitle>
                        <CommentContentWrapper dangerouslySetInnerHTML={{ __html:comment.content }}/>
                    </CommentWrapper>
                  )) :
                <p>Loading...</p>
            }
            </div>
          </Body>
          <Dialog.Footer>
            <Dialog.FooterButton accept={true}>Close</Dialog.FooterButton>
          </Dialog.Footer>
        </Dialog>
      </div>
    )}
}