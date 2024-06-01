import SelectInput from ' @/components/makequiz/SelectInput';

const MakeQuizPage = () => {
  return (
    <>
      <div className="flex flex-col items-center w-full h-screen bg-gray-100 p-8">
        <div className="w-full max-w-[1000px] relative">
          <section className="w-full max-w-[1000px] flex justify-end absolute -top-5">
            <button className="bg-pinkOne rounded">객관식</button>
            <button className="bg-yelThree rounded">주관식</button>
          </section>
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
