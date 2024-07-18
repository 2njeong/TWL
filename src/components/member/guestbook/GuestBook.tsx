import GuestBookForm from './GuestBookForm';
import GuestBookList from './GuestBookList';

const GuestBook = ({ id }: { id: string }) => {
  return (
    <div className="w-full h-full max-h-[90%] flex flex-col items-center gap-3 mt-3">
      <GuestBookForm id={id} />
      <GuestBookList id={id} />
    </div>
  );
};

export default GuestBook;
