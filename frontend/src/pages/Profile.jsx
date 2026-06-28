import React, { useEffect, useState } from 'react'
import { User, ShoppingBag, MapPin, Heart, LogOut, Edit2, ChevronRight } from 'lucide-react';
import { authFetch, clearTokens } from '../utils/auth';
import { Navigate ,Link} from 'react-router-dom';
import ProductCard from '../components/ProductCard';
const Profile = () => {

    const [activeTab, setActiveTab] = useState('profile');
     const [user, setUser] = useState([]);
     
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
     const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
        //Fetch Cart form BE
        const fetchUser = async () => {
            try {
                const res = await authFetch(`${BASEURL}/api/user/`)
                const data = await res.json();
                setUser(data || []);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }
        console.log("Cart Items:", user);
    
            useEffect(() => {
            fetchUser();
        }, []);

        useEffect(() => {
          authFetch(`${BASEURL}/api/orderItem/`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch order");
            }
            return response.json();
        })
        .then((data)=>{
            setOrder(data);
            setLoading(false);
        })
        .catch((error)=>{
            setError(error.message);
            setLoading(false);
        });
    }, []);
      console.log("Cart order:", order);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
      const handleLogout = () => {
            clearTokens();
            Navigate('/login');
        };
   
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit">
            <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
                    <svg className="w-6 h-6 clear-current" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    </div> 
                <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 rounded-full hover:bg-indigo-700 transition-colors shadow">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <h2 className="mt-4 font-semibold text-lg text-gray-900">{user.username}</h2>
              <p className="text-sm text-gray-500">Customer since {}</p>
            </div>

            <nav className="mt-6 space-y-1">
              {[
                { id: 'profile', label: 'Profile Information', icon: User },
                { id: 'orders', label: 'Order History', icon: ShoppingBag },
                { id: 'addresses', label: 'Manage Addresses', icon: MapPin },
                { id: 'wishlist', label: 'My Wishlist', icon: Heart },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                      activeTab === item.id
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === item.id ? 'transform translate-x-1' : ''}`} />
                  </button>
                );
              })}
              
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 mt-4  font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>

            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Conditional Tab Rendering */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Personal Details</h3>
                  
                  <button className="text-sm text-indigo-600 font-semibold hover:underline flex items-center gap-1">
                    Edit Profile
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Full Name</label>
                    <p className="text-base font-medium text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">{user.username}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Email Address</label>
                    <p className="text-base font-medium text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Phone Number</label>
                    <p className="text-base font-medium text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">{}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Password</label>
                    <p className="text-base font-medium text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">••••••••••••</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Order History</h3>
                <div className="overflow-x-auto">
                    <div className="min-h-screen bg-gray-100">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                                {order.length > 0 ? (
                                  order.map((item) => (
                                  <Link to={`/product/${item.product}`}>
                                <div className="bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform p-4 cursor-pointer">
                                <h2 className="text-lg font-semibold text-gray-800 truncate">

                                  Quantity: {item.quantity}
                                </h2>
                                <p className="text-gray-600 font-medium">${item.price}</p>
                              </div>
                              </Link>
                    ))
                ) : (
                          <p className="col-span-full text-center text-gray-500">No products available.</p>
                )}
            </div>
        </div>
                </div>
              </div>
            )}

            {/* Default/Fallback views for static display */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Saved Addresses</h3>
                  <button className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors">
                    Add New Address
                  </button>
                </div>
                <div className="border border-indigo-100 bg-indigo-50/30 rounded-xl p-5 relative">
                  <span className="absolute top-4 right-4 bg-indigo-600 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">Default</span>
                  <h4 className="font-semibold text-gray-900 mb-1">Home</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    123 Apparel Way,<br />
                    Suite 400<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 text-center py-12">
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-900 mb-1">Your wishlist is empty</h3>
                <p className="text-gray-500 text-sm mb-6">Explore our shop to add items to your wishlist!</p>
                <Link to='/' className='bg-indigo-600 text-white text-sm px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors'>
                            Continue to Shopping
                </Link>
            </div>
            )}

        </main>
        </div>
    </div>
    </div>
    )
}

export default Profile;
