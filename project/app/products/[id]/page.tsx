// app/products/[id]/page.tsx
'use client'
import axios from "axios";
import Image from "next/image";
import { useRouter } from 'next/navigation'
interface ProductPageProps {
    params: {
        id: string;
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
   
    const router = useRouter()
    const res = await fetch(`http://localhost:3334/product/${params.id}`);
    const product = await res.json();


    const handelCart = async (id: string, price: number) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return alert('Please login first');

            const response = await axios.post(
                'http://localhost:3334/cart/addCart',
                {
                    productId: id,
                    quantity: 1,
                    pricePerUnit: price,
                },
                {
                    headers: {
                        authorization: token,
                    },
                }
            );

            console.log('Add to cart response:', response.data);
        } catch (e) {
            console.error('Error adding to cart:', e);
            alert('Failed to add product to cart');
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:flex">
                <div className="md:w-1/2">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={100}
                        height={100}
                        className="object-cover w-full h-96 md:h-full"
                    />
                </div>
                <div className="p-8 md:w-1/2 flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
                        <p className="text-sm text-gray-500 mb-4 capitalize">
                            Category: {product.categoryId.replace(/-/g, ' ')}
                        </p>
                        <p className="text-gray-700 text-base mb-6">{product.description}</p>
                    </div>
                    <div>
                        <p className="text-2xl font-semibold text-blue-600 mb-4">₹{product.price}</p>
                        <div className="flex gap-5">

                            <button onClick={() => handelCart(product.id, product.price)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition">
                                Add to Cart
                            </button>
                            <button onClick={() => router.replace(`/checkout?productId=${product.id}`)} className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
