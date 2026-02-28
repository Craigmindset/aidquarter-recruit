import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Page not found</h1>
        <p className="text-gray-600">
          Sorry, the page you are looking for does not exist.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition"
          >
            Go to Home
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-md border px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
