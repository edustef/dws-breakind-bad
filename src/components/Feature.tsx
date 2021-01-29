import React from 'react';
import { Link } from 'react-router-dom';
import { capitalize } from 'lodash';

interface Props {
  title: string;
  link: string;
}

const Feature: React.FC<Props> = ({ title, children, link }) => {
  return (
    <div>
      <h2 className='mb-2 text-2xl'>Featured {capitalize(title)}</h2>
      {children}
      <Link
        to={link}
        className='inline-block mt-4 px-4 py-2 border uppercase shadow-lg font-semibold text-sm'
      >
        See all {title}
      </Link>
    </div>
  );
};

export default Feature;
