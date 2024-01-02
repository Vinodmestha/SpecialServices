import React from 'react'

function Baggage({ prevState, baggage, handleBTab, handleBInc, handleBDec }) {
    console.log(prevState)
    return (
        <div className='max-w-screen-xl mx-auto'>
            <div>
                <h2 className='my-5 text-xl font-bold'>Travellers : {prevState?.passenger}</h2>
            </div>
            <div className='my-4 flex justify-center'>
                {baggage?.map((item, index) => {
                    return (
                        <span key={index} className={`border py-1 px-2 mr-2 rounded-md cursor-pointer ${prevState?.activeBTab === index ? "bg-red-400 text-white" : ""}`}
                            onClick={() => {
                                handleBTab(item, index)
                            }}
                        >
                            {item?.Origin}-{item?.destination}
                        </span>
                    )
                })}
            </div>
            <div className='grid lg:grid-cols-3 sm:grid-clos-2 grid-cols-1 gap-5'>
                {prevState?.activeFlight?.lstSSRDetails?.map?.((d, i) => {
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
                                    // disabled={prevState?.passenger === prevState?.ssrId?.length}
                                    onClick={() => {
                                        handleBInc(d)
                                    }}>Inc</button>
                                <div className='text-center font-semibold'>{d?.qty}</div>
                                <button className='border-2 bg-white px-1 rounded-md font-semibold'
                                    onClick={() => {
                                        handleBDec(d)
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