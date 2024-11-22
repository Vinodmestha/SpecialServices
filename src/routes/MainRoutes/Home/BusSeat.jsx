import React, { useEffect, useRef } from 'react'
import { seat } from '../../../db/bus';

function BusSeat() {

    let u = useRef([]),
        l = useRef([]);
    let { current: upper } = u
    let { current: lower } = l
    // let lower = [];
    // let upper = []


    let deckAvailability = [...new Set(seat?.map((a) => a.zIndex))];
    let row = [...new Set(seat?.map(({ row }) => row))].sort((a, b) => a - b);
    let column = [...new Set(seat?.map(({ column }) => column))].sort((a, b) => a - b);
    console.log(row)
    console.log(column)
    // useEffect(() => {
    lower = seat?.filter((item) => item.zIndex === "0" && lower.push(item))
    upper = seat?.filter((item) => item.zIndex === "1" && upper.push(item))
    console.log(lower)
    console.log(upper)
    // }, [])
    return (
        <div>
            bus
            <div className='flex gap-3'>
                {row?.map((d, i) => (
                    <div key={i} >
                        {d}
                        {column?.map((c, ic) => (
                            <div key={ic} className={`flex`}>
                                {lower?.map((item, index) => {
                                    if (item.row === d && item?.zIndex === "0" && item?.column === c) {
                                        return (
                                            <div key={index} className='w-6 h-10 text-xs rounded bg-gray-300  mb-2'>
                                                {item?.name}
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div >
    )
}

export default BusSeat