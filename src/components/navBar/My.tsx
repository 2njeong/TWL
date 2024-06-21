'use client';

import { ZINDEX } from '@/constants/commonConstants';
import Link from 'next/link';
import { useState } from 'react';

const My = () => {
  const [isMyListOpen, setMyListOpen] = useState(false);
  console.log('isMyListOpen =>', isMyListOpen);

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

  return (
    <section className="flex gap-8">
      <div className="flex items-center">
        <Link href="/auth">로그인/회원가입</Link>
      </div>

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
