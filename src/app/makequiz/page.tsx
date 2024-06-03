import Question from '@/components/makequiz/Question';
import SelectQuizType from '@/components/makequiz/SelectQuizType';

const MakeQuizPage = () => {
  return (
    <>
      <div className="flex flex-col items-center w-full h-screen p-8">
        <div className="w-full max-w-[1000px] relative">
          <SelectQuizType />
          <div className="w-full flex flex-col items-center p-8 absolute border-[6px] border-yelOne rounded-md">
            <Question />
          </div>
        </div>
      </div>
    </>
  );
};

export default MakeQuizPage;
