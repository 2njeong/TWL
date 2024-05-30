'use client';

import { useOptimistic } from 'react';

const UseOptimistic = ({
  msg,
  serverActionWithUseOptimistic
}: {
  msg: { text: string | unknown; sending: boolean }[];
  serverActionWithUseOptimistic: (formData: FormData) => Promise<void>;
}) => {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(msg, (state, newMessage) => [
    ...state,
    {
      text: newMessage,
      sending: true
    }
  ]);
  console.log('optimisticMessages =>', optimisticMessages);
  console.log('msg =>', msg);
  const action = async (formData: FormData) => {
    addOptimisticMessage(formData.get('name'));
    await serverActionWithUseOptimistic(formData);
  };

  return (
    <div className="border-4 py-4 px-4">
      <form action={action} className="flex flex-col gap-2">
        <h1>Optimistic Server-action : </h1>
        <input type="text" name="name" className="border"></input>
        <input type="number" name="message" className="border"></input>
        <button className="border">send</button>
      </form>

      {optimisticMessages.map((message: any, index) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small> (Sending...)</small>}
        </div>
      ))}
    </div>
  );
};

export default UseOptimistic;
