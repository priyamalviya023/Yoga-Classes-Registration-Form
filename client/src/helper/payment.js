import axios from 'axios';

const payment = async ({name, email, time_slot}) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email});

    try {
        const res = await axios.post('http://localhost:5000/payment', body, config);

        return res;

    } catch (err) {
        return [{msg: "some error occured"}];
    }
}

export default payment;