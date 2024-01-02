import React, { useState, useEffect } from 'react'
import { SSR } from '../../db/JsonData'

import Meal from './Meal'
import Baggage from './Baggage'
import { useLocation } from 'react-router-dom'

const data = [
    {
        name: "Meal",
    },
    {
        name: "Baggage"
    }
]
function SpecialService() {
    const location = useLocation()
    const [state, setState] = useState({
        activeType: "Meal",
        meal: [],
        baggage: [],
        activeFlight: {},
        activeTab: 0,

        //ssr
        count: 0,
        ssrId: {},
        ssrData: {},
        activeMeal: 0,


        // baggage 
        activeBTab: 0,
        countBag: 0,
        filteredBaggage: {},
        filteredBaggageId: {},
        bagArr: [],

        passenger: location?.state?.passenger,
    })
    useEffect(() => {
        let m = [];
        let b = []
        SSR?.data?.special_services?.map((d) => d?.lstSSRDetails?.filter((item) => item?.SSRType === "1" && m.push(d)))
        SSR?.data?.special_services?.map((d) => d?.lstSSRDetails?.filter((item) => item?.SSRType === "2" && b.push(d)))
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
        if (!Object.hasOwn(state?.ssrId, state?.activeTab)) {
            Object.assign(state?.ssrId, {
                [state?.activeTab]: []
            })
            Object.assign(state?.ssrData, {
                [state?.activeTab]: []
            })
        }
        if (state?.ssrId[state?.activeTab]?.length + 1 > state?.passenger) {
            alert("More than travellers cannot select")
            return false
        }
        d.qty++;
        setState((prev) => {
            return {
                ...prev,
                ssrId: {
                    ...prev?.ssrId,
                    [state?.activeTab]: [...prev?.ssrId[state?.activeTab], d?.id]
                },
                ssrData: {
                    ...prev?.ssrData,
                    [state?.activeTab]: [...prev?.ssrData[state?.activeTab], d]
                },
                count: prev?.count + 1
            }
        })

    }
    const handleDec = (d) => {
        if (state?.count === 0 || d?.qty === 0) {
            // alert("Please add items")
            return false
        }
        d.qty--;
        if (state?.ssrId[state.activeTab]?.includes(d?.id)) {
            for (let a in state?.ssrId[state.activeTab]) {
                if (state?.ssrId[state.activeTab][a] === d?.id) {
                    state?.ssrId[state.activeTab].splice(a, 1);
                    break;
                }
            }
            return setState((prev) => {
                return {
                    ...prev,
                    ssrId: {
                        ...prev?.ssrId,
                        [state.activeTab]: state?.ssrId[state?.activeTab]
                    },
                    ssrData: {
                        ...prev?.ssrData,
                        [state?.activeTab]: state?.ssrData[state?.activeTab], d
                    },
                    count: state?.count - 1
                }
            })
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

    //baggage
    const handleBTab = (item, i) => {
        setState((prev) => {
            return {
                ...prev,
                activeBTab: i,
                activeFlight: item
            }
        })
    }
    const handleBInc = (d) => {
        if (!Object.hasOwn(state?.filteredBaggageId, state?.activeBTab)) {
            Object.assign(state?.filteredBaggageId, {
                [state?.activeBTab]: []
            })
            Object.assign(state?.filteredBaggage, {
                [state?.activeBTab]: []
            })
        }
        if (state?.filteredBaggageId[state.activeBTab]?.length + 1 > state?.passenger) {
            alert(`cannot select more than ${state?.passenger} `)
            return false;
        }
        d.qty++;
        setState((prev) => {
            return {
                ...prev,
                countBag: state?.countBag + 1,
                filteredBaggage: {
                    ...prev?.filteredBaggage,
                    [state?.activeBTab]: [...prev?.filteredBaggage[state?.activeBTab], d]
                },
                filteredBaggageId: {
                    ...prev?.filteredBaggageId,
                    [state?.activeBTab]: [...prev?.filteredBaggageId[state?.activeBTab], d?.id]
                },
            }
        })

    }
    const handleBDec = (d) => {
        if (state?.countBag === 0 || d?.qty === 0) {
            return false;
        }
        d.qty--;
        if (state?.filteredBaggageId[state?.activeBTab]?.includes(d?.id)) {
            for (let i in state?.filteredBaggageId[state?.activeBTab]) {
                if (state?.filteredBaggageId[state?.activeBTab][i] === d?.id) {
                    state?.filteredBaggageId[state?.activeBTab]?.splice(i, 1);
                    break;
                }
            }
            for (const i in state?.filteredBaggage[state?.activeBTab]) {
                if (state?.filteredBaggage[state?.activeBTab][i]?.id === d?.id) {
                    state?.filteredBaggage[state?.activeBTab]?.splice(i, 1);
                    break;
                }
            }
            setState((prev) => {
                return {
                    ...prev,
                    countBag: state.countBag - 1,
                    filteredBaggage: {
                        ...prev.filteredBaggage,
                        [state?.activeBTab]: state?.filteredBaggage[state?.activeBTab]
                    },
                    filteredBaggageId: {
                        ...prev.filteredBaggageId,
                        [state?.activeBTab]: state?.filteredBaggageId[state?.activeBTab]
                    }
                }
            })
        }
    }
    const { activeType, baggage } = state
    return (
        <div className='max-w-screen-xl mx-auto'>
            {data?.map((d, i) => {
                return (
                    <button key={i}
                        className={`border-2 py-1 px-2 mr-3 rounded-lg ${activeType === d?.name ? "bg-red-400 text-white" : ""}`}
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
                activeType === "Baggage" ? <Baggage prevState={state} baggage={baggage} handleBTab={handleBTab} handleTabChange={handleTabChange} handleBInc={handleBInc} handleBDec={handleBDec} /> : null
            }
        </div>
    )
}

export default SpecialService