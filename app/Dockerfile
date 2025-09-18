# --- Base tooling with Claude Code + root-runner scripts ---
FROM node:20-bullseye AS tooling
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
 && apt-get install -y --no-install-recommends git curl ca-certificates bash sudo \
 && rm -rf /var/lib/apt/lists/*

# Install Claude Code CLI
RUN npm i -g @anthropic-ai/claude-code --silent || true

# Install root-runner helpers and make them executable
RUN curl -fsSL https://raw.githubusercontent.com/gagarinyury/claude-code-root-runner/main/claude-plus.sh -o /usr/local/bin/claude+ \
 && curl -fsSL https://raw.githubusercontent.com/gagarinyury/claude-code-root-runner/main/claude-workspace.sh -o /usr/local/bin/claudew \
 && chmod +x /usr/local/bin/claude+ /usr/local/bin/claudew

# Make aliases available to all shells and users
RUN printf '%s\n' \
  'alias claude="claude --dangerously-skip-permissions"' \
  'alias claude+="claude+ "' \
  'alias claudew="claudew "' \
  > /etc/profile.d/claude.sh

# --- Dev runtime (inherits tooling so Claude is present) ---
FROM tooling AS dev
WORKDIR /workspace
ENV NODE_ENV=development
EXPOSE 3000
# Load global aliases in non-login shells
SHELL ["/bin/bash", "-lc"]
RUN echo 'source /etc/profile.d/claude.sh || true' >> /root/.bashrc
CMD ["bash","-lc","npm install && npm run dev -- --host --port 3000"]

# --- Prod deps ---
FROM node:20-bullseye AS deps
WORKDIR /app
ENV CI=true
COPY package*.json ./
RUN npm ci

# --- Build ---
FROM node:20-bullseye AS build
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- Prod SSR (optional: keep Claude for convenience) ---
# If you do NOT want Claude in prod, change base to `node:20-bullseye` and drop the COPY lines below.
FROM tooling AS prod-node
WORKDIR /app
ENV NODE_ENV=production PORT=3000
RUN useradd -m -u 10001 nodeusr
COPY --from=deps /app/package*.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/. .
# Ensure aliases for both root and node user
RUN echo 'source /etc/profile.d/claude.sh || true' >> /root/.bashrc \
 && install -d -o nodeusr -g nodeusr /home/nodeusr \
 && bash -lc 'echo "source /etc/profile.d/claude.sh || true" >> /home/nodeusr/.bashrc'
EXPOSE 3000
USER nodeusr
CMD ["npm","run","start"]
