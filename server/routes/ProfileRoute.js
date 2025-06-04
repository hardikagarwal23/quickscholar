import express from 'express';
import User from '../schema/user.js';  

const router = express.Router();

router.put('/update', async (req, res) => {
  try {
    const { profile } = req.body;

     await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          profile: profile,
          isProfileComplete: true
        }
      }
    );
    res.json({success:true,message:"Profile saved successfully."});
  } catch (error) {
    res.json({ error: error.message });
  }
});



router.get('/userdata', async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
  success: true,
  data: {
    email: user.email,
    isProfileCompleted: user.isProfileComplete,
    profile: user.profile, 
  }
}); 
  } catch (error) {
    res.json({ error: error.message });
  }
});
export default router;