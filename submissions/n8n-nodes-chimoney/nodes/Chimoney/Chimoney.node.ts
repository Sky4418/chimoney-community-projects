import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

export class Chimoney implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Chimoney',
		name: 'chimoney',
		icon: 'file:chimoney.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Integrate with Chimoney API for payments and transfers',
		defaults: {
			name: 'Chimoney',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'chimoneyApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Payout',
						value: 'payout',
						description: 'Manage payouts and payments',
					},
					{
						name: 'Account',
						value: 'account',
						description: 'Manage accounts',
					},
					{
						name: 'Wallet',
						value: 'wallet',
						description: 'Check wallet balance',
					},
				],
				default: 'payout',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['payout'],
					},
				},
				options: [
					{
						name: 'Initiate',
						value: 'initiate',
						description: 'Initiate a new payout',
						action: 'Initiate a payout',
					},
					{
						name: 'Get Status',
						value: 'getStatus',
						description: 'Get payout status',
						action: 'Get payout status',
					},
				],
				default: 'initiate',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['account'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new account',
						action: 'Create an account',
					},
				],
				default: 'create',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['wallet'],
					},
				},
				options: [
					{
						name: 'Get Balance',
						value: 'getBalance',
						description: 'Get wallet balance',
						action: 'Get wallet balance',
					},
				],
				default: 'getBalance',
			},
			// Payout: Initiate fields
			{
				displayName: 'Payout Type',
				name: 'payoutType',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['payout'],
						operation: ['initiate'],
					},
				},
				options: [
					{
						name: 'Chimoney',
						value: 'chimoney',
					},
					{
						name: 'Bank Transfer',
						value: 'bank',
					},
					{
						name: 'Mobile Money',
						value: 'mobile_money',
					},
					{
						name: 'Airtime',
						value: 'airtime',
					},
					{
						name: 'Gift Card',
						value: 'giftcard',
					},
				],
				default: 'chimoney',
				description: 'Type of payout to initiate',
			},
			{
				displayName: 'Recipients',
				name: 'recipients',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['payout'],
						operation: ['initiate'],
					},
				},
				default: '[\n  {\n    "email": "recipient@example.com",\n    "valueInUSD": 10\n  }\n]',
				description: 'Array of recipient objects (JSON format)',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['payout'],
						operation: ['initiate'],
					},
				},
				options: [
					{
						displayName: 'Currency',
						name: 'currency',
						type: 'string',
						default: 'USD',
						description: 'Currency code (e.g., USD, NGN)',
					},
					{
						displayName: 'Callback URL',
						name: 'callbackUrl',
						type: 'string',
						default: '',
						description: 'URL to receive webhook notifications',
					},
					{
						displayName: 'Debit Currency',
						name: 'debitCurrency',
						type: 'string',
						default: '',
						description: 'Currency to debit from your wallet',
					},
				],
			},
			// Payout: Get Status fields
			{
				displayName: 'Payout ID',
				name: 'payoutId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['payout'],
						operation: ['getStatus'],
					},
				},
				default: '',
				description: 'The ID of the payout to check',
			},
			// Account: Create fields
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['account'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Email address for the account',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['account'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Name of the account holder',
			},
			{
				displayName: 'Additional Fields',
				name: 'accountAdditionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['account'],
						operation: ['create'],
					},
				},
				options: [
					{
						displayName: 'Phone Number',
						name: 'phoneNumber',
						type: 'string',
						default: '',
						description: 'Phone number for the account',
					},
					{
						displayName: 'Country',
						name: 'country',
						type: 'string',
						default: '',
						description: 'Country code (e.g., NG, US)',
					},
					{
						displayName: 'Meta',
						name: 'meta',
						type: 'json',
						default: '{}',
						description: 'Additional metadata (JSON format)',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const credentials = await this.getCredentials('chimoneyApi');
		
		const baseURL = 'https://api.chimoney.io/v1';

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject = {};

				if (resource === 'payout') {
					if (operation === 'initiate') {
						const payoutType = this.getNodeParameter('payoutType', i) as string;
						const recipientsJson = this.getNodeParameter('recipients', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						
						let recipients;
						try {
							recipients = JSON.parse(recipientsJson);
						} catch (error) {
							throw new Error('Invalid JSON in Recipients field');
						}

						const body: IDataObject = {
							recipients,
							...additionalFields,
						};

						const endpoint = `/payouts/${payoutType === 'chimoney' ? 'initiate' : payoutType + '/initiate'}`;
						
						const options: IHttpRequestOptions = {
							method: 'POST',
							baseURL,
							url: endpoint,
							body,
							headers: {
								'X-API-Key': credentials.apiKey as string,
								'Content-Type': 'application/json',
							},
						};

						responseData = await this.helpers.httpRequest(options);
					} 
					else if (operation === 'getStatus') {
						const payoutId = this.getNodeParameter('payoutId', i) as string;
						
						const options: IHttpRequestOptions = {
							method: 'GET',
							baseURL,
							url: `/payouts/${payoutId}`,
							headers: {
								'X-API-Key': credentials.apiKey as string,
							},
						};

						responseData = await this.helpers.httpRequest(options);
					}
				} 
				else if (resource === 'account') {
					if (operation === 'create') {
						const email = this.getNodeParameter('email', i) as string;
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('accountAdditionalFields', i) as IDataObject;
						
						let meta = {};
						if (additionalFields.meta) {
							try {
								meta = JSON.parse(additionalFields.meta as string);
							} catch (error) {
								throw new Error('Invalid JSON in Meta field');
							}
						}

						const body: IDataObject = {
							email,
							name,
							phoneNumber: additionalFields.phoneNumber,
							country: additionalFields.country,
							meta,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							baseURL,
							url: '/accounts',
							body,
							headers: {
								'X-API-Key': credentials.apiKey as string,
								'Content-Type': 'application/json',
							},
						};

						responseData = await this.helpers.httpRequest(options);
					}
				}
				else if (resource === 'wallet') {
					if (operation === 'getBalance') {
						const options: IHttpRequestOptions = {
							method: 'GET',
							baseURL,
							url: '/wallets',
							headers: {
								'X-API-Key': credentials.apiKey as string,
							},
						};

						responseData = await this.helpers.httpRequest(options);
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : String(error);
					const executionErrorData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: errorMessage }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionErrorData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
