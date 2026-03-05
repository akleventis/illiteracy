# litera

A text correction tool built for my cousin (architect) who sometimes has trouble communicating clearly with clients lol.

Live @ [litera.tooper.io](https://litera.tooper.io)

[![Netlify Status](https://api.netlify.com/api/v1/badges/e25815d0-265f-40c5-a915-4f09f1726541/deploy-status)](https://app.netlify.com/sites/litera/deploys)

## How it works

The frontend is a Next.js app with a single-page UI. User input is submitted via a `POST` request to a serverless API route (`/api/fetchData`), which constructs a prompt and calls the Google Generative AI API (`@google/genai`). Three prompt modes are supported:

- **Fix Spelling and Grammar** — corrects errors without changing wording or meaning
- **Professional and Concise** — rewrites for clarity and formality
- **Friendly and Personable** — rewrites for a warmer, more approachable tone

Each mode wraps the user's input in a prompt template that instructs the model to ignore any embedded instructions (basic prompt injection mitigation). The response text is returned to the client and displayed. API routes are configured with `no-store` cache headers via `netlify.toml` to prevent stale responses. Deployed on Netlify.
