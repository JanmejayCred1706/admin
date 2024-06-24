This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

<!-- hitting post api multiple time in a single page -->
<!-- const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [responseData1, setResponseData1] = useState(null);
  const [responseData2, setResponseData2] = useState(null);

  const mutation = usePostRequest();

  const handleSubmit1 = async (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate({ endpoint: '/endpoint1', body: { param: inputValue1 } }, {
      onSuccess: (data) => {
        setResponseData1(data);
      },
    });
  };

  const handleSubmit2 = async (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate({ endpoint: '/endpoint2', body: { param: inputValue2 } }, {
      onSuccess: (data) => {
        setResponseData2(data);
      },
    });
  };

  if (mutation.isLoading) return <div>Loading...</div>;
  if (mutation.isError) return <div>Error: {mutation.error.message}</div>; -->

  <!-- another to call the api  -->
  <!-- const loginMutation = usePostRequest();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    loginMutation.mutate({ endpoint: 'user/login', body: { username, password } }, {
      onSuccess: (data) => {
        localStorage.setItem('token', data?.data?.token);
        // Assuming addCookies is a function to add cookies
        addCookies(['token'], [data?.data?.token]);
        if (data?.success) {
          router.push('/');
        }
      },
      onError: (error) => {
        console.error('Login failed:', error);
        // Handle login error
      },
    });
  };

  if (loginMutation.isLoading) return <div>Loading...</div>;
  if (loginMutation.isError) return <div>Error: {loginMutation.error.message}</div>; -->
