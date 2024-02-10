import React from 'react'

const UrlTable = ({ columns, rows }) => {
 


   
    return (
      <table className="w-full">
        <thead className='bg-blue-400 text-white text-lg'>
          <tr>
            {columns?.map((column,index) => (
              <th key={index} className='font-normal'>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row,index) => (
            <tr key={index} className='text-gray-200 text-base'>
              {columns?.map((column,index) => (
                <td key={index} className='text-gray-600 font-normal  text-center items-center '>{row[column.field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  
 
};

export default UrlTable
