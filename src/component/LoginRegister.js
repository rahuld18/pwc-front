import React, { useState } from "react";
import "../App.css";
import { useSpring, animated } from "react-spring";
import { useHistory } from "react-router-dom";
import axios from "axios";
var api='http://localhost:3000/v1';

export default function LoginRegister(props) {
  const [registrationFormStatus, setRegistartionFormStatus] = useState(false);
  const loginProps = useSpring({ 
    left: registrationFormStatus ? -500 : 0, // Login form sliding positions
  });
  const registerProps = useSpring({
    left: registrationFormStatus ? 0 : 500, // Register form sliding positions 
  }); 

  const loginBtnProps = useSpring({
    borderBottom: registrationFormStatus 
      ? "solid 0px transparent"
      : "solid 2px #1059FF",  //Animate bottom border of login button
  });
  const registerBtnProps = useSpring({
    borderBottom: registrationFormStatus
      ? "solid 2px #1059FF"
      : "solid 0px transparent", //Animate bottom border of register button
  });

  function registerClicked() {
    setRegistartionFormStatus(true);
  }
  function loginClicked() {
    setRegistartionFormStatus(false);
  }

  return (
    <div className="login-register-wrapper">
      <div className="nav-buttons">
        <animated.button
          onClick={loginClicked}
          id="loginBtn"
          style={loginBtnProps}
        >
          Login
        </animated.button>
        <animated.button
          onClick={registerClicked}
          id="registerBtn"
          style={registerBtnProps}
        >
          Register
        </animated.button>
      </div>
      <div className="form-group">
        <animated.form action="" id="loginform" style={loginProps}>
          <LoginForm />
        </animated.form>
        <animated.form action="" id="registerform" style={registerProps}>
          <RegisterForm />
        </animated.form>
      </div>
     
    </div>
  );
}

function LoginForm(props) {
    let history = useHistory();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [emailVali,setEmailVali]=useState('');
    const [passwordVali,setPasswordVali]=useState('');
    const [invalidVali,setInvalidVali]=useState('');


    const onLoginApi=(e)=>{
        e.preventDefault()
        console.log('hi');

        if( email === '')
        setEmailVali('* Email required')
      
      else
      setEmailVali('')


      if( password === ''){
        setPasswordVali('* Password required');

      }
      
      else{
        if(password.length>8)
      setPasswordVali('')
      else
      setPasswordVali('* Password required min 8 digits, 1 letter , 1 number')
      }

      if( email && password ){
        const data={
            email:email,
            password:password
        }
        console.log(data)
        axios.post(`${api}/auth/login`,data).
        then(res=>{
            console.log(res)
            console.log(res.data.tokens.access.token);
            console.log('www');
            localStorage.setItem("token",res.data.tokens.access.token);
            localStorage.setItem("id",res.data.user.id);
            // history.push('/dashboard')
            window.location.href='/dashboard'
        })
        .catch(res=>{
          console.log('sdd');
          setInvalidVali('* Invalid Email and Password')

        })
      }
        
       
    }
  return (
    <React.Fragment>
      <label for="username">Email</label>
      <input type="text" id="email"  onChange={(e)=>setEmail(e.target.value)}/>
      {emailVali? <div className="red">{emailVali}</div>:''} <br/>

      <label for="password">PASSWORD</label>
      <input type="text" id="password"  onChange={(e)=>setPassword(e.target.value)}/>
      {passwordVali? <div className="red">{passwordVali}</div>:''} <br/>
      {invalidVali? <div className="red">{invalidVali}</div>:''} <br/>
      <button  className="submit" onClick={(e)=>onLoginApi(e)}>Login</button>
    </React.Fragment>
  );
}

function RegisterForm() {
    const [fullName,setFullName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [invalidVali,setInvalidVali]=useState('');
    const [fullNameVali,setFullNameVali]=useState('');
    const [emailVali,setEmailVali]=useState('');
    const [passwordVali,setPasswordVali]=useState('');
    const [confirmPasswordVali,setConfirmPasswordVali]=useState('');

    let history = useHistory();
    const onRegisterApi=(e)=>{
        e.preventDefault()
        console.log('hi');

        if( fullName === '')
          setFullNameVali('* Full Name required')
        
        else
        setFullNameVali('')

        if( email === '')
        setEmailVali('* Email required')
      
      else
      setEmailVali('')


      
      if( password === ''){
        setPasswordVali('* Password required');

      }
      
      else{
        if(password.length>8)
      setPasswordVali('')
      else
      setPasswordVali('* Password required min 8 digits, 1 letter , 1 number')
      }


      if( confirmPassword === '')
        setConfirmPasswordVali('* Confirm Password required')
      
      else
      setConfirmPasswordVali('')


        if(fullName && email && !passwordVali && confirmPassword){
        const data={
            email:email,
            password:password,
            name:fullName,

        }
        console.log(data)
        axios.post(`${api}/auth/register`,data).
        then(res=>{
            console.log(res);
            
            alert('Successfully Register')
            // console.log('www');
            
            // history.push('/dashboard')
        })
        .catch(res=>{
          console.log('wwssw');
          setInvalidVali('* Email Already Taken')

        });
      }
    }

  return (
    <React.Fragment>
      <label for="fullname">full name</label>
      <input type="text" id="fullname" onChange={(e)=>setFullName(e.target.value)} />
      {fullNameVali? <div className="red">{fullNameVali}</div>:''} <br/>
      <label for="email">email</label>
      <input type="email" id="email" onChange={(e)=>setEmail(e.target.value)}/>
      {emailVali? <div className="red">{emailVali}</div>:''} <br/>
      <label for="password">password</label>
      <input type="password" id="password" onChange={(e)=>setPassword(e.target.value)}/>
      {passwordVali? <div className="red">{passwordVali}</div>:''} <br/>

      <label for="confirmpassword">confirm password</label>
      <input type="password" id="confirmpassword" onChange={(e)=>setConfirmPassword(e.target.value)}/>
      {confirmPasswordVali? <div className="red">{confirmPasswordVali}</div>:''} <br/>
      
      {invalidVali? <div className="red">{invalidVali}</div>:''} <br/>
      <button  className="submit" onClick={(e)=>onRegisterApi(e)}>Register </button>
    </React.Fragment>
 
 );
}

