import axios from 'axios'
import env from '@/config/dev.env';

const API_URL = `${env.apiUrl}/api/Invoice`;

async function fetchInvoice() {
    var result = await axios.get(API_URL)
    return result;
}

async function generateInvoice() {
    var result = await axios.post(API_URL);
    return result;
}

export default {
    fetchInvoice,
    generateInvoice
}