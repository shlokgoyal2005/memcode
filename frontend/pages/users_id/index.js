import { Helmet } from 'react-helmet';
import withRouter from '~/components/withRouter';

import api from '~/api';
import capitalize from '~/services/capitalize';
import orFalse from '~/services/orFalse';

import Loading from '~/components/Loading';
import Main from '~/appComponents/Main';
import UserInfo from './components/UserInfo';
import Courses from './components/Courses';

import css from './index.css';

import withParams from '~/components/withParams';

@withParams
@withRouter
@connect(
  (state) => ({
    currentUser: state.global.Authentication.currentUser
  }),
)
class Page_users_id extends React.Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    currentUser: orFalse(PropTypes.object).isRequired,
  }

  state = {
    speGetPage: {}
  }

  componentDidMount = () => {
    this.apiGetPage();
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.params.id !== this.props.params.id) {
      this.apiGetPage();
    }
  }

  apiGetPage = () => {
    api.get.PageApi.getUserPage(
      (spe) => this.setState({ speGetPage: spe }),
      { userId: this.props.params.id }
    );
  }

  render = () =>
    <Main className={css.main}>
      <div className="space"/>

      <Loading spe={this.state.speGetPage}>{({ user, createdCourses }) =>
        <div className="container">
          <UserInfo speGetPage={this.state.speGetPage}/>

          <section className="created-courses">
            <h1 style={{ paddingLeft: 15 }}>Courses</h1>
            <Courses
              location={this.props.location}
              isCurrentUser={this.props.currentUser && this.props.currentUser.id.toString() === this.props.params.id}
              createdCourses={createdCourses}
            />
          </section>

          <Helmet>
            <title>{capitalize(user.username)}</title>
          </Helmet>
        </div>
      }</Loading>
    </Main>
}

export default Page_users_id;
