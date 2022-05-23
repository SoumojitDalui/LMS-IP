import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Table from 'react-bootstrap/Table'
import { Form } from 'react-bootstrap'

function DisplayIndLeaves() {
    const [empLeaves, setEmpLeaves] = useState(useSelector(state => state.leaves.LEAVES))
    const [conditionLeaves, setConditionLeaves] = useState()
    const [filter, setFilter] = useState('week')
    const [days, setDays] = useState()
    const currentDate = moment()

    const handleFilter = ((e) => {
        setFilter(e.target.value)
    })

    useEffect(() => {
        var dates = []
        if(filter === "week") {
            const startDate = currentDate.startOf('week')
            for (let i = 0; i <= 6; i++) {
                dates.push(moment(startDate).add(i, 'days'));
            }
            setDays(dates)
            setConditionLeaves(empLeaves.filter(leave => moment(leave.start).isSame(new Date(), 'week') || moment(leave.end).isSame(new Date(), 'week')))
        }
        else if(filter === "month") {
            const startDate = currentDate.startOf('month')
            for (let i = 0; i <= 30; i++) {
                dates.push(moment(startDate).add(i, 'days'));
            }
            setDays(dates)
            setConditionLeaves(empLeaves.filter(leave => moment(leave.start).isSame(new Date(), 'month')))
        }
    }, [filter, empLeaves])

    const displayTableHeader = conditionLeaves ? days.map( day =>
        <th key={day}>{day.format('DD-MM-YYYY')}</th>
    ) : <></>

    const displayTableData = conditionLeaves ? conditionLeaves.map( info =>
        <tr key={info.id}>
            { days.map( day =>
                <td key={day} 
                style={{color: 
                    ( moment(day).isBetween(info.start, info.end) || 
                    moment(day).isSame(info.start) || 
                    moment(day).isSame(info.end) ) ? 'red' : 'black'}
                }>{
                    ( moment(day).isBetween(info.start, info.end) || 
                    moment(day).isSame(info.start) || 
                    moment(day).isSame(info.end) ) ? info.reason : ''
                    }    
                </td>
            )}
        </tr>
    ) : <></>

    return (
    <>
        <Form.Label>Time Range:</Form.Label>
        <Form.Select onChange={handleFilter} className="mb-2">
            <option value="week">This Week</option>
            <option value="month">This Month</option>
        </Form.Select>
        <Table responsive striped bordered hover variant='dark'>
            <thead>
                <tr>
                    { displayTableHeader }
                </tr>
            </thead>
            <tbody>
                { displayTableData }
            </tbody>
        </Table>
    </>
  )
}

export default DisplayIndLeaves