'use client'
import { CheckCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
const OrderPlaced = () => {
    const searchParams = useSearchParams()
    const orderId = searchParams.get('orderId')
    const total = searchParams.get('total')
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-md max-w-lg w-full text-center">
                <CheckCircle className='h-full  w-full bg-green-600 rounded-full text-white' />
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
                <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been confirmed.</p>

                <div className="bg-gray-100 rounded-xl p-4 text-left mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Order Summary</h2>
                    <p><span className="font-medium">Order ID:</span> {orderId}</p>
                    <p><span className="font-medium">Total:</span>${total}</p>
                </div>
                
                <button
                    onClick={() => {window.location.href = '/products'}}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default OrderPlaced;
