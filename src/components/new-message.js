import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createMessage } from '../actions/index';

export class NewMessage extends Component {
	onSubmitForm(formProps) {
		const {resetForm, resetInput, user} = this.props;
		const time = new Date(new Date().getTime()).toLocaleTimeString();

		formProps['userName'] = user.displayName;
		formProps['userPhoto'] = user.photoURL;
		formProps['time'] = time;

		this.props.createMessage(formProps);
		resetForm();
	}

	render() {
		const { fields: {text}, handleSubmit } = this.props;

		if (!text.value) {
			text.value = '';
		}

		return (
			<div className="new-message-container">
				<form onSubmit={ handleSubmit(this.onSubmitForm.bind(this)) }>
					<div className={`form-textarea ${text.touched && text.invalid ? 'has-danger' : ''}`}>
						<textarea className="form-control" {...text} placeholder="Type your message..." />
						<div className="text-danger">
							{text.touched ? text.error : ''}
						</div>
					</div>
					<button type="submit" className="btn btn-primary">Send</button>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	if (!values.text || values.text.trim() === '') {
		errors.text = 'Enter a message';
	}

	return errors;
}

function mapDispatchToProps(dispatch) {
	return {
		createMessage: (formProps) => dispatch(createMessage(formProps))
	};
}

export default reduxForm({
	form: 'NewMessage',
	fields: ['text'],
	validate
}, null, mapDispatchToProps)(NewMessage);