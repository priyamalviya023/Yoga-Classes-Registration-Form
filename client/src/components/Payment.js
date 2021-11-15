import React, { Fragment, useState } from 'react';
import axios from 'axios';


const Register = () => {

    const [formData, setformData] = useState({
        email: ''
    });
    const [heading, setheading] = useState('');

    const onChange = e => {
        setformData({ ...formData, [e.target.name]: e.target.value})
    };

    const onSubmit = async e => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
    
        const body = JSON.stringify({email});
    
        try {
            const res = await axios.post('http://localhost:5000/payment', body, config);
    
            console.log(res.data.msg);
            setheading(res.data.msg);
    
        } catch (err) {
            setheading("some error occured");
        }
        
    }

    const {email} = formData;

    return (
        <Fragment>
            <h1 className="heading text-center">Payment Portal</h1>
            
            <div className="container text-center mt-5">
                <h4 className="heading text-center bg-success rounded">{heading}</h4>
                <form className="form-outline" onSubmit={ e=> onSubmit(e)}>
                    <label>
                        <input type="text" className="rounded mt-5" name="email" placeholder="email" value={email} onChange= { e => onChange(e) } required/>
                    </label>
                    <input type="submit" className="btn btn-sm btn-primary" value="Pay Rs 500/-" />
                </form>
            </div>
        </Fragment>
    );
}

export default Register;
