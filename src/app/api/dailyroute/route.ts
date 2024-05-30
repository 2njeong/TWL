import { addFireStore } from ' @/utils';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const abc = await req.json();
    console.log('APIroute로 넘어온 값', abc);
    const docRef = await addFireStore(abc);
    console.log('docRef', docRef);
    return Response.json(docRef);
  } catch (e) {}
};
