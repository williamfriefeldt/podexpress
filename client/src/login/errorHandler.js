function ErrorHandler( errorCode ) {
	switch ( errorCode ) {
		case 'auth/wrong-password':
			return 'Fel lösenord';
		case 'auth/invalid-email':
			return 'Felaktigt emailadress';
		case 'auth/user-not-found':
			return 'Inget konto finns';
		default:
			return 'Något gick fel';
	}
	
}

export default ErrorHandler;