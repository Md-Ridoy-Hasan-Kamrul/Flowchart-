<<<<<<< HEAD
// @flow strict

import * as React from 'react';

function LoginForm() {
  return (
    <div>
      
    </div>
  );
};

export default LoginForm;
=======
import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className='p-4 space-y-4'>
      <input
        className='input'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='Username'
      />
      <input
        className='input'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
      />
      <button className='btn'>Login</button>
    </form>
  );
};

export default LoginForm;
>>>>>>> 14d337447c140543ba27993b3505e7e10dca098f
