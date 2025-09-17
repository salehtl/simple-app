FROM node:20-bullseye

# Install prerequisites
RUN apt-get update && \
    apt-get install -y git sudo curl && \
    rm -rf /var/lib/apt/lists/*

# Install Claude Code globally
RUN npm install -g @anthropic-ai/claude-code --silent 

# Add the root-runner scripts
RUN curl -fsSL https://raw.githubusercontent.com/gagarinyury/claude-code-root-runner/main/claude-plus.sh -o /usr/local/bin/claude+ && \
    curl -fsSL https://raw.githubusercontent.com/gagarinyury/claude-code-root-runner/main/claude-workspace.sh -o /usr/local/bin/claudew && \
    chmod +x /usr/local/bin/claude+ /usr/local/bin/claudew

# Default workdir
WORKDIR /workspace

CMD ["bash"]
