import Question from '@/components/makequiz/Question';
import ReturnQuizType from '@/components/makequiz/ReturnQuizType';
import SelectQuizType from '@/components/makequiz/SelectQuizType';
import { submitBtn } from '../action';

const MakeQuizPage = () => {
  return (
    <>
      <div className="flex flex-col items-center w-full h-screen p-8">
        <div className="w-full max-w-[1000px] relative">
          <SelectQuizType />
          <div className="w-full flex flex-col items-center p-8 absolute border-[6px] border-yelOne rounded-md">
            <form action={submitBtn} className="w-4/6 flex flex-col gap-6">
              <Question />
              <ReturnQuizType />
              <button>제출</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MakeQuizPage;
