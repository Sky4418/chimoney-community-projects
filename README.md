# n8n-nodes-chimoney

This is an n8n community node for integrating with the [Chimoney](https://chimoney.io) payment API. It allows you to automate payments, transfers, and account management directly within your n8n workflows.

## Features

### Resources

- **Payout**: Initiate and manage payouts (Chimoney, Bank Transfer, Mobile Money, Airtime, Gift Cards)
- **Account**: Create and manage virtual accounts
- **Wallet**: Check wallet balances

### Operations

#### Payout
- **Initiate**: Create new payouts to multiple recipients
- **Get Status**: Check the status of existing payouts

#### Account
- **Create**: Create new virtual accounts with email, name, and optional metadata

#### Wallet
- **Get Balance**: Retrieve current wallet balance

## Installation

### Community Node (Recommended)

1. Go to **Settings** → **Community Nodes** in your n8n instance
2. Click **Install**
3. Enter `n8n-nodes-chimoney`
4. Agree to the risks and click **Install**

### Manual Installation

```bash
npm install n8n-nodes-chimoney
```

Then link the node to your n8n installation:

```bash
# In the node directory
npm run build
npm link

# In your n8n custom directory (e.g., ~/.n8n/custom/)
npm link n8n-nodes-chimoney
```

## Setup

### Credentials

1. Get your API key from the [Chimoney Dashboard](https://dashboard.chimoney.io)
2. In n8n, go to **Credentials** → **New**
3. Search for "Chimoney API"
4. Enter your API key and select your environment (Production or Sandbox)

## Usage

### Initiating a Payout

1. Add a **Chimoney** node to your workflow
2. Select **Payout** as the resource
3. Select **Initiate** as the operation
4. Choose the **Payout Type** (Chimoney, Bank Transfer, Mobile Money, Airtime, or Gift Card)
5. Enter the **Recipients** as a JSON array:

```json
[
  {
    "email": "recipient@example.com",
    "valueInUSD": 10,
    "currency": "USD"
  }
]
```

6. Configure any additional fields (callback URL, currency, etc.)
7. Connect your Chimoney credentials

### Checking Payout Status

1. Select **Payout** → **Get Status**
2. Enter the **Payout ID** from a previous payout

### Creating an Account

1. Select **Account** → **Create**
2. Enter the **Email** and **Name**
3. Optionally add phone number, country, and metadata

### Getting Wallet Balance

1. Select **Wallet** → **Get Balance**
2. The node will return your current wallet balance

## Example Workflow

```
Trigger → Chimoney (Initiate Payout) → Email (Send Confirmation)
```

## API Reference

This node uses the [Chimoney API v1](https://api.chimoney.io/v1). For complete API documentation, visit:
- [Chimoney API Docs](https://chimoney.readme.io/)

## Development

### Prerequisites

- Node.js (v18 or later)
- npm

### Setup

```bash
git clone https://github.com/Chimoney/chimoney-community-projects.git
cd chimoney-community-projects/submissions/n8n-nodes-chimoney
npm install
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Contributing

Contributions are welcome! Please read the [Contributing Guide](../../CONTRIBUTING.md) for more information.

## License

[MIT](../../LICENSE)

## Support

For support with this node:
- Open an issue in the [GitHub repository](https://github.com/Chimoney/chimoney-community-projects/issues)
- Contact Chimoney support at [support@chimoney.io](mailto:support@chimoney.io)

For Chimoney API support:
- Visit [Chimoney Documentation](https://chimoney.readme.io/)
- Contact [Chimoney Support](https://chimoney.io/contact)
