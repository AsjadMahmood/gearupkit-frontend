import axios from 'axios';

const url = 'http://localhost:1234/users';

export const fetchData = async (country) => {
    try {
        const dataSet = await axios.get(url);
        return dataSet.data;
    }
    catch (error) {
        return error;
    }
}