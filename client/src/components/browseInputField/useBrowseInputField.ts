import { ipcRenderer } from 'electron';
import { SetFieldValue } from 'react-hook-form';

interface Props {
	name: string;
	setValue: SetFieldValue<any>;
}

export function useBrowseInputField({ name, setValue }: Props) {
	const handleClick = async () => {
		const directory = await ipcRenderer.sendSync('selectDirectory');
		setValue(name, directory, { shouldValidate: true });
	};

	return { handleClick };
}
