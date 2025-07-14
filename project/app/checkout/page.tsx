'use client'
import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


interface Product {
    id: string;
    name: string;
    price: number;
    quantity?: number;
}


const Checkout = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const productId = searchParams.get('productId')
    const [products, setProducts] = useState<Product[]>([]);

    const [Fname, setFname] = useState<string>('')
    const [Lname, setLname] = useState<string>('')
    const [Email, setEmail] = useState<string>('')
    const [Mobile, setMobile] = useState<string>('')
    const [Address, setAddress] = useState<string>('')
    const [disable, setdisable] = useState<boolean>(true)

    useEffect(() => {
        fetchUserDetails()
        fetchCheckoutItems()
    }, [productId])


    const fetchCheckoutItems = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            if (productId) {
                // BUY NOW MODE
                const res = await axios.get(`http://localhost:3334/product/${productId}`);
                setProducts([{ ...res.data, quantity: 1 }]);
            } else {
                // CART MODE
                try {

                    const res = await axios.get('http://localhost:3334/cart/getCart', {
                        headers: {
                            authorization: token
                        }
                    });

                    const items = res.data.item.map((item: any) => ({
                        id: item.product.id,
                        name: item.product.name,
                        price: item.product.price,
                        quantity: item.quantity,
                        description: item.product.description,
                    }));


                    setProducts(items);
                } catch (error) {
                    return error
                }
            }
        } catch (err) {
            console.error('Error loading checkout items:', err);
        } finally {
            // setLoading(false);

        }
    };


    const fetchUserDetails = async () => {
        try {
            const response = await axios.get('http://localhost:3333/auth/', {
                headers: {
                    'authorization': localStorage.getItem('token')
                }
            })
            if (response) {
                setEmail(response.data.email)
                setAddress(response.data.address === null ? "" : response.data.address)
                setFname(response.data.firstName === null ? "" : response.data.firstName)
                setLname(response.data.lastName === null ? "" : response.data.lastName)
                setMobile(response.data.mobileNo === null ? "" : response.data.mobileNo)
                // console.log(response.data)
            }
        }
        catch (e) {
            return e
        }
    }

    const handleSave = async () => {
        try {
            const response = await axios.put('http://localhost:3333/auth/updateUser', {
                firstName: Fname,
                lastName: Lname,
                address: Address,
                mobileNo: Mobile
            }, {
                headers: {
                    'authorization': localStorage.getItem('token')
                }
            })
            if (response) {
                setEmail(response.data.email)
                setAddress(response.data.address === null ? "" : response.data.address)
                setFname(response.data.firstName === null ? "" : response.data.firstName)
                setLname(response.data.lastName === null ? "" : response.data.lastName)
                setMobile(response.data.mobileNo === null ? "" : response.data.mobileNo)
                // console.log(response.data)
            }
            setdisable(true)
        }
        catch (e) {
            return e
        }
    }

    const total = products.reduce((sum, item) => {
        return sum + Math.ceil(parseFloat(item.price));
    }, 0);


    const handelOrder = async () => {
        try {
            const items = products.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
                pricePerUnit: item.price
            }));
            const res = await axios.post('http://localhost:3334/order/setorder', {
                amount: total,
                item: items
            }, {
                headers: {
                    'authorization': localStorage.getItem('token')
                }
            })
            if (res) {
                console.log(res)
                const orderId = res.data.id
                router.replace(`/order?orderId=${orderId}&total=${total}`)
            }

        }
        catch (e) {
            return e
        }
    }



    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Left Side - Billing & Shipping */}
                    <div className="p-6 space-y-6">

                        <div className="flex justify-between">
                            <h2 className="text-2xl font-semibold text-gray-800">Checkout</h2>
                            {disable === true ?
                                <button onClick={() => setdisable(false)} className='bg-primary text-white font-bold py-1 px-3 rounded-xl'>Edit</button>
                                : <div className='flex gap-3'>
                                    <button onClick={() => setdisable(true)} className='text-black font-bold py-1 px-3 rounded-xl'>Cancle</button>
                                    <button onClick={handleSave} className='bg-primary text-white font-bold py-1 px-3 rounded-xl'>Save</button>

                                </div>}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Billing Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input disabled={disable} onChange={(e) => setFname(e.target.value)} type="text" value={Fname} placeholder="First Name" className="input p-2" />
                                <input disabled={disable} onChange={(e) => setLname(e.target.value)} type="text" value={Lname} placeholder="Last Name" className="input p-2" />
                                <input disabled={disable} onChange={(e) => setEmail(e.target.value)} type="email" value={Email} placeholder="Email" className="input p-2" />
                                <input disabled={disable} onChange={(e) => setMobile(e.target.value)} type="tel" value={Mobile} placeholder="Phone Number" className="input p-2" />
                                <input disabled={disable} onChange={(e) => setAddress(e.target.value)} type="text" value={Address} placeholder="Address" className="input md:col-span-2 p-2" />

                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
                            <select aria-label='payment' className="input w-full">
                                <option value="cod">Cash on Delivery</option>
                            </select>

                        </div>

                        <button onClick={handelOrder} className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-900 w-full mt-4">
                            Place Order
                        </button>
                    </div>

                    {/* Right Side - Cart Summary */}
                    <div className="bg-gray-50 p-6 border-t lg:border-t-0 lg:border-l border-gray-200 space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800">Order Summary</h3>

                        {/* Sample Cart Items */}
                        <div className="space-y-4">
                            {products.map((item, index) => {
                                return (
                                    <div key={index} className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-500">{item.quantity} * {item.price}</p>
                                        </div>
                                        <p className="font-semibold">${item.price}</p>
                                    </div>)
                            })}


                        </div>

                        <hr />

                        <div className="flex justify-between font-semibold text-lg">
                            <span>Total</span>
                            <span> ${
                                total
                            }</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
