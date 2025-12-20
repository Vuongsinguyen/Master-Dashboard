import { createClient } from '@supabase/supabase-js';

// Try to import Supabase config, fallback to template values if not configured
let SUPABASE_URL, SUPABASE_ANON_KEY;
try {
  const config = await import('../config/supabase.js');
  SUPABASE_URL = config.SUPABASE_URL;
  SUPABASE_ANON_KEY = config.SUPABASE_ANON_KEY;
} catch (error) {
  // Use placeholder values if config not set up
  SUPABASE_URL = 'https://placeholder.supabase.co';
  SUPABASE_ANON_KEY = 'placeholder-key';
}

class DatabaseService {
  constructor() {
    if (SUPABASE_URL === 'https://placeholder.supabase.co') {
      console.warn('Supabase not configured. Please set up your Supabase project and update src/js/config/supabase.js');
      this.supabase = null;
    } else {
      this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
  }

  // Tasks operations
  async getTasks() {
    if (!this.supabase) {
      console.warn('Supabase not configured, returning empty tasks');
      return [];
    }

    const { data, error } = await this.supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async saveTask(task) {
    if (!this.supabase) {
      console.warn('Supabase not configured, cannot save task');
      return task;
    }

    const { data, error } = await this.supabase
      .from('tasks')
      .upsert(task)
      .select();

    if (error) throw error;
    return data[0];
  }

  async deleteTask(taskId) {
    if (!this.supabase) {
      console.warn('Supabase not configured, cannot delete task');
      return;
    }

    const { error } = await this.supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);

    if (error) throw error;
  }

  // Feedback operations
  async getFeedbacks() {
    if (!this.supabase) {
      console.warn('Supabase not configured, returning empty feedbacks');
      return [];
    }

    const { data, error } = await this.supabase
      .from('feedbacks')
      .select('*')
      .order('submit_time', { ascending: false });

    if (error) throw error;
    return data;
  }

  async saveFeedback(feedback) {
    if (!this.supabase) {
      console.warn('Supabase not configured, cannot save feedback');
      return feedback;
    }

    const { data, error } = await this.supabase
      .from('feedbacks')
      .upsert(feedback)
      .select();

    if (error) throw error;
    return data[0];
  }

  // User preferences/settings
  async getUserSettings(userId) {
    if (!this.supabase) {
      console.warn('Supabase not configured, returning empty settings');
      return {};
    }

    const { data, error } = await this.supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
    return data;
  }

  async saveUserSettings(userId, settings) {
    if (!this.supabase) {
      console.warn('Supabase not configured, cannot save settings');
      return settings;
    }

    const { data, error } = await this.supabase
      .from('user_settings')
      .upsert({ user_id: userId, ...settings })
      .select();

    if (error) throw error;
    return data[0];
  }

  // Authentication methods
  async signUp(email, password) {
    if (!this.supabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await this.supabase.auth.signUp({
      email,
      password
    });

    if (error) throw error;
    return data;
  }

  async signIn(email, password) {
    if (!this.supabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  }

  async signOut() {
    if (!this.supabase) {
      console.warn('Supabase not configured');
      return;
    }

    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }

  async getCurrentUser() {
    if (!this.supabase) {
      return null;
    }

    const { data: { user } } = await this.supabase.auth.getUser();
    return user;
  }

  // Real-time subscriptions
  subscribeToTasks(callback) {
    if (!this.supabase) {
      console.warn('Supabase not configured, cannot subscribe to tasks');
      return { unsubscribe: () => {} };
    }

    return this.supabase
      .channel('tasks')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, callback)
      .subscribe();
  }

  subscribeToFeedbacks(callback) {
    if (!this.supabase) {
      console.warn('Supabase not configured, cannot subscribe to feedbacks');
      return { unsubscribe: () => {} };
    }

    return this.supabase
      .channel('feedbacks')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'feedbacks' }, callback)
      .subscribe();
  }
}

// Create singleton instance
const dbService = new DatabaseService();

export default dbService;