import React, { useState } from 'react';
import { Search, User, DollarSign, Shield, CreditCard, ChevronDown, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const HelpSupportPage = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      icon: User,
      title: 'My Account',
      subtitle: 'See articles',
      link: '#'
    },
    {
      icon: DollarSign,
      title: 'Payment',
      subtitle: 'See articles',
      link: '#'
    },
    {
      icon: Shield,
      title: 'Security',
      subtitle: 'See articles',
      link: '#'
    },
    {
      icon: CreditCard,
      title: 'Payment Methods',
      subtitle: 'See articles',
      link: '#'
    }
  ];

  const faqs = [
    { 
      id: 1, 
      question: 'I forgot the password for my account.', 
      answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page. Enter your email address and we\'ll send you instructions to reset your password.' 
    },
    { 
      id: 2, 
      question: 'How Can I View My Payments History?', 
      answer: 'Navigate to your account dashboard and click on "Payment History" to view all your past transactions and payment records.' 
    },
    { 
      id: 3, 
      question: 'How do I withdraw funds from my account?', 
      answer: 'Go to your wallet section, select "Withdraw", choose your preferred payment method, enter the amount, and confirm the transaction.' 
    },
    { 
      id: 4, 
      question: 'Where is my refund?', 
      answer: 'Refunds typically take 5-10 business days to process. You can check the status in your payment history or contact our support team.' 
    },
    { 
      id: 5, 
      question: 'How do I link bank account to my account?', 
      answer: 'Visit Account Settings, select "Payment Methods", click "Add Bank Account", and follow the verification steps to link your account.' 
    },
    { 
      id: 6, 
      question: 'How do I request payments or send an invoice?', 
      answer: 'From your dashboard, click "Create Invoice", fill in the recipient details and amount, then click "Send" to deliver it via email.' 
    },
    { 
      id: 7, 
      question: 'How do I confirm the email address?', 
      answer: 'Check your email inbox for a verification email. Click the confirmation link to verify your email address.' 
    },
    { 
      id: 8, 
      question: 'How do I receive payments?', 
      answer: 'Share your payment link or invoice with clients. Once they pay, the funds will be deposited directly into your account.' 
    }
  ];

  const handleToggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };


  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            How can we help you?
          </h1>
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-12 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <a
                key={index}
                href={category.link}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-8 text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4 group-hover:bg-emerald-200 transition-colors duration-200">
                  <Icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{category.title}</h3>
                <p className="text-sm text-gray-500">{category.subtitle} ›</p>
              </a>
            );
          })}
        </div>
      </div>

      {/* Popular Topics */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Popular Topics</h2>
          <p className="text-gray-600">Lisque persius interested his et, in quot quidam persequeris.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => handleToggleFaq(faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-gray-700 font-medium">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                    expandedFaq === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedFaq === faq.id && (
                <div className="px-6 pb-4 pt-2 bg-gray-50">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 flex items-start space-x-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Mail className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Can't find what you're looking for?
              </h3>
              <p className="text-gray-600 mb-4">
                We want to answer all of your queries. Get in touch and we'll get back to you as soon as we can.{' '}
                <a 
                  href="mailto:support@lmsplatform.com" 
                  className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200"
                >
                  support@lmsplatform.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Help & Support Section */}
        <div className="flex justify-center items-center  bg-gray-100 py-10">
          <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">Help & Support</h2>

              <div className="flex justify-center flex-wrap gap-6">
                <Link
                  to="/help_tickets"
                  className="inline-flex items-center justify-center space-x-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition duration-200 shadow-sm hover:shadow-md"
                >
                  <span>Raise a Ticket</span>
                </Link>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default HelpSupportPage;