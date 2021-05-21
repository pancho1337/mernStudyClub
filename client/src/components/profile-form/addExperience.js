import React, { Fragment, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addExperience } from '../../actions/profile'

const AddExperience = ({ addExperience, history}) => {
    const [formData, setFormData] = useState({
        company: "",
        title: "",
        location: "",
        from: "",
        to: "",
        current: false,
        description: ""
    })
    const [toDateDisabled, toggleDisabled] = useState(false)
    const {      
        company,
        title,
        location,
        from,
        to,
        current,
        description
    } = formData
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    return (
        <Fragment>
            <h1 className="large text-primary">
            Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e=>{
                e.preventDefault()
                addExperience(formData, history)
            }}>
                <div className="form-group">
                    <input onChange={e => onChange(e)} value={title} type="text" placeholder="* Job Title" name="title" required />
                </div>
                <div className="form-group">
                    <input onChange={e => onChange(e)} value={company} type="text" placeholder="* Company" name="company" required />
                </div>
                <div className="form-group">
                    <input onChange={e => onChange(e)} value={location} type="text" placeholder="Location" name="location" />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input onChange={e => onChange(e)} value={from} from type="date" name="from" />
                </div>
                <div className="form-group">
                    <p> <input onChange={e => {
                            setFormData({...formData, current: !current})
                            toggleDisabled()
                            }} checked={current} value={current} type="checkbox" name="current" value="" /> {" "}Current Job</p>
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

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
}

export default connect(null, { addExperience })(AddExperience)