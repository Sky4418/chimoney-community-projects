# Chimoney n8n Node Examples

This directory contains example workflows demonstrating how to use the Chimoney n8n node.

## Example 1: Send Payment to Multiple Recipients

This workflow sends Chimoney payments to multiple email addresses.

### Node Configuration

**Resource**: Payout  
**Operation**: Initiate  
**Payout Type**: Chimoney  
**Recipients**:
```json
[
  {
    "email": "user1@example.com",
    "valueInUSD": 25,
    "currency": "USD"
  },
  {
    "email": "user2@example.com",
    "valueInUSD": 50,
    "currency": "USD"
  }
]
```

**Additional Fields**:
- Currency: USD
- Callback URL: https://your-webhook-url.com/chimoney-callback

## Example 2: Check Payout Status

This workflow checks the status of a previous payout.

### Node Configuration

**Resource**: Payout  
**Operation**: Get Status  
**Payout ID**: `{{$json.id}}` (from previous payout node)

## Example 3: Create Virtual Account

This workflow creates a new virtual account for a customer.

### Node Configuration

**Resource**: Account  
**Operation**: Create  
**Email**: `{{$json.customerEmail}}`  
**Name**: `{{$json.customerName}}`  

**Additional Fields**:
- Phone Number: `{{$json.phoneNumber}}`
- Country: NG
- Meta: `{"customerId": "{{$json.customerId}}", "plan": "premium"}`

## Example 4: Bank Transfer

This workflow initiates a bank transfer payout.

### Node Configuration

**Resource**: Payout  
**Operation**: Initiate  
**Payout Type**: Bank Transfer  
**Recipients**:
```json
[
  {
    "email": "recipient@example.com",
    "valueInUSD": 100,
    "account_bank": "044",
    "account_number": "1234567890",
    "country": "NG"
  }
]
```

## Example 5: Mobile Money Transfer

This workflow sends mobile money to a recipient.

### Node Configuration

**Resource**: Payout  
**Operation**: Initiate  
**Payout Type**: Mobile Money  
**Recipients**:
```json
[
  {
    "email": "recipient@example.com",
    "valueInUSD": 30,
    "phone_number": "+2348012345678",
    "country": "NG"
  }
]
```

## Example 6: Get Wallet Balance

This workflow retrieves the current wallet balance.

### Node Configuration

**Resource**: Wallet  
**Operation**: Get Balance

## Full Workflow Example

```json
{
  "name": "Chimoney Payment Workflow",
  "nodes": [
    {
      "parameters": {},
      "id": "trigger",
      "name": "When clicking 'Execute Workflow'",
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "resource": "payout",
        "operation": "initiate",
        "payoutType": "chimoney",
        "recipients": "[{\"email\": \"test@example.com\", \"valueInUSD\": 10}]"
      },
      "id": "chimoney",
      "name": "Chimoney",
      "type": "n8n-nodes-chimoney.chimoney",
      "typeVersion": 1,
      "position": [450, 300],
      "credentials": {
        "chimoneyApi": {
          "id": "YOUR_CREDENTIAL_ID",
          "name": "Chimoney API"
        }
      }
    },
    {
      "parameters": {
        "subject": "Payment Sent",
        "text": "=Your payment of {{$json.data[0].valueInUSD}} USD has been sent!"
      },
      "id": "email",
      "name": "Send Email",
      "type": "n8n-nodes-base.emailSend",
      "typeVersion": 1,
      "position": [650, 300]
    }
  ],
  "connections": {
    "When clicking 'Execute Workflow'": {
      "main": [[{"node": "Chimoney", "type": "main", "index": 0}]]
    },
    "Chimoney": {
      "main": [[{"node": "Send Email", "type": "main", "index": 0}]]
    }
  }
}
```

## Tips

1. **Always test with Sandbox first**: Use the sandbox environment for testing before switching to production.

2. **Handle errors**: Enable "Continue On Fail" option in the node settings to handle API errors gracefully.

3. **Use JSON for complex data**: For recipients and metadata, use the JSON field type for maximum flexibility.

4. **Validate recipient data**: Ensure email addresses and phone numbers are valid before sending.

5. **Monitor callbacks**: Set up a webhook endpoint to receive status updates for your payouts.
