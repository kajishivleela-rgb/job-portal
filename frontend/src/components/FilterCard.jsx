import { setSearchedQuery } from '@/redux/jobSlice';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

const filterData = [
  {
    filterType:"Location",
    array:["Delhi NCR","Bengaluru","Hyderabad","Pune","Mumbai"]
  },
  {
    filterType:"Industry",
    array:["Backend Developer","Fronend Developer","Fullstack Developer","Database developer"]
  },
  {
    filterType:"Salary",
    array:["0-40k","42-1lakh","1lakh-5lakh"]
  },
]
const FilterCard = () => {
  const [selectedValue,setSelectedValue]=useState('');
  const dispatch = useDispatch();
  const changeHandler = (value)=>{
    setSelectedValue(value);
  }
  useEffect(()=>{
    dispatch(setSearchedQuery(selectedValue));
  },[selectedValue]);
  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className="mt-3" />

      {filterData.map((data) => (
        <div key={data.filterType} className="mt-4">
          <h1 className="font-bold text-lg">{data.filterType}</h1>

          {/* ✅ Separate RadioGroup for each section */}
          <RadioGroup value={selectedValue} onValueChange={changeHandler}>
            {data.array.map((item) => {
              const id = `${data.filterType}-${item}`;

              return (
                <div key={id} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem className="w-5 h-5 border" value={item} id={id} />
                  <Label htmlFor={id}>{item}</Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};
export default FilterCard