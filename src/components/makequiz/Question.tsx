const Question = () => {
  return (
    <section className="flex gap-1">
      <h1 className="font-bold text-4xl text-beiOne">Q.</h1>
      <input placeholder="질문을 입력해주세요!" name="question" className="w-full"></input>
    </section>
  );
};

export default Question;
