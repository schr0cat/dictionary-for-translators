import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form'
// import { useState } from 'react';

interface FileDownloadFormInput {
  files: FileList;
}

function FileDownloadForm() {
  const { register, handleSubmit } = useForm<FileDownloadFormInput>();
  const onSubmit: SubmitHandler<FileDownloadFormInput> = (data) => console.log(data);

  return <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
    {/* TODO: написать то, что файл должен быть именно pdf/docx и может быть добавлено сразу несколько файлов */}
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