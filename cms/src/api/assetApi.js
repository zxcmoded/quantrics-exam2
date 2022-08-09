import axios from 'axios'
import env from '@/config/dev.env';

const API_URL = `${env.apiUrl}/api/asset`;

async function fetchAssets(filters) {
    var result = await axios.post(`${API_URL}/search`, filters)
    return result;
}

async function addAsset(param) {
    var result = await axios.post(API_URL, param);
    return result;
}

async function updateAsset(param) {
    var result = await axios.put(API_URL, param);
    return result;
}

async function deleteAsset(id) {
    var result = await axios.delete(`${API_URL}?id=${id}`);
    return result;
}

export default {
    fetchAssets,
    addAsset,
    updateAsset,
    deleteAsset
}