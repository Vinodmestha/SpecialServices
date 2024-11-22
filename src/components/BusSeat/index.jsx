import React, { useEffect } from 'react'
import { seat } from '../../db/bus'

const BusSeat = () => {
    let lowerDesk = []
    let upperDesk = []
    seat?.map((d) => d?.zIndex === "0" && lowerDesk.push(d))
    seat?.map((d) => d?.zIndex === "1" && upperDesk.push(d))
    useEffect(() => {
    }, [])
    console.log(lowerDesk?.map((d) => d?.row))
    let dup = [...new Set(lowerDesk?.map((d) => d?.row))]
    let col = [...new Set(lowerDesk?.map((d) => d?.column))]
    console.log(dup?.sort())

    console.log("col", col?.sort())
    return (
        <div>
            {/* Lower desk */}
            <div>
                <div>Lower Desk</div>
                <div className='flex w-1/2'>
                    {
                        dup?.sort((a, b) => a - b).map((data, i) => {
                            return (
                                <div key={i} className={`  mb-2 ${dup[data] === "2" ? "justify-end" : ""}`} >
                                    {col?.sort((a, b) => a - b)?.map((el, index) => {
                                        return (
                                            <div key={index}  >
                                                {lowerDesk?.map((item, i) => {
                                                    if (item?.zIndex === "0" && data === item?.row && el === item?.column) {
                                                        return (
                                                            <div key={i} className={`w-20 h-10  mr-5 rounded-md flex justify-center items-center ${el ? "bg-gray-300" : ""}`}>
                                                                <div >
                                                                    {item?.name}/{item?.row} - {item?.column}
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })
                                                }
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            {/* Upper desk */}
            <div>
                Upper Desk
                <div>

                </div>
            </div>
        </div >
    )
}

export default BusSeat



