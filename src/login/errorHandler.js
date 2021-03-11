function ErrorHandler( errorCode ) {

	switch ( errorCode ) {
		case 'auth/wrong-password':
			return 'Fel lösenord';
		case 'auth/invalid-email':
			return 'Felaktigt emailadress';
		default:
			return;
	}
	
}

export default ErrorHandler;