import { User, MockContext, Context } from '../../types';
import Mailer from 'nodemailer/lib/mailer';
import { sendVerificationEmail } from '../sendVerificationEmail';
import { createMockContext } from '../../mocks/createMockContext';

describe('sendVerificationEmail service', () => {
	let user: User;
	let mockCtx: MockContext;
	let ctx: Context;

	beforeEach(() => {
		user = {
			email: 'john.doe@email.com',
			userID: 1,
			verified: true,
			firstName: null,
			lastName: null
		};

		mockCtx = createMockContext();
		ctx = mockCtx as unknown as Context;

		jest.spyOn(Mailer.prototype, 'sendMail').mockImplementation(
			async (mailOptions) => {
				return mailOptions;
			}
		);
	});

	test('sends an email', async () => {
		await sendVerificationEmail(ctx, user);
		expect(Mailer.prototype.sendMail).toHaveBeenCalled();
	});

	test('email is sent to user', async () => {
		await sendVerificationEmail(ctx, user);
		expect(Mailer.prototype.sendMail).toHaveBeenLastCalledWith({
			from: expect.anything(),
			to: user.email,
			subject: 'Verify your email',
			text: expect.anything(),
			html: expect.anything()
		});
	});
});
