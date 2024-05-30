// input 태그에 onChange customHook
export const handleOnchange = (formData: FormData, { target }: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = target;
  formData.append(name, value);
  console.log('a', formData.entries()); // FormData Iterator {}
  console.log('b', Object.fromEntries(formData)); // {1: '123'}
  console.log('c', Object.fromEntries(formData.entries())); // {1: '123'}
};
//   <input type="text" name="1" className="border" onChange={(e) => handleOnchange(formData, e)}></input>
