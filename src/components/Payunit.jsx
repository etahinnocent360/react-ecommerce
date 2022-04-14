import React, {useContext, useEffect, useRef, useState} from 'react'
import axios from "axios";
import {useParams} from "react-router";
import '../components/Detail.css'
import {Input, Radio, RadioGroup, Stack, useToast,} from "@chakra-ui/react";
import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';
import {collection, doc, onSnapshot, query,} from "firebase/firestore";
import {fireDb} from "../firebase/firebaseconfig";
import {CartContext} from "./pages/prodcontext/CartProvider";
import {useAuth} from "./auth/AuthProvider";
import UseMounted from "./pages/mount/UseMounted";


function Payunit() {
    useRef()
    const [getPsp, setGetPsp] = useState()
    const [carts, setCarts] = useContext(CartContext);
    const {id} = useParams();
    const [provider_short_tag, setProvider_short_tag] = useState()
    const [provider_logo, setProvider_logo] = useState()
    const [phone_number, setPhone] = useState()
    let [amount, setAmount] = useState()
    const [currency, setCurrency] = useState()
    const toast = useToast()
    const [value, setValue] = useState('1')
    const [status, setStatus] = useState()
    const {currentUser} = useAuth()
    const mounted = UseMounted()
    amount = total()
    useEffect(() => {
        const q = query(collection(fireDb, `cart${currentUser?.email}`));
        const unSub = onSnapshot(q, (QuerySnapshot) => {
            let productArray = [];
            QuerySnapshot.forEach((doc) => {
                productArray.push({...doc.data(), id: doc.id});
            });
            setCarts(productArray);
        });
        return () => unSub();
    }, [doc, currentUser, setCarts]);
    useEffect(() => {
        mounted.current = true
        const getpsps = async () => {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/getpsp/${id}`).then(res => {
                setGetPsp(res.data.data)
            });
            // setGetPsp(res)
            return res
        };
        getpsps()

    }, [id]);
    const handlePay = async (e) => {
        e.preventDefault()
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/payment/${id}`, {
            phone_number: phone_number,
            amount: amount,
            gateway: provider_short_tag,
            currency:currency,
        }).then(async res => {
            await toast({
                description: `${res.data.message}`,
                status: "success",
                duration: 5000,
                isClosable: true
            })
            // await window.location.replace('/')
            console.log(res.data)
          await  axios.get(`${process.env.REACT_APP_BASE_URL}/getstatus/${res.data._id}`).then(async res => {
                setStatus(res.data.data)
                console.log(status?.callback)
                await window.location.replace(`${res.data.data?.callback}`)
            }).catch(error =>{
                console.log(error)
            })
        }).catch(async error => {
            await toast({
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true
            })
        })
        return res
    }
    function total() {
        let x = 0;
        carts.map((i) => {
            x += i.price * i.quantity;
        });
        return x;
    }
console.log(provider_short_tag)
    return (
        <div className={'payunit'}>
            <Box sx={{boxShadow: 3}} width={1000} mx='auto' className={'box'}>
                <form onSubmit={handlePay} className={'payunit-form'}>
                    <Box
                        className='flex-2'>
                        {getPsp?.map((all) => (

                            <Box className='all-providers' sx={{boxShadow: 3}} borderRadius={5}>
                                <div className={'left'}>
                                    <img src={all.provider_logo} alt=""/>
                                    <h3>{all.provider_short_tag}</h3>
                                </div>
                                <RadioGroup onChange={setValue} value={value}>
                                    <Radio className={'select'} type={'radio'} value={all?.provider_short_tag}
                                           onChange={(e) => setProvider_short_tag(e.target.value)}
                                           key={all.provider_id}/>
                                </RadioGroup>
                            </Box>
                        ))}
                        <select value={currency} onChange={(e) => setCurrency(e.target.value)} className='all-providers show'>
                            <option>USD</option>
                            <option>XAF</option>
                            <option>euro</option>
                            <option>Bp</option>
                        </select>
                    </Box>
                    <div className='inputs'>
                        <Stack>
                            <Input variant='outline' className='show' type={'number'} value={phone_number}
                                   onChange={(e) => setPhone(e.target.value)} placeholder={'your phone number'}/>
                            <Input variant='outline' className='show' type='number' value={amount}
                                   onChange={(e) => setAmount(e.target.value)} placeholder={`XAF${total()}`} readOnly/>
                        </Stack>
                        <Button variant="outlined" color={'primary'} size={'large'} type={"submit"}
                                className="button">pay</Button>
                    </div>
                </form>
            </Box>
        </div>
    )
}

export default Payunit