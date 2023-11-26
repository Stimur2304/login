import React, {  useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import "./login.css"
import Button from '@mui/material/Button';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
const Login = () => {
  const[isActive,setActive] = useState(false)
  const[login,setLogin] = useState( {
    username:"",
    password:''
  })
  const [alert,setAlert] = useState({
    isActive:false,
    type:"",
    title:"",
    text:""
    
  })


  const getLogin = async()=>{
    try{
      setActive(true)
      const response =  await axios.post('https://codify-teens.vercel.app/login/',login)
      console.log(response)
      if(response.status === 200){
        setAlert({
          isActive:true,
          type:"success",
          title:"Success",
          text:"Успешно вошли"

        })
      } 
    }catch(e){
      if(e.response.status === 401){
        setAlert({
          isActive:true,
          type:"error",
          title:"Error",
          text:"Неверный логин или пароль"
        })
      } else{
        alert("Сервер недоступен")
      }
      console.log(e)
    } finally{
      setActive(false)
      
      
    }
  }
  useEffect(()=>{
    setTimeout(()=>{
      setAlert(prevState=>({...prevState,isActive:false}))
    },5000)
  },[alert])
  return (
    <div className='div'>
      <div className='login-div'>
      <div className='button__div'>
      <TextField className='text-fill' id="outlined-basic" label="Your name" onChange={(e)=> setLogin({username:e.target.value,password:login.password})}/>
      <TextField className='text-fill' id="outlined-basic" label="Your passsword"  onChange={(e)=> setLogin({username:login.username,password:e.target.value})}/>
      <Button  disabled={isActive} id='buttonn' variant="outlined" onClick={getLogin}>Submit</Button>
      </div>
      {isActive?<div className='circle'><CircularProgress/></div>:""}
      </div>
      {alert.isActive &&
      <div className='alert-div'><Alert severity={alert.type}>
      <AlertTitle >{alert.title}</AlertTitle>
      {alert.text}
    </Alert></div>
      }
    </div>
  )
}

export default Login