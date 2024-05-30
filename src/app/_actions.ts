'use server';

export const addEntry = async (data: any) => {
  const { name, message } = Object.fromEntries(data);
};
