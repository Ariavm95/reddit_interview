import axios from 'axios';
import {API_BASE} from '@env';

if(!API_BASE) alert('You need to set API_BASE in the .env file')

axios.defaults.baseURL = API_BASE;