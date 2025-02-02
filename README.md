<img src="./src/app/icon.svg" width="80px" height="80px">

# Snip UI - Web Interface
This is AI Chat APP bootstraped with `LM Studio API` and `Next.js`.


## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [LM Studio](https://lmstudio.ai/) running locally with accessible API endpoints.
- Environment variable file (.env) with:
  ```env
  NEXT_PUBLIC_LM_STUDIO_URL=http://192.168.100.7:1234
  ```

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/nabinkhair42/snip.git
   ```
   ```bash
   cd snip
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```
   or if you prefer yarn:
   ```bash
   yarn install
   ```

3. Create a `.env` file at the project root and add:
   ```env
   NEXT_PUBLIC_LM_STUDIO_URL=http://192.168.100.7:1234
   ```

## Running the Application

To start the development server:
```bash
npm run dev
```
or using yarn:
```bash
yarn dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.


## Project Structure

- **src/app/**  
  Contains Next.js pages and API routes.
  - `api/chat/route.ts`  
    API route that sends chat requests to LM Studio and returns a streamed response.
  - `page.tsx`  
    Main entry point for the UI chat application.

- **src/components/**  
  Contains UI components:
  - `ChatHeader.tsx` – Header showing the app title, model information, theme toggle, and clear conversation.
  - `ChatWindow.tsx` – Displays the chat messages.
  - `ChatInput.tsx` – Input field for sending messages.
  - `ChatMessage.tsx` – Displays individual chat messages with markdown formatting.
  - `extended/` – Components for extended functionality (e.g., ThemeToggle, ClearConversation).
  - `ui/` – Basic UI components like Button, Input, Badge.

## Customization

- Modify the LM Studio API URL by updating the environment variable in your `.env` file.
- Customize UI components under **src/components/** as needed.


# Future Work
- [ ] `Ollama` API integration for more conversational chat.
- [ ] `Code Snippet` for code generation
- [ ] `AI Model` Switching Feature
