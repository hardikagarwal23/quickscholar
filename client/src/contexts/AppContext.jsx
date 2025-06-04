import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { SyncLoader } from "react-spinners";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);

  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [isProfileCompleted, setIsProfileCompleted] = useState(false);
  const [email, setEmail] = useState('');
  const [loadingUserData, setLoadingUserData] = useState(true);

  const [uniqueStates, setUniqueStates] = useState([]);
  const [uniqueProviders, setUniqueProviders] = useState([]);

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

      // Get unique values for dropdowns
      const states = [...new Set(data.map(post => post.state).filter(Boolean))];
      const providers = [...new Set(data.map(post => post.provider).filter(Boolean))];

      setUniqueStates(states);
      setUniqueProviders(providers);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
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
          name: profile?.name || '',
          state: profile?.state || '',
          GPA: profile?.GPA || '',
          preferredAmount: profile?.preferredAmount || '',
          age: profile?.age || '',
          institution: profile?.institution || '',
        });
      }
    } catch (error) {
      console.error("Error in userData:", error.message);
    } finally {
      setLoadingUserData(false);
    }
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
      getPosts();
    }
  }, [token]);

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
