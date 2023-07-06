import React from 'react'

export default function Signup() {
  return (
    <div className="popup2">
      <div className="popup-inner">
        <h2>Login</h2>
        {/* <form onSubmit={handleLogin}>
          <label>
            Username:
            <input
              className="rounded transition ease-in-out"
              type="text"
              id="username"
              value={username}
              onChange={onChange}
            />
          </label>
          <div className="relative">
            <label>
              Password:
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onChange}
              />
              {showPassword ? <AiFillEyeInvisible className="absolute right-3 top-7 text-xl cursor-pointer" onClick={()=> setShowPassword((prevState=> !prevState))}/> : <AiFillEye className="absolute right-3 top-7 text-xl cursor-pointer" onClick={()=> setShowPassword((prevState=> !prevState))}/>}
            </label>
          </div>
          <div>
            <p>Don't have a account? <Link to='/sign-up'>Register</Link></p>
          </div>
          <button type="submit">Login</button>
        </form>
        <button onClick={toggle}>Close</button> */}
      </div>
    </div>
  )
}
