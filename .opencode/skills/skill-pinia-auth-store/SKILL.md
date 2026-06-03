---
name: skill-pinia-auth-store
description: Crea el store de autenticación con Pinia para una app de delivery, incluyendo teléfono, rol, OTP y datos de usuario. Use ONLY when the user asks to create the auth store or after project setup.
---

# skill-pinia-auth-store

Crea el store de autenticación con Pinia para la app de delivery.

## Instrucciones

1. Crea `stores/auth.ts` con el siguiente estado y lógica:

### State
- `phone`: string (vacío)
- `countryCode`: string (default '+1')
- `role`: 'cliente' | 'repartidor' (default 'cliente')
- `verified`: boolean (false)
- `user`: { name: string, email: string, location: { lat: number, lng: number } | null }

### Actions
- `setPhone(phone: string, countryCode: string)`
- `setRole(role: 'cliente' | 'repartidor')`
- `setVerified(value: boolean)`
- `setUser(data: Partial<User>)`
- `reset()` → resetea todo al estado inicial

### Getters
- `fullPhone`: computed → ``${countryCode}${phone}``
- `isAuthenticated`: computed → `verified && !!phone`

2. Usa persistencia:
   - Si está disponible `@pinia-plugin-persistedstate/nuxt`, configúralo.
   - Si no, crea un plugin de localStorage manual en `plugins/pinia-persist.ts` que observe cambios en el store de auth y los guarde en `localStorage`.

3. Asegúrate de tipar correctamente con interfaces TypeScript.

## Archivo a crear
- `stores/auth.ts`
- `plugins/pinia-persist.ts` (opcional, solo si no hay plugin oficial)
