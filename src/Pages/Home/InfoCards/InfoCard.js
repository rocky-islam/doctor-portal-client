import React from 'react';

const InfoCard = ({card}) => {
    const {name, description, icon, bgClass} = card;
    return (
      <div>
        <div className={`card  md:card-side text-white p-6 shadow-xl ${bgClass}`}>
          <figure>
            <img src={icon} alt="icon" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <p>{description}</p>
            
          </div>
        </div>
      </div>
    );
};

export default InfoCard;