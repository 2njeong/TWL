'use client';

import { categoryAtom } from '@/atom/memberAtom';
import Algorithm from '@/components/member/algorithm/Algorithm';
import UserInfo from '@/components/member/information/UserInfo';
import { useFetchCurrentUser, useFetchThatUser } from '@/query/useQueries/useAuthQuery';
import { useAtom } from 'jotai';

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
      <div className="border w-full min-h-[600px] flex justify-between gap-2 relative">
        <UserInfo thatUserData={thatUserData} currentUser={userData} />
        <section className="border w-4/6 max-h-[600px] flex flex-col justify-around">
          {theCategory ? (
            <div className="h-full p-2 flex flex-col gap-2 justify-center">
              <div>{theCategory}</div>
              {theCategory === '질문' ? (
                <></>
              ) : theCategory === '알고리즘' ? (
                <Algorithm thatUserID={thatUserData?.user_id} currentUserID={userData?.user_id} />
              ) : theCategory === '방명록' ? (
                <>ddd</>
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
