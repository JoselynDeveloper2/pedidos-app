# Kiwi Login — Delivery App Onboarding

Este proyecto es una PWA de delivery construida con Nuxt 3.

## Stack
- Nuxt 3 + Vue 3 Composition API + TypeScript
- Tailwind CSS v3
- Pinia para estado global
- Twilio Verify para OTP
- @vite-pwa/nuxt para PWA

## Colores del diseño (Stitch)
| Token | Valor |
|-------|-------|
| Primary | `#E3000F` |
| Primary soft | `#F8D7D8` |
| Dark | `#1A1A1A` |
| Surface | `#F5F5F5` |
| Border | `#E0E0E0` |

## Agentes
- `delivery-onboarding-agent`: Agente principal para construir el flujo de onboarding completo.

## Flujo de Onboarding
1. Login con teléfono (`/login`)
2. Verificación OTP (`/verify`)
3. Completar perfil (`/profile`)

## MCP
- Stitch by Google está conectado para leer frames de diseño.
