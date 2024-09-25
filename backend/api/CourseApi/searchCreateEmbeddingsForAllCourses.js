/* eslint-disable padded-blocks */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
import knex from '~/db/knex';
import createEmbedding from "~/services/createEmbedding";
import sanitizeHtml from 'sanitize-html';

const cleanHtml = (html) => {
  return sanitizeHtml(html, {
    allowedTags: [],
    allowedAttributes: {}
  });
};

const searchCreateEmbeddingsForAllCourses = async () => {
  const courses = await knex('course').select('id', 'title', 'description');
  const idAndText_s = await Promise.all(courses.slice(0, 1).map(async course => {
    const problems = await knex('problem').where('courseId', course.id).select('content');
    const title = cleanHtml(course.title);
    const description = cleanHtml(course.description);
    const problemContents = problems.map((problem) => cleanHtml(problem.content));
    return {
      id: course.id,
      text: `TITLE: ${title} DESCRIPTION: ${description} FLASHCARDS: ${problemContents.join('')}`
    };
  }));

  await Promise.all(idAndText_s.map(async (idAndText) => {
    const embedding = await createEmbedding({
      model: "text-embedding-ada-002",
      input: idAndText.text,
      encoding_format: "float",
    });
    await knex('course').where({ id: idAndText.id }).update({ embedding });
  }));
};

export default searchCreateEmbeddingsForAllCourses;
