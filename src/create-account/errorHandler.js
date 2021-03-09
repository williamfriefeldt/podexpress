function ErrorHandler( errorCode ) {
	console.error( errorCode);
	switch ( errorCode ) {
		case 'auth/weak-password':
			return 'För svagt lösenord';
		case 'auth/invalid-email':
			return 'Felaktigt emailadress';
		case 'auth/email-already-in-use':
			return 'Ett konto med den emailen finns redan';
		default:
			return;
	}
}

export default ErrorHandler;