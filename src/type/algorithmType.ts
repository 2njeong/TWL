import { Tables } from './database';

type PickedAlgorithm = Pick<Tables<'algorithm'>, 'algorithm_id' | 'title' | 'creator'>;
export type Ball = PickedAlgorithm & { user_id: string; user_avatar: string | null; nickname: string };
