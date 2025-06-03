import React from 'react';
import Scholarships from '../components/Scholarships';
import ScholarshipsClosingSoon from '../components/ScholarshipsClosingSoon';

const Home = () => {
  return (
    <div>
      <ScholarshipsClosingSoon />
      <Scholarships />
    </div>
  );
};

export default Home;
