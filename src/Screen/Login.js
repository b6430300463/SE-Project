import './Style/loginStyle.css'
import {GoogleLogin ,GoogleLogout} from 'react-google-login'
import { gapi } from 'gapi-script'
import { useState , useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const Login = () =>{
    const clientId = "627023661930-9mt9l2l94ki17cenpkv27947ggm24iif.apps.googleusercontent.com"
    
    const [profile, setProfile] = useState(null)
    const [user,setUser] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:3307/api/getuser').then((response) => {
            setUser(response.data)
        });

        const initClient =() => {
            gapi.client.init({
                clientId : clientId,
                scope : ''
            })
        }
        gapi.load("client:auth2", initClient)
    },[])

    const onSuccess = (res) => {
        setProfile(res.profileObj);
        const payload = res.profileObj;
        axios.post('http://localhost:3307/api/login', payload);
    
        console.log('success', payload);
        console.log('user', user);
    
        user.forEach((item) => {
            if (payload.email === item.email) {
                console.log('check');
                if (item.priority === 1) {
                    navigate('/users');
                }
                if (item.priority === 2) {
                    navigate('/mainpagetable');
                    console.log('table manager');
                }
                if (item.priority === 3) {
                    navigate('/input');
                }
            }
        });
    };
    
    const onFailure = (res) => {
        console.log('failed',res)
    }
    const logOut =() =>{
        setProfile(null);
    }
    return(
        <div className = "login-container" >
            <div className ="screen1">
                <div className ="screen2">
                    <div className = "screen3">
                        <img src="logo_ku.png"  className="logo-image" /> 
                        <br /><br />
                        {profile ? (
                            <div >
                                <div className='google-logout-button'>
                                    <GoogleLogout 
                                        clientId = {clientId}
                                        buttonText="Log out" 
                                        onLogoutSuccess={logOut}
                                    />
                                </div>
                                
                            </div>
                        ) : (
                            <div className='google-login-button'>
                                <GoogleLogin
                                    clientId={clientId}                                       
                                    buttonText='Sing in with Google' 
                                    onSuccess={onSuccess}
                                    onFailure={onFailure}
                                    cookiePolicy={'single_host_origin'}
                                    isSignedIn={true}
    
                                />
                            </div>/*
                            <GoogleLogin
                                clientId={clientId}
                                className='email-container'   
                                buttonText='Sing in with Google' 
                                onSuccess={onSuccess}
                                onFailure={onFailure}
                                cookiePolicy={'single_host_origin'}
                                isSignedIn={true}
                            />*/
                        )}
                        
                    </div>
                    
                </div>
            </div>
            
            
        </div>
    );
}

export default Login
// npm i react-google-login gapi-script --force