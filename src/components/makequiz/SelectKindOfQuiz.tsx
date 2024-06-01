'use client';

const SelectKindOfQuiz = () => {
  return (
    <section className="w-full max-w-[1000px] flex justify-end absolute -top-5">
      <button className="bg-pinkOne rounded">객관식</button>
      <button className="bg-yelThree rounded">주관식</button>
    </section>
  );
};

export default SelectKindOfQuiz;
