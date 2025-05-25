import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useEquipoStore = create((set, get) => ({
  equipo: null,
  jugadores: [],
  loading: false,
  error: null,

  setEquipo: (equipo) => set({ equipo }),
  setJugadores: (jugadores) => set({ jugadores }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  obtenerEquipo: async (usuarioId) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .rpc('obtener_equipo_usuario', { p_usuario_id: usuarioId });

      if (error) throw error;

      set({ equipo: data[0] });
      return { success: true, equipo: data[0] };
    } catch (error) {
      set({ error: error.message });
      return { success: false, error: error.message };
    } finally {
      set({ loading: false });
    }
  },

  crearEquipo: async (nombre, formacion, usuarioId) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('equipos_fantasy')
        .insert([
          {
            nombre,
            formacion,
            usuario_id: usuarioId
          }
        ])
        .select()
        .single();

      if (error) throw error;

      set({ equipo: data });
      return { success: true, equipo: data };
    } catch (error) {
      set({ error: error.message });
      return { success: false, error: error.message };
    } finally {
      set({ loading: false });
    }
  },

  agregarJugador: async (equipoId, jugadorData) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('jugadores_equipos')
        .insert([
          {
            equipo_fantasy_id: equipoId,
            ...jugadorData
          }
        ])
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        jugadores: [...state.jugadores, data]
      }));

      return { success: true, jugador: data };
    } catch (error) {
      set({ error: error.message });
      return { success: false, error: error.message };
    } finally {
      set({ loading: false });
    }
  },

  actualizarJugador: async (jugadorId, jugadorData) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('jugadores_equipos')
        .update(jugadorData)
        .eq('id', jugadorId)
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        jugadores: state.jugadores.map(j => 
          j.id === jugadorId ? data : j
        )
      }));

      return { success: true, jugador: data };
    } catch (error) {
      set({ error: error.message });
      return { success: false, error: error.message };
    } finally {
      set({ loading: false });
    }
  },

  eliminarJugador: async (jugadorId) => {
    try {
      set({ loading: true, error: null });
      
      const { error } = await supabase
        .from('jugadores_equipos')
        .delete()
        .eq('id', jugadorId);

      if (error) throw error;

      set(state => ({
        jugadores: state.jugadores.filter(j => j.id !== jugadorId)
      }));

      return { success: true };
    } catch (error) {
      set({ error: error.message });
      return { success: false, error: error.message };
    } finally {
      set({ loading: false });
    }
  },

  obtenerRanking: async () => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('ranking_actual')
        .select('*')
        .order('posicion_ranking', { ascending: true });

      if (error) throw error;

      return { success: true, ranking: data };
    } catch (error) {
      set({ error: error.message });
      return { success: false, error: error.message };
    } finally {
      set({ loading: false });
    }
  }
})); 