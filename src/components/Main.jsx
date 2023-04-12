import React, { useState } from 'react'
import AddProduct from './AddProduct'
import { Button, Typography } from '@mui/material'
import classes from '../styles/general.module.scss'
import ViewProducts from './ViewProducts'
import styled from '@emotion/styled'

const Sbutton = styled(Button)`
padding:10px;
margin:10px;
`


function Main() {
    const [flag, setFlag] = useState('home')

    return (
        <div className={classes.main}>
            <nav className={classes.navbar}>
                <img src="https://www.leeyet.com/static/media/logo.e1cb28dd.png" alt="" />
                <Typography variant='h4'
                >Leeyet E-Cart</Typography>
            </nav>

            {flag === 'home' ? <>
                <Sbutton variant='contained' onClick={() => setFlag('add')}>Add Product</Sbutton>
                <Sbutton variant='contained' onClick={() => setFlag('view')}>View Products</Sbutton>
            </> : ''}

            {flag === 'add' ? <>
            <Button onClick={()=>setFlag('home')}>Back</Button>
            <AddProduct />
            </> : ''}
            {flag === 'view' ? <>
            <Button onClick={()=>setFlag('home')}>Back</Button>
            <ViewProducts />
            </> : ''}


        </div>
    )
}

export default Main