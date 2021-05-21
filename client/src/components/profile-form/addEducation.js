import React, { Fragment, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addEducation } from '../../actions/profile'

const AddEducation = ({ addEducation, history}) => {
    const [formData, setFormData] = useState({
        school: "",
        degree: "",
        fieldofstudy: "",
        from: "",
        to: "",
        current: false,
        description: ""
    })
    const [toDateDisabled, toggleDisabled] = useState(false)
    const {      
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = formData
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    return (
        <Fragment>
            <h1 className="large text-primary">
            Add Education
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add school or institution
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e=>{
                e.preventDefault()
                addEducation(formData, history)
            }}>
                <div className="form-group">
                    <input onChange={e => onChange(e)} value={degree} type="text" placeholder="* Degree" name="degree" required />
                </div>
                <div className="form-group">
                    <input onChange={e => onChange(e)} value={school} type="text" placeholder="* School or Institution" name="school" required />
                </div>
                <div className="form-group">
                    <input onChange={e => onChange(e)} value={fieldofstudy} type="text" placeholder="Field of Study" name="fieldofstudy" />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input onChange={e => onChange(e)} value={from}  type="date" name="from" />
                </div>
                <div className="form-group">
                    <p> <input onChange={e => {
                            setFormData({...formData, current: !current})
                            toggleDisabled()
                            }} checked={current} value={current} type="checkbox" name="current" value="" /> {" "}Current education</p>
                </div>
                <div className="form-group">
                <h4>To Date</h4>
                    <input onChange={e => onChange(e)} value={to} type="date" name="to" disable={toDateDisabled ? 'disabled' : ''} />
                </div>
                <div className="form-group">
                <textarea
                    onChange={e => onChange(e)} 
                    value={description} 
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Job Description"
                ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
}

export default connect(null, { addEducation })(AddEducation)
