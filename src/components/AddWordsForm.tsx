import { useForm } from "react-hook-form";
import type { SubmitHandler } from 'react-hook-form'

interface AddWordsFormInput {
  word: string
};

function AddWordsForm() {
  const { register, handleSubmit } = useForm<AddWordsFormInput>();
  const onSubmit: SubmitHandler<AddWordsFormInput> = (data) => console.log(data);

  return <form onSubmit={handleSubmit(onSubmit)}>
    <input {...register('word')} />
    <button>Сохранить</button>
  </form>
};

export default AddWordsForm;