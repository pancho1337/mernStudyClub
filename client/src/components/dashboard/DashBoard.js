import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layouts/spinner'
import DashBoardActions from './DashBoardActions'
import Experience from './experience'
import Education from './education'
import { getCurrentProfile } from '../../actions/profile'
import { Link } from 'react-router-dom'

const Dashboard = ({ 
    getCurrentProfile, 
    auth: { user }, 
    profile: { profile, loading } 
}) => {
    useEffect( () => {
        getCurrentProfile()
    }, [])
    return loading && profile === null ? 
        <Spinner /> :
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">
                    Dashboard
                </h1>
                <p className="lead"><i className="fas fa-user"></i> 
                Welcome { user && user.name }</p>
                { profile !== null ? 
                    <Fragment>
                        <DashBoardActions />
                        <Experience experience={profile.experience} />
                        {/* <Education education={profile.education} /> */}
                    </Fragment> : 
                    <Fragment>
                        <p>You do not have a profile, create one</p>
                        <Link to='/create-profile' className='btn btn-primary my-1'>Create Profile</Link>
                    </Fragment>
                }
                
                {/* <h2 className="my-2">Education Credentials</h2>
                <table className="table">
                    <thead>
                        <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th />
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>Northern Essex</td>
                        <td className="hide-sm">Associates</td>
                        <td className="hide-sm">
                            02-03-2007 - 01-02-2009
                        </td>
                        <td>
                            <button className="btn btn-danger">
                            Delete
                            </button>
                        </td>
                        </tr>
                    </tbody>
                    </table>

                    <div className="my-2">
                        <button className="btn btn-danger">
                            <i className="fas fa-user-minus"></i>

                            Delete My Account
                        </button>
                    </div> */}
                </section>
        </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
