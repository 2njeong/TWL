'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

const QuizSearch = () => {
  const router = useRouter();
  const [searchMode, setSearchMode] = useState(false);
  const searchRef = useRef<HTMLFormElement | null>(null);

  const searchQuiz = (data: FormData) => {
    setSearchMode((prev) => !prev);
    if (!searchMode) {
      const searchItem = data.get('search');
      router.push(`/quiz/solve?q=${searchItem}`);
    } else {
      router.push(`/quiz/solve`);
      searchRef.current?.reset();
    }
  };

  return (
    <form className="border w-full flex items-center gap-4 px-4 py-2" action={searchQuiz} ref={searchRef}>
      <input className="w-full border-b border-red-500 focus:outline-none autofocus" name="search"></input>
      <button className="w-20 border">{searchMode ? '검색취소' : '검색'}</button>
    </form>
  );
};

export default QuizSearch;
