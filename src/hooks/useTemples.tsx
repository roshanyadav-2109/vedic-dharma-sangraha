// src/hooks/useTemples.tsx
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Temple } from "@/types/database";

export const useTemples = () => {
  return useQuery({
    queryKey: ["temples"],
    queryFn: async () => {
      const { data, error } = await supabase.from("temples").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data as Temple[];
    },
  });
};
