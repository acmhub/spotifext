import { getProviders, signIn } from 'next-auth/react';

export default function Login({ providers }) {
    return (
        <div className="flex flex-col items-center justify-center bg-black min-h-screen w-full">
            <img src="https://links.papareact.com/9xl" alt="" className="w-52 mb-5" />

            {Object.values(providers).map((provider, i) => (
                <div key={i}>
                    <button
                        className="bg-[#18DB60] text-white p-5 rounded-full"
                        onClick={() =>
                            signIn(provider.id, {
                                callbackUrl: '/'
                            })
                        }
                    >
                        Login with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    );
}

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: {
            providers
        }
    };
}
