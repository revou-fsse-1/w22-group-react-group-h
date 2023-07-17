import useSWR from 'swr';
import axios from 'axios';

export function useProfile() {
  const { data, error } = useSWR(
    'https://apikgems.cobainweb.site/api/users/me',
    fetcher,
  );
  console.log('AAAKHH');

  return {
    profile: data,
    isLoading: !error && !data,
    isError: error,
  };
}

async function fetcher(url: string) {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  return response.data;
}
