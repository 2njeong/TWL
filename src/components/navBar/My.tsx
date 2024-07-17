'use client';

import { checkLoginAtom } from '@/atom/authAtom';
import { ZINDEX } from '@/constants/commonConstants';
import { useFetchCurrentUser } from '@/query/useQueries/useAuthQuery';
import { clientSupabase } from '@/supabase/client';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useState } from 'react';
import AvatarImage from '../member/information/AvatarImage';

const My = () => {
  const { isLoading, userData } = useFetchCurrentUser();
  const [isLoggedIn, _] = useAtom(checkLoginAtom);
  const [isMyListOpen, setMyListOpen] = useState(false);

  console.log('유저 =>', userData);

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

  const myList = [
    { text: '내스터디', func: openNewWindow },
    { text: '로그아웃', func: handleSignOut }
  ];

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
          <div className="my-2">
            <AvatarImage src={userData?.avatar} alt="current user Img" size="3" className="border-2" />
          </div>
          {isMyListOpen && (
            <div
              className={`w-28 h-22 bg-white rounded absolute top-full right-[-30%] flex flex-col justify-around gap-1 border rounded p-2 z-[${ZINDEX.navBarZ}]`}
            >
              {myList.map((item) => (
                <button key={item.text} onClick={item.func} className="rounded hover:bg-gray-100 p-1">
                  {item.text}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default My;
