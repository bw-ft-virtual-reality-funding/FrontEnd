import React, { useState, useEffect} from 'react'
import axios from 'axios'
import * as Yup from 'yup'

const initialFormValues = {
    title: '',
    description: '',
    imgUrl: '',
}

const initialFormErrors = {
    title: '',
    description: '',
    imgUrl: '',
}

const initialFundraiser = []
const initialDisabled = true
const URL = 'https://reqres.in/api/users' //using until backend api is ready

export default function FundraiserForm(){

    const [fundraiser, setFundraiser] = useState(initialFundraiser)
    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrors, setFormErrors] = useState(initialFormErrors)
    const [disabled, setDisabled] = useState(initialDisabled)

    const getFundraisers = () => {
        axios.get(URL)
            .then(res => {
                console.log(res)
                setFundraiser(res.data)
            })
            .catch(err => {
                debugger
            })
    }

    const postNewFundraiser = newFundraiser => {
        axios.post(URL, newFundraiser)
        .then(res => {
            setFundraiser([...fundraiser, res.data])
        })
        .catch(err => {
            debugger
        })
        .finally(() => {
            setFormValues(initialFormValues)
        })
    }

    return (
        <form className='form container'>

            <div className='form-gorup inputs'>
                <h4>Fundraiser Details</h4>

                <label>Fundraiser Name&nbsp;
                    <input
                        // value={}
                        // onChange={}
                        name='title'
                        type='text'                        
                    />
                </label>

                
                <label>Image Url&nbsp;
                    <input
                        // value={}
                        // onChange={}
                        name='imgURL'
                        type='text'                        
                    />
                </label>

                <label>Description&nbsp;
                    <input
                        // value={}
                        // onChange={}
                        name='description'
                        type='text'                        
                    />
                </label>
            </div>

            <div className='form-group submit'>
                <button disabled={disabled}>Submit</button>
            

                <div className='errors'>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </form>
    )
}