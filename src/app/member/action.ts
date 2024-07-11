'use server';

import { algorithmSchema, guestbookSchema, userInfoSchema } from '@/schema/memberSchema';
import { serverSupabase } from '@/supabase/server';
import { GuestBookObj, UserInfoOBJ } from '@/type/memberType';

const supabase = serverSupabase();

export const submitAlgorithm = async (user_id: string, content: string, data: FormData) => {
  const level = data.get('level');
  const title = data.get('title');
  const link = data.get('link');
  const newLearn = data.get('newLearn');
  const algorithmObj = { user_id, level, title, link, content, newLearn };

  const result = algorithmSchema.safeParse({ level, title, link, content });
  if (!result.success) {
    const errors = result.error.errors;
    return errors[0];
  }

  try {
    const { error } = await supabase.from('algorithm').insert(algorithmObj);
    if (error) throw new Error(error.message);
  } catch (e) {
    throw new Error(`fail to add new algorithm, ${e}`);
  }
};

const makeAvatarUrl = async (avatarFile: FormDataEntryValue, user_id: string | undefined) => {
  const uuid = crypto.randomUUID();
  const imgUrlPath = `avatar/${user_id}/${uuid}`;
  if (avatarFile instanceof File) {
    const { data: avatarUrlData, error } = await supabase.storage.from('avatar').upload(imgUrlPath, avatarFile, {
      cacheControl: '3600',
      upsert: true,
      contentType: avatarFile.type
    });
    if (error) {
      throw new Error(`fail to upload user avatar to storage, ${error.message}`);
    } else {
      const { data: avatarUrl } = await supabase.storage.from('avatar').getPublicUrl(avatarUrlData.path as string);
      return avatarUrl.publicUrl;
    }
  } else {
    return null;
  }
};

export const updateUserInfo = async (userInfoObj: UserInfoOBJ, data: FormData) => {
  const avatarFile = data.get('avatar');
  const { user_id, avatar, ...rest } = userInfoObj;
  const avatarUrl =
    avatarFile instanceof File && avatarFile.size > 0 ? await makeAvatarUrl(avatarFile, user_id) : avatar;
  const userObj = rest;
  const result = userInfoSchema.safeParse(userObj);
  if (!result.success) {
    const errors = result.error.errors;
    return errors[0];
  }
  try {
    const { error } = await supabase
      .from('users')
      .update({ avatar: avatarUrl, ...userObj })
      .eq('user_id', user_id);
    if (error) throw new Error(error.message);
  } catch (e) {
    throw new Error(`fail to update user Information, ${e}`);
  }
};

export const submitGuestBook = async (guestBookObj: GuestBookObj, data: FormData) => {
  const content = data.get('content');
  const result = guestbookSchema.safeParse({ content });
  if (!result.success) {
    const errors = result.error.errors;
    return errors[0];
  }

  try {
    const newGuestBookOnj = { ...guestBookObj, content };
    const { error } = await supabase.from('guestbook').insert(newGuestBookOnj);
    if (error) throw new Error(error.message);
  } catch (e) {
    throw new Error(`fail to insert guestbook, ${e}`);
  }
};
