import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import { FaClock, FaDollarSign, FaGlobe, FaGraduationCap, FaMedal} from 'react-icons/fa'
import { LuCheckCheck } from 'react-icons/lu';
import { animate } from "framer-motion";
import { SyncLoader } from 'react-spinners';


const Scholarships = () => {
  const { getPosts,filteredPosts } = useContext(AppContext);

  const [flippedIndex, setFlippedIndex] = useState(null);
  const [loading,setLoading]=useState(true);

  const toggleFlip = (index) => {
    if (flippedIndex === index) {
      setFlippedIndex(null);
    } else {
      setFlippedIndex(index);
    }
  }


  const [displayCount, setDisplayCount] = useState(0);

useEffect(() => {
  const fetchPosts = async () => {
    setLoading(true);
    await getPosts();
    setLoading(false);};
  fetchPosts();
}, []);



  useEffect(() => {
    const controls = animate(0, filteredPosts.length, {
      duration: 0.5,
      onUpdate: (latest) => {
        setDisplayCount(Math.round(latest));
      }
    });
    return () => controls.stop();
  }, [filteredPosts]);


  return (
    <div>

      <div className='bg-purple-200 border border-purple-300 text-center py-2 text-2xl font-semibold'>
        All Scholarships
      </div>


{ loading? <div className="flex justify-center items-center h-[70vh]">
  <SyncLoader color="#AD46FF" size={18} />  
</div>

    :
<>
 <div className="text-center pt-2">
        <span className="font-semibold">
          {displayCount > 0 ? displayCount : "No"}
        </span>{" "}
        results are found...
      </div>

     <div className="max-w-8xl mx-auto px-4 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

        {filteredPosts.map((post, index) => (
          <div
            key={index}
            className="relative w-full h-96 sm:h-76 "
            style={{ perspective: '2000px' }}
          >
            <div
              className={`w-full h-full transition-transform duration-500 relative`}
              style={{
                transformStyle: 'preserve-3d',
                transform: flippedIndex === index ? 'rotateY(180deg)' : '',
              }}
            >
              {/* FRONT */}
              <div
                className="absolute w-full h-full bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col justify-between"
                style={{ backfaceVisibility: 'hidden' }}
              >

                <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>



                <div className="text-sm text-gray-700 space-y-2">
                  {/* Offered By */}
                  <div className="flex items-center gap-x-2">
                    <FaGraduationCap className="text-gray-000 bg-gray-200 p-1 rounded-full" size={24} />
                    <span className="font-medium">Offered By:</span>
                    <span>{post.provider}</span>
                  </div>

                  {/* State */}
                  <div className="flex items-center gap-x-2">
                    <FaGlobe className="text-blue-000 bg-blue-200 p-1 rounded-full" size={24} />
                    <span className="font-medium">State:</span>
                    <span>{post.state}</span>
                  </div>

      
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">


                    {/* Min GPA */}
                    <div className="flex items-center gap-x-2">
                      <LuCheckCheck className=" bg-purple-200 p-1 rounded-full" size={24} />
                      <span className="font-medium">Min. GPA:</span>
                      <span>{post.mingpa || "--"}</span>
                    </div>

                    {/* Award */}
                    <div className="flex items-center gap-x-2 flex-wrap">
                      <FaMedal className=" bg-yellow-200 p-1 rounded-full" size={24} />
                      <span className="font-medium">Award:</span>
                      <span className='text-wrap'>{post.award}</span>
                    </div>



                    <div className="flex items-center gap-x-2">
                      <FaClock className="bg-red-200 p-1 rounded-full" size={24} />
                      <span className="font-medium">Deadline:</span>
                      <span>{post.deadline}</span>
                    </div>

                    {/* Amount */}
                    <div className="flex items-center gap-x-2 flex-wrap">
                      <FaDollarSign className="bg-green-200 p-1 rounded-full" size={24} />
                      <span className="font-medium">Amount:</span>
                      <span>{post.amount}</span>
                    </div>
                  </div>
                </div>



                <div className="flex justify-between gap-x-2">
                  <button
                    onClick={() => toggleFlip(index)}
                    className="w-1/2 px-4 py-2 cursor-pointer text-purple-500 border-2 border-purple-500 rounded-md text-sm font-medium"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => window.open(post.apply)}
                    className="w-1/2 px-4 py-2 cursor-pointer bg-purple-500 hover:bg-purple-400 border-2 border-purple-500 text-white rounded-md text-sm font-medium"
                  >
                    Apply Now
                  </button>
                </div>
              </div>

              {/* BACK */}
              <div
                className="absolute w-full h-full bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col justify-between"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <div className="text-gray-800 text-sm font-normal">{post.description}</div>
                <div className="flex justify-between w-full gap-x-2">
                  <button
                    onClick={() => toggleFlip(index)}
                    className="w-1/2 px-4 py-2 cursor-pointer text-purple-500 border-2 border-purple-500 rounded-md text-sm font-medium"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => window.open(post.apply)}
                    className="w-1/2 px-4 py-2 cursor-pointer bg-purple-500 hover:bg-purple-400 border-2 border-purple-500 text-white rounded-md text-sm font-medium"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
      </>
}

 

    </div>


  );
};

export default Scholarships;



