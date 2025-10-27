// src/hooks/useTemples.tsx
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { GlobalCenter } from "@/types/database";

export const useTemples = () => {
  return useQuery({
    queryKey: ["temples"],
    queryFn: async () => {
      const { data, error } = await (supabase as any).from("global_centers").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data as GlobalCenter[];
    },
  });
};
