"use client"

import Button from '@/app/components/Button/Button'
import UrlInput from '@/app/components/TextInput/UrlInput'
import UrlTable from '@/app/components/UrlTable/UrlTable'
import Modal from "react-modal";
import React, { useEffect, useRef, useState } from 'react'
import TextInput from '@/app/components/TextInput/TextInput';
import validator from 'validator'
import CopyClipboard from '@/app/components/CopyClipboard/CopyClipboard';
import toast from "react-hot-toast"
import { Formik, Form } from 'formik';
import * as yup from "yup"

const tableColumn = [
    { label: "Redirect link", field: "redirectUrl" },
    { label: "shortlink", field: "urlCode" },
    { label: "Visit", field: "analytics" },
    { label: "Added date", field: "createdAt" },
    { label: "Actions", field: "actions", hideLabelinMobile: true },
];


const modalStyle = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        maxWidth: 500,
        width: "100%",
        transform: "translate(-50%, -50%)",
    },
    overlay: {
        background: "rgba(0, 0, 0, .5)",
    },
};



function DashboardComponent({ url,token }) {
    const urlRef = useRef()
    const updateRef = useRef()
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editUrlData, setEditUrlData] = useState({});
    const [shortCode, setShortCode] = useState("")
    const [urlData, setUrlData] = useState([])
    console.log("url",url)
    useEffect(() => {
        setUrlData(url)
    }, [url])
    console.log("editUrlData", editUrlData)
    const handleSubmitUrl = async () => {
        const value = urlRef.current.value
        

        if (value.length <= 0 && !validator.isURL(value)) {
            toast.error("Invalid Url")
        } else {
            const body = {
                url: value
            }
            try {
                const response = await fetch("http://localhost:5000/url/", {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token

                    },
                    body: JSON.stringify(body)
                })
                const responsevalue = await response.json()
                setShortCode(responsevalue)
            } catch (error) {
                console.log("error: " + error)
                toast.error("error: " + error)
            }

        }
    }

    const EditModal = () => {

        const [isFilled, setFilled] = useState(false)


        const initialValues = {
            url: editUrlData.redirectUrl,
        }
        const validationSchema = yup.object().shape({

            url: yup.string().required("Email is required"),

        })


        const onCancel = () => {
            setIsEditDialogOpen(false);
            setEditUrlData({});
        };



        const handleUpdateUrl = async (value) => {

            const updateUrl = value.url
            console.log("url: " + updateUrl);

            if (updateUrl.length <= 0 && !validator.isURL(updateUrl)) {
                toast.error("Invalid Url")
            } else {
                const body = {
                    url: updateUrl
                }
                try {
                  
                    const response = await fetch(`http://localhost:5000/url/updateurl/${editUrlData.urlId}`, {
                        method: "PUT",

                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token

                        },
                        body: JSON.stringify(body)
                    })
                    const responsevalue = await response.json()
                    setUrlData(responsevalue.data)
                    toast.success("Update Successfully")
                } catch (error) {
                    console.log("error: " + error)
                    toast.error("error: " + error)
                }
                onCancel()
            }
        }
        return (
            <Modal
                isOpen={isEditDialogOpen}
                onRequestClose={onCancel}
                style={modalStyle}
                ariaHideApp={false}
            >
                <h3 className='text-xl font-semibold pb-3'>Edit </h3>
                <Formik
                    innerRef={urlRef}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    validateOnMount={false}
                    validate={(v) => setFilled(Object.values(v).some(Boolean))}

                >
                    {
                        (formikProps) => (
                            <div className='h-72 flex items-center flex-col justify-center gap-3'>
                                <Form className="flex items-center flex-col gap-4 ">
                                    <TextInput type="text" name="url" label="Redirect Url" />
                                    
                                        <Button
                                            label="Update"
                                            style="bg-blue-400 rounded-lg w-full mb-2 text-xl"
                                            onClick={()=>handleUpdateUrl(formikProps.values)}


                                        />
                                        <Button
                                            style="bg-red-400 rounded-lg w-full text-xl"
                                            label="Cancel"
                                            onClick={onCancel}

                                        />
                                    

                                </Form>



                            </div>
                        )
                    }

                </Formik>
             
            </Modal>
        );
    }

    const convertRowDataToTableData = (
        data,
        setEditUrlData,
        setIsEditDialogOpen
    ) => {
        return {
            ...data,
            urlCode: `http://localhost:5000/url/${data.shortUrl}`,
            createdAt: data.createdAt,
            actions: renderActions(data, setEditUrlData, setIsEditDialogOpen),
        };
    };

    const renderActions = (
        data,
        setEditUrlData,
        setIsEditDialogOpen
    ) => {

        const handleDeleteUrl = async () => {
            console.log("hi")
            if (
                window.confirm(`Are you sure you want to delete: ${data.redirectUrl}?`)
            ) {
                //urlStore.deleteUrl(data.urlCode);

                try {
                    let response = await fetch(`http://localhost:5000/url/deleteurl/${data.urlId}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token

                        }
                    })
                    response = await response.json()
                    console.log("response: " + response)
                    setUrlData(response.data)
                } catch (error) {
                    console.log("error: " + error)
                }

            }

        }
        return (
            <div className='w-full flex justify-between'>
                <Button
                    style={"bg-blue-400 px-4 py-2 rounded"}
                    label="Edit"
                    onClick={() => {
                        setEditUrlData(data);
                        setIsEditDialogOpen(true);
                    }}
                />
                <Button
                    label="Delete"
                    style={"bg-red-400 p-2 rounded"}
                    onClick={handleDeleteUrl}
                />
            </div>
        );
    };

    return (
        <div className=' flex flex-col h-svh w-full items-center mt-20 gap-4 '>
            <div className='w-[50%] flex flex-row bg-blue-500 p-1 rounded-sm '>
                <UrlInput style="h-12 flex-1 outline-none text-xl" type={"text"} urlref={urlRef} placeholder="Enter URL Here" />
                <span className='w-1'></span>
                <Button label={"SHORT URL"} style={"bg-yellow-300  text-white rounded-sm p-2"} onClick={handleSubmitUrl} />
            </div>
            {Boolean(shortCode) && <CopyClipboard code={shortCode} />}
            <div className='w-full'>
                {<EditModal />}
                {urlData?.length > 0 ? <UrlTable columns={tableColumn} rows={
                    urlData?.map((_) =>
                        convertRowDataToTableData(_, setEditUrlData, setIsEditDialogOpen)
                    )
                } /> : <div className='flex items-center justify-center '><span className='font-bold text-2xl'>No Data Found</span></div>}
            </div>
        </div>
    )
}

export default DashboardComponent
