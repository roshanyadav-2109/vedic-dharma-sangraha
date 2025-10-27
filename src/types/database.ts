export interface NavigationItem {
  id: number;
  title: string;
  link: string | null;
  parent_menu: string | null;
  display_order: number;
}

export interface Mantra {
  id: number;
  title: string;
  content: string | null;
  category: string;
  page_number: number | null;
}

export interface Bhajan {
  id: number;
  title: string;
  lyrics: string | null;
  page_number: number | null;
}

export interface Ritual {
  id: number;
  slug: string;
  title: string;
  content_json: any;
}

export interface Festival {
  id: number;
  slug: string;
  title: string;
  content: string | null;
  page_number: number | null;
}

export interface StaticPage {
  slug: string;
  title: string;
  content: string | null;
}

export interface Donation {
  id: number;
  amount: number;
  donor_name: string | null;
  donor_email: string | null;
  currency: string;
  status: string;
  payment_provider_id: string | null;
  created_at: string;
}

export interface Disciple {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
}

export interface EventNewsItem {
  id: number;
  title: string;
  description: string | null;
  event_date: string | null;
  location: string | null;
  image_url: string | null;
  created_at: string;
}

export interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  url: string;
  thumbnail_url: string | null;
  description: string | null;
  created_at: string;
}

export interface GlobalCenter {
  id: number;
  country: string;
  city: string | null;
  center_name: string | null;
  address: string | null;
  contact_details: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
}
