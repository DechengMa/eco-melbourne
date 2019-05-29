import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const InputField = props => {
	return (
		<FormControl error={props.error} style={{ width: '200px' }}>
			<InputLabel htmlFor='component-error'>{props.inputName}</InputLabel>
			<Input
				id='component-error'
				value={props.value}
				onChange={props.handleChange}
				name={props.name}
			/>
			<FormHelperText>{props.errorMsg}</FormHelperText>
		</FormControl>
	);
};

export default InputField;
