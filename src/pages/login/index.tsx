import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import axios from 'axios';
import Head from 'next/head';
import Modal from 'react-modal';
import { useState } from 'react';
import { useLocalStorageNew } from '@/hooks/useLocalStorageNew';
import Header from '@/components/Header';


type InitialLoginValues = {
  username: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loggedUserId, setloggedUserId] = useLocalStorageNew(
    'loggedUserId',
    '',
  );
  const [loggedUsername, setloggedUsername] = useLocalStorageNew(
    'loggedUsername',
    '',
  );

  const loginSchema = object({
    username: string().required('Username required'),
    password: string().min(5, 'Password too short').required('Password required'),
  });

  const initialValues: InitialLoginValues = { username: '', password: '' };

  const handleSubmit = async (values: InitialLoginValues) => {
    try {
      const res = await axios.post(
        'https://apikgems.cobainweb.site/api/auth/login',
        values
      );
      const data = res.data;

      if (res.status !== 201) {
        throw new Error(data.errors);
      }

      // get userId then store in local storage
      const resGetUser = await axios.get(
        'https://apikgems.cobainweb.site/api/users/me',
        {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        },
      );
      const userData = resGetUser.data;

      localStorage.setItem('token', data.accessToken);
      setloggedUserId(userData.id);
      setloggedUsername(userData.username);

      setIsModalOpen(true);
    } catch (error: any) {
      console.log(error.toString());
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Login | Apikgems </title>
      </Head>

      <Header />
      <section className="flex flex-col items-center">
        <div className="w-3/5 min-w-fit max-w-lg flex flex-col items-center gap-6 py-8 px-4 rounded-[2rem] bg-slate-50">
          <h2 className="text-4xl font-semibold">Login</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form className="w-4/5 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="username" className="text-lg">
                  Username
                </label>
                <Field
                  name="username"
                  type="text"
                  placeholder="username"
                  className="px-3 py-2 rounded-lg border-2 border-gray-300"
                />
                <ErrorMessage
                  component="span"
                  name="username"
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
                  className="px-4 py-3 rounded-lg text-white text-lg font-semibold bg-[#19222E]"
                >
                  Login
                </button>
              </div>
            </Form>
          </Formik>

          <div className="flex flex-col items-center">
            <p>Don&apos;t have an account?</p>
            <Link href="/register">
              <span className="text-lg text-sky-600">Sign Up</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Login Success Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" />

          <div className="relative bg-white p-6 rounded-md shadow-md z-10">
            <h2 className="text-2xl font-semibold mb-4">Login Success</h2>
            <p className="text-lg">You have successfully logged in.</p>
            <button
              className="px-4 py-2 mt-4 rounded-lg text-white text-lg font-semibold bg-[#19222E]"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
