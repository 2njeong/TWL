'use client';

import { addDoc, collection } from 'firebase/firestore';
import { FormEvent, useState, useTransition } from 'react';
import { db } from '../../firebase';
import { transitionAdd } from ' @/app/action';

const DailyClientComponent = ({ propServerAction }: { propServerAction: any }) => {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState('');

  const anotherSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const newFormData = new FormData(form);
    // console.log('newFormData', newFormData); // newFormData, FormData {}
    const something = Object.fromEntries(newFormData);
    console.log('something', something);
    form.reset();
    try {
      const response = await fetch('/api/dailyroute', {
        method: 'POST',
        body: JSON.stringify(something),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      console.log('응답결과', data);
      return data;
    } catch (e) {
      throw new Error('api로 fetch fail');
    }
  };

  const clientSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const newFormData = new FormData(form);
    const something = Object.fromEntries(newFormData);
    try {
      const docRef = await addDoc(collection(db, 'test'), something);
      console.log('Document written with ID: ', docRef.id);
      form.reset();
    } catch (e) {
      console.error(e);
    }
  };

  const handleOnChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setInput(value);
  };
  return (
    <>
      <div>
        <form onSubmit={anotherSubmit}>
          {/* <form action={testAction}> */}
          <h1>formData: </h1>
          {/* <input type="text" name="1" className="border" onChange={(e) => handleOnchange(formData, e)}></input> */}
          <input type="text" name="1" className="border"></input>
          {/* <input type="number" name="2" className="border" onChange={(e) => handleOnchange(formData, e)}></input> */}
          <input type="number" name="2" className="border"></input>
          <button className="border">send</button>
        </form>
      </div>
      <div>
        <form onSubmit={clientSubmit}>
          <h1>client Submit: </h1>
          <input type="text" name="3" className="border"></input>
          <input type="number" name="4" className="border"></input>
          <button className="border">send</button>
        </form>
      </div>

      <div>
        <button
          className={`border ${isPending ? 'opacity-30' : null}`}
          disabled={isPending}
          onClick={() => startTransition(() => transitionAdd('트랜지션?'))}
        >
          Transition
        </button>
      </div>

      <div>
        <input type="text" name="prop" className="border" onChange={handleOnChange}></input>
        <button className="border" onClick={async () => await propServerAction(input)}>
          Props
        </button>
      </div>
    </>
  );
};

export default DailyClientComponent;
