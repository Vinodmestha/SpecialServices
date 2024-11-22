import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import Chart from "react-apexcharts";

function Input() {

    const [state, setState] = useState({
        formData: {
            name: "",
            lName: "",
            mail: "",
            // checkbox: false
        },
        formError: {
            name: "",
            lName: "",
            mail: "",
        },
        update: false,

    })
    const { formData, formError, valid, update } = state;
    // useEffect(() => {
    //     setState((prev) => {
    //         return {
    //             ...prev,
    //             update: true
    //         }
    //     })
    // }, [update])
    const setData = (e, k) => {
        const v = e.target.value
        setState((prev) => {
            return {
                ...prev,
                formData: {
                    ...prev.formData,
                    [k]: v
                    // k === "checkbox" ? !formData.checkbox : 

                }
            }
        })
        return validateFields(k, v)
    }
    const validateFields = (k, v) => {
        // for (let i in d) {
        console.log(k, v)
        setState((prev) => {
            return {
                ...prev,
                formError: {
                    ...prev.formError,
                    [k]: v === "" ? "please fill field data" : v.length < 3 ? "length < 3" : ""
                },
            }
        })
        // }
    }
    const validateHandler = () => {
        let d = formData
        let valid = true
        let newError = {}
        for (let i in d) {
            console.log(d, d[i]?.length, i, formError)
            if (!d[i]) {
                newError[i] = "please fill field"
                valid = false
            } else if (i === "mail" && d[i]?.length < 10) {
                newError[i] = "number must be 10 digits"
                valid = false
            }
        }
        if (Object.keys(newError).length > 0) {
            setState((prev) => {
                return {
                    ...prev,
                    formError: newError
                }
            })
        }
        console.log(newError)
        return valid
    }

    const handleSubmit = () => {
        let res = validateHandler()

        if (!res) {
            return
        } else {
            setState((prev) => {
                return {
                    ...prev,
                    formError: {}
                }
            })
            console.log("submit")
        }

        // if (Object.keys(newError).length > 0) {
        //     setState((prev) => {
        //         return {
        //             ...prev,
        //             formError: newError
        //         }
        //     })
        // } else {
        //     console.log("submit")
        // }
    }
    return (
        <div className='w-1/4'>
            {/* <Chart
                options={state.options}
                series={state.series}
                type="bar"
                width="500"
            /> */}
            <ReactApexChart options={state.options} series={state.series} type="donut" />
            <ReactApexChart options={state.options2} series={state.series2} type="bar" height={350} />
            {/* <div className='mb-3'>
                <label className='text-sm font-semibold '>
                    Name
                </label>
                <div className='py-2 px-3 border-2 rounded-lg'>
                    <input type="text" placeholder='Name' onChange={(e) => setData(e, "name")} value={formData.name} className='focus:outline-none border:outline-none' />
                </div>
                <p className='text-sm text-red-500 text-left font-medium'>{formError?.name}</p>
            </div>
            <div className='mb-3'>
                <label className='text-sm font-semibold '>
                    Last Name
                </label>
                <div className='py-2 px-3 border-2 rounded-lg'>
                    <input type="text" placeholder='Last Name' onChange={(e) => setData(e, "lName")} value={formData.lName} className='focus:outline-none border:outline-none' />
                </div>
                <p className='text-sm text-red-500 text-left font-medium'>{formError?.lName}</p>
            </div>
            <div className='mb-3'>
                <label className='text-sm font-semibold '>
                    Name
                </label>
                <div className='py-2 px-3 border-2 rounded-lg'>
                    <input type="text" placeholder='Name' onChange={(e) => setData(e, "mail")} value={formData.mail} className='focus:outline-none border:outline-none' />
                </div>
                <p className='text-sm text-red-500 text-left font-medium'>{formError?.mail}</p>
            </div> */}



            {/* <div>
                <input type="checkbox" placeholder='Name' onChange={(e) => setData(e, "checkbox")} value={formData.isEnable} />
            </div> */}
            <div>
                <button className='border-2 rounded-xl px-5 py-3'
                    // disabled={!formData.checkbox}
                    onClick={() => {
                        handleSubmit()
                    }}>Submit</button>
            </div>
        </div>
    )
}

export default Input