# litera

A text correction tool built for my cousin (architect) who sometimes has trouble communicating clearly with clients lol.

Live @ [litera.tooper.io](https://litera.tooper.io)

[![Netlify Status](https://api.netlify.com/api/v1/badges/e25815d0-265f-40c5-a915-4f09f1726541/deploy-status)](https://app.netlify.com/sites/litera/deploys)

## How it works

Next.js app with two routes:

- `/` — the correction tool
- `/history` — past corrections

You type text, optionally pick a **career**, and choose a mode. The client builds a prompt and `POST`s it to a serverless API route (`/api/fetchData`), which calls the Gemini API (`@google/genai`) and returns the corrected text.

### Modes

- **Fix Grammar** — corrects spelling/grammar without changing wording or meaning
- **Professional** — rewrites for clarity and formality
- **Friendly** — rewrites for a warmer tone

### Career context

A small dropdown (`Default` / `Architect` / `Software Engineer`) injects a sentence into the prompt telling the model to preserve that field's vocabulary (spec sections, RFI, API names, CLI commands, etc.) instead of "correcting" it into plain English. Add one by adding an entry to `CAREERS` in `src/app/page.js`.

### Prompt injection

Every prompt wraps the user's text in `<input>` tags and instructs the model to treat the contents as plain text, never as instructions. The API route repeats the same guard as a system instruction.

### Model fallback

`fetchData.js` tries a list of models in order, falling through to the next one on a `503` (overloaded) or `429` (daily quota). Models are ordered largest-free-quota-first so the biggest bucket is spent before the smaller ones. The final error tells the user whether it was overload or quota.

### History

Corrections are saved to `localStorage` (key `litera-history`, capped at 50). It's per-browser/per-device only — the `/history` page says so. Each entry can be copied or removed individually, or the whole list cleared.

## Development

```
npm install
npm run dev
```

Set `REACT_APP_GEM_KEY` (a Gemini API key) in `.env` locally and in the Netlify site's environment variables for production. Deployed on Netlify; `netlify.toml` forces `no-store` cache headers on `/api/*`.
