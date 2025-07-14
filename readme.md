
# Ecommerce-frontend

An interactive README for the Ecommerce-frontend project.

## Table of Contents

*   [Project Overview](#project-overview)
*   [Technologies Used](#technologies-used)
*   [Scripts](#scripts)
*   [TypeScript Configuration](#typescript-configuration)
*   [Getting Started](#getting-started)
*   [Contributing](#contributing)
*   [License](#license)

## Project Overview

This is the frontend for an Ecommerce application.  It's built using Next.js and leverages various modern web development technologies.

## Technologies Used

*   **Framework:** [Next.js](https://nextjs.org/)
*   **UI Library:** [React](https://reactjs.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) with `tailwindcss-animate`
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **State Management:** [Zustand](https://github.com/pmndrs/zustand)
*   **Data Fetching:** [Axios](https://axios-http.com/)
*   **TypeScript:** Yes

### Dependencies

```json
{
    "@swc/helpers": "^0.5.2",
    "@types/node": "20.6.2",
    "@types/react": "18.2.22",
    "@types/react-dom": "18.2.7",
    "autoprefixer": "10.4.15",
    "axios": "^1.10.0",
    "eslint": "8.49.0",
    "eslint-config-next": "13.5.1",
    "lucide-react": "^0.525.0",
    "next": "13.5.1",
    "postcss": "8.4.30",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "tailwindcss": "3.3.3",
    "tailwindcss-animate": "^1.0.7",
    "typescript": "5.2.2",
    "zustand": "^5.0.6"
}
```

## Scripts

The following scripts are defined in `package.json`:

*   `dev`: Starts the Next.js development server.  `npm run dev`
*   `build`: Builds the Next.js application for production. `npm run build`
*   `start`: Starts the Next.js production server. `npm run start`
*   `lint`: Runs the ESLint linter. `npm run lint`

## TypeScript Configuration

The project uses TypeScript for static typing.  Key configurations include:

*   **Target:** `es5`
*   **Module:** `esnext`
*   **Module Resolution:** `bundler`
*   **JSX:** `preserve`
*   **Strict Mode:** Enabled
*   **Path Aliases:** `@/*` (maps to `./*`)
*   **Next.js Plugin:**  Enabled

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd Ecommerce-frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install  # or yarn install or pnpm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open your browser and navigate to `http://localhost:3000`.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your fork.
5.  Submit a pull request to the main repository.

## License

[MIT](LICENSE) (Replace `LICENSE` with the actual license file if present)
```
