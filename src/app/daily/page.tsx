import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { beforeFormServerAction, serverAdd } from '../action';
import DailyClientComponent from ' @/components/DailyClientComponent';

const DailyPage = async () => {
  const querySnapShot = await getDocs(collection(db, 'test'));
  const testList: any = [];
  querySnapShot.forEach((doc) => {
    testList.push({ id: doc.id, ...doc.data() });
  });

  const propServerAction = async () => {
    'use server';
    try {
      await addDoc(collection(db, 'props'), { name: 'props로 실행하기' });
    } catch (error) {
      throw new Error('props로 server-action Client한테 내리기 실패');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <DailyClientComponent propServerAction={propServerAction} />
      <div>
        <form action={serverAdd}>
          <h1>Server-action: </h1>
          <input type="text" name="name" className="border"></input>
          <input type="number" name="message" className="border"></input>
          <button className="border" formAction={beforeFormServerAction}>
            like
          </button>
          <button className="border" type="submit">
            send
          </button>
        </form>
      </div>
      {testList.map((t: any) => (
        <div key={t.id}>
          {t.name} : {t.message}
        </div>
      ))}
    </div>
  );
};

export default DailyPage;
