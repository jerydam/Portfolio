// src/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

// NOTE: Import ALL your asset images here, so they can be mapped from Supabase/DB strings.
import {
  mobile, backend, creator, web, starbucks, tesla, shopify, meta,
  // Add ALL icons used in services, experiences, and technologies here
} from "./assets"; 

// --- Supabase Setup (Ensure .env is configured) ---
const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Local Asset Mapping ---
// Map the string stored in your Supabase table (e.g., 'web') to the actual imported asset.
export const iconMap = {
  web,
  mobile,
  backend,
  creator,
  starbucks,
  tesla,
  shopify,
  meta,
  // Add other icon mappings as needed (e.g., threejs, figma, etc. if used dynamically)
};

// --- Static Data (Only for truly static items like navigation) ---
export const navLinks = [
  { id: "about", title: "About" },
  { id: "work", title: "Work" },
  { id: "contact", title: "Contact" },
];