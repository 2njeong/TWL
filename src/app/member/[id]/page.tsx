'use client';

import { categoryAtom } from '@/atom/memberAtom';
import Algorithm from '@/components/member/algorithm/Algorithm';
import GuestBook from '@/components/member/guestbook/GuestBook';
import UserInfo from '@/components/member/information/UserInfo';
import QuizListOfThatUser from '@/components/member/quiz/QuizListOfThatUser';
import { useFetchCurrentUser, useFetchThatUser } from '@/query/useQueries/useAuthQuery';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';

const AlgorithmWrapper = dynamic(() => import('@/components/member/algorithm/Algorithm'), { ssr: false });

const MemberPage = ({ params: { id } }: { params: { id: string } }) => {
  const { isThatUserLoading, thatUserData } = useFetchThatUser(id);
  const { isLoading, userData } = useFetchCurrentUser();
  const [theCategory, setTheCategory] = useAtom(categoryAtom);

  const categories = ['질문', '알고리즘', '방명록'];

  const handleCategory = (category: string) => {
    setTheCategory(category);
  };

  // console.log('theCategory =>', theCategory);

  if (isThatUserLoading || isLoading) return <>로딩중..</>;
  return (
    <>
      <div className="border w-full min-h-[550px] flex justify-between gap-2 relative">
        <section className="border w-2/6 flex flex-col justify-around items-center p-2">
          <UserInfo thatUserData={thatUserData} currentUser={userData} />
        </section>

        <section className="border w-4/6 flex flex-col justify-around">
          {theCategory ? (
            <div className="w-full h-full overflow-y-auto p-2 flex flex-col gap-2">
              <div>{theCategory}</div>
              {theCategory === '질문' ? (
                <QuizListOfThatUser id={id} />
              ) : theCategory === '알고리즘' ? (
                <AlgorithmWrapper id={id} />
              ) : theCategory === '방명록' ? (
                <GuestBook id={id} />
              ) : (
                <></>
              )}
            </div>
          ) : (
            categories.map((cate) => (
              <div key={cate} className="border">
                {cate}
                <div>내용</div>
              </div>
            ))
          )}
        </section>

        <div className="flex flex-col absolute top-0 right-0 transform translate-x-full">
          {categories.map((cate) => (
            <button key={cate} className="border" onClick={() => handleCategory(cate)}>
              {cate}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default MemberPage;
