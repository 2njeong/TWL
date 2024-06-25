const QuizComments = () => {
  return (
    <div className="w-full flex flex-col items-center p-2">
      <h1>Comments()</h1>
      <form className="w-11/12 border h-auto flex gap-4 items-center p-4">
        <div className="w-14 h-14 rounded-full bg-gray-300"></div>
        <textarea className="w-full border-b focus:outline-none"></textarea>
      </form>
      <div>댓글 나열</div>
    </div>
  );
};

export default QuizComments;
