import React from 'react';
import { connect } from 'react-redux';
import { fetchMessages, logIn, logInError, logOut } from '../actions/index';
import NewMessage from './new-message';
import SmartScroller from './smart-scroller';
import * as firebase from 'firebase';

class Messages extends React.Component {
	componentWillMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				// User is signed in.
				this.props.logIn(user);
				this.props.fetchMessages();
			} else {
				// No user is signed in.
				const provider = new firebase.auth.GoogleAuthProvider();
				firebase.auth().signInWithPopup(provider).then((result) => {
					// The signed-in user info.
					this.props.logIn(result.user);
					this.props.fetchMessages();
				}).catch((error) => {
					// Handle Errors here.
					this.props.logInError(error);
				});
			}
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.messagesList.length !== this.props.messagesList.length) {
			this.props.fetchMessages();
		}
	}

	onLogOut() {
		firebase.auth().signOut();
		this.props.logOut();
	}

	renderMessages() {
		return this.props.messagesList.map((message, index) => {
			return (
				<li key={message.id}>
					<div className="chat-item">
						<div className="chat-image">
							<a href={message.userPhoto} target="_blank" title={message.userName}>
								<img className="img-user" src={message.userPhoto} alt={message.userName} />
							</a>
							<div className="time-user">{message.time}</div>
						</div>
						<div className="chat-message">
							{message.text}
						</div>
					</div>
				</li>
			);
		});
	}

	render() {
		const { user, messagesList, error } = this.props;
		let backgroundProfile = 'transparent';

		if (error) {
			return <div>Error {error.code} {error.message}</div>;
		}

		if (!user) {
			return <div>Loading ...</div>
		} else {
			backgroundProfile = `url(${user.photoURL})`;
		}

		return (
			<div className="main-container">
				<div className="profile-container col-md-3" style={{background: backgroundProfile}}>
					<div className="content">
						<h3 className="text-center">
							<img className="img-circle" width="100" src={user.photoURL} alt={user.displayName}/><hr/>{user.displayName}
						</h3>
						<div className="text-center">
							Messages {messagesList.length} <hr/>
							<button onClick={this.onLogOut.bind(this)} type="button" className="btn btn-primary">Log Out</button>
						</div>
					</div>
				</div>
				<div className="chat-container col-md-9">
					<SmartScroller className="messages-container">
						<ul className="list-unstyled">
							{(messagesList.length) ? this.renderMessages() : ''}
						</ul>
					</SmartScroller>
					<NewMessage user={user} />
				</div>
			</div>
		);
	}
};

function mapStateToProps(state) {
	return {
		messagesList: state.messages.list,
		user: state.messages.user,
		error: state.messages.error
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchMessages: () => dispatch(fetchMessages()),
		logIn: (user) => dispatch(logIn(user)),
		logInError: (error) => dispatch(logInError(error)),
		logOut: () => dispatch(logOut())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);