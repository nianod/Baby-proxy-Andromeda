import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

interface User {
  id: number;
  user_id: string;
  email: string;
  name: string;
  created_at: string;
}

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data: { user: authUser } } = await supabase.auth.getUser()

      if (!authUser) {
        setError("No authenticated user found");
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', authUser.id)
        .single(); 

      if (error) throw error;

      setUser(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, error };
};

export default useUser;