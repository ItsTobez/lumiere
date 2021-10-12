import Layout from '@components/layouts/Layout';
import Head from 'next/head';
import { useSession, signIn } from "next-auth/react";

export default function Settings() {
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            signIn();
        },
    });

    if (status === 'loading') return null;

    const deleteAccount = async () => {
        const confirmed = confirm("Are you sure you'd like to delete your account? This action is irreversible.")

        if (confirmed) {
            try {
                await fetch('/api/user/delete', {
                    method: 'DELETE',
                    header: { 'Content-Type': 'application/json' }
                });
                await router.push('/');
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <>
            <Head>
                <title>Settings</title>
            </Head>
            <main className='container'>
                <h1 className='heading-primary mb-5'>Settings</h1>
                <section>
                    <h2 className='font-bold text-xl'>Delete your account</h2>
                    <p>You can choose to delete your account at any time. Do note that doing so may result in all your previously-created posts being permanently deleted. If you&#39;re sure, you may delete your account by clicking on the button below.</p>
                    <button
                        className='button-tertiary px-5 py-3 lg:py-2.5 mt-5 border-red-700 hover:border-red-400'
                        onClick={() => deleteAccount()}
                    >
                        Delete my account
                    </button>
                </section>
            </main>
        </>
    );
}

Settings.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
};
