'use client';

import { categoryAtom } from '@/atom/memberAtom';
import { useAtom } from 'jotai';

const MemberPage = ({ params: { id } }: { params: { id: string } }) => {
  const categories = ['질문', '알고리즘', '방명록'];
  const [theCategory, setTheCategory] = useAtom(categoryAtom);

  const handleCategory = (category: string) => {
    setTheCategory(category);
  };

  // console.log('theCategory =>', theCategory);

  return (
    <>
      <div className="border w-full min-h-[540px] flex justify-between gap-2 relative">
        <section className="border w-2/6 flex flex-col gap-3 justify-around items-center p-2">
          <div className="h-3/6 border flex items-center">
            <div className="w-40 h-40 rounded-full bg-gray-200">avatar</div>
          </div>
          <div className="h-3/6 flex flex-col gap-2 border justify-center">
            <p>nicname</p>
            <p>Github</p>
            <p>e-mail</p>
          </div>
        </section>

        <section className="border w-4/6 flex flex-col justify-around">
          {theCategory ? (
            <div>{theCategory}</div>
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
