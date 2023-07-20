import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';

type EditProfileFormProps = {
  userId: string;
  username: string;
  name: string;
  email: string;
};

interface IFormInput {
  username: string;
  name: string;
  email: string;
}

export default function EditProfileForm(props: EditProfileFormProps) {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<IFormInput>();

  const [formValues, setFormValues] = useState<IFormInput>({
    username: '',
    name: '',
    email: '',
  });

  useEffect(() => {
    setFormValues({
      username: props.username,
      name: props.name,
      email: props.email,
    });
  }, []);

  //setValue('username', props.username);
  //setValue('name', props.name);
  //setValue('email', props.email);

  // async function onSubmit(formData: IFormInput) {
  //   try {
  //     console.log('editdata', formData);
  //     await axios.put(
  //       `https://apikgems.cobainweb.site/api/users/me`,
  //       {
  //         ...formData,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,
  //         },
  //       },
  //     );
  //     router.back();
  //   } catch (error: any) {
  //     console.error('Error updating data:', error);
  //   }
  // }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log('editdata', formValues);
      await axios.put(
        `https://apikgems.cobainweb.site/api/users/me`,
        { ...formValues },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      router.push('/profile/me');
    } catch (error: any) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col w-80 pb-3">
        <label className="flex gap-8 justify-between mb-4">
          <span className='text-white'>Username</span>
          <input
          className='px-3 py-1'
            {...register('username')}
            placeholder="username"
            value={formValues.username}
            onChange={(e) =>
              setFormValues((prevState) => ({
                ...prevState,
                username: e.target.value,
              }))
            }
          />
        </label>

        <label className="flex gap-8 justify-between mb-4">
          <span className='text-white'>Name</span>
          <input
          className='px-3 py-1'
            {...register('name')}
            placeholder="Name"
            value={formValues.name}
            onChange={(e) =>
              setFormValues((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />
        </label>

        <label className="flex gap-8 justify-between mb-4">
          <span className='text-white'>Email</span>
          <input
          className='px-3 py-1'
            {...register('email')}
            placeholder="email@email.com"
            value={formValues.email}
            onChange={(e) =>
              setFormValues((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
          />
        </label>
      </div>
    
      <button className="rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-4">
        Save
      </button>

      <button
        className="rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        type="button"
        onClick={() => {
          router.back();
        }}
      >
        Cancel
      </button>
    </form>
  );
}
