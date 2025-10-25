// src/hooks/useNavigation.tsx
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { NavigationItem } from "@/types/database";

// Keep the original hook
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

// -- New Code Starts Here --

// Define interface for tree structure
export interface NavItemWithChildren extends NavigationItem {
  children?: NavItemWithChildren[];
}

// Function to build the hierarchical tree
export const buildMenuTree = (items: NavigationItem[] | undefined): NavItemWithChildren[] => {
  if (!items) return []; // Return empty array if items are undefined

  const itemsByTitle: Record<string, NavItemWithChildren> = {};
  // Initialize items with empty children arrays
  items.forEach(item => {
     // Use title as key, assuming titles are unique enough for menu structure
    itemsByTitle[item.title] = { ...item, children: [] };
  });

  const tree: NavItemWithChildren[] = [];
  items.forEach(item => {
    const currentItem = itemsByTitle[item.title];
    if (item.parent_menu && itemsByTitle[item.parent_menu]) {
      // If it has a parent, add it to the parent's children array
      // Ensure children array exists before pushing
      if (!itemsByTitle[item.parent_menu].children) {
          itemsByTitle[item.parent_menu].children = [];
      }
      itemsByTitle[item.parent_menu].children?.push(currentItem);
    } else if (!item.parent_menu) {
      // If it's a top-level item, add it to the root tree
      tree.push(currentItem);
    }
  });

  // Function to recursively sort children by display_order
  const sortChildren = (node: NavItemWithChildren) => {
    if (node.children && node.children.length > 0) {
      node.children.sort((a, b) => a.display_order - b.display_order);
      node.children.forEach(sortChildren); // Recursively sort grandchildren etc.
    }
  };

  // Sort top-level items
  tree.sort((a, b) => a.display_order - b.display_order);
  // Sort children at all levels
  tree.forEach(sortChildren);

  return tree;
};

// -- New Code Ends Here --

// Keep the old buildMenuStructure if it's used elsewhere, otherwise it can be removed.
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

  // Sort dropdown items by display_order
   for (const key in dropdowns) {
    dropdowns[key].sort((a, b) => a.display_order - b.display_order);
   }

  return { topLevel, dropdowns };
};
