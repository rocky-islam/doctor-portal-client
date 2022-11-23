import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {
  const { signIn } = useContext(AuthContext);
    const {register, formState:{errors}, handleSubmit} = useForm();
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);


    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    if(token){
      navigate(from, { replace: true });
    }

    // const [data, setData] = useState('');
    const handleLogin = data =>{
        console.log(data);

        signIn(data.email, data.password)
        .then(result =>{
          const user = result.user;
          console.log(user);
          setLoginUserEmail(data.email);
          
        })
        .catch(error=> {
          console.log(error.message);
          setLoginError(error.message);
        })
        
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
                  minLength: {
                    value: 6,
                    message: "Password must be 6 characters",
                  },
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
            <div className='text-red-500'>
              {loginError && <p>{loginError}</p>}
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