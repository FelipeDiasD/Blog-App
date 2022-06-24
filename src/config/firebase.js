import firebase from 'firebase/compat/app'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAUp5jqgxDnNTSHA8BkcV05tp-4xDtDnyM',
  authDomain: 'authentication-blog-47be5.firebaseapp.com',
  projectId: 'authentication-blog-47be5',
  storageBucket: 'authentication-blog-47be5.appspot.com',
  messagingSenderId: '1015835130858',
  appId: '1:1015835130858:web:f1e305e12bb723fb5a9093'

  //...
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
// Your web app's Firebase configuration

export default firebaseApp
