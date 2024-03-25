import React from 'react'

const Header = () => {
  return (
    <div className="text-center flex justify-between p-3 bg-slate-700 text-yellow-100">
      <h2 className="text-4xl">Finance focus</h2>
      <p className=''>your profile is incomplate <a className='text-blue-400' href="#">complete now</a> </p>
    </div>
  );
}

export default Header