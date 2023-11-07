import React from 'react'
import { seat } from './JsonData.js'
import { useLocation } from 'react-router-dom'

function SeatLayout() {
    const location = useLocation();
    const [state, setState] = React.useState({
        activeFlight: seat[0]?.flight_seat_details?.lstAirSeat[0],
        passenger: location?.state?.passenger,
        selectedSeats: {},
        active: 0,
        selected: {},
        selectedShow: []
    })

    const handleSelectSeats = (d) => {
        if (!Object.hasOwn(state?.selected, state.active) &&
            !Object.hasOwn(state?.selectedShow, state.active)) {
            let newObj = Object.assign(state?.selected, { [state.active]: [] })
            let newObj2 = Object.assign(state?.selectedShow, { [state.active]: [] })
            console.log(newObj, newObj2)
            setState((prev) => {
                return {
                    ...prev,
                    selected: newObj,
                    selectedShow: newObj2
                }
            });
        }
        if (state?.selected[state.active]?.includes(d?.SeatNumber)) {
            // Item is already selected
            // Filter out the selected item
            let a = state?.selected[state?.active]?.filter((item) => {
                return item !== d?.SeatNumber;
            });
            let b = state?.selectedShow[state?.active]?.filter((item) => {
                return item !== d?.SeatNumber;
            });
            console.log(a)
            // Update the state with the filtered array
            setState((prev) => {
                return {
                    ...prev,
                    selected: {
                        ...state?.selected,
                        [state?.active]: a
                    },
                    selectedShow: {
                        ...state?.selectedShow,
                        [state?.active]: b
                    }
                }
            })
        } else {
            let arr = []
            arr.push(d?.SeatNumber,)
            console.log("first", state?.selected)
            // Add the item to the selected array
            setState((prev) => {
                return {
                    ...prev,
                    selected: {
                        ...state?.selected,
                        [state.active]: [...state?.selected[state.active], d?.SeatNumber]
                    },
                    selectedShow: {
                        ...state?.selectedShow,
                        [state.active]: [...state?.selectedShow[state.active], d?.SeatNumber]
                    }
                }
            })
        }
    }
    console.log(state?.selected, state?.selectedShow)
    return (
        <div className='max-w-screen-xl mx-auto' >
            <div className='flex justify-center items-center'>
                {
                    state?.selectedShow[state?.active]?.map((item, i) => {
                        return (
                            <div key={i}>
                                {item?.SeatNumber}
                            </div>
                        )
                    })

                }
            </div>
            <div className='my-4'>
                <h4 className='text-xl font-semibold text-center'>Active Route Flight</h4>
                <div className='flex justify-center items-center my-3'>
                    {seat[0]?.flight_seat_details?.lstAirSeat.map((item, i) => {
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
                                    }}>{item.Origin}-{item.Destination}</button>
                            </div>
                        )
                    })}
                </div>
                <div>
                    {seat[0]?.flight_seat_details?.lstAirSeat[state.active]?.LstRow?.map((seat, i) => {
                        return (
                            <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
                                {seat?.lstColumn?.map((d, i) => {
                                    return (
                                        <button
                                            className={`flex justify-center items-center w-10 h-10 p-1 m-2 text-sm border rounded-lg cursor-pointer font-semibold ${state.selected[state?.active]?.includes(d?.SeatNumber) ? 'bg-red-400 text-white' : ""}
                                            ${d.SeatStatus === 1 ? "bg-gray-300 cursor-not-allowed" : ""}`}
                                            key={i}
                                            disabled={d.SeatStatus === 1 || state?.passenger === state.selected[state?.active]?.length & !state.selected[state?.active]?.includes(d?.SeatNumber)}
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
                </div>
            </div>
        </div >
    )
}

export default SeatLayout



