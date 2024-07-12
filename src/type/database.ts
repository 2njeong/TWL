export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      algorithm: {
        Row: {
          algorithm_id: string;
          content: string;
          created_at: string;
          creator: string;
          creator_avatar: string | null;
          creator_nickname: string | null;
          level: string;
          link: string;
          newLearn: string | null;
          title: string;
        };
        Insert: {
          algorithm_id?: string;
          content: string;
          created_at?: string;
          creator?: string;
          creator_avatar?: string | null;
          creator_nickname?: string | null;
          level: string;
          link: string;
          newLearn?: string | null;
          title: string;
        };
        Update: {
          algorithm_id?: string;
          content?: string;
          created_at?: string;
          creator?: string;
          creator_avatar?: string | null;
          creator_nickname?: string | null;
          level?: string;
          link?: string;
          newLearn?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'algorithm_creator_fkey';
            columns: ['creator'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['user_id'];
          }
        ];
      };
      comments: {
        Row: {
          comment_content: string | null;
          comment_creator: string;
          comment_id: string;
          created_at: string;
          isDeleted: boolean;
          quiz_id: string | null;
        };
        Insert: {
          comment_content?: string | null;
          comment_creator?: string;
          comment_id?: string;
          created_at?: string;
          isDeleted: boolean;
          quiz_id?: string | null;
        };
        Update: {
          comment_content?: string | null;
          comment_creator?: string;
          comment_id?: string;
          created_at?: string;
          isDeleted?: boolean;
          quiz_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'comments_quiz_id_fkey';
            columns: ['quiz_id'];
            isOneToOne: false;
            referencedRelation: 'quiz';
            referencedColumns: ['quiz_id'];
          }
        ];
      };
      guestbook: {
        Row: {
          allowShow: boolean;
          avatar: string;
          content: string;
          created_at: string;
          creator: string;
          guestbook_id: string;
          isDeleted: boolean;
        };
        Insert: {
          allowShow: boolean;
          avatar: string;
          content: string;
          created_at?: string;
          creator?: string;
          guestbook_id?: string;
          isDeleted?: boolean;
        };
        Update: {
          allowShow?: boolean;
          avatar?: string;
          content?: string;
          created_at?: string;
          creator?: string;
          guestbook_id?: string;
          isDeleted?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: 'guestbook_creator_fkey';
            columns: ['creator'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['user_id'];
          }
        ];
      };
      quiz: {
        Row: {
          answer: string[];
          candidates: string[] | null;
          content: string | null;
          created_at: string;
          creator: string;
          isSubjective: boolean;
          needHelp: boolean;
          question: string | null;
          quiz_id: string;
        };
        Insert: {
          answer: string[];
          candidates?: string[] | null;
          content?: string | null;
          created_at?: string;
          creator: string;
          isSubjective: boolean;
          needHelp: boolean;
          question?: string | null;
          quiz_id?: string;
        };
        Update: {
          answer?: string[];
          candidates?: string[] | null;
          content?: string | null;
          created_at?: string;
          creator?: string;
          isSubjective?: boolean;
          needHelp?: boolean;
          question?: string | null;
          quiz_id?: string;
        };
        Relationships: [];
      };
      quiz_like: {
        Row: {
          created_at: string;
          quiz_id: string;
          quiz_like_id: string;
          users: string[];
        };
        Insert: {
          created_at?: string;
          quiz_id: string;
          quiz_like_id?: string;
          users: string[];
        };
        Update: {
          created_at?: string;
          quiz_id?: string;
          quiz_like_id?: string;
          users?: string[];
        };
        Relationships: [
          {
            foreignKeyName: 'quiz_like_quiz_id_fkey';
            columns: ['quiz_id'];
            isOneToOne: true;
            referencedRelation: 'quiz';
            referencedColumns: ['quiz_id'];
          }
        ];
      };
      users: {
        Row: {
          allowshow: boolean;
          avatar: string | null;
          created_at: string;
          email: string;
          github: string | null;
          nickname: string | null;
          user_id: string;
        };
        Insert: {
          allowshow?: boolean;
          avatar?: string | null;
          created_at?: string;
          email: string;
          github?: string | null;
          nickname?: string | null;
          user_id: string;
        };
        Update: {
          allowshow?: boolean;
          avatar?: string | null;
          created_at?: string;
          email?: string;
          github?: string | null;
          nickname?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'users_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_top_likes_quizzes: {
        Args: {
          limit_value: number;
        };
        Returns: {
          quiz_id: string;
          question: string;
          issubjective: boolean;
          needhelp: boolean;
          creator: string;
          created_at: string;
          users: string[];
        }[];
      };
      user_id_to_quiz_like: {
        Args: {
          quiz_id: string;
          user_id: string;
        };
        Returns: {
          created_at: string;
          quiz_id: string;
          quiz_like_id: string;
          users: string[];
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
  ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;
