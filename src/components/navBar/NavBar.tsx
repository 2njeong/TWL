'use client';

import { ZINDEX } from '@/constants/commonConstants';

import Link from 'next/link';
import { useState } from 'react';

const NavBar = () => {
  const navBarList = [
    { href: '/', name: '홈' },
    { href: '/', name: 'Quiz' },
    { href: '/', name: 'Algorithm' },
    { href: '/', name: 'Todo' }
  ];
  const quizNavList = [
    { href: 'solve', name: '문제 풀기' },
    { href: 'makequiz', name: '문제 만들기' }
  ];
  const [quizDropOpen, setQuizDropOpen] = useState(false);
  // console.log('quizDropOpen =>', quizDropOpen);

  const handleMouseEnter = () => {
    setQuizDropOpen(true);
  };

  const handleMouseLeave = () => {
    setQuizDropOpen(false);
  };

  return (
    <div className="flex gap-8">
      {navBarList.map((nav) => {
        return (
          <div
            key={nav.name}
            onMouseEnter={nav.name === 'Quiz' ? handleMouseEnter : undefined}
            onMouseLeave={nav.name === 'Quiz' ? handleMouseLeave : undefined}
            className={`${nav.name === 'Quiz' ? 'relative' : ''}`}
          >
            <Link href={`/${nav.href}`} className={`${nav.name === 'Quiz' && 'pointer-events-none'}`}>
              {nav.name}
            </Link>
            {nav.name === 'Quiz' && quizDropOpen ? (
              <div
                className={`flex flex-col gap-2 absolute w-32 h-20 bg-white top-full border p-2 rounded z-[${ZINDEX.navBarZ}]`}
              >
                {quizNavList.map((item) => (
                  <Link key={item.name} href={`/quiz/${item.href}`} className="hover:bg-gray-200 rounded">
                    {item.name}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default NavBar;
