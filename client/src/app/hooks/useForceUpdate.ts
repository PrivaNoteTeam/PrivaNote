import { useState } from 'react';

export function useForceUpdate() {
	const [trigger, setTrigger] = useState(false);

	const forceUpdate = () => {
		setTrigger(!trigger);
	};

	return forceUpdate;
}
