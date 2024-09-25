import React from 'react';
import Main from '~/appComponents/Main';

import api from '~/api';

import Loading from '~/components/Loading';
import ListOfCourseCards from '~/appComponents/ListOfCourseCards';

import css from './index.css';


class Page_home extends React.Component {

  state = {
    speCourses: {},
    speSearch: {},
    searchString: ''
  }

  componentDidMount = () => {
    api.CourseApi.getBest4((spe) => this.setState({ speCourses: spe }));
  }

  onSearchSubmit = (event) => {
    event.preventDefault();
    api.CourseApi.search(
      (spe) => this.setState({ speSearch: spe }),
      { text: this.state.searchString }
    );
  }

  createAllEmbeddings = () => {
    api.CourseApi.searchCreateEmbeddingsForAllCourses();
  }

  handleSearchChange = (event) => {
    this.setState({ searchString: event.target.value });
  }

  render = () =>
    <Main className={css.main}>
      <div className="container">
        <div className="space"/>

        <section className="search">
          <form onSubmit={this.onSearchSubmit}>
            <input
              type="text"
              name="search"
              placeholder="Search courses..."
              value={this.state.searchString}
              onChange={this.handleSearchChange}
            />
            <button className="button" type="submit">Search</button>
          </form>

          <button className="button" type="button" onClick={this.createAllEmbeddings}>Create embeddings for all courses</button>
        </section>

        <Loading spe={this.state.speSearch}>{({ courses }) =>
          <ListOfCourseCards courseDtos={courses} type="simple"/>
        }</Loading>

        <section className="home-section">
          <h1>4 Best Courses Of The Month</h1>
          <Loading spe={this.state.speCourses}>{({ courses }) =>
            <ListOfCourseCards courseDtos={courses} type="simple"/>
          }</Loading>
        </section>

        <section className="home-section">
          <h1>Discover Newly Created Courses</h1>
          <Loading spe={this.state.speCourses}>{({ courses }) =>
            <ListOfCourseCards courseDtos={courses} type="simple"/>
          }</Loading>
        </section>

        <section className="home-section">
          <h1>Music</h1>
          <Loading spe={this.state.speCourses}>{({ courses }) =>
            <ListOfCourseCards courseDtos={courses} type="simple"/>
          }</Loading>
        </section>

        <section className="home-section">
          <h1>Physics</h1>
          <Loading spe={this.state.speCourses}>{({ courses }) =>
            <ListOfCourseCards courseDtos={courses} type="simple"/>
          }</Loading>
        </section>

        <section className="home-section">
          <h1>Mathematics</h1>
          <Loading spe={this.state.speCourses}>{({ courses }) =>
            <ListOfCourseCards courseDtos={courses} type="simple"/>
          }</Loading>
        </section>

      </div>
    </Main>
}

export default Page_home;
