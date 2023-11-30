import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const [passengers, setPassengers] = useState()
    const [showPassengers, setShowPassengers] = useState()
    const [error, setError] = useState("")
    const [isValid, setIsValid] = useState(false)
    const navigate = useNavigate()
    const handleInput = (e) => {
        const number = e.target.value
        setPassengers(number)
    }

    //handle submit
    const addPassengers = () => {
        // switch(passengers){
        //     case
        // }
        if (!passengers) {
            setError("Please select passengers input")
            setIsValid(false)
            return false
        } else if (passengers?.length > 1) {
            setError("Passengers cannot select more than 5")
            setIsValid(false)
            return false
        } else if (passengers > 5) {
            setError("Please select 5 passengers")
            setIsValid(false)
            return false
        } else {
            setError("")
            setIsValid(true)
        }
        setShowPassengers(Number(passengers))
    }

    const handleNavigate = (v) => {
        if (isValid) {
            navigate(v, {
                state: { passenger: showPassengers }
            })
        } else {
            alert("Please below select 5 passengers")
        }
    }
    return (
        <div className='lg:max-w-screen-xl mx-auto flex flex-col justify-center items-center h-screen'>
            <div className=' w-4/5 lg:w-1/2 mx-auto'>
                <h1 className="font-poppins text-4xl font-semibold text-red-400 text-center mb-20">Flight Seat, Meal and Baggage </h1>
                <div className='flex gap-4'>
                    <div className={`w-3/4 border-2 rounded-md border-gray-200 px-2 py-1 ${error ? "border-2 border-red-500" : ""} `}>
                        <input
                            type="number"
                            placeholder='Select passengers'
                            className={`w-full h-8 outline-none px-2 font-semibold `}
                            value={passengers}
                            onChange={(e) => {
                                handleInput(e)
                            }} />
                    </div>
                    <button
                        className='w-1/2 border bg-blue-500 text-white font-semibold rounded-md py-2 px-3 outline-none'
                        onClick={() => {
                            addPassengers()
                        }}
                    >Add
                    </button>
                </div>
                <p className='text-red-500 font-semibold'>{error}</p>
                <h3 className='text-left text-xl font-semibold my-3'>Passengers  {isValid && showPassengers ? ": " : ""} {isValid && showPassengers}</h3>
                <div className='mt-5 flex flex-col sm:flex-row gap-y-4'>
                    <button
                        className='w-full py-1 px-3 border-2  rounded-md bg-gray-50 hover:bg-red-400 hover:text-white sm:mr-4 font-semibold text-lg '
                        onClick={() => {
                            handleNavigate("/seat-layout")

                        }}>
                        Seat Layout
                    </button>
                    <button className='w-full py-1 px-3 border-2 rounded-md bg-gray-50 hover:text-white hover:bg-red-400 font-semibold text-lg ' onClick={() => {
                        handleNavigate("/special-service")
                    }}>
                        Special Service
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home