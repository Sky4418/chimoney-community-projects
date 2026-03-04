import type {
	IauthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
		NodeProperties,
} from 'n8n-workflow';

export class ChimoneyApi implements ICredentialType {
	name = 'chimoneyApi';
	
	$displayName = 'Chimoney API';
	
	$documentationUrl = 'https://chimoney.readme.io/';
	
	$properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your Chimoney API key from the dashboard',
		},
		{
			displayName: 'Environment',
			name: 'environment',
			type: 'options',
			default: 'production',
			options: [
			{
				name: 'Production',
				value: 'production',
			},
			{
				name: 'Sandbox',
				value: 'sandbox',
			},
			],
			description: 'Choose between production and sandbox environment',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-Key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.environment === "sandbox" ? "https://api.chimoney.io/v1" : "https://api.chimoney.io/v1"}}',
			url: '/info',
			method: 'GET',
		},
	};
}