export const fetchThatUsersAlgorithm = async (thatUser: string | undefined) => {
  const response = await fetch(`/member/api?type=thatUsersAlgorithm&thatUser=${thatUser}`);
  if (!response.ok) {
    throw new Error('ThatUser_s algorithm response was not ok');
  }
  return response.json();
};
