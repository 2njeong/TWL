export type UserInfoOBJ = {
  avatar: string | undefined;
  user_id: string | undefined;
  nickname: string | null;
  github: string | null;
  email: string | null;
  allowshow: boolean;
};

export type GuestBookObj = {
  creator: string | undefined;
  avatar: string | null | undefined;
  allowShow: boolean;
};
