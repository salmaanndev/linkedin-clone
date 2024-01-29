import React, { useState } from 'react'
import './Login.css'
import { auth } from './Firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from './features/userSlice';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from './Firebase'

function Login() {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const loginToApp = async (e) => {
        e.preventDefault();
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            dispatch(login({
                email: user.email,
                uid: user.uid,
                displayName: user.displayName,
                photoUrl: user.photoURL,
            }))

            
        } catch (error) {
            console.error('Error logging user:', error.message);
            throw error;
        }
        
    }

    const register = async () => {
        if (!name) {
            return alert("Please enter full name")
        }
        try {
            const createUserProfile = async (uid, displayName, email, photoURL) => {
                const userRef = doc(collection(db, 'users'), uid);
              
                await setDoc(userRef, {
                  displayName,
                  email,
                  photoURL,
                });
              };

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            
            
            console.log('User registered successfully:', user.uid);
            dispatch(login({
                email: user.email,
                uid: user.uid,
                displayName: name,
                photoUrl: profilePic,
            }))
            await createUserProfile(user.uid, name, user.email, profilePic);
            return user;
        } catch (error) {
            alert.error('Error registering user:', error.message);
            throw error;
        }
    }

    return (
        <div className='login'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/2560px-LinkedIn_Logo.svg.png" alt="" />
            <form>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name Required if Registering" />
                <input type='text' value={profilePic} onChange={(e) => setProfilePic(e.target.value)} placeholder="Profile picture url (Optional)" />
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                <button type='submit' onClick={loginToApp}>Sign In</button>
            </form>
            <p>Not a member? <span className='login_register' onClick={register}> Register Now!</span>
            </p>
        </div>
    )
}

export default Login
