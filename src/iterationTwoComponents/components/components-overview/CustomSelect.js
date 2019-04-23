import React from 'react';
import { InputGroup, FormSelect } from 'shards-react';

const CustomSelect = props => (
	<div>
		<InputGroup className='mb-3'>
			<FormSelect
				name={props.name}
				value={props.value}
				onChange={props.handleChange}
			>
				<option>1</option>
				<option>2</option>
				<option>3</option>
				<option>4</option>
				<option>5</option>
				<option>6</option>
				<option>7</option>
			</FormSelect>
		</InputGroup>
	</div>
);

export default CustomSelect;
