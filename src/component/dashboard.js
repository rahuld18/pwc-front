import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
var api='http://localhost:3000/v1';
var headers={
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem( "token") 
  }};
export default function Dashboard() {
  const [fullName,setFullName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  
  const [fullNameVali,setFullNameVali]=useState('');
  const [emailVali,setEmailVali]=useState('');
  const [passwordVali,setPasswordVali]=useState('');

  useEffect(() => {
    console.log(localStorage.getItem( "token"))

    axios.get(`${api}/users/${localStorage.getItem("id")}`,headers).
      then(res=>{
          console.log(res);
         setFullName(res.data.name);
         setEmail(res.data.email)
                
      })
      .catch(res=>{
        console.log(res);
      });

   
  },[]);
 

  let history = useHistory();

  const onUpdateApi=(e)=>{
      e.preventDefault()
      console.log('hi2');

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



      if(fullName && email && !passwordVali ){
      const data={
          email:email,
          password:password,
          name:fullName,

      }
      console.log(data)
      axios.patch(`${api}/users/${localStorage.getItem("id")}`,data,headers).
      then(res=>{
        console.log('www');
          console.log(res);
          alert('Successfully Updated')
         
      })
      .catch(res=>{
        console.log('dw');
        console.log(res);
      });
    }
  }

  const deletePro=()=>{
    console.log("bye");

    axios.delete(`${api}/users/${localStorage.getItem("id")}`,headers).
    then(res=>{
        console.log(res);
        alert('Successfully deleted Profile');
        history.push('/')
       
    })
    .catch(res=>{

    });

  }

  
return(<div>
    <div className="login-register-wrapper">
      <div className="nav-buttons">
        <h1>Dashboard</h1>
        <button onClick={deletePro} style={{float:'right',fontSize:'14px'}}>Delete Profile</button>
      </div>
      <div className="form-group">
      <React.Fragment>
      <label for="fullname">full name</label>
      <input type="text" id="fullname" value={fullName} onChange={async ( e)=> await setFullName(e.target.value)} />
      {fullNameVali? <div className="red">{fullNameVali}</div>:''} <br/>
      <label for="email">email</label>
      <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      {emailVali? <div className="red">{emailVali}</div>:''} <br/>
      <label for="password">password</label>
      <input type="password" id="password" onChange={(e)=>setPassword(e.target.value)}/>
      {passwordVali? <div className="red">{passwordVali}</div>:''} <br/>

     
      <button  className="submit" onClick={(e)=>onUpdateApi(e)}>Update </button>
    </React.Fragment>
 
     
      </div>
     
    </div>
</div>)
}