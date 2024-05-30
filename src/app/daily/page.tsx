import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import { beforeFormServerAction, serverAdd } from '../action';
import DailyClientComponent from ' @/components/DailyClientComponent';
import { revalidatePath } from 'next/cache';
import SubmitBtn from ' @/components/SubmitBtn';

const DailyPage = async () => {
  const querySnapShot = await getDocs(collection(db, 'test'));
  const testList: any = [];
  querySnapShot.forEach((doc) => {
    testList.push({ id: doc.id, ...doc.data() });
  });

  const propsSnapShot = await getDocs(collection(db, 'props'));
  const propsList: any = [];
  propsSnapShot.forEach((p) => propsList.push({ id: p.id, ...p.data() }));

  const propServerAction = async (data: string) => {
    'use server';
    try {
      await addDoc(collection(db, 'props'), { name: data });
    } catch (error) {
      throw new Error('props로 server-action Client한테 내리기 실패');
    }
    revalidatePath('/daily');
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
      <DailyClientComponent propServerAction={propServerAction} />
      <div className="border-4 py-4 px-4">
        <form action={serverAdd}>
          <h1>Server-action: </h1>
          <input type="text" name="name" className="border"></input>
          <input type="number" name="message" className="border"></input>
          <button className="border" formAction={beforeFormServerAction}>
            like
          </button>
          {/* <button className="border" type="submit">
            send
          </button> */}
          <SubmitBtn />
        </form>
      </div>
      {testList.map((t: any) => (
        <div key={t.id}>
          {t.name} : {t.message}
        </div>
      ))}
      {propsList.map((p: any) => (
        <div key={p.id}>name: {p.name}</div>
      ))}
    </div>
  );
};

export default DailyPage;
