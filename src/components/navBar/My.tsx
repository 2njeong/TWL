'use client';

import { checkLoginAtom } from '@/atom/authAtom';
import { ZINDEX } from '@/constants/commonConstants';
import { useFetchCurrentUser } from '@/query/useQueries/useAuthQuery';
import { clientSupabase } from '@/supabase/client';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AvatarImage from '../member/information/AvatarImage';
import { openNewWindow } from '@/utils/utilFns';
import QuizCommentsAlarm from './QuizCommentsAlarm';
import { useQueryClient } from '@tanstack/react-query';
import { ALARM_QUIZ_COMMENTS_QUERY_KEY } from '@/query/alarm/alarmQueryKey';
import { useFetchQuizCommentsAlarms } from '@/query/useQueries/useAlarmQuery';

const My = () => {
  const [isLoggedIn, _] = useAtom(checkLoginAtom);
  const [isMyListOpen, setMyListOpen] = useState(false);
  const queryClient = useQueryClient();
  const { isLoading, userData } = useFetchCurrentUser();
  const { quizCommentsLoading, quizCommentsAlarms } = useFetchQuizCommentsAlarms(userData?.user_id);

  useEffect(() => {
    const channel = clientSupabase
      .channel('quizCommentsAlarm')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'comments' }, (payload) => {
        console.log('payload =>', payload);

        queryClient.invalidateQueries({
          queryKey: [ALARM_QUIZ_COMMENTS_QUERY_KEY]
        });
      })
      .subscribe();
    return () => {
      clientSupabase.removeChannel(channel);
    };
  }, []);

  const handleMouse = () => {
    setMyListOpen((prev) => !prev);
  };

  const handleTouchMove = (e: React.TouchEvent<Element>) => {
    if (e) {
      setMyListOpen(true);
    } else {
      setMyListOpen(false);
    }
  };

  const events = () => ({
    onMouseEnter: () => handleMouse(),
    onMouseLeave: () => handleMouse(),
    onTouchMove: (e: React.TouchEvent<Element>) => handleTouchMove(e)
  });

  const handleSignOut = async () => {
    const { error } = await clientSupabase.auth.signOut();
    if (error) throw new Error(error.message);
    location.replace('/auth');
  };

  const myList = [
    { text: '내스터디', func: () => openNewWindow(userData?.user_id) },
    { text: '로그아웃', func: handleSignOut }
  ];

  if (isLoading) return <div>...</div>;

  return (
    <section className="flex gap-4 items-center">
      <div className="flex items-center text-green-600 text-lg max-sm:hidden">
        <h2 className="font-semibold">T</h2>
        <h2>oday&nbsp;</h2>
        <h2 className="font-semibold">W</h2>
        <h2>e&nbsp;</h2>
        <h2 className="font-semibold">L</h2>
        <h2>earned</h2>
      </div>

      {!isLoggedIn && (
        <Link href="/auth" className="my-auto rounded-lg bg-green-300 hover:text-white px-2 py-1">
          로그인/회원가입
        </Link>
      )}
      {isLoggedIn && (
        <div {...events()} className="relative">
          <div className="my-2">
            <AvatarImage src={userData?.avatar} alt="current user Img" size="3" className="border-2" />
          </div>
          {isMyListOpen && (
            <div
              className={`w-72 h-22 bg-white rounded absolute top-full right-[-30%] flex flex-col gap-1 justify-around border rounded p-2`}
              style={{ zIndex: ZINDEX.navBarZ }}
            >
              {myList.map((item) => (
                <button key={item.text} onClick={item.func} className="rounded hover:bg-gray-100 p-1">
                  {item.text}
                </button>
              ))}
              <QuizCommentsAlarm quizCommentsLoading={quizCommentsLoading} quizCommentsAlarms={quizCommentsAlarms} />
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default My;
