import { QuoteIcon } from 'lucide-react';
const ImpactSection = () => {
  return <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-gray-800">
              The Impact of Your Generosity
            </h2>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex mb-4">
                <QuoteIcon className="h-8 w-8 text-purple-600 mr-2 flex-shrink-0" />
                <p className="text-xl font-serif italic text-gray-700">
                  Help others achieve their dreams and you will achieve yours.
                </p>
              </div>
              <p className="text-right text-gray-500">― Les Brown</p>
            </div>
            <p className="text-gray-600 text-lg mb-6">
              People with lower incomes tend to give a greater percentage of their incomes to help others and show greater empathy and compassion – perhaps because they know they might face the same circumstances.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-purple-100 rounded-full px-4 py-2 text-purple-800 font-medium">
                1,200+ Lives Changed
              </div>
              <div className="bg-purple-100 rounded-full px-4 py-2 text-purple-800 font-medium">
                35 Communities Served
              </div>
              <div className="bg-purple-100 rounded-full px-4 py-2 text-purple-800 font-medium">
                $2.4M Raised
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" alt="Helping hands" className="w-full h-64 object-cover" />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg sm:mt-12">
              <img src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" alt="Volunteer work" className="w-full h-64 object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ImpactSection;