import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { NavigationItem } from "@/types/database";

export const useNavigation = () => {
  return useQuery({
    queryKey: ["navigation"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("navigation")
        .select("*")
        .order("display_order");

      if (error) throw error;
      return data as NavigationItem[];
    },
  });
};

export type { NavigationItem };

export const buildMenuStructure = (items: NavigationItem[]) => {
  const topLevel = items.filter(item => !item.parent_menu);
  const dropdowns: Record<string, NavigationItem[]> = {};

  items.forEach(item => {
    if (item.parent_menu) {
      if (!dropdowns[item.parent_menu]) {
        dropdowns[item.parent_menu] = [];
      }
      dropdowns[item.parent_menu].push(item);
    }
  });

  return { topLevel, dropdowns };
};
