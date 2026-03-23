export default function InstagramHelpPage() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-black">Instagram Help Center</h1>
          <input
            type="text"
            placeholder="Search"
            className="px-3 py-1 border rounded-md w-64"
          />
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 mt-4 text-sm text-gray-500">
        <span className="hover:underline cursor-pointer">Home</span> &gt; 
        <span className="hover:underline cursor-pointer ml-1">Managing Your Account</span> &gt; 
        <span className="ml-1 text-black font-medium">Delete Your Instagram Account</span>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 bg-white mt-4 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold mb-4">How do I delete my Instagram account?</h2>

        <p className="mb-4">
          If you want to take a break, you can temporarily deactivate your account instead of deleting it.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-2">To delete your account permanently:</h3>
        <ol className="list-decimal list-inside space-y-2 mb-4">
          <li>Go to the <a className="text-blue-600 underline" href="https://www.instagram.com/accounts/remove/request/permanent/">Delete Your Account page</a>.</li>
          <li>If you're not logged into Instagram, you'll be asked to log in first.</li>
          <li>Select an option from the dropdown menu next to “Why do you want to delete your account?”</li>
          <li>Re-enter your password.</li>
          <li>Click or tap <strong>Delete [username]</strong>.</li>
        </ol>

        <p className="mb-4">
          After your account is deleted, your profile, photos, videos, comments, likes, and followers will be permanently removed.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-2">To temporarily deactivate your account:</h3>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Log into instagram.com from a mobile browser or computer.</li>
          <li>Go to your profile and click <strong>Edit Profile</strong>.</li>
          <li>Select <strong>Temporarily deactivate my account</strong>.</li>
        </ul>

        <p className="text-sm text-gray-500 mt-8">
          Last updated: July 2025
        </p>
      </main>
    </div>
  );
}
