import SelectInput from ' @/components/makequiz/SelectInput';
import SelectKindOfQuiz from ' @/components/makequiz/SelectKindOfQuiz';

const MakeQuizPage = () => {
  return (
    <>
      <div className="flex flex-col items-center w-full h-screen bg-gray-100 p-8">
        <div className="w-full max-w-[1000px] relative">
          <SelectKindOfQuiz />
          <div className="bg-beiOne w-full flex flex-col items-center p-2 absolute gap-2">
            <section>
              <input placeholder="질문"></input>
            </section>
            <section>
              <SelectInput />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default MakeQuizPage;
