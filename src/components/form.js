import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom'

import { userActions } from './../actions';
import './../styles/main.css';

export class Form extends PureComponent {

	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<div className="context-text">FORM</div>
		);
	};
};