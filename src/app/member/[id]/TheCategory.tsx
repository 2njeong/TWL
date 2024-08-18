import { categoryAtom } from '@/atom/memberAtom';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import GuestBook from '@/components/member/guestbook/GuestBook';
import QuizListOfThatUser from '@/components/member/quiz/QuizListOfThatUser';
import Todolist from '@/components/member/todo/Todolist';

const AlgorithmWrapper = dynamic(() => import('@/components/member/algorithm/Algorithm'), { ssr: false });

const TheCategory = ({ id, categories }: { id: string; categories: string[] }) => {
  const [theCategory, _] = useAtom(categoryAtom);

  return (
    <section className="border-l-2 w-4/6 flex flex-col justify-around">
      <div className="w-full h-full overflow-y-auto px-4 py-2 flex flex-col">
        <h2 className="font-semibold text-2xl text-gray-400">
          {theCategory === categories[0]
            ? 'Question'
            : theCategory === categories[1]
            ? 'Algorithm'
            : theCategory === categories[3]
            ? 'GuestBook'
            : null}
        </h2>
        {theCategory === categories[0] ? (
          <QuizListOfThatUser id={id} />
        ) : theCategory === categories[1] ? (
          <AlgorithmWrapper id={id} />
        ) : theCategory === categories[2] ? (
          <Todolist id={id} />
        ) : theCategory === categories[3] ? (
          <GuestBook id={id} />
        ) : null}
      </div>
    </section>
  );
};

export default TheCategory;
