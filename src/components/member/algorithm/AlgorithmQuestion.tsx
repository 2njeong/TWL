const AlgorithmQuestion = ({ title, name, placeholder }: { title: string; name: string; placeholder: string }) => {
  return (
    <div className="flex gap-2">
      <h2>{title}: </h2>
      <input className={name === 'link' ? 'w-full' : ''} name={name} placeholder={placeholder}></input>
    </div>
  );
};

export default AlgorithmQuestion;
