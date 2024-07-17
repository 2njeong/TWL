'use client';

import { ZINDEX } from '@/constants/commonConstants';

import Link from 'next/link';
import { useState } from 'react';
import My from './My';
import { usePathname } from 'next/navigation';
import { TbChristmasBall, TbChristmasTree } from 'react-icons/tb';
import { HiOutlineHome } from 'react-icons/hi';

const NavBar = () => {
  const [quizDropOpen, setQuizDropOpen] = useState(false);
  const pathname = usePathname();
  const navBarList = [
    { href: '/', name: 'Home', icon: <HiOutlineHome className="text-blue-900" /> },
    { href: '/', name: 'Quiz', icon: <TbChristmasBall className="text-red-500" /> },
    { href: 'algorithm', name: 'Algorithm', icon: <TbChristmasTree className="text-green-500" /> }
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
    <div className="flex justify-between items-center max-sm:px-6 px-10 py-2 min-h-[5rem]">
      <section className="flex max-sm:gap-4 gap-8 items-center">
        {navBarList.map((nav) => {
          return (
            <div key={nav.name} {...events(nav.name)} className={`${nav.name === 'Quiz' ? 'relative' : ''}`}>
              <div className="my-2">
                <Link
                  href={`/${nav.href}`}
                  className={`${
                    nav.name === 'Quiz' && 'pointer-events-none'
                  } text-lg hover:text-gray-500 flex items-center gap-0.5`}
                >
                  {nav.name}
                  {nav.icon}
                </Link>
              </div>
              {nav.name === 'Quiz' && quizDropOpen && (
                <div
                  className={`flex flex-col justify-between gap-1 absolute w-28 h-22 bg-white top-full left-[-50%] border p-2 rounded z-[${ZINDEX.navBarZ}]`}
                >
                  {quizNavList.map((item) => (
                    <Link
                      key={item.name}
                      href={`/quiz/${item.href}`}
                      className="hover:bg-gray-100 rounded p-1 flex items-center justify-center"
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
