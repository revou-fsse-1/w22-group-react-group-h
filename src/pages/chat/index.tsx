import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import Head from 'next/head';

export interface ChatProps {
  id: string;
  chat: string;
  createdAt: number;
}

interface ChatForm {
  chat: string;
}

export default function ChatTables() {
  const [chats, setChats] = useState<ChatProps[]>([]);

  async function getChats() {
    try {
      const response = await axios.get(
        'https://64b6be17df0839c97e160f69.mockapi.io/chat?sortBy=id&order=desc',
      );
      console.log(response);

      setChats(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getChats();
  }, []);

  function transformTime(dateTime: number) {
    const FormattedDateTime = new Date(dateTime * 1000);
    const year = FormattedDateTime.getFullYear();
    const month = FormattedDateTime.getMonth() + 1;
    const day = FormattedDateTime.getDate();
    const hours = FormattedDateTime.getHours();
    const minutes = FormattedDateTime.getMinutes();
    const seconds = FormattedDateTime.getSeconds();

    const formattedDateTime = `${year}-${month
      .toString()
      .padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours
      .toString()
      .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;

    const time = new Date(formattedDateTime).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return time;
  }

  const initialValues: ChatForm = {
    chat: '',
  };

  const handleSubmit = async (values: ChatForm) => {
    try {
      const response = await axios.post(
        'https://64b6be17df0839c97e160f69.mockapi.io/chat',
        {
          chat: values.chat,
        },
      );
      const data = response.data;

      if (response.status !== 201) {
        throw new Error(data.errors);
      }

      formRef.current?.reset();
      setChats([...chats, data]);
    } catch (error: any) {
      //   console.log(error.toString());
    }
  };

  const formRef = useRef<HTMLFormElement>(null);

  console.log('normal', chats);
  console.log('reverse', chats.reverse());

  return (
    <>
      <Head>
        <title>Chat | Apikgems </title>
      </Head>
      <div className="hero backdrop-blur-md backdrop-brightness-90">
        <div className="pb-5">
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form ref={formRef} className="flex flex-col gap-1 ">
              <label
                htmlFor="chat"
                className="text-xl font-bold text-white px-5 pt-2"
              >
                Chat - Ask - Meet - Play
              </label>
              <div className="px-2">
                <Field
                  name="chat"
                  type="text"
                  className="px-3 py-2 rounded-lg border-2 border-gray-300 w-[500px]"
                />
                <button
                  className="border border-black rounded-lg bg-white px-3 py-3 ml-3"
                  type="submit"
                >
                  Enter
                </button>
              </div>
            </Form>
          </Formik>
        </div>
        {chats.reverse().map((chat) => (
          <div key={chat.id} className="flex flex-row gap-8 px-3">
            <p>{transformTime(chat.createdAt)}</p>
            <p className="mb-5">{chat.chat}</p>
          </div>
        ))}
      </div>
    </>
  );
}
