export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      quiz: {
        Row: {
          answer: string[];
          candidates: string[];
          created_at: string;
          creator: string;
          isSubjective: boolean;
          needHelp: boolean;
          question: string | null;
          quiz_id: string;
        };
        Insert: {
          answer: string[];
          candidates: string[];
          created_at?: string;
          creator: string;
          isSubjective: boolean;
          needHelp: boolean;
          question?: string | null;
          quiz_id?: string;
        };
        Update: {
          answer?: string[];
          candidates?: string[];
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
          users: string[] | null;
        };
        Insert: {
          created_at?: string;
          quiz_id: string;
          quiz_like_id?: string;
          users?: string[] | null;
        };
        Update: {
          created_at?: string;
          quiz_id?: string;
          quiz_like_id?: string;
          users?: string[] | null;
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
          avatar: string | null;
          created_at: string;
          email: string;
          github: string | null;
          nickname: string | null;
          user_id: string;
        };
        Insert: {
          avatar?: string | null;
          created_at?: string;
          email: string;
          github?: string | null;
          nickname?: string | null;
          user_id: string;
        };
        Update: {
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
      user_id_to_quiz_like: {
        Args: {
          quiz_id: string;
          user_id: string;
        };
        Returns: {
          created_at: string;
          quiz_id: string;
          quiz_like_id: string;
          users: string[] | null;
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
