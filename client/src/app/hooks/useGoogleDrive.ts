import { useConfig } from '.';
import { useCallback, useEffect } from 'react';
import { OAuth2Client } from 'google-auth-library';
import credentials from '../../googleCredentials.json';

export function useGoogleDrive() {
	const [config] = useConfig();

	const verify = useCallback(
		async (client: OAuth2Client, idToken: string) => {
			const ticket = await client.verifyIdToken({
				idToken,
				audience: credentials.web.client_id
			});

			const payload = ticket.getPayload();

			return payload;
		},
		[config]
	);

	useEffect(() => {
		if (!config) return;
		const provider = config!['cloud.connectedProviders'].find(
			(p) => p.name === 'Google Drive'
		);

		if (!provider) return;

		const client = new OAuth2Client(credentials.web.client_id);

		verify(client, provider.idToken!).then((payload) => {
			console.log(payload?.given_name);
			console.log(payload?.family_name);
			console.log('verified');
		});
	}, [config]);
}
