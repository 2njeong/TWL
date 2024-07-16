'use client';

import { ZINDEX } from '@/constants/commonConstants';

import Link from 'next/link';
import { useState } from 'react';
import My from './My';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const [quizDropOpen, setQuizDropOpen] = useState(false);
  const pathname = usePathname();
  const navBarList = [
    { href: '/', name: '홈' },
    // { href: '/', name: 'Team' },
    { href: '/', name: 'Quiz' },
    { href: 'algorithm', name: 'Algorithm' }
  ];
  const quizNavList = [
    { href: 'solve', name: '문제 풀기' },
    { href: 'makequiz', name: '문제 만들기' }
  ];

  const handleMouseEnter = (navName: string) => {
    if (navName === 'Quiz') setQuizDropOpen(true);
  };

  const handleMouseLeave = (navName: string) => {
    if (navName === 'Quiz') setQuizDropOpen(false);
  };

  const handleTouchMove = (e: React.TouchEvent<Element>) => {
    if (e) {
      setQuizDropOpen(true);
    } else {
      setQuizDropOpen(false);
    }
  };

  const events = (navName: string) => ({
    onMouseEnter: () => handleMouseEnter(navName),
    onMouseLeave: () => handleMouseLeave(navName),
    onTouchMove: (e: React.TouchEvent<Element>) => handleTouchMove(e)
  });

  if (pathname.startsWith('/member')) return null;

  return (
    <div className="flex justify-between items-center px-10 py-2">
      <section className="flex gap-8 items-center">
        {navBarList.map((nav) => {
          return (
            <div key={nav.name} {...events(nav.name)} className={`${nav.name === 'Quiz' ? 'relative' : ''}`}>
              <div className="my-2">
                <Link href={`/${nav.href}`} className={`${nav.name === 'Quiz' && 'pointer-events-none'}`}>
                  {nav.name}
                </Link>
              </div>
              {nav.name === 'Quiz' && quizDropOpen && (
                <div
                  className={`flex flex-col justify-between gap-1 absolute w-28 h-22 bg-white top-full left-[-90%] border p-2 rounded z-[${ZINDEX.navBarZ}]`}
                >
                  {quizNavList.map((item) => (
                    <Link
                      key={item.name}
                      href={`/quiz/${item.href}`}
                      className="hover:bg-gray-200 rounded p-1 flex items-center justify-center"
                      onClick={() => setQuizDropOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </section>
      <My />
    </div>
  );
};

export default NavBar;
