import { FiAward, FiUsers, FiTrendingUp, FiHeart } from 'react-icons/fi';

const About = () => {
  const values = [
    {
      icon: <FiHeart className="text-3xl" />,
      title: 'PASSION',
      description: 'Fashion is our passion. We live and breathe style, constantly seeking the perfect balance between trends and timeless elegance.'
    },
    {
      icon: <FiAward className="text-3xl" />,
      title: 'QUALITY',
      description: 'We never compromise on quality. Every piece in our collection is carefully selected and crafted to meet the highest standards.'
    },
    {
      icon: <FiUsers className="text-3xl" />,
      title: 'COMMUNITY',
      description: 'Our customers are at the heart of everything we do. We build lasting relationships based on trust and exceptional service.'
    },
    {
      icon: <FiTrendingUp className="text-3xl" />,
      title: 'INNOVATION',
      description: 'We stay ahead of fashion trends while respecting classic styles, creating pieces that are both contemporary and enduring.'
    }
  ];

  const stats = [
    { number: '10+', label: 'Years Experience' },
    { number: '50K+', label: 'Happy Customers' },
    { number: '1000+', label: 'Products' },
    { number: '25+', label: 'Countries' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-screen bg-black text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
          }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h1 className="striz-hero-title mb-6">ABOUT STRIZ</h1>
            <p className="text-xl md:text-2xl mb-8 font-light opacity-90 max-w-3xl mx-auto">
              Redefining fashion through timeless elegance and contemporary design
            </p>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="">
                <div className="text-5xl font-bold text-black mb-3">{stat.number}</div>
                <div className="text-gray-600 font-medium uppercase tracking-wide text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="striz-title mb-8">OUR STORY</h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Founded with a vision to revolutionize fashion retail, STRIZ began as a 
                  boutique concept focused on curating the finest pieces from emerging and 
                  established designers worldwide.
                </p>
                <p>
                  Our journey started with a simple belief: fashion should be accessible, 
                  sustainable, and inspiring. Today, we continue to champion this philosophy 
                  through our carefully selected collections.
                </p>
                <p>
                  From our headquarters to our global community, we remain committed to 
                  delivering exceptional quality and service that exceeds expectations.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="STRIZ Store" 
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="striz-title mb-4">OUR VALUES</h2>
            <p className="striz-subtitle">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-black text-white flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-800 transition-colors duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-black mb-4 uppercase tracking-wide">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="striz-title mb-8">OUR MISSION</h2>
          <p className="text-2xl text-gray-700 leading-relaxed mb-12">
            "To inspire confidence and self-expression through fashion, 
            creating a world where style knows no boundaries and every 
            individual can embrace their unique aesthetic."
          </p>
          <div className="w-32 h-1 bg-black mx-auto"></div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 uppercase tracking-wide">
            JOIN THE STRIZ FAMILY
          </h2>
          <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">
            Be part of our fashion journey and discover your unique style
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="btn-striz-outline bg-transparent border-white text-white hover:bg-white hover:text-black">
              EXPLORE COLLECTIONS
            </button>
            <button className="btn-striz bg-white text-black hover:bg-gray-200">
              CONTACT US
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;