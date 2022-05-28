import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from "react-hook-form";
import moment from 'moment';
import { add } from '../redux/leaves/leaveSlice'
import { Form, Button } from 'react-bootstrap'

function LeaveForm() {
    const [startDateInvalid, setStartDateInvalid] = React.useState(false);
    const [endDateInvalid, setEndDateInvalid] = React.useState(false);
    const leaveData = useSelector(state => state.leaves.LEAVES)
    const dispatch = useDispatch()
    let newid = checkId(1)

    function checkId(id){
        let idCheck = leaveData.find(info => info.id === id)
        if(idCheck){
            return checkId(id + 1)
        }
        else{
            return id
        }
    }

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm();

    const startVal = watch('start')
    const endVal = watch('end')

    useEffect(() => {
        if (startVal) {
            leaveData.every(info => {
                if (moment(startVal).isBetween(info.start, info.end) || moment(startVal).isSame(info.start) || moment(startVal).isSame(info.end)) {
                    setStartDateInvalid(true)
                    return false
                }
                setStartDateInvalid(false)
            })
        }
        if (endVal) {
            leaveData.every(info => {
                if (moment(endVal).isBetween(info.start, info.end) || moment(endVal).isSame(info.start) || moment(endVal).isSame(info.end)) {
                    setEndDateInvalid(true)
                    return false
                }
                setEndDateInvalid(false)
            })
        }
    }, [leaveData, startVal, endVal])
    
    const handleFormSubmit = (data) => {
        if (startVal <= endVal && !startDateInvalid && !endDateInvalid) {
            const newData = { ...data, id: newid }
            dispatch(add(newData));
            reset()
        }
    }
    
    return (
        <>
            <Form onSubmit={handleSubmit(handleFormSubmit)}>
                <Form.Group className='mb-3'>
                    <Form.Label>Start Date: </Form.Label>
                    <Form.Control type='date' name='start' watch="start" {...register("start", {required: "Required",})} />
                    {errors.start && <><Form.Text style={{color: 'red'}}>This field is required</Form.Text><br /></>}
                    {(startVal && startDateInvalid) && <><Form.Text style={{color: 'red'}}>Date is already selected in leave</Form.Text></>}
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>End Date: </Form.Label>
                    <Form.Control type="date" name="end" watch="end" {...register("end", {required: "Required",})} />
                    {errors.end && <><Form.Text style={{color: 'red'}}>This field is required</Form.Text><br /></>}
                    {startVal && endVal && startVal > endVal && <><Form.Text style={{color: 'red'}}>End date must be greater than Start date</Form.Text><br /></>}
                    {(endVal && endDateInvalid) && <><Form.Text style={{color: 'red'}}>Date is already selected in leave</Form.Text></>}
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Reason: </Form.Label>
                    <Form.Select id="reason" {...register("reason", {required: "Required",})} name="reason">
                        <option value="">Select Reason</option>
                        <option value="Bereavement Leave">Bereavement Leave</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Client Leave">Client Leave</option>
                        <option value="Public Leave">Public Leave</option>
                    </Form.Select>
                    {errors.reason && <Form.Text style={{color: 'red'}}>This field is required</Form.Text>}
                </Form.Group>
                <Button className='btn btn-primary' style={{marginRight: '1em'}} type="submit">Submit</Button>
                <Button className='btn btn-warning' type="button" onClick={() => reset()}>Reset</Button>
            </Form>
        </>
    )
}

export default LeaveForm