import {
	FETCH_MESSAGES,
	LOGGED_USER,
	LOGIN_ERROR,
	LOGOUT_USER
} from '../actions/index';

let INITIAL_STATE = { list: [], user: null, token: null, error: null };

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case LOGGED_USER:
			return { ...state,
				user: action.user,
				error: null
			}
		case LOGOUT_USER:
			return { ...state,
				user: null,
				error: null
			}
		case LOGIN_ERROR:
			return { ...state,
				error: action.error
			}
		case FETCH_MESSAGES:
			return { ...state,
				list: action.messages
			}
		default:
			return state;
	}
}