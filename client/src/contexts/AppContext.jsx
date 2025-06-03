import { createContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { SyncLoader } from "react-spinners";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);

  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [isProfileCompleted, setIsProfileCompleted] = useState(false);
  const [email, setEmail] = useState('');
  const [loadingUserData, setLoadingUserData] = useState(true);



  const [profile, setProfile] = useState({
    name: '',
    state: '',
    GPA: '',
    preferredAmount: '',
    age: '',
    institution: '',
  });

  const getPosts = async () => {

    try {
      const { data } = await axios.get(`${backendUrl}/api/all-scholarships`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  const userData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/profile/userdata`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      const user = data.data;
      const isComplete = user.isProfileCompleted;
      const profile = user.profile;
      setIsProfileCompleted(isComplete);

      if (isComplete) {
        setProfile({
          name: user.profile?.name || '',
          state: user.profile?.state || '',
          GPA: user.profile?.GPA || '',
          preferredAmount: user.profile?.preferredAmount || '',
          age: user.profile?.age || '',
          institution: user.profile?.institution || '',
        });

      }
    } catch (error) {
      console.error("Error in userData:", error.message);
    } finally {
      setLoadingUserData(false);
    }
  };


  // Get unique values for dropdowns
  const uniqueStates = [...new Set(posts.map(post => post.state).filter(Boolean))];
  const uniqueProviders = [...new Set(posts.map(post => post.provider).filter(Boolean))];


  const value = {
    backendUrl,
    posts,
    getPosts,
    searchQuery,
    setSearchQuery, filteredPosts, setFilteredPosts,
    token, setToken,
    email, setEmail,
    uniqueStates, uniqueProviders,
    isProfileCompleted, setIsProfileCompleted,
    profile, setProfile,
    userData,
    loadingUserData, setLoadingUserData
  };


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setLoadingUserData(true);
    } else {
      setLoadingUserData(false);
    }
  }, []);


  useEffect(() => {
    if (token) {
      userData();
    }
  }, [token]);


  return (
    <AppContext.Provider value={value}>
      {loadingUserData ? (
        <div className="flex justify-center items-center h-screen">
  <SyncLoader color="#AD46FF" size={18} />  
</div>
        ) : (
        props.children
      )}
    </AppContext.Provider>
  );

};

export default AppContextProvider;













