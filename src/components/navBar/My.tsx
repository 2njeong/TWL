'use client';

import { checkLoginAtom } from '@/atom/authAtom';
import { ZINDEX } from '@/constants/commonConstants';
import { useFetchCurrentUser } from '@/query/useQueries/useAuthQuery';
import { clientSupabase } from '@/supabase/client';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useState } from 'react';

const My = () => {
  const { isLoading, userData } = useFetchCurrentUser();
  const [isLoggedIn, _] = useAtom(checkLoginAtom);
  const [isMyListOpen, setMyListOpen] = useState(false);

  console.log('유저 =>', userData);

  const myList = [
    { href: '/', name: '내 스터디' },
    { href: `/guestbook/${userData?.user_id}`, name: '방명록' },
    { href: '/', name: '마이페이지' }
  ];

  const handleMouseEnter = () => {
    setMyListOpen(true);
  };

  const handleMouseLeave = () => {
    setMyListOpen(false);
  };

  const handleTouchMove = (e: React.TouchEvent<Element>) => {
    if (e) {
      setMyListOpen(true);
    } else {
      setMyListOpen(false);
    }
  };

  const events = () => ({
    onMouseEnter: () => handleMouseEnter(),
    onMouseLeave: () => handleMouseLeave(),
    onTouchMove: (e: React.TouchEvent<Element>) => handleTouchMove(e)
  });

  const handleSignOut = async () => {
    const supabase = clientSupabase();
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    location.replace('/auth');
  };

  const openNewWindow = () => {
    const features =
      'width=1400,height=800,resizable=yes,scrollbars=no,status=yes,toolbar=no,menubar=no,location=yes, noopener, noreferrer';
    window.open(`/member/${userData?.user_id}`, '_blank', features);
  };

  if (isLoading) return;

  return (
    <section className="flex gap-4">
      {!isLoggedIn && (
        <Link href="/auth" className="my-auto">
          로그인/회원가입
        </Link>
      )}
      {isLoggedIn && (
        <div {...events()} className="relative">
          <div className="w-8 h-8 rounded-full bg-gray-500 my-2"></div>
          {isMyListOpen && (
            <div
              className={`w-28 h-20 bg-white rounded absolute top-full right-[-30%] flex flex-col justify-around gap-1 border rounded px-3 py-2 z-[${ZINDEX.navBarZ}]`}
            >
              <button onClick={handleSignOut} className="rounded hover:bg-gray-200">
                로그아웃
              </button>
              <button onClick={openNewWindow} className="rounded hover:bg-gray-200">
                내 스터디
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default My;
