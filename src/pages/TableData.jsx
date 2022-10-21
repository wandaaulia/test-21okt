import React, { useState, useEffect } from 'react'
import DatePic from '../components/DatePick';
import { MdDateRange } from "react-icons/md";
import moment from "moment";
import axios from 'axios';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';


const TableData = () => {

  const [date, setDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [getApi, setGetApi] = useState([]);
  const [setDataApi] = useState([]);
  const [filterD, setFilterD] = useState(0);

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);


  const getToken = useSelector((state) => state.formRedux.tokenVal);



  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0;
  };

  const isEndWeekday = (endDate) => {
    const day = endDate.getDay();
    return day !== 0;
  };


  const handleChangeDate = (d) => {
    setDate(d);
  }

  const handleChangeEndDate = (d) => {
    setEndDate(d);
  }

  const handleFilter = async (e) => {
    e.preventDefault();

    let getTimeDate = moment(date).format('YYYY-M-D');
    let getTimeEndDate = moment(endDate).format('YYYY-M-D');
    setFilterD(filterD + 1);
    console.log(filterD);

    try {
      let sendData = await axios.post('https://dev-be.trijagabaya.co.id/api/satpam-kegiatan/', null,
        {
          params: {
            startdate: getTimeDate,
            enddate: getTimeEndDate
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken}`,

          }
        });
      let dataRes = await sendData;
      console.log(dataRes.data.data);
      setGetApi(dataRes.data.data);

      const endOffset = itemOffset + 4;
      setCurrentItems(dataRes.data.data.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(dataRes.data.data.length / 4));

      if (dataRes.data.data.length > 5) {
        setDataApi(dataRes.data.data.slice(0, 3));
      } else {
        setDataApi(dataRes.data.data);
      }
    } catch (e) {
      console.log(e);
    }

  }

  useEffect(() => {
    const endOffset = itemOffset + 4;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(getApi.slice(itemOffset, endOffset));
    console.log(getApi.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(getApi.length / 4));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemOffset, filterD]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 4) % getApi.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };


  return (
    <div className='flex flex-col w-full h-screen'>
      <div className='flex-1 bg-[#1F2033] pt-[73px] pl-[330px] flex flex-col  pb-[20px]'>
        <div className='form rounded-[15px] p-[20px] bg-[#232635] w-[780px] pb-[20px] mt-[20px]'>
          <h4 className='text-[20px] font-normal text-white leading-[24px]'> Table Data  </h4>
        </div>
        <form className='mt-[20px]'>
          <label className='text-[#7186A7] albert-sans-fontnormal text-[12px] leading-[18px]'> Start date </label>
          <div className='relative flex flex-row w-[300px] justify-around items-center bg-[#27303F] border border-solid border-[#506281] rounded-[8px] px-[10px] py-[7px]'>
            <MdDateRange size={24} className='text-[#7186A7] mr-[8px]' />
            <DatePic date={date} isWeekday={isWeekday} handleChangeDate={handleChangeDate} />
          </div>
          <label className='text-[#7186A7] albert-sans-fontnormal text-[12px] leading-[18px]'> End date </label>
          <div className='relative flex flex-row w-[300px] justify-around items-center bg-[#27303F] border border-solid border-[#506281] rounded-[8px] px-[10px] py-[7px]'>
            <MdDateRange size={24} className='text-[#7186A7] mr-[8px]' />
            <DatePic date={endDate} isWeekday={isEndWeekday} handleChangeDate={handleChangeEndDate} />
          </div>
          <button onClick={handleFilter}> Filter </button>
        </form>
        <>
          <table className="table-auto w-[650px]">
            <thead>
              <tr>
                <th className='bg-red-400 text-left  w-[10px]'> No </th>
                <th className='bg-red-400 text-left w-[10px]'> Nama Satpam </th>
                <th className='bg-red-400 text-left w-[10px]'> Nama Perusahan </th>
              </tr>
            </thead>
            <tbody>
              {currentItems &&
                currentItems?.map((item, index) => (
                  <tr key={item.satpamkegiatanid}>
                    <td className='bg-red-300'> {index + 1} </td>
                    <td className='bg-red-300'>{item.satpamnamalengkap}</td>
                    <td className='bg-red-300'>{item.satpamperusahaannama}</td>
                  </tr>
                ))}
            </tbody>
          </table>

        </>

        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="flex flex-row text-white gap-[10px]"
        />

      </div>
    </div>
  )
}

export default TableData
