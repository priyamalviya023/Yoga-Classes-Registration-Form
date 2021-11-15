import React, { Fragment, useState } from 'react';
import axios from 'axios';

const Register = () => {

    const [formData, setformData] = useState({
        name: '',
        email: '',
        time_slot: '1',
        age: '',
        gender: '0'
    });
    const [heading, setheading] = useState('');
    const [emailValidation, setemailValidation] = useState('');
    const [ageValidation, setageValidation] = useState('')

    const onChange = e => {
        setformData({ ...formData, [e.target.name]: e.target.value});
        console.log(e.target);
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
        const body = JSON.stringify({name, email, time_slot, age, gender});
    
        try {
            const res = await axios.post('/register', body, config);
            console.log(res.data.msg);
            setheading(res.data.msg);
    
        } catch (err) {
            setheading('Error on submission');
        }
        
    }

    const {name, email, time_slot, age, gender} = formData;

    return (
        <Fragment>
            <div className='container register'>
                <div className='row'>
                    <div className="col-md-3 register-left">
                        <img src="https://mpng.subpng.com/20180525/bja/kisspng-keiko-aikawa-hot-yoga-meditation-body-yoga-man-5b08d8413368c1.6145502715273063052106.jpg" alt=""/>
                        <h3>Register</h3>
                    </div>
                    <div className="col-md-9 register-right">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 className="register-heading">{heading}</h3>
                                <div className="row register-form">
                                    <form onSubmit={ e=> onSubmit(e)}>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                Name:<br />
                                                <input type="text" name="name" value={name} onChange= { e => onChange(e) } required/><br />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="container" onChange= { e => onChange(e) }>
                                                <label className="radio inline" > 
                                                    <input type="radio" name="gender" value="0"  />
                                                    <span> Male </span> 
                                                </label>
                                                <label className="radio inline ml-2"> 
                                                    <input type="radio" name="gender" value="1" />
                                                    <span> Female </span> 
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                Email: <br />
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
                                            <input type="submit" class="btnRegister"  value="Register"/>
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

export default Register;
