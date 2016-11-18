import * as firebase from 'firebase';

export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export const CREATE_MESSAGE = 'CREATE_MESSAGE';
export const LOGGED_USER = 'LOGGED_USER';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_USER = 'LOGOUT_USER';

const config = {
	apiKey: "AIzaSyDOAf1muIxSD8E6iJKvQtpTEJbe6j64r-o",
	authDomain: "chatredux-a3b1d.firebaseapp.com",
	databaseURL: "https://chatredux-a3b1d.firebaseio.com",
	storageBucket: "chatredux-a3b1d.appspot.com",
	messagingSenderId: "510476921018"
};

const app = firebase.initializeApp(config);


export function logIn(user) {
	return {
		type: LOGGED_USER,
		user
	};
}

export function logInError(error) {
	return {
		type: LOGIN_ERROR,
		error
	};
}

export function logOut() {
	return {
		type: LOGOUT_USER
	};
}

export function fetchMessages() {
	return (dispatch) => {
		app.database().ref('messages/').on('value', (snapshot) => {
			let messages = [];
			let messagesObj = snapshot.val();

			for (let keyIndex in messagesObj) {
				const message = {
					id: keyIndex,
					userName: messagesObj[keyIndex].userName,
					userPhoto: messagesObj[keyIndex].userPhoto,
					text: messagesObj[keyIndex].text,
					time: messagesObj[keyIndex].time
				}

				messages.push(message);
			}

			dispatch(getMessages(messages));
		});
	}
}

export function getMessages(messages) {
	return {
		type: FETCH_MESSAGES,
		messages
	};
}

export function createMessage(formProps) {
	app.database().ref('messages/').push(formProps);

	return {
		type: CREATE_MESSAGE
	}
}