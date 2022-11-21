import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const SignUp = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const { createUser, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = data =>{
        console.log(data);
        setSignUpError('');
        createUser(data.email, data.password)
          .then((result) => {
            const user = result.user;
            console.log(user);
            toast("User Created Successfully");

            const userInfo = {
              displayName: data.name,
            };
            updateUser(userInfo)
              .then(() => {
                navigate('/');
              })
              .catch((err) => console.log(err));
          })
          .catch((error) => {
            console.log(error);
            setSignUpError(error.message);
          });
    }

    return (
      <div className="h-[800px] flex justify-center items-center">
        <div className="w-96 p-6">
          <h2 className="text-xl text-center">Sign Up</h2>
          <form onSubmit={handleSubmit(handleSignUp)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register("name", {
                    required: 'Name is required'
                })}
                type="text"
                className="input input-bordered w-full max-w-xs"
              />
              {errors.name && <span className='text-red-500'>{errors.name.message}</span>}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", {
                    required: 'Email is required'
                })}
                type="email"
                className="input input-bordered w-full max-w-xs"
              />
              {errors.email && <span className='text-red-500'> {errors.email.message}</span>}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", {
                    required: 'Password is required',
                    minLength: {value: 6, message: 'password must br 6 character'},
                    pattern: {value: /^(?=.*[A-Z])/, message: 'Password must be a capital letter'},
                    
                })}
                type="password"
                className="input input-bordered w-full max-w-xs"
              />
              {errors.password && <span className='text-red-600'>{errors.password.message}</span>}
            </div>

            <input
              type="submit"
              value="SignUp"
              className="btn btn-accent w-full my-6"
            />
            {signUpError && <p className='text-red-500'>{signUpError}</p>}
          </form>
          <p>
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-primary">Login Here</span>
            </Link>
          </p>
          <div className="divider">OR</div>
          <button className="btn btn-outline w-full">
            Continue With Google
          </button>
        </div>
      </div>
    );
};

export default SignUp;