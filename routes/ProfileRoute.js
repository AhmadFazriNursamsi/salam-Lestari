import Express from "express"

import{
    getProfile,
    getProfileById,
    UpdateProfile
} from "../controller/Profile.js"

const router = Express.Router()

router.get('/profile', getProfile)
router.get('/profile/:user_id', getProfileById)
router.post('/profile/:id', UpdateProfile)

export default router