import { HeartHandshakeIcon, BookOpenIcon, DropletIcon } from 'lucide-react';
const DonationSection = () => {
  return <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-gray-800">
          Make an Impact with Your Donation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-purple-50 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300">
            <img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" alt="Donation" className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="flex items-center mb-4">
                <HeartHandshakeIcon className="h-6 w-6 text-purple-600 mr-2" />
                <h3 className="text-xl font-serif font-bold text-gray-800">Support Our Mission</h3>
              </div>
              <p className="text-gray-600 mb-6">
                One of the best ways you can make a difference in the lives of those in need is to make a financial donation to our work. Every contribution matters.
              </p>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-medium transition-colors">
                Donate Now
              </button>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300">
            <img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" alt="Community help" className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="flex items-center mb-4">
                <BookOpenIcon className="h-6 w-6 text-purple-600 mr-2" />
                <h3 className="text-xl font-serif font-bold text-gray-800">Education Programs</h3>
              </div>
              <p className="text-gray-600 mb-6">
                "Alone we can do little things; together we can do so much." Help us provide education and resources to communities that need it most.
              </p>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-medium transition-colors">
                Learn More
              </button>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300">
            <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" alt="Clean water initiative" className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="flex items-center mb-4">
                <DropletIcon className="h-6 w-6 text-purple-600 mr-2" />
                <h3 className="text-xl font-serif font-bold text-gray-800">Clean Water Initiative</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Open sources are susceptible to drying up and contamination. Our clean water projects help communities access safe, reliable water sources.
              </p>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-medium transition-colors">
                Support Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default DonationSection;