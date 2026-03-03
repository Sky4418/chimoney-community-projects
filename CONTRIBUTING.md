# Contributing to n8n-nodes-chimoney

Thank you for your interest in contributing to the Chimoney n8n node!

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/chimoney-community-projects.git
   cd chimoney-community-projects/submissions/n8n-nodes-chimoney
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Build the project:
   ```bash
   npm run build
   ```

## Project Structure

```
n8n-nodes-chimoney/
├── credentials/           # Credential definitions
│   └── ChimoneyApi.credentials.ts
├── nodes/                 # Node implementations
│   └── Chimoney/
│       ├── Chimoney.node.ts
│       ├── Chimoney.node.json
│       └── chimoney.svg
├── dist/                  # Compiled JavaScript (generated)
├── examples/              # Usage examples
├── package.json
├── tsconfig.json
└── README.md
```

## Adding New Operations

To add a new operation to the Chimoney node:

1. Add the operation to the `operation` property in `Chimoney.node.ts`
2. Add any required fields for the operation
3. Implement the operation logic in the `execute` method
4. Update the README with documentation
5. Add examples to the examples directory

## Testing

### Manual Testing

1. Build the node:
   ```bash
   npm run build
   ```

2. Link the node to your local n8n instance:
   ```bash
   npm link
   cd ~/.n8n/custom
   npm link n8n-nodes-chimoney
   ```

3. Restart n8n and test your changes

### Using n8n

1. Install n8n locally:
   ```bash
   npm install n8n -g
   ```

2. Start n8n:
   ```bash
   n8n
   ```

3. Open http://localhost:5678 in your browser

4. Create a workflow using the Chimoney node

## Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable names
- Add comments for complex logic

## Submitting Changes

1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/my-new-feature
   ```

2. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "Add: description of your changes"
   ```

3. Push to your fork:
   ```bash
   git push origin feature/my-new-feature
   ```

4. Create a Pull Request to the main repository

## Commit Message Guidelines

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters
- Reference issues and pull requests liberally after the first line

## Questions?

If you have questions, please:
- Open an issue in the GitHub repository
- Check the [Chimoney API documentation](https://chimoney.readme.io/)
