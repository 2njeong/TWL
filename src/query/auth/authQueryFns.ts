export const fetchCurrentUser = async () => {
  const response = await fetch('/auth/api');
  if (!response.ok) {
    throw new Error('UserData response was not ok');
  }
  return response.json();
};
