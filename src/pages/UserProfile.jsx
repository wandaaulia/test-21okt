import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const UserProfile = () => {

  const [dataApi, setDataApi] = useState({});

  const navigate = useNavigate();

  const getToken = useSelector((state) => state.formRedux.tokenVal);

  useEffect(() => {

    const getData = async () => {

      try {
        let getProfile = await axios.get('https://dev-be.trijagabaya.co.id/api/auth/user-profile',
          {
            headers: {
              Authorization: `Bearer ${getToken}`,
            },
          }
        );
        let getDataProfile = await getProfile;
        setDataApi(getDataProfile.data.data[0]);
      } catch (e) {
        console.log(e);
      }

    }

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex flex-col w-full h-screen'>
      <div className='flex-1 bg-[#1F2033] pt-[73px] pl-[330px] flex flex-col  pb-[20px]'>
        <div className='form rounded-[15px] p-[20px] bg-[#232635] w-[780px] pb-[20px] mt-[20px]'>
          <h4 className='text-[20px] font-normal text-white leading-[24px] mb-[30px]'> User Profile </h4>
          <div className='flex flex-row'>
            <div className='flex-1 flex-col text-white'>
              <p>
                Petugas
              </p>
              <div className='w-[50px] h-[50px]'>
                <img src={dataApi?.adminpetugasfoto} alt="" className="w-100 h-100" />
              </div>
              <p>
                jabatan :  {dataApi?.adminpetugasjabatan}
              </p>
              <p>
                Kode :  {dataApi?.adminpetugaskode}
              </p>
              <p>
                Nama Lengkap :  {dataApi?.adminpetugasnamalengkap}
              </p>
              <p>
                username :  {dataApi?.adminpetugasusername}
              </p>
              <p> id :   {dataApi?.id}  </p>
            </div>

            <div className='flex-1 flex-col text-white'>
              <p>
                perusahaan
              </p>
              <div className='w-[50px] h-[50px]'>
                <img src={dataApi?.adminpetugasperusahaanfoto} alt="" className="w-100 h-100" />
              </div>
              <p className='mt-[40px]'>
                perusahaan kode :  {dataApi?.adminpetugasperusahaankode}
              </p>
              <p>
                nama perusahaan  :  {dataApi?.adminpetugasperusahaannama}
              </p>
            </div>
          </div>

        </div>

        <div className='button w-[780px] mt-[40px] justify-end flex flex-row'>
          <button className='flex flex-row items-center text-[#7186A7] px-[50px] text-[16px] leading-[24px] font-normal'
            onClick={() => navigate('/tableData')}>
            View Data
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
