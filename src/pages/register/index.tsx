import Link from 'next/link';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import axios from 'axios';
import Head from 'next/head';

type InitialRegisterValues = {
  username: string;
  email: string;
  password: string;
  name: string;
};

export default function Register() {
  const router = useRouter();

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

      router.push('/login');
    } catch (error: any) {
      console.log(error.toString());
    }
  };

  return (
    <>
      <Head>
        <title>Register | Apikgems </title>
      </Head>
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
                  placeholder="name"
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
                  className="px-4 py-3 rounded-lg text-white text-lg font-semibold bg-[#19222E]"
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
    </>
  );
}
