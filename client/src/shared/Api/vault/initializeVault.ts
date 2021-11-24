import { getNotebookLocation } from '@shared/notebook';
import {
	detectStructureChanges,
	getItemFromStructure,
	getNotebookStructure
} from '@synchronization';
import {
	downloadAFile,
	uploadEntireNotebook,
	vaultUpstream,
	vaultDownstream
} from '@vault';
import { NotebookStructure } from '@types';
import p from 'path';

let notebookLocation: string;
let notebookStructure: NotebookStructure;

const initialSync = async () => {
	const notebookStructureItem = await getItemFromStructure(
		p.join(notebookLocation, '.privanote', 'notebookStructure.json')
	);
	const res = await downloadAFile(notebookStructureItem);

	const cloudStructureItem: NotebookStructure = res ? JSON.parse(res) : '';

	if (cloudStructureItem) {
		// start syncing
		const response = detectStructureChanges(cloudStructureItem);
		if (!response) {
			console.log(
				'No Changes detected, cloud and local match for PrivaNote Vault'
			);
		}
		if (response && response.type === 'LOCAL') {
			console.log('Changing local to match cloud');
			for (let change of response.changes) {
				await vaultDownstream(change.action, change.content);
			}
		}

		if (response && response.type === 'CLOUD') {
			console.log('Changing cloud to match local');
			for (let change of response.changes) {
				await vaultUpstream(change.action, change.content);
			}
		}

		return;
	} else {
		// upload entire notebook
		try {
			await uploadEntireNotebook(notebookStructure);
		} catch (error) {
			console.log(error);
		}
	}
};

export const initializeVault = async () => {
	console.log('From Initialize Vault');
	notebookLocation = getNotebookLocation();
	notebookStructure = getNotebookStructure();

	await initialSync();
};
