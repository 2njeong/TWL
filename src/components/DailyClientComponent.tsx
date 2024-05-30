'use client';

import { addDoc, collection } from 'firebase/firestore';
import { FormEvent, useRef, useState, useTransition } from 'react';
import { db } from '../../firebase';
import { serverAdd, transitionAdd } from ' @/app/action';
import { error } from 'console';
import { ValidationErr } from ' @/types/testType';

const DailyClientComponent = ({ propServerAction }: { propServerAction: any }) => {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState('');
  const [validationErr, setValidationErr] = useState<ValidationErr | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

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

  const serverActionWithZod = async (data: FormData) => {
    const result = await serverAdd(data);
    if (result?.error) {
      setValidationErr(result.error);
    } else {
      setValidationErr(null);
      formRef.current?.reset();
    }
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
        <form action={serverActionWithZod} ref={formRef} className="flex flex-col gap-2">
          <h1>server-action Imported with Zod: </h1>
          <input type="text" name="name" className="border"></input>
          {validationErr ? <p>{validationErr.name?._errors}</p> : null}
          <input type="number" name="message" className="border"></input>
          {validationErr ? <p>{validationErr.message?._errors}</p> : null}
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
