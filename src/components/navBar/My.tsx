'use client';

import { ZINDEX } from '@/constants/commonConstants';
import { useFetchCurrentUser } from '@/customHooks/useQueries/useAuthQuery';
import { clientSupabase } from '@/supabase/client';
import Link from 'next/link';
import { useState } from 'react';

const My = () => {
  const { isLoggedIn } = useFetchCurrentUser();
  const [isMyListOpen, setMyListOpen] = useState(false);

  const myList = [
    { href: '/', name: '내 스터디' },
    { href: '/', name: '방명록' },
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
  };

  return (
    <section className="flex gap-8">
      {isLoggedIn ? (
        <button onClick={handleSignOut}>로그아웃</button>
      ) : (
        <Link href="/auth" className="my-auto">
          로그인/회원가입
        </Link>
      )}
      <div {...events()} className="relative">
        <div className="w-8 h-8 rounded-full bg-gray-500 my-2"></div>
        {isMyListOpen && (
          <div
            className={`w-28 h-32 bg-white rounded absolute top-full right-[-30%] flex flex-col gap-1 border rounded p-2 justify-between z-[${ZINDEX.navBarZ}]`}
          >
            {myList.map((my) => (
              <Link key={my.name} href={my.href} className="rounded p-1 hover:bg-gray-200" onClick={handleMouseLeave}>
                {my.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default My;
