import React, { useState } from 'react';
import axios from 'axios';
import './Form.css'

export const Form = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        phone: '',
    });

    const handelInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear error when user types
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        // Validate username
        if (user.name.trim() === '') {
            newErrors.name = 'Username is required';
            isValid = false;
        }

        // Validate phone
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(user.phone)) {
            newErrors.phone = 'Phone number must be a 10-digit number';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handelSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log(user);
            // Sending the data to the backend using Axios
            axios.post("http://localhost:3001/users", user)
                .then((res) => {
                    console.log(res.data);
                    // Handle the response as needed
                })
                .catch((error) => {
                    console.error("Error submitting form:", error);
                    // Handle the error as needed
                });

            setUser({
                name: '',
                email: '',
                phone: '',
            });
        }
    };

    return (
        <form onSubmit={handelSubmit} className='form-main'>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                    type='text'
                    name='name'
                    value={user.name}
                    onChange={handelInputChange}
                />
                {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input
                    type='email'
                    name='email'
                    value={user.email}
                    onChange={handelInputChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Phone number</label>
                <input
                    type='number'
                    name='phone'
                    value={user.phone}
                    onChange={handelInputChange}
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};
