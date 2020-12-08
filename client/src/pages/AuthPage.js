import React from "react";

export const AuthPage = () => {
  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        <h1>Make url shorter</h1>
        <div className='card blue darken-1'>
          <div className='card-content white-text'>
            <span className='card-title'>Authorization</span>
            <div>
              <div className='input-field'>
                <input
                  placeholder='Enter email'
                  id='email'
                  type='text'
                  name='email'
                  className='yellow-input'
                />
                <label htmlFor='email'>Email</label>
              </div>
            </div>
            <div className='input-field'>
              <input
                placeholder='Enter password'
                id='password'
                type='password'
                name='password'
                className='yellow-input'
              />
              <label htmlFor='email'>Password</label>
            </div>
          </div>
          <div className='card-action'>
            <button className='btn yellow darken-4' style={{ marginRight: 10 }}>
              Login
            </button>
            <button className='btn grey lighten-1 black-text'>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};
