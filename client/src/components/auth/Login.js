import React, {Fragment, useState} from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const [ formData, setFormData ] = useState({
        email: '',
        password: ''
    })
    const { email, password } = formData
    const formUpdate = e => setFormData({...formData, [e.target.name]: e.target.value })
    const submitForm = async e => {
        e.preventDefault()
            // const newUser = {
            //     name,
            //     email,
            //     password,
            //     password2
            // }
            // try {
            //     const config = {
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     }
            //     const body = JSON.stringify(newUser)
            //     const res = await axios.post('/api/users', body, config)
            //     console.log(res.data)
            // } catch (error) {
            //     console.error(error.response.data)
            // }
    }

    return(
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into your account</p>
            <form className="form" onSubmit={e => submitForm(e)}>
                <div className="form-group">
                    <input 
                        type="email"
                        placeholder="Email Address" 
                        name="email" 
                        value={email} 
                        onChange={ (e) => formUpdate(e) } 
                        required
                    />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    value={password} 
                    onChange={ (e) => formUpdate(e) } 
                    autoComplete="on"
                    required
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    )
}

export default Login