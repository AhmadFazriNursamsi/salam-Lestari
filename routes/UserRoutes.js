import Express from "express"

import{
    LoginUser,
    registerUser,
    OtpUser,
    ResentOtpUser,
    ResetPassword,
    ForgotPassword,
    forgot,
    Check,
    CheckChangePassword,
    ResetEmail
} from "../controller/User.js"

const router = Express.Router()

router.post('/reset-email', ResetEmail)
router.post('/login', LoginUser)
router.post('/register', registerUser)
router.post('/otp', OtpUser)
router.post('/resent-otp', ResentOtpUser)

router.post('/reset-password', ResetPassword)
router.post('/forgot-password', ForgotPassword);
router.post('/forgot', forgot);
router.get('/chek/:code', Check);
router.post('/check/changepassword', CheckChangePassword)



export default router
