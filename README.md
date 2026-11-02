# Book Heaven

A private, dark academia reading library built with React, TypeScript, Vinext, and Cloudflare D1.

[Open Book Heaven](https://book-heaven-gourav.gouravduttagd7.chatgpt.site)

## Current features

- Book shelves with search, reading status, and progress tracking.
- TXT/Markdown import and pasted reading notes.
- Extractive reading digests of up to 2,000 words.
- Quote candidates with surrounding context and tentative speaker attribution.
- Name candidates, source-based concept maps, and recall flashcards.
- Reading journals with ratings, photographs, and botanical or celestial decorations.
- Private database records scoped to the signed-in reader.
- JSON export, responsive styling, and reduced-motion support.

## Implementation status

This repository contains the currently published implementation. Analysis is heuristic text extraction, not generative AI. Online title-based research, AI-written briefings, verified character biographies, and five TBR-based recommendations are **not implemented yet**. A “To read” shelf filter exists; the dedicated TBR recommendation experience is pending.

No API keys or private reading data are included.

## Development

Requires Node.js 22.13 or newer. Use the included install script and lockfile:

```sh
npm run install:ci
npm run dev
```

Validation and production build:

```sh
npx tsc --noEmit
npm run build
```

The application runs in a Cloudflare Workers-compatible environment, not an ordinary static React host. The hosting manifest declares the D1 binding `DB`. The current project ID identifies the existing Book Heaven Site; do not use it to publish an unrelated copy.

Database schema: `db/schema.ts`. Initial migration: `drizzle/0000_parallel_tiger_shark.sql`. See [development and deployment details](docs/DEVELOPMENT.md) for local D1 migration commands.

## Authentication and persistence

The hosted Site supplies authenticated identity headers. A standalone local preview does not simulate sign-in, so protected book API calls return 401 without the platform identity. An independent deployment needs a trusted authentication integration; never expose the API while accepting client-spoofed identity headers.

Book records include source text and journal images. This implementation limits each saved JSON record to 1.8 MB and text imports to 1 MB.

## How to use

1. Sign into the private Site with ChatGPT.
2. Add a title and author, optionally importing or pasting text.
3. Open a book to explore Summary, Quotes, Characters, Mind map, and Flashcards.
4. Write and decorate a review in Journal.
5. Click **Save book** after changing progress, notes, ratings, or photos.
6. Use **Export book & journal** to download a JSON backup.

Source-based results should be checked against the original text, especially speaker and character identification.
