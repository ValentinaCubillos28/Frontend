import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: true,
  error: null,

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  signUp: async (email, password, username) => {
    try {
      set({ loading: true, error: null });
      console.log('Attempting sign up...', { email, username });
      
      // Registrar usuario en auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      // Crear perfil del usuario
      const { error: profileError } = await supabase
        .from('perfiles')
        .insert([
          {
            id: authData.user.id,
            nombre_usuario: username,
            email: email
          }
        ]);

      if (profileError) throw profileError;

      set({ user: authData.user, session: authData.session });
      return { success: true };
    } catch (error) {
      set({ error: error.message });
      return { success: false, error: error.message };
    } finally {
      set({ loading: false });
    }
  },

  signIn: async (email, password) => {
    try {
      set({ loading: true, error: null });
      console.log('Attempting sign in...', { email });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      set({ user: data.user, session: data.session });
      return { success: true };
    } catch (error) {
      set({ error: error.message });
      return { success: false, error: error.message };
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      set({ loading: true, error: null });
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      set({ user: null, session: null });
      return { success: true };
    } catch (error) {
      set({ error: error.message });
      return { success: false, error: error.message };
    } finally {
      set({ loading: false });
    }
  },

  checkSession: async () => {
    try {
      set({ loading: true, error: null });
      
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;

      if (session) {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        
        set({ user, session });
      } else {
        set({ user: null, session: null });
      }
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  }
})); 