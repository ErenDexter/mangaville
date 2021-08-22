import admin from 'firebase-admin';

const cred = {
	type: 'service_account',
	project_id: 'mangaville-35324',
	private_key_id: '6085e1a69637e191a510e433b0c622c3df7f476c',
	private_key:
		'-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCaM2mEw2VjqRZR\nUSP9ynhkph2Mi16wZPeIzqG4UiknPk6FALKjBaGwMnFJ7QL/6cf2UcUGT7OyxNgE\nmluQYzNjpEkXnIaljCb8eH0n8FlBpvJnMrXRwXRaAhA0qY06ol6om7AcFZ5ZNbZK\nj5Phd+kdHgfCbNpTimk7xJxyYJddsNHTiPLkQwdL/m0CrhYBRYZbUmIVAyXPL8l5\nDoKgLy4It7/ukG1epNXQ5D/dC2BlG0oi+mUD2Fctppz55fS8loE3yMRl2uRz0VyS\na6xFmak8oQOgiR/VnoEymLMPXXGM0IqFedVrs9s05ni5oAC1Cc7Z9xnB/XOQUk46\n+V0Mvp+xAgMBAAECggEAAWZ6Hx2qkJzWejBH361GvFNAJE0p/PeEnaiSttGBVHPm\n98fyssVvLZkDGTdVf1qWIpES9UAACgtF3BBFEb0rvN56fJZnlgwhxoCXUl5iY2cY\nbQJYBg9TZJgkM9GnfmLRX4cssobg39FgMY23Fu6AsN0AF+VUl19WHeEdxN+PrguL\nZ7pD7xv/W6VnsREcvLdvSeDBW2wL8FQdlJoYDLS+71Zux2KTJy0HV9sqCu93a9pp\nihkGzNYr9q17TjTTi68nNsEWo5FAig8AJoprk2TcDvs/V5WnEoMdVuW3jeFpWDpX\nSiO1j5JnBFtHW4oCPBgmyufGzuKSRNqLbY8vGYht6QKBgQDTwrPV1kvYr2+myZlW\ne9DUopnHd++N2ua2xNtZ5172DwtXEPb1MgNoOahtruEinsdsMFU1VxKverQhSAMu\ng0pFTKZlopuMgYrPymDbMy0SHUYWjg+wNMIH6lQWtrkgiiKBdcZ5sZ1QHHrSEN+s\n5yV5k7W3fi2kmVlNXaTSmWXLrwKBgQC6alJ+agv/M+M+1JJvlleQlqi10i4Lz2Rl\nWkEimf34CBQ1seEiX+yqSpJiylX2ii2pIJywSWt4obvsSEIg07pVpPOPhH4ZcO/w\nSBqe4swyKtZsh6lUhQFoUSdphBoE2EqxuAMgTpERGSdRoSiFSdq77sB2YbKNtN8S\nw2GHzp5CnwKBgQDPX2VjLGe8PBl32QbbpYbdJJq5tt8WKN807tTsVuMszZDKY6ek\neKTThVtGhjKdB6a9cRuQj8ORqvUJfo73FsU91hFBiJsRXq7ETCjLoHMrwRUo81ez\ntAarX7OXRrtGfV/LLb3+4IvwruMsIjAZD4coZxlWJy+leDL2y5SkVGpWqwKBgQCb\ntPVk3AVbTCbzMzGBfW10uzL+dCm7+aYdNk8TrNbC11SyKPso8EDJWPJ/DAzTmkVb\ncH8QjLL1FvrV+OErdE6+/MHoTb3aWEhCRqfdsQjomnlyO7qHe3VagfbOnuXwyA1T\n9qS91oI7auw5tcgX1UGcGmeuOhqfXMW7cXFEs6PjdwKBgQCZgMAqHStD2cQpcpai\n6W0iOuaHWa/a4ZviHpGrzcsGIt58QMT9BlcD5tUr40dKGQaNcBNnlIb3D8BWN5V2\nhd0p/8Csu/9rBnFpodnCckwGD7ZIZpHGAHaRJYxOv4RELHZWyIWausMpDbXDX9n/\nBGGofvhn71hs7AAsf2Dp4L5Y2Q==\n-----END PRIVATE KEY-----\n',
	client_email: 'firebase-adminsdk-yydwq@mangaville-35324.iam.gserviceaccount.com',
	client_id: '106490905575912007800',
	auth_uri: 'https://accounts.google.com/o/oauth2/auth',
	token_uri: 'https://oauth2.googleapis.com/token',
	auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
	client_x509_cert_url:
		'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-yydwq%40mangaville-35324.iam.gserviceaccount.com'
};

if (admin.apps.length === 0) {
	admin.initializeApp({
		credential: admin.credential.cert(cred)
	});
}

const db = admin.firestore();

async function getManga(link = '') {
	try {
		const docRef = db.collection('manga').doc(link);
		const response = await docRef.get();
		return response.data();
	} catch (e) {
		console.log(e);
	}
}

export async function get({ params }) {
	let { link } = params;
	const resData = await getManga(link);
	return {
		body: resData
	};
}
