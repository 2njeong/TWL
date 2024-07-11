import GuestBookForm from './GuestBookForm';

const GuestBook = ({ id }: { id: string }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <GuestBookForm id={id} />
      <div></div>
    </div>
  );
};

export default GuestBook;
