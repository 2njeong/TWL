'use server';

import { quizCommentSchema, updateSchema } from '@/schema/quizSchema';
import { serverSupabase } from '@/supabase/server';
import { redirect } from 'next/navigation';

const supabase = serverSupabase();

export const submitQuizLike = async (quiz_id: string | undefined, user_id: string) => {
  const { error } = await supabase.rpc('user_id_to_quiz_like', { quiz_id, user_id });
  if (error) throw new Error(error.message);
};

export const handleQuizComment = async (
  data: FormData,
  quizCommentObj: { comment_creator: string | undefined; quiz_id: string | undefined; taggedUser: string[] }
) => {
  const { comment_creator, quiz_id, taggedUser } = quizCommentObj;
  const comment_content = data.get('comment_content');
  const { error: zodErr } = quizCommentSchema.safeParse({ comment_content });
  if (zodErr) {
    return { error: zodErr.format() };
  }
  const dbCommentObj = { comment_creator, quiz_id, comment_content, isDeleted: false, taggedUser };

  try {
    const { error } = await supabase.from('comments').insert(dbCommentObj);
    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
  } catch (e) {
    throw new Error(`fail to insert quiz comment, ${e}`);
  }
};

export const deleteItem = async (item: string, item_id: string) => {
  let tableName;
  let itemName;

  switch (item) {
    case 'quiz': {
      tableName = 'quiz';
      itemName = 'quiz_id';
      break;
    }
    case 'comments': {
      tableName = 'comments';
      itemName = 'comment_id';
      break;
    }
    case 'guestbook': {
      tableName = 'guestbook';
      itemName = 'guestbook_id';
      break;
    }
    case 'algorithm': {
      tableName = 'algorithm';
      itemName = 'algorithm_id';
      break;
    }
    default: {
      tableName = '';
      itemName = '';
    }
  }

  try {
    const { error } = await supabase.from(tableName).update({ isDeleted: true }).eq(itemName, item_id);
    if (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  } catch (e) {
    throw new Error(`fail to delete item, ${e}`);
  }
};

export const updateContent = async (updateObj: {
  item: string | undefined;
  item_id: string | undefined;
  updateItem: string | undefined;
  updatedContent: string[] | null;
}) => {
  const { item, item_id, updateItem, updatedContent } = updateObj;

  const result = updateSchema.safeParse({ updatedContent });
  if (!result.success) {
    const errors = result.error.errors;
    return errors[0];
  }

  try {
    switch (item) {
      case 'quiz': {
        const { error } = await supabase
          .from(item as string)
          .update({ answer: updatedContent })
          .eq(`${item}_id`, item_id);
        if (error) {
          console.error(error.message);
          throw new Error(error.message);
        }
        break;
      }
      case 'algorithm': {
        if (updateItem) {
          const { error } = await supabase
            .from(item as string)
            .update({ [updateItem]: updatedContent?.join() })
            .eq(`${item}_id`, item_id);
          if (error) {
            console.error(error.message);
            throw new Error(error.message);
          }
          break;
        }
      }
      default:
        return;
    }
  } catch (e) {
    throw new Error(`fail to update item, ${e}`);
  }
};
