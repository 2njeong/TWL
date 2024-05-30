import { addFireStore } from ' @/utils';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const abc = await req.json();
    const docRef = await addFireStore(abc);
    return Response.json(docRef);
  } catch (e) {
    throw new Error('fail to add a new item');
  }
};
