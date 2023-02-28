export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      access_type: {
        Row: {
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
        }
      }
      document: {
        Row: {
          content: string | null
          created_at: string | null
          id: number
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: number
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: number
        }
      }
      document_access_rights: {
        Row: {
          accessTypeId: number
          created_at: string | null
          documentId: number
          userId: string
        }
        Insert: {
          accessTypeId: number
          created_at?: string | null
          documentId: number
          userId: string
        }
        Update: {
          accessTypeId?: number
          created_at?: string | null
          documentId?: number
          userId?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
