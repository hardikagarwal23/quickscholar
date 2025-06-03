import express from 'express';
import post from '../schema/scholarshipPost.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const allPosts = await post.find();
        res.json(allPosts);
    } catch (error) {
        res.json({ error: error.message });
    }
})

export default router;