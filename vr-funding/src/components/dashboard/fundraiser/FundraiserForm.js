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

export default function FundraiserForm(){
    return (
        <form className='form container'>
            <div className='form-group submit'>
                <h2>Add your Fundraiser</h2>
                <button disabled={}>Submit</button>
            

                <div className='errors'>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

            <div className='form-gorup inputs'>
                <h4>Fundraiser Details</h4>

                <label>Fundraiser Name&nbsp;
                    <input
                        value={}
                        onChange={}
                        name='title'
                        type='text'                        
                    />
                </label>

                
                <label>Image Url&nbsp;
                    <input
                        value={}
                        onChange={}
                        name='imgURL'
                        type='text'                        
                    />
                </label>

                <label>Description&nbsp;
                    <input
                        value={}
                        onChange={}
                        name='description'
                        type='text'                        
                    />
                </label>
            </div>
        </form>
    )
}