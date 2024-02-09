import React from 'react'

const UrlTable = ({ columns, rows }) => {
  const [isMobile, setIsMobile] = React.useState(typeof window!=="undefined"&&window.innerWidth <= 769);

  React.useEffect(() => {
    const handleWindowSize = (e) => {
      const w = e.target ;
      if (w.innerWidth <= 769) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", handleWindowSize);
    return () => window.removeEventListener("resize", handleWindowSize);
  });

  const renderDesktopView = () => {
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
  const renderMobileView = () => {
    return (
      <table className="w-full">
        {rows?.map((row,index) => (
          <thead key={index} className='mb-4'>
            {columns?.map((column,index) => (
              <tr key={index} className='flex items-center'>
                {!column.hideLabelinMobile && <h3 className='mr-2'>{column.label}:</h3>}
                {row[column.field]}
              </tr>
            ))}
          </thead>
        ))}
      </table>
    );
  };

  return <>{isMobile ? renderMobileView() : renderDesktopView()}</>;
};

export default UrlTable
