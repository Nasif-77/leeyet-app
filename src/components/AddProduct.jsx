import React, { useEffect } from 'react'
import { Textarea } from '@mui/joy';
import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react';
import classes from '../styles/general.module.scss'
import axios from 'axios';

function AddProduct() {

    useEffect(()=>{
    },[])

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [file, setFile] = useState([]);
    const [picValidation, setPicValidation] = useState('');

    const sentValues = async (e) => {
        if(file.length===0){
            e.preventDefault()
            setPicValidation('Please select atleast 1 picture')
            return
        }

        const formData = new FormData();
        formData.append('name', name)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('files', file)

        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/products`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })


    }
    return (
        <div>

            <form className={classes.form} onSubmit={sentValues}>
                <Box
                    height={'30em'}
                    width={'20em'}
                    border={'5px solid black'}
                    padding={5}
                    borderRadius={5}
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'space-evenly'}
                >
                    <Typography variant='h4' fontWeight={550}>Add Product</Typography>

                    <br />
                    <TextField
                        label={'Product Name'}
                        onChange={(e) => setName(e.target.value)}
                        required={true}
                    />
                    <TextField
                        label={'Product Price'}
                        onChange={(e) => setPrice(e.target.value)}
                        type='number'
                        placeholder='₹'
                        required={true}
                    />
                    <Box>
                        <Typography>Description</Typography>
                        <Textarea sx={{ height: '8em' }} required={true} onChange={(e) => { setDescription(e.target.value) }}  ></Textarea>
                    </Box>

                    <Box>
                        <Typography>Product Picture</Typography>
                        <br />
                        <Button
                            sx={{ background: '#009688' }} variant="contained" component="label" >Upload File
                            <input type="file" multiple  hidden onChange={(e) => { setFile(e.target.files) }} />
                        </Button>
                        <Typography color={'red'}>{picValidation}</Typography>
                    </Box>

                    <Button type='submit' >Submit</Button>

                </Box>

            </form>
        </div>
    )
}

export default AddProduct