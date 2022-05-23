import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { utils, writeFile } from 'xlsx';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { Form } from 'react-bootstrap';

function DisplayEmpLeaves() {
    const empLeaves = useSelector(state => state.emp_leaves.EMP_LEAVES)
    const [conditionLeaves, setConditionLeaves] = useState()
    const [filter, setFilter] = useState('week')
    const [days, setDays] = useState()
    const currentDate = moment()

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

    const handleFilter = ((e) => {
        setFilter(e.target.value)
    })

    const handleExport = () => {
        const wb = utils.book_new()
        var heading = [["Employee Name", "Leaves", "Reasons"]]
        var data = conditionLeaves.map(leave => {
            return {
                name: leave.employee_name,
                leaves: moment(leave.start).format('DD-MM-YYYY') === moment(leave.end).format('DD-MM-YYYY') ? 
                        moment(leave.start).format('DD-MM-YYYY') : 
                        moment(leave.start).format('DD-MM-YYYY') + ' to ' + moment(leave.end).format('DD-MM-YYYY'),
                reason: leave.reason
            }
        })
        const ws = utils.book_new();
        utils.sheet_add_aoa(ws, heading);
        utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true })
        utils.book_append_sheet(wb, ws, filter === 'week' ? currentDate.format('MMMM') + ' Week ' + Math.ceil(currentDate.date() / 7) : currentDate.format('MMMM') + ' Month')
        writeFile(wb, 'Employee Leaves.xlsx')
    }

    const displayTableHeader = conditionLeaves ? days.map( day =>
        <th key={day}>{day.format('DD-MM-YYYY')}</th>
    ) : <></>

    const displayTableData = conditionLeaves ? conditionLeaves.map( info =>
        <tr key={info.id}>
            <td>{info.employee_name}</td>
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
        <Form.Select onChange={handleFilter} className="mb-4">
            <option value="week">This Week</option>
            <option value="month">This Month</option>
        </Form.Select>
        <Table responsive striped bordered hover>
            <thead>
                <tr>
                    <th>Employee Name</th>
                    { displayTableHeader }
                </tr>
            </thead>
            <tbody>
                { displayTableData }
            </tbody>
        </Table>
        <Button className='mt-3' onClick={ handleExport }>Export to Excel</Button>
    </>
  )
}

export default DisplayEmpLeaves