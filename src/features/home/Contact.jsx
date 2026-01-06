import React, { useState } from 'react'
import { assets } from '../../assets/assets';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setFormStatus('success');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      setTimeout(() => {
        setFormStatus('');
      }, 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: assets.phone_icon || '📞',
      title: 'Phone',
      details: ['+254 700 77 67 77'],
      description: 'Call us for immediate assistance'
    },
    {
      icon: assets.email_icon || '✉️',
      title: 'Email',
      details: ['info@agsproperty.co.ke'],
      description: 'Send us an email anytime'
    },
    {
      icon: assets.location_icon || '📍',
      title: 'Address',
      details: ['AGS Property Services', '1983-00621 Village Market', 'Kiambu, Kenya'],
      description: 'Visit our office'
    },
    {
      icon: assets.clock_icon || '🕒',
      title: 'Business Hours',
      details: ['Mon - Fri: 8:00 AM - 6:00 PM', 'Sat: 9:00 AM - 4:00 PM', 'Sun: Closed'],
      description: 'We are here to serve you'
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: '📘', link: '#' },
    { name: 'Twitter', icon: '🐦', link: '#' },
    { name: 'Instagram', icon: '📷', link: 'https://www.instagram.com/agspropertyservicesltd2020/' },
    { name: 'LinkedIn', icon: '💼', link: '#' }
  ];

  return (
    <div className='container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden' id='Contact'>
      <div className="text-center mb-16">
        <h1 className="text-2xl sm:text-4xl font-bold mb-2">
          Get In <span className='underline underline-offset-4 decoration-1 font-light'>Touch</span>
        </h1>
        <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
          Ready to find your dream property or need expert real estate advice? We're here to help. 
          Contact us today and let's start your property journey together.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600 opacity-5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-600 opacity-5 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Send us a Message
            </h2>

            {formStatus === 'success' && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center">
                <span className="mr-2">✅</span>
                Thank you! Your message has been sent successfully. We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="+254 700 000 000"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select a subject</option>
                    <option value="buying">Property Buying</option>
                    <option value="selling">Property Selling</option>
                    <option value="renting">Property Rental</option>
                    <option value="valuation">Property Valuation</option>
                    <option value="management">Property Management</option>
                    <option value="consultation">General Consultation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-vertical"
                  placeholder="Tell us about your property needs, questions, or how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-indigo-500 hover:bg-indigo-600 transform hover:scale-[1.02] shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending Message...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500 opacity-5 rounded-full -translate-y-20 translate-x-20"></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-indigo-600 text-xl">
                      {typeof info.icon === 'string' && info.icon.startsWith('http') ? (
                        <img src={info.icon} alt={info.title} className="w-6 h-6" />
                      ) : (
                        <span>{info.icon}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-lg mb-1">{info.title}</h3>
                      <div className="space-y-1">
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-gray-600 font-medium">{detail}</p>
                        ))}
                      </div>
                      <p className="text-gray-500 text-sm mt-2">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-500 opacity-5 rounded-full translate-y-16 translate-x-16"></div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-indigo-500 hover:text-white transition-all duration-200 transform hover:scale-110"
                    aria-label={`Follow us on ${social.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-xl">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-40 bg-indigo-500 opacity-5 rounded-full -translate-y-20 -translate-x-20"></div>
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Find Our Office</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visit us at our conveniently located office in Kiambu. We're easily accessible and always ready to welcome you.
            </p>
          </div>
          <div className="relative h-96 rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="AGS Office Location"
              src="https://www.google.com/maps?q=-1.10177,37.01376&z=15&output=embed"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              className="rounded-xl border-0"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl p-6 sm:p-8 md:p-12 text-white relative overflow-hidden">
  {/* Decorative Background Circles */}
  <div className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-white opacity-5 rounded-full -translate-y-24 sm:-translate-y-32 translate-x-20 sm:translate-x-32"></div>
  <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 bg-white opacity-5 rounded-full translate-y-20 sm:translate-y-24 -translate-x-20 sm:-translate-x-24"></div>

  {/* Content */}
  <div className="relative z-10">
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
      Ready to Start Your Property Journey?
    </h2>
    <p className="text-yellow-100 text-sm sm:text-base mb-8 max-w-md sm:max-w-xl mx-auto">
      Whether you're buying, selling, or renting, our experienced team is here to guide you every step of the way. Contact us today for a free consultation.
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center sm:items-stretch">
      <button className="bg-white text-indigo-600 px-6 py-3 sm:px-8 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-yellow-50 transition-colors duration-200 transform hover:scale-105 w-full sm:w-auto">
        Schedule Consultation
      </button>
      <button className="border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-white hover:text-indigo-600 transition-all duration-200 transform hover:scale-105 w-full sm:w-auto">
        View Properties
      </button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Contact
