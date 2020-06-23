import React, { useState, useEffect} from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import fundraiserFormSchema from './validation/fundraiserFormSchema'
import FundraiserCard from './FundraiserCard'

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
const URL = 'https://virtual-reality-fundraising.herokuapp.com/api/users' //using until backend api is ready

export default function FundraiserForm(){

    const [fundraiser, setFundraiser] = useState(initialFundraiser)
    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrors, setFormErrors] = useState(initialFormErrors)
    const [disabled, setDisabled] = useState(initialDisabled)

    const getFundraisers = () => {
        axios.get(URL)
            .then(res => {
                console.log(res)
                setFundraiser(res.data.data)
            })
            .catch(err => {
                // debugger
            })
    }

    const postNewFundraiser = newFundraiser => {
        axios.post(URL, newFundraiser)
        .then(res => {
            setFundraiser([...fundraiser, res.data])
        })
        .catch(err => {
            // debugger
        })
        .finally(() => {
            setFormValues(initialFormValues)
        })
    }

    const onInputChange = evt => {
        const name = evt.target.name
        const value = evt.target.value

        Yup
        .reach(fundraiserFormSchema, name)
        .validate(value)

        .then(valid => {
          setFormErrors({
            ...formErrors,
            [name]: ""
          });
        })
        .catch(err => {
          setFormErrors({
            ...formErrors,
            [name]: err.errors[0]
          });
        });
    
        setFormValues({
          ...formValues,
          [name]: value
        })
      }

    const onSubmit = evt => {
        evt.preventDefault()

        const newFundraiser = {
          title: formValues.title.trim(),
          description: formValues.description,
          imgUrl: formValues.imgUrl,
        }
        
        postNewFundraiser(newFundraiser) 
    }

    useEffect(() => {
        getFundraisers()
    }, [])

    useEffect(() => {
        fundraiserFormSchema.isValid(formValues).then(valid => {
            setDisabled(!valid);
        });
    }, [formValues])

    return (
        <div className='container'>
            <form className='form container' onSubmit={onSubmit}>

                <div className='form-gorup inputs'>
                    <h4>Fundraiser Details</h4>

                    {/* <label>Fundraiser Name&nbsp; */}
                        <input
                            value={formValues.title}
                            onChange={onInputChange}
                            name='title'
                            type='text'
                            placeholder="Fundraiser Name"                        
                        />
                    {/* </label> */}

                    
                    {/* <label>Image Url&nbsp; */}
                        <input
                            value={formValues.imgUrl}
                            onChange={onInputChange}
                            name='imgUrl'
                            type='url'
                            placeholder="Image Url Here: http://www.example.com"                        
                        />
                    {/* </label> */}

                    {/* <label>Description&nbsp; */}
                        <input
                            value={formValues.description}
                            onChange={onInputChange}
                            name='description'
                            type='text'
                            placeholder="Description Here"                        
                        />
                    {/* </label> */}
                </div>

                <div className='form-group submit'>
                    <button disabled={disabled}>Submit</button>
                

                    <div className='errors'>
                        <div>{formErrors.title}</div>
                        <div>{formErrors.imgUrl}</div>
                        <div>{formErrors.description}</div>
                    </div>
                </div>
            </form>

            {
                fundraiser.map(fundraiser => {
                    return (
                        <FundraiserCard key={fundraiser.id} details={fundraiser}/>
                    )
                })
            }
        </div>
    )
}