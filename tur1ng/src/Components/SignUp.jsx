import React, { useCallback, useState, useEffect } from 'react'
import { Lock, Person, Email, Call, Image, CloudUpload } from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/signup.css'
import '../styles/login.css'
import { useSignup } from '../hooks/useSignup';
import ErrorIcon from '@mui/icons-material/Error';

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [image, setImg] = useState();
    const [imgName, setImgName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const { signup, error, isLoading } = useSignup();

    const verifyAndPostData = async (event) => {
        event.preventDefault();
        await signup(name,image, email, phone, password, cpassword);
    }
    function readFileDataAsBase64(e) {
        const file = e.target.files[0];
        setImgName(e.target.files[0].name)
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                resolve(event.target.result);
            };

            reader.onerror = (err) => {
                reject(err);
            };

            reader.readAsDataURL(file);
        });
    }
    const handleImg = async (e) => {
        const data = await readFileDataAsBase64(e);
        setImg(data);
        console.log(data);
    }
    const labelStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #6d7993',
        padding: '10px',
        color: '#ccc',
        borderRadius: '8px',
        width: '25vw'
    }
    return (
        <>
            <div className='info__container'>
                <div className='signup__container'>
                    <div className='heading_line' style={{ textAlign: 'center' }}>
                        <h1 className='heading_title'>Tur<span>1</span>ng<span>_</span></h1>
                        <h2 style={{ fontFamily: 'Poppins', margin: '.8rem 0' }} >Create Your Account</h2>
                    </div>
                    <form method='POST' className='user_acc_info'>
                        <div className='acc__credentials'>
                            <div className='user_name_field info_field'>
                                <Person className='info_icon' />
                                <input type='text' autoComplete='off' placeholder='Enter your name' name='name' onChange={(e) => setName(e.target.value)} value={name} />
                            </div>
                            <div className='user_image_field info_field' style={{ display: 'flex', flexDirection: 'column' }}>
                                {/* <label for='profile__pic' style={ }>
                                    Upload your profile pic
                                    <Image className='info_icon' />
                                    <input type='file' autoComplete='off' name='img' id='profile__pic' style={{ display: 'none' }} />

                                </label> */}

                                <input type="file" id="img" className='profile__img__upload' accept="application/jpg" style={{ display: 'none' }} onChange={handleImg} />
                                <label for='img' style={labelStyle}><CloudUpload className='info__icon' style={{ color: '#6d7993' }} />Upload your profile picture</label>
                                {/* {img && <img src={img} alt="img" style={{ width: "100%", borderRadius: "20px", margin: "20px 0" }} />} */}
                                {image && <p style={{textAlign:'left',border:'1px solid #ccc',borderRadius:'6px',padding:'5px',marginTop:'5px',width:'25vw',backgroundColor:'#6d799342'}}>{imgName}</p>}
                            </div>
                            <div className='user_email_field info_field'>
                                <Email className='info_icon' />
                                <input type='email' autoComplete='off' placeholder='Enter your mail ID' name='email' onChange={(e) => setEmail(e.target.value)} value={email} />
                            </div>
                            <div className='user_number_field info_field'>
                                <Call className='info_icon' />
                                <input type='number' autoComplete='off' placeholder='Enter your Phone number' name='phone' onChange={(e) => setPhone(e.target.value)} value={phone} />
                            </div>
                            <div className='user_password_field info_field'>
                                <Lock className='info_icon' />
                                <input type='password' autoComplete='off' placeholder='Enter your password' name='password' onChange={(e) => setPassword(e.target.value)} value={password} />
                            </div>
                            <div className='user_cpassword_field info_field'>
                                <Lock className='info_icon' />
                                <input type='password' autoComplete='off' placeholder='Re-enter your password' name='cpassword' onChange={(e) => setCPassword(e.target.value)} value={cpassword} />
                            </div>
                        </div>
                        {error && <div className="error"><ErrorIcon fontSize='small' /> {error}</div>}
                        <div className='btns_submit'>
                            <input type='submit' name='signup__btn' className='signup__btn' id='signup__btn' onClick={verifyAndPostData} value='Sign Up' />
                            <p className='mt-3' style={{ color: '#000' }}>Already have an account? <NavLink style={{ textDecoration: 'none', color: '#465370', fontWeight: 'bold' }} to='/login'>Log In</NavLink></p>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default SignUp