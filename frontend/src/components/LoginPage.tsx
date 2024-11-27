import React from 'react';

const LoginPage = () => {
  const handleGitHubLogin = () => {
    // Redirect to your backend's GitHub OAuth route
    window.location.href = 'http://localhost:8000/auth/github';
  };

  return (
    <div>
      <h2>Login with GitHub</h2>
      <button onClick={handleGitHubLogin}>Login with GitHub</button>
    </div>
  );
};

export default LoginPage;