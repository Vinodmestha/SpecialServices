import React from 'react'
import { seat } from './JsonData.js'
import { useLocation } from 'react-router-dom'

function SeatLayout() {
    const location = useLocation();
    const [state, setState] = React.useState({
        activeFlight: seat[0]?.flight_seat_details?.lstAirSeat[0],
        passenger: location?.state?.passenger,
        filteredIdSeats: {},
        active: 0,
        filteredId: {},
        filteredObj: {}
    })

    const handleSelectSeats = (d) => {
        if (!Object.hasOwn(state?.filteredId, state.active) && !Object.hasOwn(state?.filteredObj, state.active)) {
            let newObj = Object.assign(state?.filteredId, { [state.active]: [] })
            let newObj2 = Object.assign(state?.filteredObj, { [state.active]: [] })
            setState((prev) => {
                return {
                    ...prev,
                    filteredId: newObj,
                    filteredObj: newObj2
                }
            });
        }
        setState((prev) => {
            return {
                ...prev,
                filteredId: {
                    ...state?.filteredId,
                    [state.active]: [...state?.filteredId[state.active], d?.SeatNumber]
                },
                filteredObj: {
                    ...state?.filteredObj,
                    [state.active]: [...state?.filteredObj[state.active], d]
                }

            }
        })
        // }

        // includes check with id 
        if (state?.passenger === state.filteredId[state?.active]?.length &&
            !state.filteredId[state?.active]?.includes(d?.SeatNumber) &&
            state.filteredId[state?.active][state.filteredId[state?.active].length - 1]) {
            return state?.filteredId[state.active]?.pop()
        }
        if (state?.filteredId[state.active]?.includes(d?.SeatNumber)) {
            // Item is already filteredId
            // Filter out the filteredId item
            let a = state?.filteredId[state?.active]?.filter((item) => {
                return item !== d?.SeatNumber;
            });
            // Update the state with the filtered array
            setState((prev) => {
                return {
                    ...prev,
                    filteredId: {
                        ...state?.filteredId,
                        [state?.active]: a
                    },
                }
            })
        }
        // let isContained = false;

        // for (const obj of state.filteredObj[state?.active]) {
        //     if (obj?.SeatNumber === d?.SeatNumber) {
        //         isContained = true;
        //         break;
        //     }
        // }
        console.log(state?.filteredObj[state.active]?.map(a => a?.SeatNumber), !state?.filteredObj[state.active]?.map(a => a?.SeatNumber)?.includes(d?.SeatNumber))
        // state.filteredObj[state?.active]?.length &&
        // !state?.filteredObj[state?.active]?.filter((item) => {
        //     item.SeatNumber?.includes(d?.SeatNumber)
        // }) &&
        // filter with objects
        if (state?.passenger === state.filteredObj[state?.active]?.length && state?.filteredObj[state.active]?.map(a => a?.SeatNumber)?.includes(d?.SeatNumber) && state.filteredObj[state?.active][state.filteredObj[state?.active]?.length - 1]) {
            console.log("first")
            return state?.filteredObj[state.active]?.pop()
        }
        // console.log(state?.filteredObj[state.active]?.includes(d))
        if (state?.filteredObj[state.active]?.map(a => a?.SeatNumber)?.includes(d?.SeatNumber)) {
            console.log("first", state?.filteredObj[state.active])
            // Item is already filteredId
            // Filter out the filteredId item

            let b = state?.filteredObj[state?.active]?.filter((item) => {
                return item.SeatNumber !== d?.SeatNumber;
            });
            console.log(b, "filtered")
            // Update the state with the filtered array
            setState((prev) => {
                return {
                    ...prev,
                    filteredObj: {
                        ...state?.filteredObj,
                        [state?.active]: b
                    }
                }
            })
        }
        // else {
        //     setState((prev) => {
        //         return {
        //             ...prev,
        //             filteredObj: {
        //                 ...state?.filteredObj,
        //                 [state.active]: [...state?.filteredObj[state.active], d]
        //             }
        //         }
        //     })
        // }
    }

    console.log(state?.filteredObj[state.active]?.map(d => d?.SeatNumber), state?.filteredId[state.active])
    // disabled={d.SeatStatus === 1 || state?.passenger === state.filteredId[state?.active]?.length & !state.filteredId[state?.active]?.includes(d?.SeatNumber)}
    return (
        <div className='max-w-screen-xl mx-auto' >
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
                <div className='relative'>
                    {seat[0]?.flight_seat_details?.lstAirSeat[state.active]?.LstRow?.map((seat, i) => {
                        return (
                            <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
                                {seat?.lstColumn?.map((d, i) => {
                                    return (
                                        <button
                                            className={`flex justify-center items-center w-10 h-10 p-1 m-2 text-sm border rounded-lg cursor-pointer font-semibold ${state.filteredId[state?.active]?.includes(d?.SeatNumber) ? 'bg-red-400 text-white' : ""}
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
                    {state?.filteredId[state.active]?.length >= 0 ? <div className='absolute top-0'>
                        <h1 className='bg-gray-100 rounded-lg px-2 py-2 '>Passengers details</h1>
                        <div>
                            {state?.filteredObj[state.active]?.map((item, i) => (
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



