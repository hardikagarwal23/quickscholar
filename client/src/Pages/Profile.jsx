import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../contexts/AppContext.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
  const { setIsProfileCompleted, token, backendUrl, profile, setProfile, uniqueStates } = useContext(AppContext);
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();


  const handleProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${backendUrl}/api/profile/update`,
        { profile },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      toast.success(res.data.message);
      setIsProfileCompleted(true);
      navigate('/');
    } catch (error) {
      setLoading(false);
      console.error("Error updating profile:", error);
      toast.error("Profile update failed");
    }
  };


  return (
    <div className="flex justify-center items-center w-full mt-8 bg-gray-50">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6">
        <h2 className="text-xl font-medium text-gray-700 text-center">
          Set up your profile!
        </h2>
        <form onSubmit={handleProfile} className="space-y-1">
          <label className="block">
            <span className="text-lg font-medium text-gray-700">Name</span>
            <input
              type="text"
              placeholder="Your full name"
              required
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="text-lg font-medium text-gray-700">State</span>
            <select
              required
              value={profile.state}
              onChange={(e) => setProfile({ ...profile, state: e.target.value })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none"
            >
              <option value="" disabled>Select your state</option>
              {uniqueStates.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </label>


          <label className="block">
            <span className="text-lg font-medium text-gray-700">Age</span>
            <input
              type="number"
              placeholder="Your age"
              required
              value={profile.age}
              onChange={(e) => setProfile({ ...profile, age: e.target.value })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="text-lg font-medium text-gray-700">Institution</span>
            <input
              type="text"
              placeholder="Your institution"
              required
              value={profile.institution}
              onChange={(e) => setProfile({ ...profile, institution: e.target.value })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="text-lg font-medium text-gray-700">GPA</span>
            <input
              type="number"
              step="0.01"
              placeholder="Your GPA"
              required
              value={profile.GPA}
              onChange={(e) => setProfile({ ...profile, GPA: e.target.value })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="text-lg font-medium text-gray-700">Preferred Amount (in USD)</span>
            <input
              type="number"
              placeholder="e.g. 1000"
              required
              value={profile.preferredAmount}
              onChange={(e) => setProfile({ ...profile, preferredAmount: e.target.value })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </label>

          <button
            type="submit"
            className="w-full mt-1 bg-purple-600 hover:bg-purple-700 cursor-pointer text-white text-lg font-semibold py-2 rounded-md transition duration-200"
          >
           {loading? 'Save Profile...' : 'Save Profile'} 
          </button>
        </form>
      </div>
    </div>

  );
};

export default Profile;
