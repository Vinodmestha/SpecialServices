import React from 'react'
import { seatArr } from './JsonData.js'
import { useLocation } from 'react-router-dom'

function SeatLayout() {
    const location = useLocation();
    const [state, setState] = React.useState({
        activeFlight: seatArr[0]?.flight_seat_details?.lstAirSeat[0],
        passenger: location?.state?.passenger,
        active: 0,
        selectedSeats: {}
    })

    const handleSelectSeats = (d) => {

        // initial (state selectedSeats) obj 
        if (!Object.hasOwn(state?.selectedSeats, state.active)) {
            // assigning empty array to selectedSeats obj
            let newObj = Object.assign(state?.selectedSeats, { [state.active]: [] })
            setState((prev) => {
                return {
                    ...prev,
                    selectedSeats: newObj,
                }
            });
        }
        // when user select seats add new obj and removed last element 
        setState((prev) => {
            return {
                ...prev,
                selectedSeats: {
                    ...state?.selectedSeats,
                    [state.active]: [...state?.selectedSeats[state.active], d]
                },
            }
        })
        // includes check with id and removed last element
        if (state?.passenger === state.selectedSeats[state?.active]?.length && !state.selectedSeats[state?.active]?.map((d) => d?.SeatNumber)?.includes(d?.SeatNumber)) {
            return state?.selectedSeats[state.active]?.pop()
        }

        // checking in array already exist a obj or not, if exist then filter
        if (state?.selectedSeats[state.active]?.map(a => a?.SeatNumber)?.includes(d?.SeatNumber)) {
            // Item is already exist in array
            // Filter out the selectedSeats item
            let b = state?.selectedSeats[state?.active]?.filter((item) => {
                return item.SeatNumber !== d?.SeatNumber;
            });
            // Update the state with the filtered array
            setState((prev) => {
                return {
                    ...prev,
                    selectedSeats: {
                        ...state?.selectedSeats,
                        [state?.active]: b
                    }
                }
            })
        }
    }
    console.log(state?.selectedSeats[state.active]?.map(d => d?.SeatNumber), state?.selectedSeats[state.active])

    return (
        <div className='max-w-screen-xl mx-auto' >
            <div className='my-4'>
                <h4 className='text-xl font-semibold text-center'>Active Route Flight</h4>
                <div className='flex justify-center items-center my-3'>
                    {seatArr[0]?.flight_seat_details?.lstAirSeat.map((item, i) => {
                        return (
                            <div key={i} className={`py-1 px-2 font-semibold rounded border mr-3  ${state.activeFlight.Origin === item.Origin ? "bg-red-400" : ""}`}>
                                <button
                                    onClick={() => {
                                        setState((prev) => {
                                            return {
                                                ...prev,
                                                activeFlight: item,
                                                active: i
                                            }
                                        })
                                    }}>
                                    {item.Origin}-{item.Destination}
                                </button>
                            </div>
                        )
                    })}

                </div>
                <div className='relative'>
                    {seatArr[0]?.flight_seat_details?.lstAirSeat[state.active]?.LstRow?.map((seat, i) => {
                        return (
                            <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
                                {seat?.lstColumn?.map((d, i) => {
                                    return (
                                        <button
                                            className={`flex justify-center items-center w-10 h-10 p-1 m-2 text-sm border rounded-lg cursor-pointer font-semibold ${state.selectedSeats[state?.active]?.map((d) => d?.SeatNumber)?.includes(d?.SeatNumber) ? 'bg-red-400 text-white' : ""}
                                            ${d.SeatStatus === 1 ? "bg-gray-300 cursor-not-allowed" : ""}`}
                                            key={i}
                                            disabled={d.SeatStatus === 1}
                                            onClick={() => {
                                                handleSelectSeats(d);
                                            }
                                            }
                                        >
                                            {d.SeatNumber}
                                        </button>
                                    )
                                })}

                            </div>
                        )
                    })}
                    {state?.selectedSeats[state.active]?.length >= 0 ? <div className='absolute top-0'>
                        <h1 className='bg-gray-100 rounded-lg px-2 py-2 '>Passengers details</h1>
                        <div>
                            {state?.selectedSeats[state.active]?.map((item, i) => (
                                <div key={i} className='flex justify-between'>
                                    <div>{item?.SeatNumber}</div>
                                    <div>{item?.SeatFare?.TotalFare}</div>
                                </div>
                            ))}
                        </div>
                    </div> : null}
                </div>
            </div>
        </div >
    )
}

export default SeatLayout



