/*import React from 'react'
import { Link } from 'react-dom';


const BackButton = () => {
  return (
    <div>BackButton</div>
  )
}

export default BackButton*/



/*
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ destination = '/' }) => {
  return (
    <div className='flex'>
      <Link
        to={destination} 
        className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'
      >
        <BsArrowLeft className='text-2xl' />
        
      </Link>
    </div>
  )
}

export default BackButton;*/




/*import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import PropTypes from 'prop-types';  // Import PropTypes

const BackButton = ({ destination = '/' }) => {
  return (
    <div className='flex'>
      <Link
        to={destination}
        className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'
      >
        <BsArrowLeft className='text-2xl' />
      </Link>
    </div>
  );
};

// Define prop types to validate 'destination' prop
BackButton.propTypes = {
  destination: PropTypes.string,  // 'destination' should be a string
};

export default BackButton; */


import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ destination = '/' }) => {
  return (
    <div className='flex'>
      <Link
        to={destination}
        className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'
      >
        <BsArrowLeft className='text-2xl' />
      </Link>
    </div>
  );
};

export default BackButton;

