import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { useRegisterMutation } from '../../redux/api/usersApiSlice'
import { Eye, EyeOff } from "lucide-react"; // 👁️ icons

const Register = () => {
    const [username, setUsername] = useState('')
    const [usernameError, setUsernameError] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false) // toggle for password
    const [showConfirmPassword, setShowConfirmPassword] = useState(false) // toggle for confirm

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, {isLoading}] = useRegisterMutation()
    const {userInfo} = useSelector(state => state.auth)

    const {search} = useLocation()
    const sp = new  URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const isValidUsername = (username) => /^[A-Za-z]+$/.test(username);

    const submitHandler = async (e) => {
        e.preventDefault()

        if (!isValidUsername(username)) {
            setUsernameError(true)
            return
        } else {
            setUsernameError(false)
        }

        if(password !== confirmPassword) {
            toast.error('Passwords do not match')
        } else {
            try {
                const res = await register({username, email, password}).unwrap()
                dispatch(setCredentials({...res}))
                navigate(redirect)
                toast.success('User successfully registered')
            } catch (error) {
                console.log(error)
                toast.error(error.data.message)
            }
        }
    }

    return (
      <div 
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80')"
        }}
      >
        <div className='bg-white bg-opacity-80 p-10 rounded-lg shadow-lg w-[40rem]'>
            <h1 className="text-2xl text-black font-semibold mb-4 text-center">Register</h1>

            <form onSubmit={submitHandler} className='container'>
                <div className='my-[2rem]'>
                    <label htmlFor="name" className='text-sm font-medium text-black'> Name </label>
                    <input 
                        type="text" 
                        id='name' 
                        className='mt-1 p-2 border rounded w-full' 
                        placeholder='Enter name' 
                        value={username} 
                        onChange={e => {
                            setUsername(e.target.value)
                            if (usernameError) setUsernameError(false)
                        }}
                    />
                    {usernameError && <p className="text-red-500 mt-2">Username must contain only letters</p>}
                </div>

                <div className='my-[2rem]'>
                    <label htmlFor="email" className='text-sm font-medium text-black'> Email Address </label>
                    <input 
                        type="email" 
                        id='email' 
                        className='mt-1 p-2 border rounded w-full' 
                        placeholder='Enter email' 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                {/* Password with eye toggle 👁️ */}
                <div className='my-[2rem]'>
                    <label htmlFor="password" className='text-sm font-medium text-black'> Password </label>
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            id='password' 
                            className='mt-1 p-2 border rounded w-full pr-10' 
                            placeholder='Enter Password' 
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button 
                            type="button" 
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                        </button>
                    </div>
                </div>

                {/* Confirm Password with eye toggle 👁️ */}
                <div className='my-[2rem]'>
                    <label htmlFor="confirmPassword" className='text-sm font-medium text-black'> Confirm Password </label>
                    <div className="relative">
                        <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            id='confirmPassword' 
                            className='mt-1 p-2 border rounded w-full pr-10' 
                            placeholder='Confirm Password' 
                            value={confirmPassword} 
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                        <button 
                            type="button" 
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                        </button>
                    </div>
                </div>

                <button
                  disabled={isLoading}
                  type='submit' 
                  className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem] w-full">
                    {isLoading ? "Registering..." : "Register"}
                </button>

                {isLoading && (
                    <div className="flex justify-center items-center min-h-[10rem]">
                        <Loader />
                    </div>
                )}
            </form>

            <div className='mt-4 text-center'>
                <p className='text-black'>
                    Already have an account? {" "}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className='text-pink-500 hover:underline'>
                        Login
                    </Link>
                </p>
            </div>
        </div>
      </div>
    )
}

export default Register
