import React, { useState, useEffect } from 'react'
import { SSRData } from './JsonData'

import Meal from './Meal'
import Baggage from './Baggage'

const data = [
    {
        name: "Meal",
    },
    {
        name: "Baggage"
    }
]
function SpecialService() {

    const [state, setState] = useState({
        activeType: "Meal",
        meal: [],
        baggage: [],
        activeFlight: {},
        activeTab: 0,

        //ssr
        count: 0,
        ssrId: [],
        ssrData: [],

        passenger: 5,
        //  selected special items include in arr
        selectedItems: {}
    })
    useEffect(() => {
        let m = [];
        let b = []
        SSRData?.data?.special_services?.map((d) => d?.lstSSRDetails?.filter((item) => item?.SSRType === "1" && m.push(d)))
        SSRData?.data?.special_services?.map((d) => d?.lstSSRDetails?.filter((item) => item?.SSRType === "2" && b.push(d)))
        let rmvDup1 = [...new Set(m)];
        let rmvDup2 = [...new Set(b)]
        setState((prev) => {
            return {
                ...prev,
                meal: rmvDup1,
                baggage: rmvDup2,
                activeFlight: rmvDup1[0]
            }
        })

    }, [])

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

    const handleTabChange = (d, i) => {
        setState((prev) => {
            return {
                ...prev,
                activeFlight: d,
                activeTab: i
            }
        })
    }
    const { activeType, baggage } = state
    console.log(state?.activeType, state?.activeFlight)
    return (
        <div className='max-w-screen-xl mx-auto'>
            {data?.map((d, i) => {
                return (
                    <button key={i}
                        className={`border-2 py-1 px-2 mr-3 rounded-lg ${activeType === d?.name ? "bg-red-400" : ""}`}
                        onClick={() => {
                            setState((prev) => {
                                return {
                                    ...prev,
                                    activeType: d?.name
                                }
                            })
                        }} >{d?.name}</button>
                )
            })}
            {
                activeType === "Meal" && <Meal prevState={state} handleTabChange={handleTabChange} handleInc={handleInc} handleDec={handleDec} />
            }
            {
                activeType === "Baggage" ? <Baggage baggage={baggage} /> : null
            }
        </div>
    )
}

export default SpecialService