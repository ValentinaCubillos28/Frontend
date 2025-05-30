import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useAuthStore = create((set, get) => ({
  user: null,
  userError: null,
  session: null,
  loading: true,
  error: null,
  profile: null,
  profileLoading: true,
  profileError: null,

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  signUp: async (email, password, username) => {
    try {
      set({ loading: true, userError: null, profileError: null });
      console.log(`Attempting sign up for ${email} with username ${username}`);
      
      // Registrar usuario en auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      // Crear perfil del usuario - this might fail if RLS is not correctly set up to allow inserts for unauthenticated users
      // Or if schema doesn't match. We proceed with auth signup success even if profile creation fails for now.
      const { error: profileError } = await supabase
        .from('perfiles')
        .insert([
          {
            id: authData.user.id,
            nombre_usuario: username,
            email: email
          }
        ]);

      if (profileError) {
         // Handle profile creation error - maybe log it, but don't necessarily prevent returning success for auth sign-up
         console.error('Error creating user profile:', profileError);
         // Consider how to handle this - maybe delete the auth user? For now, just log.
      }

      // Check if email confirmation is required (based on Supabase settings)
      // If data.session is null, it usually means confirmation is needed.
      if (!authData.session) {
        console.log('Sign up successful, email confirmation required.');
        // No set user/session here, as user is not confirmed yet
        return { success: true, needsEmailVerification: true };
      } else {
        // User is automatically signed in (e.g., email confirmation is off)
        console.log('Sign up successful, user automatically signed in.');
        set({ user: authData.user, session: authData.session });
        await get().fetchProfile(authData.user.id);
        return { success: true, needsEmailVerification: false };
      }
    } catch (error) {
      console.error('Sign up failed:', error);
      set({ error: error.message });
      return { success: false, error: error.message };
    } finally {
      set({ loading: false });
    }
  },

  signIn: async (email, password) => {
    try {
      set({ loading: true, userError: null, profileError: null });
      console.log(`Attempting sign in for ${email}`);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log('signInWithPassword result:', { data, error });

      if (error) throw error;

      set({ user: data.user, session: data.session });
      await get().fetchProfile(data.user.id);
      console.log('Sign in successful. User set in store.');
      return { success: true };
    } catch (error) {
      console.error('Sign in failed:', error);
      set({ error: error.message });
      return { success: false, error: error.message };
    } finally {
      set({ loading: false });
      console.log('Sign in process finished. Loading state:', get().loading);
    }
  },

  signOut: async () => {
    try {
      set({ loading: true, error: null });
      console.log('Attempting sign out...');
      
      const { error } = await supabase.auth.signOut();
      console.log('supabase.auth.signOut result:', { error });
      if (error) throw error;

      set({ user: null, session: null });
      console.log('Sign out successful. User state after sign out:', get().user);
      return { success: true };
    } catch (error) {
      console.error('Sign out failed:', error);
      set({ error: error.message });
      return { success: false, error: error.message };
    } finally {
      set({ loading: false });
      console.log('Sign out process finished. Loading state:', get().loading);
    }
  },

  checkSession: async () => {
    try {
      set({ loading: true, error: null });
      console.log('checkSession started');
      
      const { data: { session }, error } = await supabase.auth.getSession();
      console.log('getSession result:', { session, error });

      if (error) {
        console.error('Error getting session:', error);
        throw error;
      }

      if (session) {
        console.log('Session found, getting user...');
        set({ user: session.user, userError: null });
        console.log('User and session set in store.');
        await get().fetchProfile(session.user.id);
      } else {
        set({ user: null, session: null });
        console.log('No active session found.');
      }
    } catch (error) {
      console.error('checkSession caught an error:', error);
      set({ error: error.message });
    } finally {
      set({ loading: false });
      console.log('checkSession finished. Loading state:', get().loading);
    }
  },

  fetchProfile: async (userId) => {
    if (!userId) {
      set({ profile: null, profileLoading: false, profileError: null });
      return;
    }

    set({ profileLoading: true, profileError: null });
    console.log(`Fetching profile for user ID: ${userId}`);

    const { data, error } = await supabase
      .from('perfiles')
      .select('nombre_usuario, email') // Ajusta los campos según tu tabla
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      set({ profile: null, profileError: error, profileLoading: false });
    } else {
      console.log('Profile fetched successfully:', data);
      set({ profile: data, profileError: null, profileLoading: false });
    }
  }
})); 