import { Button, Card, CardContent, CardHeader, CardMedia, IconButton, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import classes from '../styles/general.module.scss'
import styled from '@emotion/styled'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, Textarea } from '@mui/joy'

const CustomCard = styled(Card)`
width:500px;

`

function ViewProducts() {


    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [file, setFile] = useState([]);
    const [picValidation, setPicValidation] = useState('');
    const [flag, setFlag] = useState('home')
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState({})

    useEffect(() => {
        const getValues = async () => {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/products`)
            setProducts(response.data)
        }
        getValues()
    }, [])

    const updateProduct = async (e) => {
        if (file.length === 0) {
            e.preventDefault()
            setPicValidation('Please select atleast 1 picture')
            return
        }

        const formData = new FormData();
        formData.append('name', name)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('files', file)

        const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/products/${product._id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        window.location.reload()

    }

    const deleteProduct = async () => {
        console.log('first')
        try {
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/products/${product._id}`)
            console.log(response)
            window.location.reload()
        } catch (error) {

        }
    }


    return (
        <div>

            {flag === 'home' ? <>
                {products.map((product, index) => {
                    return (
                        <CustomCard variant='outlined' className={classes.productCard} key={index}>
                            <CardHeader
                                action={
                                    <IconButton >
                                        <KeyboardArrowRightIcon />
                                    </IconButton>
                                }
                                title={product.name}
                            />
                            <CardMedia
                                component={"img"}
                                height={"194"}
                                width={"194"}
                                image={`${process.env.REACT_APP_SERVER_URL}/${product.files[0].filePath}`}
                                alt=""
                            />
                            <CardContent>
                                <Typography variant="h5" border={1} color="text.secondary">
                                    {`${product.price}₹`}
                                </Typography>
                                <br />
                                <Button sx={{ marginRight: 3 }} color='success' variant='contained' onClick={() =>{
                                    setProduct(product)
                                    setFlag('edit')}}
                                    >Edit</Button>
                                <Button color='error' variant='contained' onClick={() => {
                                    setFlag('delete')
                                    console.log('first')
                                    console.log(product)
                                    setProduct(product)
                                }} >Delete</Button>
                            </CardContent>
                        </CustomCard>
                    )
                })}
            </> : ''}


            {flag === 'delete' ?
                <>
                    <Typography>Are You sure?</Typography>
                    <Button sx={{ marginRight: 3 }} color='success' variant='contained' onClick={() => setFlag('home')}>Cancel</Button>
                    <Button color='error' variant='contained' onClick={deleteProduct} >Delete</Button>
                </>
                : ''}

            {flag === 'edit' ?
                <form className={classes.form} onSubmit={updateProduct}>
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
                        <Typography variant='h4' fontWeight={550}>Edit Product</Typography>

                        <br />
                        <TextField
                            label={'Product Name'}
                            onChange={(e) => setName(e.target.value)}
                            defaultValue={product.name}
                            required={true}
                        />
                        <TextField
                            label={'Product Price'}
                            onChange={(e) => setPrice(e.target.value)}
                            type='number'
                            defaultValue={product.price}
                            placeholder='₹'
                            required={true}
                        />
                        <Box>
                            <Typography>Description</Typography>
                            <Textarea sx={{ height: '8em' }} defaultValue={product.description} required={true} onChange={(e) => { setDescription(e.target.value) }}  ></Textarea>
                        </Box>

                        <Box>
                            <Typography>Product Picture</Typography>
                            <br />
                            <Button
                                sx={{ background: '#009688' }} variant="contained" component="label" >Upload File
                                <input type="file" multiple hidden onChange={(e) => { setFile(e.target.files) }} />
                            </Button>
                            <Typography color={'red'}>{picValidation}</Typography>
                        </Box>

                        <Button type='submit' >Submit</Button>

                    </Box>

                </form>
                : ''}

        </div>
    )
}

export default ViewProducts