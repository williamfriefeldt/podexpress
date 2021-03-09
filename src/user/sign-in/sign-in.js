import { auth } from '../../store/services/firebase';

async function SignIn() {
  return new Promise((resolve, reject) => {
  	const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
   	}, reject);
  });
}

export default SignIn;	