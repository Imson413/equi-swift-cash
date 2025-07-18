import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

interface Transaction {
  id: string;
  user_id: string;
  transaction_type: 'sent' | 'received' | 'withdraw' | 'deposit' | 'bills' | 'airtime' | 'transfer_in' | 'transfer_out';
  amount: number;
  description: string;
  recipient_phone: string | null;
  recipient_name: string | null;
  reference_code: string | null;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  created_at: string;
}

export const useTransactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    const fetchTransactions = async () => {
      try {
        const { data, error } = await supabase
          .from("transactions")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(10);

        if (error) throw error;
        setTransactions((data || []) as Transaction[]);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("transactions")
        .insert([{ ...transaction, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      setTransactions(prev => [data as Transaction, ...prev]);
      return data;
    } catch (err: any) {
      console.error("Error adding transaction:", err);
      throw err;
    }
  };

  return {
    transactions,
    loading,
    error,
    addTransaction,
  };
};