import axios from 'axios';
import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  setToken } from '../features/formSlice';

const Home = () => {

    const [inputEmail, setInputEmail] = useState('');
    const [inputPass, setInputPass] = useState('');
    const [errorForm, setErrorForm] = useState('');


    const navigate = useNavigate();

    const dispatch = useDispatch();

   const handleForm = async (e) => {
    e.preventDefault();

    if(inputEmail === '' || inputPass === '' ) {
        setErrorForm('Harap masukkan email dan password');
    } else {
          try {
        let sendData = await axios.post('https://dev-be.trijagabaya.co.id/api/login', null, {
            params: {
                adminpetugasusername: inputEmail, 
                password: inputPass
            }
        });
        let dataRes = await sendData;
        if(dataRes.status == 200) {
            setInputEmail('');
            setInputPass('');
            setErrorForm('');
            navigate('/userProfile')
        }
        console.log(await sendData.data);
        dispatch(setToken(dataRes.data.access_token));
     } catch (e) {
        console.log(e);
     }
    }
   
   }

  return (
   <div className='flex flex-col w-full h-screen'>
    
    
      <div className='flex-1 bg-[#1F2033] pt-[73px] pl-[330px] flex flex-col  pb-[20px]'>
     

        <div className='form rounded-[15px] p-[20px] bg-[#232635] w-[780px] pb-[20px] mt-[20px]'>
          <h4 className='text-[20px] font-normal text-white leading-[24px]'> Form Login  </h4>
          <p className='text-[14px] mt-[10px] text-red-400'> {errorForm} </p>
          <form className='mt-[10px] flex flex-col'>
            <div className='flex flex-col mt-[20px]'>
              <label className=" text-[12px] leading-[18px] text-[#7186A7]"> Email </label>
              <input type="email" name="emailForm" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} placeholder="Email address"
                className="focus:outline-0 focus:text-[#7186A7] text-[#7186A7] text-[12px] py-[7px] px-[10px] placeholder:text-[#7186A7] rounded-[8px] border border-solid border-[#506281] w-[300px] h-[32px] bg-[#27303F]"/>
      
            </div>
            <div className='flex flex-col mt-[20px]'>
              <label className="text-[12px] leading-[18px] text-[#7186A7]"> Password </label>
              <input type="text"  value={inputPass} onChange={(e) => setInputPass(e.target.value)} name="passwordForm" placeholder="asdf123" className="focus:outline-0 focus:text-[#7186A7] text-[#7186A7] text-[12px] py-[7px] px-[10px] placeholder:text-[#7186A7] rounded-[8px] border border-solid border-[#506281] w-[300px] h-[32px] bg-[#27303F]" />
            </div>

             <button onClick={handleForm} className='flex justify-end mt-10 w-[150px] border border-solid border-[#506281]  flex-row items-center text-[#7186A7] px-[50px] text-[16px] leading-[24px] font-normal'
          >
              Submit  
          </button>
          </form>

        </div>

        
      </div>
    </div>
  )
}

export default Home
