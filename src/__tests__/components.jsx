import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PoptartProvider, usePoptart } from '../../dist/esm/index';

// Mock helper functions
jest.mock('../helpers', () => ({
	generateSecureString: jest.fn().mockReturnValue('mock-id'),
	getContrastColor: jest.fn().mockReturnValue('#FFFFFF'),
}));

// Test Component to consume the PoptartContext
const TestComponent = () => {
	const { push, dismiss, poptarts } = usePoptart();

	const handlePush = () => {
		// Set custom duration to 1 second (1000 ms) for faster auto-dismiss
		push({ message: 'Test message', type: 'success', duration: 1000 });
	};

	const handleDismiss = id => {
		dismiss(id);
	};

	return (
		<div>
			<button onClick={handlePush}>Push Poptart</button>
			<ul>
				{poptarts.map(poptart => (
					<li key={poptart.id}>
						{poptart.props.message}
						<button onClick={() => handleDismiss(poptart.id)}>Dismiss</button>
					</li>
				))}
			</ul>
		</div>
	);
};

describe('PoptartProvider', () => {
	it('renders the provider and can push a poptart', async () => {
		render(
			<PoptartProvider>
				<TestComponent />
			</PoptartProvider>,
		);

		// Click to push a poptart
		fireEvent.click(screen.getByText('Push Poptart'));

		// Assert that the poptart is pushed
		await waitFor(() => {
			const listItems = screen.queryAllByRole('listitem');
			expect(listItems.length).toBeGreaterThan(0); // Check that list is populated
		});

		// Use getAllByText to handle multiple matches
		const messages = screen.getAllByText('Test message');
		expect(messages.length).toBeGreaterThan(0); // Ensure there are multiple messages
	});

	it('dismisses a poptart', async () => {
		render(
			<PoptartProvider>
				<TestComponent />
			</PoptartProvider>,
		);

		// Push a poptart
		fireEvent.click(screen.getByText('Push Poptart'));

		// Ensure the poptart is rendered
		const messages = screen.getAllByText('Test message');
		expect(messages.length).toBeGreaterThan(0);

		// Dismiss the poptart
		fireEvent.click(screen.getByText('Dismiss'));

		// Wait for the poptart to be removed
		await waitFor(() => {
			const listItems = screen.queryAllByRole('listitem');
			expect(listItems.length).toEqual(0); // Assert that the list is empty
		});
	});

	it('correctly sets the duration and auto-dismisses', async () => {
		render(
			<PoptartProvider>
				<TestComponent />
			</PoptartProvider>,
		);

		// Push a poptart with a short duration of 1 second (1000ms)
		fireEvent.click(screen.getByText('Push Poptart'));

		// Verify poptart is rendered
		const messages = screen.getAllByText('Test message');
		expect(messages.length).toBeGreaterThan(0);

		// Wait for the poptart to be auto-dismissed
		await waitFor(
			() => {
				const listItems = screen.queryAllByRole('listitem');
				expect(listItems.length).toEqual(0); // Ensure the poptart is auto-dismissed
			},
			{ timeout: 2000 }, // Adjusted timeout to 2 seconds for the shorter duration
		);
	});
});
