import React, { useState, useEffect } from 'react'

function Baggage(props) {
    const [state, setState] = useState({
        activeFlight: {},
        activeTab: 0,

        //ssr
        count: 0,
        ssrId: [],
        ssrData: [],

        passenger: 5
    })
    useEffect(() => {
        setState((prev) => {
            return {
                ...prev,
                activeFlight: props?.baggage[0]
            }
        })
    }, [props])
    const handleInc = (d) => {
        d.qty++;
        setState((prev) => {
            return {
                ...prev,
                ssrId: [...state?.ssrId, d?.id],
                ssrData: [...state?.ssrData, d],
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
    console.log(state?.activeFlight)
    return (
        <div className='max-w-screen-xl mx-auto'>
            <div className='my-4 flex justify-center'>
                {props?.baggage?.map((item, index) => {
                    return (
                        <span key={index} className={`border py-1 px-2 mr-2 rounded-md cursor-pointer ${state?.activeTab === index ? "bg-red-400" : ""}`}
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
                    return d?.SSRType === "2" && (
                        <div className='flex justify-between mx-3 bg-gray-200 p-2 rounded-lg' key={i}>
                            <div className='flex'>
                                <div className='h-20 w-20'>
                                    <img src={d?.ImageURL} alt="" className='w-full h-full rounded-md' />
                                </div>
                                <div className='text-left pl-3'>
                                    <p className='font-medium'>{d?.Amount}</p>
                                    <p>{d?.Detail}</p>
                                </div>
                            </div>
                            <div>
                                <button
                                    className='border-2 bg-white px-1 rounded-md font-semibold'
                                    disabled={state?.passenger === state?.ssrId?.length}
                                    onClick={() => {
                                        handleInc(d)
                                    }}>Inc</button>
                                <div className='text-center font-semibold'>{d?.qty}</div>
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

export default Baggage