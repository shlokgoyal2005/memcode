import orFalse from '~/services/orFalse';

import Main from '~/appComponents/Main';
import CourseActions from '~/components/CourseActions';

// import css from './index.css';
import MyDuck from '~/ducks/MyDuck';

@connect(
  (state, ownProps) => {
    return {
      courseId: Number.parseInt(ownProps.match.params.id),
      My: state.global.My,
      currentUser: state.global.Authentication.currentUser || false,
    };
  },
  (dispatch, ownProps) => ({
    // getPage: (courseId) => dispatch(
    //   actions.getPage(courseId, ownProps.simulated, ownProps.persistent)
    // ),

    MyActions: dispatch(MyDuck.getActions),
  })
)
class Page_courses_id_story extends React.Component {
  static propTypes = {
    courseId: PropTypes.number.isRequired,
    getPage: PropTypes.func.isRequired,
    speGetPage: PropTypes.object.isRequired,
    MyActions: PropTypes.object.isRequired,
    My: PropTypes.object.isRequired,
    currentUser: orFalse(PropTypes.object).isRequired,
  }

  componentDidMount() {
    // this.props.getPage(this.props.courseId);
    this.props.MyActions.apiGetCourseForActions(this.props.courseId);
  }

  render = () =>
    <Main>
      <CourseActions
        courseId={this.props.courseId}
        currentUser={this.props.currentUser}
        type="review"
        My={this.props.My}
        MyActions={this.props.MyActions}
      />

      <button onClick={() => console.log(this.props.My)}>
        Log My
      </button>

    </Main>
}

export default Page_courses_id_story;
