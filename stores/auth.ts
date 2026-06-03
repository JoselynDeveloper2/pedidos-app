import { defineStore } from 'pinia';

export interface UserLocation {
  lat: number;
  lng: number;
}

export interface User {
  name: string;
  email: string;
  location: UserLocation | null;
}

export interface AuthState {
  phone: string;
  countryCode: string;
  role: 'cliente' | 'repartidor';
  verified: boolean;
  user: User;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    phone: '',
    countryCode: '+1',
    role: 'cliente',
    verified: false,
    user: {
      name: '',
      email: '',
      location: null,
    },
  }),

  getters: {
    fullPhone: (state): string => `${state.countryCode}${state.phone}`,
    isAuthenticated: (state): boolean => state.verified && !!state.phone,
  },

  actions: {
    setPhone(phone: string, countryCode: string = '+1') {
      this.phone = phone;
      this.countryCode = countryCode;
    },

    setRole(role: 'cliente' | 'repartidor') {
      this.role = role;
    },

    setVerified(value: boolean) {
      this.verified = value;
    },

    setUser(data: Partial<User>) {
      this.user = { ...this.user, ...data };
    },

    reset() {
      this.phone = '';
      this.countryCode = '+1';
      this.role = 'cliente';
      this.verified = false;
      this.user = {
        name: '',
        email: '',
        location: null,
      };
    },
  },
});
