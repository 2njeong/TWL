import ReturnQuizType from '@/components/makequiz/ReturnQuizType';
import SelectInput from '@/components/makequiz/SelectInput';
import SelectQuizType from '@/components/makequiz/SelectQuizType';

const MakeQuizPage = () => {
  return (
    <>
      <div className="flex flex-col items-center w-full h-screen bg-gray-100 p-8">
        <div className="w-full max-w-[1000px] relative">
          <SelectQuizType />
          <div className="bg-beiOne w-full flex flex-col items-center p-2 absolute gap-2">
            <section>
              <input placeholder="질문"></input>
            </section>
            <ReturnQuizType />
          </div>
        </div>
      </div>
    </>
  );
};

export default MakeQuizPage;
