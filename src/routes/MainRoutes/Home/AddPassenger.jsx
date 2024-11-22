import React, { useState } from 'react'

const Input = ({ label, type, placeholder, value, onChange, errMsg }) => {
    return (
        <>
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                {label}
            </label>
            <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" />
            <p className='text-red-500'>{errMsg}</p>
        </>
    )
}
const AddPassenger = () => {
    const [state, setState] = useState({
        formsInputs: [{
            Origin: '',
            Destination: '',
        }],
        errorField: [{
            Origin: '',
            Destination: '',
        }]
    })
    const { formsInputs, errorField } = state
    const handleChange = (e, i) => {
        const { name, value } = e.target;
        const list = [...formsInputs];
        list[i][name] = value;
        setState((prev) => {
            return {
                ...prev,
                formsInputs: list
            }
        })
    }
    const handleAdd = () => {
        // if (state?.formsInputs?.length >= 5) {
        //     return false
        // }
        setState((prev) => {
            return {
                ...prev,
                formsInputs: [...prev.formsInputs, {
                    Origin: '',
                    Destination: '',
                    Date: "",
                }]
            }
        })
    }
    const handleSubmit = () => {

    }
    const handleRemove = (index) => {
        const rows = [...state.formsInputs];
        console.log(rows, index)
        for (let i = 0; i <= rows?.length; i++) {
            console.log(rows, i)
            if (i === index) {
                console.log(i)
                rows.splice(i, 1);
                break;
            }
        }
        setState((prev) => {
            return {
                ...prev,
                formsInputs: rows
            }
        })
    }
    return (
        <main>
            <section className=''>
                {formsInputs?.map((item, i) => (
                    <div key={i} >
                        {/* <button>view</button> */}
                        <div className='flex'>
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <Input onChange={(e) => handleChange(e, i)} value={item?.Origin} name="Origin" placeholder="Origin" label="Origin" errMsg={item?.errOr} />
                            </div>
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <Input onChange={(e) => handleChange(e, i)} value={item?.Destination} name="Destination" placeholder="Destination" label="Destination" errMsg={item?.errDes} />
                            </div>
                        </div>
                        {/* {i >= 1 && <div>
                            <button className='bg-red-600 text-white border px-5 py-1 rounded shadow outline-none' onClick={() => handleRemove(i)}>Remove</button>
                        </div>} */}
                    </div>
                ))}
            </section>
            <div className='flex w-1/3'>
                <div>
                    <button className='border px-5 py-1 rounded shadow outline-none' onClick={() => handleSubmit()}>Submit</button>
                </div>
                <div>
                    <button className='border px-5 py-1 rounded shadow outline-none' onClick={() => handleAdd()} disabled={state?.formsInputs?.length === 5}>Add City</button>
                </div>

            </div>
        </main >
    )
}

export default AddPassenger