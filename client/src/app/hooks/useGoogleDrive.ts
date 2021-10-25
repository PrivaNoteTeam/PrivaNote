import { useConfig } from '.';
import { useCallback, useEffect } from 'react';
import { OAuth2Client } from 'google-auth-library';
import credentials from '../../googleCredentials.json';

export function useGoogleDrive() {
	const [config] = useConfig();

	const verify = useCallback(
		async (client: OAuth2Client, token: string) => {
			const ticket = await client.verifyIdToken({
				idToken: token,
				audience: credentials.web.client_id
			});

			const payload = ticket.getPayload();

			return payload;
		},
		[config]
	);

	useEffect(() => {
		const provider = config?.connectedProviders.find(
			(p) => p.name === 'Google Drive'
		);

		if (!provider) return;

		const client = new OAuth2Client(credentials.web.client_id);

		verify(client, provider.token!).then((payload) => {
			console.log(payload?.given_name);
			console.log(payload?.family_name);
			console.log('verified');
		});
	}, [config]);
}
/*const provider = config.connectedProviders.find((p) => {
            return p.name === 'Google Drive'
        }) as Provider;
        /*
        client.verifyIdToken({
            idToken: provider.token!,
            audience: clientId
        })
            .then((ticket) => {
                const payload = ticket.getPayload();
                console.log(payload?.given_name);
            })
            .catch((err) => console.error(err));
    }, [client, clientId, config])   

   }} */
