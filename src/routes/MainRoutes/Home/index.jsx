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
        if (!passengers) {
            setError("Please select passengers input")
            setIsValid(false)
            return false
        } else if (passengers?.length > 1) {
            setError("Passengers cannot select more than 5")
            setIsValid(false)
            return false
        }
        else if (passengers > 5) {
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
        <div className='max-w-screen-xl mx-auto flex flex-col justify-center items-center h-screen'>
            <div className='w-1/2 mx-auto'>
                <div className='grid gap-4'>
                    <div className='border-2 rounded border-gray-200 px-2 py-1 '>
                        <input
                            type="number"
                            placeholder='Select passengers'
                            className='w-full h-8 outline-none px-2 font-semibold'
                            value={passengers}
                            onChange={(e) => {
                                handleInput(e)
                            }} />
                    </div>
                    <button
                        className='w-full border bg-blue-500 text-white font-semibold rounded py-2 px-3 outline-none'
                        onClick={() => {
                            addPassengers()
                        }}
                    >Add
                    </button>
                </div>
                <p className='text-red-500 font-semibold'>{error}</p>
            </div>
            <h3 className='text-xl font-semibold my-3'>{isValid && showPassengers ? "Passengers : " : ""} {isValid && showPassengers}</h3>
            <div className='w-1/2 mx-auto'>
                <div className='mt-5 flex'>
                    <button
                        className='w-full py-1 px-3 border-2  rounded-md hover:bg-red-400 hover:text-white mr-4 font-semibold text-lg '
                        onClick={() => {
                            handleNavigate("/seat-layout")

                        }}>
                        Seat Layout
                    </button>
                    <button className='w-full py-1 px-3 border-2 rounded-md hover:text-white hover:bg-red-400 font-semibold text-lg ' onClick={() => {
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