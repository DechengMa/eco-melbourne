import axios from 'axios';
import { HOST } from '../config/urls';

export default axios.create({
	baseURL: { HOST }
});
