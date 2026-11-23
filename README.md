# Discord Bot Template

A TypeScript starter for Discord bots, with automatic loading of commands, events and scheduled tasks.

The template wraps discord.js with a folder-based loader and generator scripts. It targets developers who want a structured bot project without wiring commands, events and cron tasks by hand.

## Table of contents

- [Discord Bot Template](#discord-bot-template)
	- [Table of contents](#table-of-contents)
	- [How it works](#how-it-works)
	- [Tech stack](#tech-stack)
	- [Repository structure](#repository-structure)
	- [Prerequisites](#prerequisites)
	- [Installation](#installation)
	- [Configuration](#configuration)
	- [Running locally](#running-locally)
	- [Useful scripts](#useful-scripts)
	- [Tests and quality](#tests-and-quality)
	- [Deployment](#deployment)
	- [License](#license)

## How it works

1. **Startup**: `src/client.ts` validates the environment with Zod, creates the discord.js client and logs in with `BOT_TOKEN`.
2. **Events**: once the client is ready, every event file found in `src/events` is loaded and bound to its Discord event.
3. **Tasks**: every task file found in `src/tasks` is loaded and scheduled with a cron expression (Day.js is configured for dates).
4. **Commands**: command folders in `src/commands` are loaded, registered as application (`/`) commands, and dispatched when an interaction arrives. Commands can be limited to specific guilds.
5. **Dev mode**: when the process is started with the `dev` argument, commands, events and tasks are loaded only if they set `enableInDev`.
6. **Generation**: the `create:*` scripts create the files of a new command, subcommand, event or task from templates.

## Tech stack

| Layer | Technologies |
| --- | --- |
| Bot | Node.js, discord.js 14, TypeScript |
| Scheduling | `cron`, Day.js |
| Validation and errors | Zod, `rustic-error` |
| Tooling | `@swc-node/register`, `ts-node`, nodemon, ESLint (`@maxencebonamy/eslint-config`), Vitest |
| Deployment | Docker |

## Repository structure

```
.
├── scripts/                 Generators for commands, subcommands, events and tasks
│   ├── create-command/
│   ├── create-subcommand/
│   ├── create-event/
│   ├── create-task/
│   └── utils/
├── src/
│   ├── client.ts            Entry point
│   ├── commands/            One folder per command
│   ├── events/              One folder per event
│   ├── tasks/               One folder per scheduled task
│   ├── configs/             Environment, global, guild and Day.js configuration
│   └── utils/               Loaders (commands, events, tasks), cron, Discord, logger, helpers
├── Dockerfile
├── tsconfig.json
└── vitest.config.ts
```

Commands, events and tasks follow a naming convention that the loaders rely on.

```
src/
├── commands/
│   └── command-name/
│       ├── command-name.builder.ts
│       ├── command-name.cmd.ts
│       ├── command-name.util.ts
│       ├── command-name.type.ts
│       └── [sub-commands]/
│           ├── group-example/
│           │   └── sub-cmd-name.cmd.ts
│           └── sub-cmd-name.cmd.ts
├── events/
│   └── event-name/
│       └── event-name.event.ts
└── tasks/
    └── task-name/
        └── task-name.task.ts
```

File and folder names of commands, subcommands and subcommand groups must match the names defined in `command-name.builder.ts`. Subcommand groups are folders prefixed with `group-`.

| File | Exports |
| --- | --- |
| `*.builder.ts` | `slashCommand` (required), `guilds`, `enableInDev` |
| `*.cmd.ts` | `execute` |
| `*.event.ts` | `event`, `execute`, `enableInDev` |
| `*.task.ts` | `interval` (cron syntax with seconds: `sec min hour day month weekday`), `execute`, `enableInDev` |

`enableInDev` defaults to `false`. The `@/` import alias points to `src/`. The auto-loader comes from [Royaume](https://github.com/Virtual-Royaume/Royaume-Discord-Bot).

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later (`engines` field; the Dockerfile uses Node 19)
- [pnpm](https://pnpm.io/) 8 or later (`engines` field)
- A Discord application with a bot token, created on the [developer portal](https://discord.com/developers/applications)

## Installation

```bash
git clone git@github.com:maxencebonamy/Discord-Bot-Template.git
cd Discord-Bot-Template
pnpm install
```

## Configuration

The repository has no `.env.example`. Create a `.env` file at the root:

```bash
touch .env
```

| Variable | Description | Example |
| --- | --- | --- |
| `BOT_TOKEN` | Discord bot token (required, non-empty) | `your-bot-token` |

## Running locally

```bash
pnpm dev
```

nodemon restarts the bot on every change. To run without file watching:

```bash
pnpm start
```

## Useful scripts

| Command | Effect |
| --- | --- |
| `pnpm dev` | Start the bot in dev mode with nodemon |
| `pnpm start` | Start the bot |
| `pnpm lint` | Lint `src` |
| `pnpm lint:fix` | Lint `src` with auto-fix |
| `pnpm test:unit` | Run Vitest with its UI |
| `pnpm ts:check` | Type-check without emitting |
| `pnpm create:command <name>` | Generate a command |
| `pnpm create:subcommand <commandName> <name>` | Generate a subcommand |
| `pnpm create:event <name>` | Generate an event |
| `pnpm create:task <name>` | Generate a scheduled task |

## Tests and quality

```bash
pnpm test:unit
pnpm lint
pnpm ts:check
```

Tests use Vitest and load `.env` through `dotenv/config`. Linting uses the shared ESLint config `@maxencebonamy/eslint-config`.

## Deployment

The repository has no CI. A [`Dockerfile`](Dockerfile) builds an image from `node:19`, installs dependencies with `npm install` and starts the bot with `npm run start`. Provide `BOT_TOKEN` to the container as an environment variable.

## License

This project is licensed under the [MIT License](LICENSE).
