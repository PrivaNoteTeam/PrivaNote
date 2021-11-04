import { verifyUser } from '@shared/Api/verifyUser';
import { getFileName, parseCodeFromUrl } from '@shared/utils';
import { ipcRenderer } from 'electron';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useConfig, useStore } from '.';

const createListener = (channel: string, callback: (...args: any) => void) => {
	ipcRenderer.removeAllListeners(channel);
	ipcRenderer.on(channel, callback);
};

export function useIpcListeners() {
	const [{ currentNote, notebook }, dispatch] = useStore();
	const [, configDispatch] = useConfig();
	let history = useHistory();

	useEffect(() => {
		createListener('createNotebook', () => {
			history.push('/notebook/create');
		});

		createListener(
			'openNotebook',
			(_, location: string, valid: boolean) => {
				if (!valid) {
					alert(
						`"${getFileName(location)}" is not a valid notebook.`
					);

					return;
				}

				dispatch({
					type: 'openNote',
					currentNote: undefined
				});

				dispatch({
					type: 'openNotebook',
					notebook: location
				});

				configDispatch({
					type: 'LOAD',
					payload: location
				});
			}
		);

		createListener('exportNote', () => {
			ipcRenderer.send('currentFileToExport', currentNote);
		});

		createListener(
			'googleDriveAuth',
			(_, accessToken: string, refreshToken: string, idToken: string) => {
				if (!notebook) return;

				configDispatch({
					type: 'ADD_PROVIDER',
					payload: {
						providerName: 'Google Drive',
						path: notebook,
						accessToken,
						refreshToken,
						idToken
					}
				});
			}
		);

		createListener('removeCloudProvider', (_, providerName: string) => {
			console.log(providerName);
		});

		createListener('url-privanote', (_, url) => {
			// parse code out of url
			const code = parseCodeFromUrl(url, 'resetPassword');
			// if successful, render reset password
			verifyUser({ verificationCode: code })
				.then((response) => {
					console.log(code);
					console.log(response);
					if (response.user) {
						history.push('/reset-password');
					}
				})
				.catch((err) => {
					console.error(err);
				});
		});
	}, [currentNote, notebook]);
}
