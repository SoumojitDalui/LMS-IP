import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { remove } from '../redux/leaves/leaveSlice'
import { Table, Form } from 'react-bootstrap'

function DisplayLeaves() {
    const leaveData = useSelector(state => state.leaves.LEAVES)
    const dispatch = useDispatch()
    const [conditionLeaves, setConditionLeaves] = useState()
    const [filter, setFilter] = useState('')

    const handleFilter = ((e) => {
        setFilter(e.target.value)
    })

    function deleteData(id){
        dispatch(remove(id))
    }

    useEffect(() => {
        if(filter === "week") {
            setConditionLeaves(leaveData.filter(leave => moment(leave.start).isSame(new Date(), 'week') || moment(leave.end).isSame(new Date(), 'week')))
        }
        else if(filter === "month") {
            setConditionLeaves(leaveData.filter(leave => moment(leave.start).isSame(new Date(), 'month')))
        }
        else {
            setConditionLeaves(leaveData)
        }
    }, [filter, leaveData])

    const DisplayData = conditionLeaves ? conditionLeaves.map( info => 
        <tr key={info.id}>
            <td>{info.start}</td>
            <td>{info.end}</td>
            <td>{info.reason}</td>
            { moment(info.start) > moment() ? 
            <td>
                <button type='button' className='btn btn-danger' id={info.id} onClick={() => deleteData(info.id)}>
                    Cancel
                </button>
            </td> : <td></td> }
        </tr>
    ) : leaveData.map( info =>
        <tr key={info.id}>
            <td>{info.start}</td>
            <td>{info.end}</td>
            <td>{info.reason}</td>
            { moment(info.start) > moment() ?
            <td>
                <button type='button' className='btn btn-danger' id={info.id} onClick={() => deleteData(info.id)}>
                    Cancel
                </button>
            </td> : <td></td> }
        </tr>
    )

    return (
        <>
        <Form.Label>Time Range:</Form.Label>
        <Form.Select onChange={handleFilter} className="mb-4">            
            <option value="">All</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
        </Form.Select>
        <Table responsive striped bordered hover variant='dark'>
            <thead>
            <tr>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th></th>
            </tr>
            </thead>
            <tbody >
                {DisplayData}
            </tbody>
        </Table>
        </>
  )
}

export default DisplayLeaves