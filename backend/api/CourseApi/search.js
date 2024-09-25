/* eslint-disable padded-blocks */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
import knex from '~/db/knex';
import CourseModel from '~/models/CourseModel';
import createEmbedding from "~/services/createEmbedding";

const cosineSimilarity = (A, B) => {
  const dotProduct = A.reduce((sum, a, i) => sum + a * B[i], 0);
  return dotProduct;
};

async function search(request, response) {
  const searchString = request.searchString;
  const searchStringEmbedding = (await createEmbedding({
    model: "text-embedding-ada-002",
    input: searchString,
    encoding_format: "float",
  })).data[0];

  const courses = await knex('course').select('id', 'embedding');

  const sortedCourses = courses
    .map((course) => ({
      id: course.id,
      similarity: cosineSimilarity(course.embedding, searchStringEmbedding)
    }))
    .sort((a, b) => b.similarity - a.similarity);

  const topCourseIds = sortedCourses.map((course) => course.id).join(', ');

  const coursesResponse = await CourseModel.select.allPublic({
    limit: 4,
    offset: 0,
    customWhere: `AND course.id IN (${topCourseIds})`
  });

  response.success(coursesResponse);
}

export default search;
