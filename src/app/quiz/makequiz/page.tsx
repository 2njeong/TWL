import MakeQuiz from '@/components/makequiz/MakeQuiz';
import SelectQuizType from '@/components/makequiz/SelectQuizType';

const MakeQuizPage = () => {
  return (
    <div className="flex flex-col items-center w-full h-full p-8">
      <div className="relative w-full flex flex-col items-center py-8 absolute border-4 border-gray-100 rounded-md">
        <SelectQuizType />
        <MakeQuiz />
      </div>
    </div>
  );
};

export default MakeQuizPage;
