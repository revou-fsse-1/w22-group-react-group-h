import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';
import axios from 'axios';

type InitialLoginValues = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();

  const loginSchema = object({
    email: string().email('Invalid email').required('Email required'),
    password: string()
      .min(5, 'Password too short')
      .required('Password required'),
  });

  const initialValues: InitialLoginValues = { email: '', password: '' };

  const handleSubmit = async (values: InitialLoginValues) => {
    try {
      const res = await axios.post(
        'https://apikgems.cobainweb.site/api/auth/login',
        values,
      );
      const data = res.data;

      if (res.status !== 200) {
        throw new Error(data.errors);
      }

      localStorage.setItem('token', data.data.token);
      router.push('/');
    } catch (error: any) {
      console.log(error.toString());
    }
  };

  return (
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
                Login
              </button>
            </div>
          </Form>
        </Formik>

        <div className="flex flex-col items-center">
          <p>Don&apos;t have an account?</p>
          <Link href={'/signup'}>
            <span className="text-lg text-sky-600">Sign Up</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
