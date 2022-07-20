import React from 'react';
import { Row, Col, Button, Alert } from 'react-bootstrap';

import * as Yup from 'yup';
import { Formik } from 'formik';
import useAuth from '../../../hooks/useAuth';
import useScriptRef from '../../../hooks/useScriptRef';
import { Link } from 'react-router-dom';

const OtpVerification = ({ className, ...rest }) => {
    const scriptedRef = useScriptRef();

    const { firebaseEmailPasswordSignIn, firebaseGoogleSignIn } = useAuth();

    // const googleHandler = async () => {
    //   try {
    //     await firebaseGoogleSignIn();
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };

    return (
        <React.Fragment>
            <Formik
                initialValues={{
                    email: '',
                    // password: '123456',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('OTP is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        await firebaseEmailPasswordSignIn(values.email, values.password);

                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(true);
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} className={className} {...rest}>
                        <div className="form-group mb-3">
                            <input
                                className="form-control"
                                error={touched.email && errors.email}
                                label="Email Address / Username"
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="email"
                                value={values.email}
                            />
                            {touched.email && errors.email && <small class="text-danger form-text">{errors.email}</small>}
                        </div>


                        {errors.submit && (
                            <Col sm={12}>
                                <Alert variant="danger">{errors.submit}</Alert>
                            </Col>
                        )}

                        {/* <div className="custom-control custom-checkbox  text-left mb-4 mt-2">
              <input type="checkbox" className="custom-control-input" id="customCheck1" />
              <label className="custom-control-label" htmlFor="customCheck1">
                Save credentials.
              </label>
            </div> */}

                        <Row>
                            <Col mt={2}>
                                <Link to="/otp">
                                    <Button className="btn-block" color="primary" size="large" type="submit" variant="primary">
                                        Verify
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </form>
                )}
            </Formik>

            {/* <Row>
        <Col sm={12}>
          <h5 className="my-3"> OR </h5>
        </Col>
      </Row> */}

            {/* <Row>
        <Col sm={12}>
          <Button onClick={googleHandler} variant="danger">
            <i className="fa fa-lock" /> Sign in with Google
          </Button>
        </Col>
      </Row> */}

            {/* <hr /> */}
        </React.Fragment>
    );
};

export default OtpVerification;
