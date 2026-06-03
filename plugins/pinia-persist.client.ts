import { useAuthStore } from '~/stores/auth';

export default defineNuxtPlugin(() => {
  const STORAGE_KEY = 'kiwi-auth-state';
  const auth = useAuthStore();

  // Restore from localStorage
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.phone !== undefined) auth.phone = parsed.phone;
      if (parsed.countryCode !== undefined) auth.countryCode = parsed.countryCode;
      if (parsed.role !== undefined) auth.role = parsed.role;
      if (parsed.verified !== undefined) auth.verified = parsed.verified;
      if (parsed.user !== undefined) auth.user = parsed.user;
    }
  } catch (e) {
    console.warn('Failed to restore auth state from localStorage', e);
  }

  // Watch and persist
  auth.$subscribe((_mutation, state) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to persist auth state to localStorage', e);
    }
  });
});
