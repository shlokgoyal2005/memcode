const createEmbedding = async (input) => {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPEANAI}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const json = await response.json();
  return json.data[0].embedding;
};

export default createEmbedding;
