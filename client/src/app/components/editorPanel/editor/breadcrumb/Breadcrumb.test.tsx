import 'jest';
import React from 'react';
import { render } from '@testing-library/react';
import { UIBreadcrumb } from './UIBreadcrumb';
import { useBreadcrumb } from './useBreadcrumb';
import { StoreProvider } from '@hooks';
import { AppState } from '@types';

type UIComponentProps = React.ComponentProps<typeof UIBreadcrumb>;

describe.skip('Breadcrumb UI', () => {
	test('component successfully renders', () => {
		const applyDirectoryClickHandlerImplementation =
			(_: string, __: number) => () =>
				undefined;

		const props: UIComponentProps = {
			pathSegments: ['Notebook', 'Groceries', 'List.md'],
			applyUnsavedChangesIndicator: jest.fn(),
			applyDirectoryClickHandler: jest.fn(
				applyDirectoryClickHandlerImplementation
			)
		};

		const { getByTestId } = render(<UIBreadcrumb {...props} />);
		expect(getByTestId('ui-breadcrumb')).not.toBeNull();
	});
});

describe.skip('Breadcrumb Logic', () => {
	const UseBreadcrumbExample = ({ unsaved }: { unsaved: boolean }) => {
		const { pathSegments } = useBreadcrumb({ unsaved });

		return (
			<div>
				<p data-testid=''></p>
				<p data-testid='path-segments'>{pathSegments}</p>
			</div>
		);
	};

	const initialState: AppState = {
		notebook: '/Users/admin/Documents/notebook',
		currentFile: {
			name: 'segments.md',
			path: 'testing/path/segments.md'
		}
	};

	test('returns path segments as expected from global state', () => {
		const expected = 'notebook/testing/path/segments.md';
		const { getByTestId } = render(
			<StoreProvider initialState={initialState} reducer={jest.fn()}>
				<UseBreadcrumbExample unsaved={false} />
			</StoreProvider>
		);

		expect(getByTestId('path-segments').textContent).toEqual(expected);
	});
});
