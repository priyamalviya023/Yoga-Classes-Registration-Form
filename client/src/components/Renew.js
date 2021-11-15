import React, { Fragment, useState } from 'react';
import axios from 'axios';

const Renew = () => {

    const [formData, setformData] = useState({
        email: '',
        time_slot: '1',
        age: ''
    });

    const [heading, setheading] = useState('');
    const [emailValidation, setemailValidation] = useState('');
    const [ageValidation, setageValidation] = useState('')

    const onChange = e => {
        setformData({ ...formData, [e.target.name]: e.target.value});
        if(checkEmail(email)){
            setemailValidation('Email is valid');
        } else {
            setemailValidation('Email is invalid');
        }
        if(checkAge(age)){
            setageValidation('Age is valid');
        } else {
            setageValidation('Age should be between 18 and 65 inclusive');
        }
    };

    const checkEmail = (email) => {
        const mailformat = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
        if(email.match(mailformat)){
            return true;
        }
        else{
            return false;
        }
    };
    
    const checkAge = (age) => {
        if(age>='18' && age<='65'){
            return true;
        } else{
            return false;
        }
    }

    const onSubmit = async e => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
    
        const body = JSON.stringify({email, time_slot, age});
    
        try {
            const res = await axios.post('/renew', body, config);
    
            console.log(res.data.msg);
            setheading(res.data.msg);
    
        } catch (err) {
            setheading('Error on submission');
        }
        
    }

    const {email, time_slot, age} = formData;

    return (
        <Fragment>
            <div className='container register'>
                <div className='row'>
                    <div className="col-md-3 register-left">
                        <img src="https://mpng.subpng.com/20180525/bja/kisspng-keiko-aikawa-hot-yoga-meditation-body-yoga-man-5b08d8413368c1.6145502715273063052106.jpg" alt="Yoga"/>
                        <h3>Renew</h3>
                    </div>
                    <div className="col-md-9 register-right">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 className="register-heading">{heading}</h3>
                                <div className="row register-form">
                                    <form onSubmit={ e=> onSubmit(e)}>
                                        <div className="form-group">
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                Email: <br/>
                                                <input type="text" name="email" value={email} onChange= { e => onChange(e) } required/><br />
                                                <h6>{emailValidation}</h6>
                                            </div>
                                            <div className="form-group">
                                                Age: <br />
                                                <input type="number" name="age" value={age} onChange= { e => onChange(e) } min="18" max="65"/><br />
                                                <h6>{ageValidation}</h6>
                                            </div>
                                            <div className="form-group">
                                            Time Slot:
                                                <div onChange= { e => onChange(e) }>
                                                    <input type="radio" key="1" name="time_slot" value="1" /> 5-6
                                                    <input type="radio" key="2" name="time_slot" value="2"  /> 6-7
                                                    <input type="radio" key="3" name="time_slot" value="3" /> 7-8
                                                    <input type="radio" key="4" name="time_slot" value="4"  /> 8-9
                                                </div>
                                            </div>
                                            <input type="submit" class="btnRegister"  value="Renew"/>
                                        </div>
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Renew;
