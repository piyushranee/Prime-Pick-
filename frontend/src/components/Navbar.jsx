import {Link, useNavigate} from 'react-router-dom';
import {useCart} from '../context/CartContext.jsx';

import {  LogIn, LogOut, ShoppingBag, User, } from 'lucide-react';
import { clearTokens, getAccessToken } from '../utils/auth.js';

function Navbar() {
    const {cartItems} = useCart();
    const navigate = useNavigate();
    
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    
    const isLoggedIn = !!getAccessToken();

    const handleLogout = () => {
        clearTokens();
        navigate('/login');
    };
    return (
        <nav className='bg-blue-300 shadow-md px-6 py-6 flex justify-between items-center fixed w-full top-0 z-50 h-19'>
            <Link to='/' className='text-2xl font-bold gap-3 px-4 py-3 text-gray-800 flex'>
            <ShoppingBag className=""/>
                    Prime Pick 
                    <ShoppingBag className=""/>
            </Link>

            <div className='flex items-center gap-6'>
                {/* Login/SignUp or Logout */}
                {!isLoggedIn ? (
                    <>
                        <Link to='/login' className='text-gray-800 gap-3  hover:text-gray-600 font-medium flex'>
                            <LogIn className="w-5 h-5" />
                                Login
                            </Link>
                        <Link to='/signup' className='text-gray-800 hover:text-gray-600 font-medium flex'>
                            <User className="text-green-500" strokeWidth={2.5} />
                            Sign Up
                        </Link>
                    </>
                ) : (
                    <button onClick={handleLogout} className='text-gray-800  gap-3 px-4 py-3 text-sm hover:text-gray-600 font-medium flex'>
                         <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                   
                )}
            </div>

            <Link to='/cart' className='relative text-gray-800 hover:text-gray-600 font-medium'>
                🛒 Cart
                {cartCount > 0 && (
                    <span className='absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full px-2'>
                        {cartCount}
                    </span>
                )}
            </Link>

                    <div className='items-center'>
                       {isLoggedIn? (
                    <Link to='/profile' className='text-gray-800 hover:text-gray-600 font-medium'>
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
                    <svg className="w-6 h-6 clear-current" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    </div> 
                   <h1 className=''></h1>
                </Link>):(<div>
                </div>)}
                </div>

        </nav>
    )
}

export default Navbar;