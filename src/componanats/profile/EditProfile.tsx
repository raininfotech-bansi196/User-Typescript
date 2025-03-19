"use client"
import { useAuthContext } from '@/context/auth';
import { fetchApi } from '@/utils/frontend';
import { Selectconfigsfilter } from '@/utils/SelectConfig';
import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Select from "react-select";

const EditProfile = () => {
  const { userDetails, setAuthTkn } = useAuthContext();
  console.log({ userDetails });
  const [initialData, setInitialData] = useState({
    email: '',
    userName: '',
    phoneNum: '',
    refferalCode: '',
    address: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
  })
  const [countryData, setCountryData] = useState<any>([])
  const [stateData, setStateData] = useState<any>([])

  useEffect(() => {
    if (userDetails) {
      setInitialData({
        email: userDetails?.email || "",
        userName: userDetails?.username || "",
        phoneNum: userDetails?.phoneNumber || "",
        refferalCode: userDetails?.referral_code || "",
        address: userDetails?.address || "",
        country: userDetails?.country || "",
        state: userDetails?.state || "",
        city: userDetails?.city || "",
        pincode: userDetails?.pincode || "",
      })
    }
  }, [userDetails])
  const [spinner, setSpinner] = useState(false)
  const handleChange = (e: any) => {
    setInitialData({ ...initialData, [e.target.name]: e.target.name === "phoneNum" ? e.target.value.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1") : e.target.value })
  }
  const getCountryData = async () => {
    try {
      const response = await fetchApi('/get-country-data', "", "GET");
      setCountryData(response?.data?.data.map((x: any) => ({ label: x?.countryName, value: x?.countryName })))
    } catch (error) {
      console.log({ error });
    }
  }

  useEffect(() => {
    getCountryData();
  }, [])
  const handleGetStateData = async (country: string) => {
    console.log({ country });
    try {
      const response = await fetchApi('/get-state-data', JSON.stringify({ country: country }), "POST");
      console.log({ response });
      setStateData(response?.data?.data.map((x: any) => ({ label: x?.stateName, value: x?.stateName })))
    } catch (error) {
      console.log({ error });
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetchApi('/update-profile', JSON.stringify({
        username: initialData?.userName,
        phoneNumber: initialData?.phoneNum,
        address: initialData?.address,
        country: initialData?.country,
        state: initialData?.state,
        city: initialData?.city,
        pincode: initialData?.pincode
      }), "POST");
      if (response?.statusCode === 200) {
        toast.success(response?.data?.message)
      } else {
        if (response.data.message === "Unauthorized") {
          setAuthTkn(response?.data?.message)
        }
      }
    } catch (error) {
      console.log({ error });
    }
  }
  console.log(initialData, "initialData?.country");
  useEffect(() => {
    handleGetStateData(initialData?.country)
  }, [initialData?.country])
  return (
    <div className='p-4 contact-form'>
      <div className='profile-form mb-3'>
        <div className="form-group">
          <label className='form-label'>User Name</label>
          <input
            className="check-form"
            type="text"
            placeholder="Enter User name"
            name='userName'
            value={initialData?.userName}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label className='form-label'>Email</label>
          <input
            className="check-form"
            type="text"
            placeholder="Enter email"
            name='email'
            disabled
            value={initialData?.email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label className='form-label'>Mobile Number</label>
          <input
            className="check-form"
            type="text"
            placeholder="Enter mobile number"
            name='phoneNum'
            value={initialData?.phoneNum}
            onChange={(e) => { e.target.value.length <= 10 && handleChange(e) }}
          />
        </div>
        <div className="form-group">
          <label className='form-label'>Refferal Code</label>
          <input
            className="check-form"
            type="text"
            disabled
            placeholder="Enter refferal code"
            name='refferalCode'
            value={initialData?.refferalCode}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <div className="form-group">
        <label className='form-label'>Address</label>
        <input
          className="check-form"
          type="text"
          placeholder="Enter address"
          name='address'
          value={initialData?.address}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className='profile-form'>
        <div className="form-group">
          <label className='form-label'>Country</label>
          <Select
            instanceId="react-select-country"
            className="react-select"
            options={countryData}
            value={countryData?.find((option: any) => option?.value === initialData?.country)}
            onChange={(selectedOption: any) => setInitialData({ ...initialData, country: selectedOption?.value })}
            styles={Selectconfigsfilter}
            placeholder="Select a country"
            isSearchable={true}
          />
        </div>
        <div className="form-group">
          <label className='form-label'>State</label>
          <Select
            instanceId="react-select-country"
            className="react-select"
            options={stateData}
            value={stateData?.find((option: any) => option?.value === initialData?.state)}
            onChange={(selectedOption: any) => setInitialData({ ...initialData, state: selectedOption?.value })}
            styles={Selectconfigsfilter}
            onBlur={() => handleGetStateData(initialData?.state)}
            placeholder="Select a state"
            isSearchable={true}
          />
        </div>
        <div className="form-group">
          <label className='form-label'>City</label>
          <input
            className="check-form"
            type="text"
            placeholder="Enter city"
            name='city'
            value={initialData?.city}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label className='form-label'>Pincode</label>
          <input
            className="check-form"
            type="text"
            placeholder="Enter pincode"
            name='pincode'
            value={initialData?.pincode}
            onChange={(e) => { e.target.value.length <= 6 && handleChange(e) }}
          />
        </div>
      </div>
      <button disabled={spinner} onClick={(e) => handleSubmit(e)} className="site-btn mt-4 fw-bold d-inline-block sb-gradients">
        {spinner && <div className="btn-loader mr-2"></div>}<span>Submit</span>
      </button>
    </div>
  )
}

export default EditProfile