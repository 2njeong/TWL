export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      algorithm: {
        Row: {
          algorithm_id: string;
          created_at: string;
          creator: string;
          explanation: string;
          isDeleted: boolean;
          level: string;
          link: string;
          newLearn: string;
          title: string;
        };
        Insert: {
          algorithm_id?: string;
          created_at?: string;
          creator?: string;
          explanation: string;
          isDeleted?: boolean;
          level: string;
          link: string;
          newLearn: string;
          title: string;
        };
        Update: {
          algorithm_id?: string;
          created_at?: string;
          creator?: string;
          explanation?: string;
          isDeleted?: boolean;
          level?: string;
          link?: string;
          newLearn?: string;
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
          read: boolean;
          taggedUser: string[];
        };
        Insert: {
          comment_content?: string | null;
          comment_creator?: string;
          comment_id?: string;
          created_at?: string;
          isDeleted: boolean;
          quiz_id?: string | null;
          read?: boolean;
          taggedUser?: string[];
        };
        Update: {
          comment_content?: string | null;
          comment_creator?: string;
          comment_id?: string;
          created_at?: string;
          isDeleted?: boolean;
          quiz_id?: string | null;
          read?: boolean;
          taggedUser?: string[];
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
          content: string;
          created_at: string;
          creator: string;
          dear: string;
          guestbook_id: string;
          isDeleted: boolean;
        };
        Insert: {
          allowShow: boolean;
          content: string;
          created_at?: string;
          creator?: string;
          dear: string;
          guestbook_id?: string;
          isDeleted?: boolean;
        };
        Update: {
          allowShow?: boolean;
          content?: string;
          created_at?: string;
          creator?: string;
          dear?: string;
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
          isDeleted: boolean;
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
          isDeleted?: boolean;
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
          isDeleted?: boolean;
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
      todolist: {
        Row: {
          created_at: string;
          done: boolean;
          isDeleted: boolean;
          todo_id: string;
          todo_item: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          done?: boolean;
          isDeleted?: boolean;
          todo_id?: string;
          todo_item: string;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          done?: boolean;
          isDeleted?: boolean;
          todo_id?: string;
          todo_item?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'todolist_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['user_id'];
          }
        ];
      };
      users: {
        Row: {
          allowshow: boolean;
          avatar: string | null;
          blog: string | null;
          created_at: string;
          email: string;
          github: string | null;
          nickname: string | null;
          user_id: string;
        };
        Insert: {
          allowshow?: boolean;
          avatar?: string | null;
          blog?: string | null;
          created_at?: string;
          email: string;
          github?: string | null;
          nickname?: string | null;
          user_id: string;
        };
        Update: {
          allowshow?: boolean;
          avatar?: string | null;
          blog?: string | null;
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
      get_7days_todolist: {
        Args: {
          kst_date: string;
          p_user_id: string;
        };
        Returns: {
          day: string;
          todos: Json;
        }[];
      };
      get_comments_with_users: {
        Args: {
          p_quiz_id: string;
          p_page: number;
          p_fetch_more_comments_num: number;
        };
        Returns: {
          comment_content: string;
          comment_creator: string;
          comment_id: string;
          created_at: string;
          isDeleted: boolean;
          quiz_id: string;
          user_id: string;
          avatar: string;
          nickname: string;
        }[];
      };
      get_guestbook: {
        Args: {
          that_user: string;
          is_deleted: boolean;
          offset_value: number;
          limit_value: number;
        };
        Returns: {
          allowShow: boolean;
          content: string;
          created_at: string;
          creator: string;
          dear: string;
          guestbook_id: string;
          isDeleted: boolean;
          avatar: string;
        }[];
      };
      get_recent_algorithms_with_user: {
        Args: {
          p_days_ago: unknown;
          p_limit: number;
        };
        Returns: {
          algorithm_id: string;
          creator: string;
          title: string;
          user_id: string;
          user_avatar: string;
          nickname: string;
        }[];
      };
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
      get_top_quizzes_with_comment_ids: {
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
          comment_ids: string[];
        }[];
      };
      get_unread_comments_by_quiz: {
        Args: {
          currentuserid: string;
        };
        Returns: {
          quiz_id: string;
          question: string;
          comments: Json;
        }[];
      };
      mark_comment_as_read: {
        Args: {
          p_comment_id: string;
        };
        Returns: undefined;
      };
      update_todolist: {
        Args: {
          todos: Json;
        };
        Returns: undefined;
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
