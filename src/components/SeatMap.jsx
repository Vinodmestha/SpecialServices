// import React, { useEffect } from 'react'
// // import { seatData } from "./seatData.jsx"

// function SeatMap() {
//     const [state, setState] = React.useState({
//         activeFlight: seatData[0]?.flight_seat_details?.lstAirSeat[0],
//         passenger: 5,
//         selectedSeats: {},
//         active: 0,
//         selected: {},
//         selectedShow: []
//     })
//     // useEffect(() => {
//     //     // this hook will get called every time myArr has changed
//     // }, [state.selected])
//     const handleSelectSeats = (d) => {
//         if (!Object.hasOwn(state?.selected, state.active) &&
//             !Object.hasOwn(state?.selectedShow, state.active)) {
//             let newObj = Object.assign(state?.selected, { [state.active]: [] })
//             let newObj2 = Object.assign(state?.selectedShow, { [state.active]: [] })
//             console.log(newObj, newObj2)
//             setState((prev) => {
//                 return {
//                     ...prev,
//                     selected: newObj,
//                     selectedShow: newObj2
//                 }
//             });
//         }
//         console.log(state?.selected)
//         if (state?.selected[state.active]?.includes(d?.SeatNumber)) {
//             // Item is already selected
//             // Filter out the selected item
//             let a = state?.selected[state?.active]?.filter((item) => {
//                 return item !== d?.SeatNumber;
//             });
//             let b = state?.selectedShow[state?.active]?.filter((item) => {
//                 return item !== d?.SeatNumber;
//             });
//             console.log(a)
//             // Update the state with the filtered array
//             setState((prev) => {
//                 return {
//                     ...prev,
//                     selected: {
//                         ...state?.selected,
//                         [state?.active]: a
//                     },
//                     selectedShow: {
//                         ...state?.selectedShow,
//                         [state?.active]: b
//                     }
//                 }
//             })
//         } else {
//             let arr = []
//             arr.push(d?.SeatNumber,)
//             console.log("first", state?.selected)
//             // Add the item to the selected array
//             setState((prev) => {
//                 return {
//                     ...prev,
//                     selected: {
//                         ...state?.selected,
//                         [state.active]: [...state?.selected[state.active], d?.SeatNumber]
//                     },
//                     selectedShow: {
//                         ...state?.selectedShow,
//                         [state.active]: [...state?.selectedShow[state.active], d?.SeatNumber]
//                     }
//                 }
//             })
//         }
//     }
//     console.log(state?.selected, state?.selectedShow)
//     return (
//         <div className='seat-container' style={{ display: "flex", flexDirection: "row" }}>
//             <div style={{ width: "50%" }}>
//                 {
//                     state?.selectedShow[state?.active]?.map((item, i) => {
//                         return (
//                             <div key={i}>
//                                 {item?.SeatNumber}
//                             </div>
//                         )
//                     })

//                 }
//             </div>
//             <div className='seat-header' style={{ width: "50%" }}>
//                 Active Route Flight
//                 {seatData[0]?.flight_seat_details?.lstAirSeat.map((item, i) => {
//                     return (
//                         <div key={i} className={`seat-od ${state.activeFlight.Origin === item.Origin ? "active" : ""}`}>
//                             <button
//                                 style={{ background: `${state.activeFlight.Origin === item.Origin ? "red" : 'white'}` }}
//                                 onClick={() => {

//                                     setState((prev) => {
//                                         return {
//                                             ...prev,
//                                             activeFlight: item,
//                                             active: i
//                                         }
//                                     })
//                                 }}>{item.Origin}-{item.Destination}</button>
//                         </div>
//                     )
//                 })}
//                 <div>
//                     {seatData[0]?.flight_seat_details?.lstAirSeat[state.active]?.LstRow?.map((seat, i) => {
//                         return (
//                             <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
//                                 {seat.lstColumn.map((d, i) => {
//                                     return (
//                                         <button
//                                             key={i}
//                                             disabled={d.SeatStatus === 1 || state?.passenger === state.selected[state?.active]?.length & !state.selected[state?.active]?.includes(d?.SeatNumber)}
//                                             onClick={() => {
//                                                 handleSelectSeats(d)
//                                             }}
//                                             style={{
//                                                 backgroundColor: `${state.selected[state?.active]?.includes(d?.SeatNumber) ? 'red' : ""
//                                                     }`, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40px', width: '40px', padding: '5px', margin: '5px'
//                                             }}
//                                         >
//                                             {d.SeatNumber}
//                                         </button>
//                                     )
//                                 })}

//                             </div>
//                         )
//                     })}
//                 </div>
//             </div>
//         </div >
//     )
// }

// export default SeatMap



