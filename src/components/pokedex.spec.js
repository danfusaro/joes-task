import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';

import { Pokedex } from './components';

describe('Pokedex', () => {
	it('renders without crashing', () => {
		const wrapper = shallow(<Pokedex />);
		console.log("wrapper.find('div')", wrapper.find('div'));
	  	expect(wrapper.find('div')).to.have.lengthOf(3);
	});	
})