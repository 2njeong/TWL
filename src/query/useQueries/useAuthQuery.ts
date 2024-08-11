import { checkLoginAtom } from '@/atom/authAtom';
import { fetchAllUsers, fetchCurrentUser, fetchThatUser } from '@/query/auth/authQueryFns';
import { ALL_USERS_QUERY_KEY, CURRENT_USER_QUERY_KEY, THAT_USER_QUERY_KEY } from '@/query/auth/authQueryKeys';
import { Tables } from '@/type/database';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export const useFetchCurrentUser = () => {
  const queryClient = useQueryClient();
  const alreadyUserData = queryClient.getQueryData<Tables<'users'>>([CURRENT_USER_QUERY_KEY]);
  const [_, setIsLoggedIn] = useAtom(checkLoginAtom);

  const { data: userData, isLoading } = useQuery<Tables<'users'>>({
    queryKey: [CURRENT_USER_QUERY_KEY],
    queryFn: fetchCurrentUser,
    select: (data) => data as Tables<'users'>,
    retry: !!alreadyUserData ? 3 : 1
  });

  useEffect(() => {
    if (!isLoading && userData) {
      setIsLoggedIn(!!userData);
    }
  }, [isLoading, userData, setIsLoggedIn]);

  return { userData: alreadyUserData ?? userData, isLoading };
};

export const useFetchThatUser = (thatUser: string) => {
  const { data, isLoading: isThatUserLoading } = useQuery<Tables<'users'>[]>({
    queryKey: [THAT_USER_QUERY_KEY, thatUser],
    queryFn: () => fetchThatUser(thatUser),
    enabled: !!thatUser
  });

  const thatUserData = data ? data[0] : data;
  return { isThatUserLoading, thatUserData };
};

export const useFetchAllUsers = () => {
  const { data: allUsers, isLoading: allUsersLoading } = useQuery<Tables<'users'>[]>({
    queryKey: [ALL_USERS_QUERY_KEY],
    queryFn: fetchAllUsers
  });

  return { allUsersLoading, allUsers };
};
