import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form'
import { createPortal } from 'react-dom';
import ToastNotification from './ToastNotification';
import { useState } from 'react';

interface FileDownloadFormInput {
  files: FileList;
}


function FileDownloadForm() {
  const { register, handleSubmit } = useForm<FileDownloadFormInput>();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState('') ;
  const [status, setStatus] = useState('');

  const onSubmit: SubmitHandler<FileDownloadFormInput> = async (data) => {
    const formData = new FormData();

    for (let i = 0; i < data.files.length; i++) {
      formData.append(`file${i}`, data.files[i]);
    };

    const res = await fetch('http://localhost:3010/upload-files', {
      method: "POST",
      body: formData,
      mode: "cors"
    });
    const resData = await res.json();
    console.log(resData)

    setShowNotification(true);

    if (resData.status === 'success') {
      setStatus('success')
      setNotificationText('Файл(ы) успешно загружены');
    } else if (resData.status === 'failed') {
      setStatus('failed')
      setNotificationText('Файлы не были загружены');
    } else if (resData.status === 'serverError') {
      setStatus('serverError')
      setNotificationText('Ошибка сервера');
    }

    setTimeout(() => setShowNotification(false), 3000);
  };

  // TODO: переделать код показа уведомления на более лаконичный

  return <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
    <input 
      {...register('files')} 
      type='file'
      accept='.pdf, .docx'
      multiple
    /> 

    <button type='submit'>Отправить</button>

    {
      showNotification && status === 'success' && createPortal(
        <ToastNotification success>{notificationText}</ToastNotification>,
        document.body)
    }

    {
      showNotification && status === 'failed' && createPortal(
        <ToastNotification error>{notificationText}</ToastNotification>,
        document.body)
    }

    {
      showNotification && status === 'serverError' && createPortal(
        <ToastNotification error>{notificationText}</ToastNotification>,
        document.body)
    }
  </form>
};

export default FileDownloadForm;