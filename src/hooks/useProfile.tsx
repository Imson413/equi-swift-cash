import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  phone_number: string | null;
  account_number: string;
  balance: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const updateBalance = async (newBalance: number) => {
    if (!user || !profile) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ balance: newBalance })
        .eq("user_id", user.id);

      if (error) throw error;
      setProfile({ ...profile, balance: newBalance });
    } catch (err: any) {
      console.error("Error updating balance:", err);
    }
  };

  return {
    profile,
    loading,
    error,
    updateBalance,
  };
};