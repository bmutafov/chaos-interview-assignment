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
      comment: {
        Row: {
          content: string | null
          created_at: string | null
          documentId: number
          id: number
          selectionEnd: number | null
          selectionStart: number | null
          userId: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          documentId: number
          id?: number
          selectionEnd?: number | null
          selectionStart?: number | null
          userId: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          documentId?: number
          id?: number
          selectionEnd?: number | null
          selectionStart?: number | null
          userId?: string
        }
      }
      document: {
        Row: {
          content: string | null
          created_at: string | null
          id: number
          title: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: number
          title?: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: number
          title?: string
        }
      }
      document_access_rights: {
        Row: {
          accessTypeId: number | null
          created_at: string | null
          documentId: number
          userId: string
        }
        Insert: {
          accessTypeId?: number | null
          created_at?: string | null
          documentId: number
          userId: string
        }
        Update: {
          accessTypeId?: number | null
          created_at?: string | null
          documentId?: number
          userId?: string
        }
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
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
