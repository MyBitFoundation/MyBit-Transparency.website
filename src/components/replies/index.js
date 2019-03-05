import { h, Component } from 'preact';
import Dialog from 'preact-material-components/Dialog';
import 'preact-material-components/Dialog/style.css';
import { Figure } from '../figure';
import { 
  NavigationTitle,
  CommentWrapper,
  CommentTitle,
  CommentContentWrapper
} from '../typography';

export default class Replies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replies: [],
    }
    this.loadReply = this.loadReply.bind(this);
  }
  async loadReply(commentId) {
    this.setState({ replies: [] });
    const { API, projectId } = this.props;
    const replies = await API.getReplies(projectId, replies);
    this.setState({ replies })
  }
  render() {
    const { replies_count, id } = this.props;
    const { replies } = this.state;
    return (
      <div>
        {
          replies_count > 0 && 
          <NavigationTitle noMargin left onClick={()=>{
              this.loadReply(id);
              this.scrollingDlg.MDComponent.show();
          }}>
             { replies_count } replies
          </NavigationTitle>
        }
        <Dialog ref={ scrollingDlg => this.scrollingDlg = scrollingDlg }>
          <Dialog.Header>Replies</Dialog.Header>
          <Dialog.Body scrollable={true}>
            <div>
            {
                replies.length > 0 ?
                replies.map( reply => (
                    <CommentWrapper>
                        <CommentTitle>
                            <Figure creator={reply.creator} />
                        </CommentTitle>
                        <CommentContentWrapper dangerouslySetInnerHTML={{ __html:reply.content }}/>
                    </CommentWrapper>
                )) :
                <p>Loading...</p>
            }
            </div>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.FooterButton accept={true}>Close</Dialog.FooterButton>
          </Dialog.Footer>
        </Dialog>
      </div>
    )}
}