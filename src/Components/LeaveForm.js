import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from "react-hook-form";
import { add } from '../redux/leaves/leaveSlice'
import { Form, Button } from 'react-bootstrap'

function LeaveForm(handleChange) {
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
    
    const handleFormSubmit = (data) => {
        if (startVal <= endVal) {
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
                    {errors.start && <span>This field is required</span>}
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>End Date: </Form.Label>
                    <Form.Control type="date" name="end" watch="end" {...register("end", {required: "Required",})} />
                    {errors.end && <span>This field is required</span>}
                    {startVal && endVal && startVal > endVal && <span>End date must be greater than start date</span>}
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
                    {errors.reason && <span>This field is required</span>}
                </Form.Group>
                <Button className='btn btn-primary' style={{marginRight: '1em'}} type="submit">Submit</Button>
                <Button className='btn btn-warning' type="button" onClick={() => reset()}>Reset</Button>
            </Form>
        </>
    )
}

export default LeaveForm