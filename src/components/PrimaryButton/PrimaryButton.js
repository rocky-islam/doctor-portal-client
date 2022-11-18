import React from 'react';

const PrimaryButton = ({children}) => {
    return (
      <div>
        <button className=" text-white btn btn-primary bg-gradient-to-r from-primary to-secondary">
          {children}
        </button>
      </div>
    );
};

export default PrimaryButton;