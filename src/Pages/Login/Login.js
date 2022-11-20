import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Login = () => {
    const {register, formState:{errors}, handleSubmit} = useForm();
    // const [data, setData] = useState('');
    const handleLogin = data =>{
        console.log(data);
        
    }

    return (
      <div className="h-[800px] flex justify-center items-center">
        <div className="w-96 p-6">
          <h2 className="text-xl text-center">Login</h2>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: "Email is Required" })}
                type="email"
                className="input input-bordered w-full max-w-xs"
              />
              {errors.email && (
                <p className="text-red-600">{errors.email?.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", { 
                  required: "Password is required",
                  minLength: {value: 6, message: 'Password must be 6 characters'}
                })}
                type="password"
                className="input input-bordered w-full max-w-xs"
              />
              {errors.password && (
                <p className="text-red-600">{errors.password?.message}</p>
              )}
              <label className="label">
                <span className="label-text">Forgat Password</span>
              </label>
            </div>

            <input
              type="submit"
              value="Login"
              className="btn btn-accent w-full my-6"
            />
          </form>
          <p>
            New to Doctors Portal{" "}
            <Link to="/signup">
              <span className="text-primary">Create an account</span>
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

export default Login;