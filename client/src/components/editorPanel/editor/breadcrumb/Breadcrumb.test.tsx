import 'jest';
import React from 'react';
import { render } from '@testing-library/react';
import { UIBreadcrumb } from './UIBreadcrumb';

type UIComponentProps = React.ComponentProps<typeof UIBreadcrumb>;

describe.skip('Breadcrumb UI', () => {
	test('component successfully renders', () => {
		const props: UIComponentProps = {
			pathSegments: ['Notebook', 'Groceries', 'List.md'],
			applyDirectoryClickHandler: jest.fn(() => () => {}),
			applyUnsavedChangesIndicator: jest.fn(() => '')
		};

		const { getByTestId } = render(<UIBreadcrumb {...props} />);
		expect(getByTestId('ui-breadcrumb')).not.toBeNull();
	});
});
