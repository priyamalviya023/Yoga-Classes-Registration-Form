import axios from 'axios';

const renew = async ({email, time_slot, age}) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email, time_slot, age});

    try {
        const res = await axios.post('http://localhost:5000/renew', body, config);

        console.log(res.data);

        return res.data;

    } catch (err) {
        return {msg: "some error occured"};
    }
}

export default renew;