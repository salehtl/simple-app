FROM node:20-bullseye

# Set working directory
WORKDIR /workspace

# Install git
RUN apt-get update && apt-get install -y git sudo \
 && rm -rf /var/lib/apt/lists/*

# Create non-root user "vscode" (same as devcontainers convention)
RUN useradd -ms /bin/bash vscode \
 && echo "vscode ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Switch to user
USER vscode
WORKDIR /workspace

# Configure git + install Claude Code globally for this user
RUN git config --global user.name "saleh" \
 && git config --global user.email "salehtl@icloud.com" \
 && npm install -g @anthropic-ai/claude-code --silent || true \
 && git config --global init.defaultBranch master

# Add alias to bashrc of non-root user
RUN echo 'alias claude="claude --dangerously-skip-permissions"' >> /home/vscode/.bashrc

# Default command
CMD ["bash"]
