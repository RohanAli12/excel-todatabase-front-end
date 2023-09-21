'use client'
import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const UploadExcel = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [uploadMessage, setUploadMessage] = useState('');

    const handleFileChange = (e:any) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFileName(selectedFile ? selectedFile.name : '');
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        if (!file) {
            alert('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('excelFile', file);

        try {
            const response = await axios.post(
                'https://localhost:7190/api/UploadExcel/GetUploadExcel',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Cache: 'no-store',
                    },
                }
            );

            setUploadMessage('File uploaded successfully.');
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
<Image src={"/assets/logo1.png"} width={200} height={200} alt='Bank Islami' className='h-[5em] w-[9em] md:h-[8em] md:w-[14em] fixed inset-0 -top-4'/> 
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-lg'>
                <h2 className='text-2xl font-semibold mb-4'>Upload Excel File</h2>
                <form className='flex flex-col items-center justify-center' onSubmit={handleSubmit}>
                    <input
                        className='hidden'
                        type="file"
                        accept=".xlsx"
                        onChange={handleFileChange}
                        id="fileInput"
                    />
                    <label
                        htmlFor="fileInput"
                        className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full cursor-pointer'
                    >
                        Select Excel File
                    </label>
                    <span className='text-gray-500 mt-2'>{fileName}</span>
                    <button
                        className='mt-4 bg-black text-white py-2 px-4 rounded-full'
                        type="submit"
                    >
                        Upload
                    </button>
                    <p className='text-green-600 mt-2'>{uploadMessage}</p>
                </form>
            </div>
        </div>
        </div>
    );
};

export default UploadExcel;
