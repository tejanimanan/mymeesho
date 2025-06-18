import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import MainLayout from './MainLayout'

function CartPriceCard({ cartItems, onContinue }) {
  const totalProductPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalDiscount = 45; // Example static discount
  const deliveryFee = totalProductPrice > 500 ? 0 : 50;
  const orderTotal = totalProductPrice - totalDiscount + deliveryFee;

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <h4 className="font-bold mb-4">Price Details ({cartItems.length} Item{cartItems.length > 1 ? 's' : ''})</h4>
      <div className="flex justify-between mb-2">
        <span>Total Product Price</span>
        <span>₹{totalProductPrice}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Total Discounts</span>
        <span className="text-green-600">-₹{totalDiscount}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Delivery Fee</span>
        <span>{deliveryFee === 0 ? <span className="text-green-600">Free</span> : `₹${deliveryFee}`}</span>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between font-bold text-lg mb-2">
        <span>Order Total</span>
        <span>₹{orderTotal}</span>
      </div>
      <button
        className="w-full py-3 bg-purple-700 text-white font-bold rounded hover:bg-purple-800 mb-2"
        onClick={onContinue}
      >
        Continue
      </button>
    </div>
  );
}

export default function Cart() {
  // Example cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Oppo F23 (5G) Cover | Camera Protection Shockproof',
      price: 170,
      qty: 2,
      img: '/images/mymeesho.png',
    },
    {
      id: 2,
      name: 'Samsung M33 (5G) Cover | Shockproof Bumper',
      price: 150,
      qty: 1,
      img: '/images/mymeesho.png',
    },
    {
      id: 3,
      name: 'iPhone 13 Case | Crystal Clear',
      price: 250,
      qty: 1,
      img: '/images/mymeesho.png',
    },
  ])

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [editQty, setEditQty] = useState(1)
  const navigate = useNavigate()

  // Remove item with SweetAlert2 confirmation
  const handleRemove = (id) => {
    const item = cartItems.find((item) => item.id === id)
    Swal.fire({
      title: item.name,
      text: 'Do you want to remove this product from cart?',
      showCancelButton: true,
      confirmButtonText: 'REMOVE',
      cancelButtonText: 'CANCEL',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#a020f0',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        setCartItems(cartItems.filter((item) => item.id !== id))
        Swal.fire('Removed!', 'Product has been removed from cart.', 'success')
      }
    })
  }

  // Open Edit modal
  const handleEdit = (id) => {
    const item = cartItems.find((item) => item.id === id)
    setEditItem(item)
    setEditQty(item.qty)
    setIsModalOpen(true)
  }

  // Save changes from modal
  const handleSaveEdit = () => {
    setCartItems(cartItems.map(item =>
      item.id === editItem.id ? { ...item, qty: editQty } : item
    ))
    setIsModalOpen(false)
    setEditItem(null)
  }

  // Cancel modal
  const handleCancelEdit = () => {
    setIsModalOpen(false)
    setEditItem(null)
  }

  return (
    <MainLayout cartItems={cartItems} currentStep={0}>
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
        {/* Left: Cart Items */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-6 text-center">Product Details</h3>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-300 shadow p-4 flex flex-row gap-4 items-center rounded-lg relative"
              >
                <img src={item.img} alt={item.name} className="w-20 h-20 object-contain" />
                <div className="flex-1 text-start">
                  <p className="font-semibold text-lg mb-1">{item.name}</p>
                  <p className="text-gray-700 mb-1">&#8377; {item.price}</p>
                  <span className="block text-sm text-gray-500 mb-1">All issue easy returns</span>
                  <span className="block text-sm text-gray-500">QTY: {item.qty}</span>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <button
                    className="text-purple-700 font-semibold hover:underline text-sm"
                    onClick={() => handleEdit(item.id)}
                  >
                    EDIT
                  </button>
                  <button
                    className="text-pink-700 font-semibold hover:underline text-sm"
                    onClick={() => handleRemove(item.id)}
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            ))}
            {cartItems.length === 0 && (
              <div className="text-center text-gray-500 py-10">Your cart is empty.</div>
            )}
          </div>
        </div>
        {/* Right: Cart Price Card */}
        <div className="w-full md:w-[350px]">
          <CartPriceCard cartItems={cartItems} onContinue={() => navigate('/address')} />
        </div>
      </div>
      {/* Edit Sidebar */}
      {isModalOpen && editItem && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0  bg-opacity-10 z-40"
            onClick={handleCancelEdit}
          ></div>
          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-gray-200 shadow-lg z-50 transition-transform duration-500">
            <button
              className="absolute top-4 right-6 text-2xl text-gray-700 font-bold"
              onClick={handleCancelEdit}
            >
              &times;
            </button>
            <div className="p-6 pt-12">
              <h2 className="text-lg font-bold mb-4">EDIT ITEM</h2>
              <div className="flex gap-4 items-center mb-4">
                <img src={editItem.img} alt={editItem.name} className="w-16 h-16 object-contain" />
                <div>
                  <p className="font-semibold">{editItem.name}</p>
                  <p className="text-gray-700">&#8377; {editItem.price}</p>
                </div>
              </div>
              <div className="mb-4 flex items-center gap-4">
                <span className="text-sm font-medium">Qty</span>
                <button
                  className="px-2 py-1  rounded text-white bg-purple-700"
                  onClick={() => setEditQty(Math.max(1, editQty - 1))}
                >-</button>
                <input
                  type="number"
                  min="1"
                  value={editQty}
                  onChange={e => setEditQty(Number(e.target.value))}
                  className="border w-16 text-center rounded"
                />
                <button
                  className="px-2 py-1  rounded text-white bg-purple-700"
                  onClick={() => setEditQty(editQty + 1)}
                >+</button>
              </div>
              <div className="mb-6 text-lg font-semibold flex justify-between">
                <span>Total Price</span>
                <span>&#8377; {editItem.price * editQty}</span>
              </div>
              <button
                className="w-full py-3 bg-purple-700 text-white font-bold rounded hover:bg-purple-800"
                onClick={handleSaveEdit}
              >
                Continue
              </button>
            </div>
          </div>
        </>
      )}
    </MainLayout>
  )
}
