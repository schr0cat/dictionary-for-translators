import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form'
// import { useState } from 'react';

interface FileDownloadFormInput {
  files: FileList;
}


function FileDownloadForm() {
  const { register, handleSubmit } = useForm<FileDownloadFormInput>();

  const onSubmit: SubmitHandler<FileDownloadFormInput> = async (data) => {
    const formData = new FormData();

    for (let i = 0; i < data.files.length; i++) {
      formData.append(`file${i}`, data.files[i]);
    };

    const res = await fetch('http://localhost:3010/upload-files', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: formData,
      mode: "cors"
    });
    const resText = await res.text();
    console.log(resText)
  };

  return <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
    <input 
      {...register('files')} 
      type='file'
      accept='.pdf, .docx'
      multiple
    /> 

    <button type='submit'>Отправить</button>
  </form>
};

export default FileDownloadForm;