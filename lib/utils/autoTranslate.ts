/**
 * Optional: auto-translate missing keys at runtime (best-effort).
 * Configure:
 *  - VITE_TRANSLATE_ENDPOINT (e.g., a proxy to Google/DeepL/LibreTranslate)
 *  - VITE_TRANSLATE_API_KEY (if required by provider)
 *
 * This file is dynamically imported when needed to avoid increasing bundle size.
 */
// type ProviderPayload = { text: string; source: string; target: string }

// export async function autoTranslate(text: string, source: string, target: string): Promise<string | null> {
//   const endpoint = import.meta.env.VITE_TRANSLATE_ENDPOINT
//   if (!endpoint) return null
//   try {
//     const res = await fetch(endpoint, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': import.meta.env.VITE_TRANSLATE_API_KEY ? `Bearer ${import.meta.env.VITE_TRANSLATE_API_KEY}` : ''
//       },
//       body: JSON.stringify({ text, source, target } as ProviderPayload)
//     })
//     if (!res.ok) return null
//     const data = await res.json()
//     // Expect { translation: "..." }
//     return data.translation || null
//   } catch {
//     return null
//   }
// }
