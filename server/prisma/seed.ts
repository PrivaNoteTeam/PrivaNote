import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	const subscriptionPlan = await prisma.subscriptionPlan.create({
		data: {
			name: 'Monthly Plan',
			description:
				'Sync unlimited devices. 10GB monthly uploads. 200MB max. note size. Billed 			every month. Pay as you go.',
			price: 2.99,
			duration: 30
		}
	});

	await prisma.subscriptionPlan.create({
		data: {
			name: 'Annual Plan',
			description:
				'Sync unlimited devices. 15GB monthly uploads. 300MB max. note size. Saves 15%. Billed every year. Pay as you go.',
			price: 29.99,
			duration: 365
		}
	});

	const user = await prisma.user.create({
		data: {
			firstName: 'Tom',
			lastName: 'Laufey',
			email: 'tom.laufeyhgfddhj1982@hotmail.com',
			password: 'fPej51Vjea=ebenPqjbw3pqigo+me[',
			verified: true,
			Settings: {
				create: {
					EditorSettings: {
						create: {
							fontSize: 14,
							spellCheck: true,
							columns: 144,
							dictionaryLanguage: 'en-ca',
							fontFamily: 'Times New Roman',
							tabWidth: 4
						}
					}
				}
			}
		}
	});

	await prisma.oneTimeVerificationCode.create({
		data: {
			code: '123456',
			expiresAt: new Date('2021-06-21 20:32:40'),
			User: { connect: { userID: user.userID } }
		}
	});

	await prisma.vaultSubscription.create({
		data: {
			purchasedAt: new Date('2021-05-20 18:32:43'),
			recurring: true,
			SubscriptionPlan: {
				connect: { planID: subscriptionPlan.planID }
			},
			User: { connect: { userID: user.userID } }
		}
	});

	const notebook = await prisma.notebook.create({
		data: {
			createdAt: new Date('2021-12-02 00:03:58'),
			updatedAt: new Date('2021-12-10 05:15:23'),
			name: '7bXYUXlgqC',
			User: {
				connect: { userID: user.userID }
			}
		}
	});

	const folder = await prisma.folder.create({
		data: {
			name: 'sGjof2CKQt',
			createdAt: new Date('2021-12-02 16:17:56 '),
			updatedAt: new Date('2021-12-16 09:18:41'),
			Notebook: {
				connect: { bookID: notebook.bookID }
			}
		}
	});

	await prisma.attachment.create({
		data: {
			createdAt: new Date('2021-12-02 00:03:58'),
			fileName: 'xGfrgXq22u',
			mimeType: 'Bgq6I6h',
			blobValue:
				'6wTEv4fKZJkShOd X2lz20tyNDBCnllC7bywEddVBSy5mgaE8fXS5EYTNjE1qJGBBEA9KQz',
			Notebook: {
				connect: {
					bookID: notebook.bookID
				}
			}
		}
	});

	const page = await prisma.page.create({
		data: {
			name: 'niAAMatxzE',
			createdAt: new Date('2021-12-02 00:03:58'),
			updatedAt: new Date('2021-12-02 00:03:58'),
			content:
				'7njdbWTB0kK+C9FBiT6bQdGbwOmeU+IvsOwYrzrSyB+C9FBiT6bQdGbwO==',
			Folder: {
				connect: { folderID: folder.folderID }
			}
		}
	});

	const attachment = await prisma.attachment.create({
		data: {
			createdAt: new Date('2021-12-02 00:03:58'),
			fileName: 'frfrfrtthh6h',
			mimeType: 'Bgq6I6h',
			blobValue:
				'6wTEv4fKZJkShOd X2lz20tyNDBCnllC7bywEddVBSy5mgaE8fXS5EYTNjE1qJGBBEA9KQz',
			Notebook: {
				connect: {
					bookID: notebook.bookID
				}
			}
		}
	});
	await prisma.attachment_Page.create({
		data: {
			Page: {
				connect: { pageID: page.pageID }
			},
			Attachment: {
				connect: { attachmentID: attachment.attachmentID }
			}
		}
	});
}

main()
	.catch((e) => {
		console.log(e);
		process.exit(1);
	})
	.finally(() => {
		prisma.$disconnect();
	});
