import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../contexts/AppContext';
import { FaClock, FaDollarSign, FaGlobe, FaGraduationCap, FaMedal } from 'react-icons/fa'
import { LuCheckCheck } from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';


const ScholarshipsClosingSoon = () => {
  const { posts } = useContext(AppContext);
  const [showClosingPosts, setShowClosingPosts] = useState(false);
  const [closingPosts, setClosingPosts] = useState([]);
  const [flippedIndex, setFlippedIndex] = useState(null);



  useEffect(() => {
    const lastFiveDates = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      lastFiveDates.push(formattedDate);
    }

    const filtered = posts.filter(post => {
      if (!post.deadline) return false;
      return lastFiveDates.includes(post.deadline.trim());
    });

    setClosingPosts(filtered);
  }, [posts]);


  const toggleFlip = (index) => {
    if (flippedIndex === index) {
      setFlippedIndex(null);
    } else {
      setFlippedIndex(index);
    }
  }


  return closingPosts.length > 0 && (
    <div >

      <div onClick={() => setShowClosingPosts((prev) => (!prev))} className='cursor-pointer hover:bg-gradient-to-br hover:from-yellow-100 hover:to-yellow-200 bg-yellow-100 border border-yellow-300 text-center py-2 font-semibold text-red-800'>
        Scholarships Closing Soon – <span className='animate-pulse'>Apply Now!</span>
      </div>

      <AnimatePresence>
        {showClosingPosts &&

          <motion.div
            key="dropdown"
            initial={{ opacity: 0.6, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0.6, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden max-w-8xl mx-auto px-4 py-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >


            {closingPosts.map((post, index) => (
              <div
                key={index}
                className="relative w-full h-90 sm:h-76 "
                style={{ perspective: '1000px' }}
              >
                <div
                  className={`w-full h-full transition-transform duration-600 relative`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: flippedIndex === index ? 'rotateY(180deg)' : '',
                  }}
                >
                  {/* Front */}
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

                  {/* Back */}
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

          </motion.div>
        }
      </AnimatePresence>
    </div>

  )
}

export default ScholarshipsClosingSoon;




