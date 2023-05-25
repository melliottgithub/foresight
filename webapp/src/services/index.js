const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const post = async (url, body) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    mode: 'cors'
  });
  return response.json();
}

export const Analyze = async (sequence) => {
  const response = await post(`${API_BASE_URL}/analyze`, { sequence });
  return response;
}
