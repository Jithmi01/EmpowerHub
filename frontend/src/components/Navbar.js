import { HeartIcon } from 'lucide-react';
const Navbar = () => {
  return <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <HeartIcon className="h-6 w-6 text-purple-600" />
          <span className="text-xl font-bold text-gray-800">CharityHope</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="/" className="text-gray-600 hover:text-purple-600 transition-colors">Home</a>
          <a href="/adsUserView" className="text-gray-600 hover:text-purple-600 transition-colors">Donate Now</a>
          <a href="/showDonation" className="text-gray-600 hover:text-purple-600 transition-colors">My Donation</a>
          <a href="/showVacancies" className="text-gray-600 hover:text-purple-600 transition-colors">Job Portal</a>
          <a href="/appliedJobs" className="text-gray-600 hover:text-purple-600 transition-colors">Applied Jobs</a>
          <a href="/userEvent" className="text-gray-600 hover:text-purple-600 transition-colors">Events</a>

        </nav>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
          Donate Now
        </button>
      </div>
    </header>;
};
export default Navbar;