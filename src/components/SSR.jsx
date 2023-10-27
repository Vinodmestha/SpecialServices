import React, { useState } from 'react'
import { ssr } from './SpecialService'

function SSR() {
    const [state, setState] = useState({
        activeFlight: ssr?.data?.special_services[0],
        activeTab: 0,

        //ssr
        count: 0,
        ssrId: [],
        ssrData: []
    })
    const handleInc = (d) => {
        d.qty++;
        // if (state?.ssrId?.includes(d?.id)) {
        //     let a = state?.ssrId?.filter((item) => item !== d?.id);
        //     let b = state?.ssrData?.filter((item) => item?.id !== d?.id);
        //     console.log(a, b)
        //     setState((prev) => {
        //         return {
        //             ...prev,
        // ssrId: [...state?.ssrId, a?.id],
        // ssrData: [...state?.ssrData, b]
        //         }
        //     })
        // } else {
        setState((prev) => {
            return {
                ...prev,
                ssrId: [...state?.ssrId, d?.id],
                ssrData: [...state?.ssrData, d]
            }
        })
        // }
        setState((prev) => {
            return {
                ...prev,
                count: state?.count + 1
            }
        })
    }
    const handleDec = (d) => {
        console.log(d)
        if (state?.count <= 0) {
            return;
        } else {
            if (state?.ssrId?.includes(d?.id)) {
                d.qty--;
                for (let a in state?.ssrId) {

                    console.log(state?.ssrId[a], a)
                    if (state?.ssrId[a] === d?.id) {
                        state?.ssrId.splice(a, 1);
                        break;
                    }
                }
                setState((prev) => {
                    return {
                        ...prev,
                        ssrId: [...state?.ssrId],
                        count: state?.count - 1
                    }
                })
            }

        }
    }
    console.log(state?.count, state?.ssrId,)
    return (
        <div>
            <div className='my-4'>
                {ssr?.data?.special_services?.map((item, index) => {
                    return (
                        <span key={index} className={`border py-1 px-2 mr-2 rounded-md ${state?.activeTab === index ? "bg-red-400" : ""}`}
                            onClick={() => {
                                setState((prev) => {
                                    return {
                                        ...prev,
                                        activeFlight: item,
                                        activeTab: index
                                    }
                                })
                            }}
                        >
                            {item?.Origin}-{item?.destination}
                        </span>
                    )
                })}
            </div>
            <div className='grid grid-cols-3 gap-5'>
                {state?.activeFlight?.lstSSRDetails?.map?.((d, i) => {
                    !d?.qty && Object.assign(d, { qty: 0 })
                    return (
                        <div className='flex justify-between mx-3 bg-gray-200 p-2 rounded-lg' key={i}>
                            <div className='flex'>
                                <div className='h-20 w-20'>
                                    <img src={d?.ImageURL} alt="" className='w-full h-full rounded-md' />
                                </div>
                                <div className='text-left pl-3'>
                                    <p>{d?.Amount}</p>
                                    <p>{d?.Detail}</p>
                                </div>
                            </div>
                            <div>
                                <button className='border-2 bg-white px-1 rounded-md font-semibold'
                                    onClick={() => {
                                        handleInc(d)
                                    }}>Inc</button>
                                <div>{d?.qty}</div>
                                <button className='border-2 bg-white px-1 rounded-md font-semibold'
                                    disabled={d?.qty === 0} onClick={() => {
                                        handleDec(d)
                                    }}>Dec</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default SSR