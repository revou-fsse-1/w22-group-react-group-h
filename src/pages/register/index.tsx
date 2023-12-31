import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import axios from 'axios';
import Head from 'next/head';
import Modal from 'react-modal';
import Header from '@/components/Header';

type InitialRegisterValues = {
  username: string;
  email: string;
  password: string;
  name: string;
};

export default function Register() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const registerSchema = object({
    username: string()
      .min(3, 'Username too short')
      .required('Username required'),
    email: string().email('Invalid email').required('Email required'),
    password: string()
      .min(5, 'Password too short')
      .required('Password required'),
    name: string().required(),
  });

  const initialValues: InitialRegisterValues = {
    username: '',
    email: '',
    password: '',
    name: '',
  };

  const handleSubmit = async (values: InitialRegisterValues) => {
    try {
      const res = await axios.post(
        'https://apikgems.cobainweb.site/api/auth/register',
        {
          name: values.name,
          username: values.username,
          email: values.email,
          password: values.password,
        },
      );
      const data = res.data;

      if (res.status !== 201) {
        throw new Error(data.errors);
      }

      setIsModalOpen(true);
    } catch (error: any) {
      console.log(error.toString());
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>Register | Apikgems </title>
      </Head>

      <Header />
      <section className="flex flex-col items-center -mt-11 pt-16 rounded-t-[2rem]">
        <div className="w-3/5 min-w-fit max-w-lg flex flex-col items-center gap-6 py-8 px-4 rounded-[2rem] bg-slate-50">
          <h2 className="text-4xl font-semibold">Sign Up</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form className="w-4/5 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-lg">
                  Name
                </label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="px-3 py-2 rounded-lg border-2 border-gray-300"
                />
                <ErrorMessage
                  component="span"
                  name="name"
                  className="text-rose-600 text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="username" className="text-lg">
                  Username
                </label>
                <Field
                  name="username"
                  type="text"
                  placeholder="Johnny"
                  className="px-3 py-2 rounded-lg border-2 border-gray-300"
                />
                <ErrorMessage
                  component="span"
                  name="username"
                  className="text-rose-600 text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-lg">
                  E-mail
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="myemail@gmail.com"
                  className="px-3 py-2 rounded-lg border-2 border-gray-300"
                />
                <ErrorMessage
                  component="span"
                  name="email"
                  className="text-rose-600 text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-lg">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  placeholder="********"
                  className="px-3 py-2 rounded-lg border-2 border-gray-300"
                />
                <ErrorMessage
                  component="span"
                  name="password"
                  className="text-rose-600 text-sm"
                />
              </div>

              <div className="flex flex-col mt-3">
                <button
                  type="submit"
                  className="px-4 py-3 rounded-lg text-white text-lg font-semibold bg-[#19222E] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Signup
                </button>
              </div>
            </Form>
          </Formik>

          <div className="flex flex-col items-center">
            <p>Already have an account?</p>
            <Link href="/login">
              <span className="text-lg text-sky-600">Login</span>
            </Link>
          </div>
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Register Success Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" />

          <div className="relative bg-white p-6 rounded-md shadow-md z-10">
            <h2 className="text-2xl font-semibold mb-4">Register Success</h2>
            <p className="text-lg">You have successfully registered.</p>
            <button
              className="px-4 py-2 mt-4 rounded-lg text-white text-lg font-semibold bg-[#19222E] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
