'use client'
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
interface Product {
    name: string;
    description: string;
    price: number;
    image: string;
}

interface Item {
    id: string;
    quantity: number;
    pricePerUnit: number;
    product: Product;
}

interface Order {
    id: string;
    amount: number;
    status: string;
    Created_at: string;
    item: Item[];
}


const OrderHistory = () => {

    const [orders, setOrder] = useState<Order[]>([])
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            fetchOrder()
        }
        else {
            window.location.href = '/login'
        }
    }, [])

    const fetchOrder = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return
            const res = await axios.get('http://localhost:3334/order/getorder', {
                headers: {
                    'authorization': token
                }
            })

            const data: Order[] = res.data.map((order: any) => ({
                id: order.id,
                amount: order.amount,
                status: order.status,
                Created_at: order.Created_at,
                item: order.item.map((i: any) => ({
                    id: i.id,
                    quantity: i.quantity,
                    pricePerUnit: i.pricePerUnit,
                    product: {
                        name: i.product.name,
                        description: i.product.description,
                        price: i.product.price,
                        image: i.product.image,
                    },
                })),
            }));

            setOrder(data)
        } catch (error) {
            return error
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Your Order History</h1>

            {orders.length === 0 ? (
                <div className='flex flex-col items-center gap-5'>
                    <p className="text-center text-gray-500 text-lg"> you have no past order</p>
                    <button
                        onClick={() => { window.location.href = '/products' }}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                    >
                        Continue Shopping
                    </button>
                </div>

            ) : (<div className="max-w-6xl mx-auto space-y-8">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                        {/* Order Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                            <div>
                                <p className="text-gray-800 font-semibold">
                                    Order ID: <span className="text-sm font-normal text-gray-500">{order.id}</span>
                                </p>
                                <p className="text-sm text-gray-500">
                                    Placed on: {new Date(order.Created_at).toLocaleString()}
                                </p>
                            </div>
                            <div className="text-right">
                                <span className="inline-block text-sm bg-yellow-100 text-yellow-700 font-medium px-3 py-1 rounded-full">
                                    {order.status}
                                </span>
                                <p className="text-xl font-bold text-green-600 mt-2">₹{order.amount}</p>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="divide-y divide-gray-200">
                            {order.item.map((item) => (
                                <div key={item.id} className="py-4 flex flex-col md:flex-row items-start md:items-center gap-4">
                                    <Image
                                        height={100}
                                        width={100}
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="w-24 h-24 object-cover rounded-md border"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>
                                        <p className="text-sm text-gray-500">{item.product.description}</p>
                                        <div className="text-sm text-gray-700 mt-1">
                                            Quantity: {item.quantity} × ₹{item.pricePerUnit.toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="text-right text-gray-800 font-semibold">
                                        ₹{(item.quantity * item.pricePerUnit).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>)
            }
        </div >
    );
};

export default OrderHistory;
