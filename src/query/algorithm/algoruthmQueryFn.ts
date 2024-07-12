export const fetchAlgorithm = async () => {
  const response = await fetch(`/algorithm/api`);
  if (!response.ok) {
    throw new Error('That quiz response was not ok');
  }
  return response.json();
};
