import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-10">
     <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Welcome to TickTock Countdown
      </h1>

      <p className="text-xl text-center text-gray-600 mb-6">  
        This is a simple countdown app that allows you to create a countdown and share it with your friends.
      </p>
      <Link href="/dashboard" legacyBehavior>
        <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Enter Dashboard
        </a>
      </Link>
    </main>
  )
}
