import React, { useState } from 'react';

const Illustration = () => (
  <img
    src="https://themewagon.github.io/TopicListing/images/faq_graphic.jpg"
    alt="FAQ Illustration"
    className="max-w-xs md:max-w-md w-full"
    draggable="false"
  />
);

const faqs = [
  {
    question: 'What is Topic Listing?',
    answer: 'Topic Listing is a feature that allows users to browse all available subjects, filtered and sorted for convenience.',
  },
  {
    question: 'How to find a topic?',
    answer: 'You can search by keywords in the search bar or explore topic categories.',
  },
  {
    question: 'Does it need to paid?',
    answer: 'Most topics are free to browse. Premium topics will be clearly marked and require payment.',
  },
  {
    question: 'How do I create an account?',
    answer: 'Click the "Sign Up" button and fill in your details. You will receive a confirmation email after registration.',
  },
  {
    question: 'Can I access topics on mobile devices?',
    answer: 'Yes, our platform is fully responsive and works on smartphones and tablets.',
  },
  {
    question: 'How can I get support if I have an issue?',
    answer: 'You can use the Contact Us page or the chat feature to reach our support team for help or troubleshooting.',
  }
];

const FaqPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-0 text-left w-full max-w-5xl ml-0 md:ml-8">
        Frequently Asked <br className="hidden md:block" />
        Questions
      </h1>
      <div className="flex flex-col md:flex-row w-full max-w-5xl items-center md:items-start mt-2 md:mt-10 gap-4 md:gap-0">
        {/* Illustration */}
        <div className="flex justify-center flex-1 min-w-[270px]">
          <Illustration />
        </div>
        {/* FAQ list */}
        <div className="flex-1 w-full flex justify-start md:pl-12">
          <div className="flex flex-col w-full max-w-xl md:max-w-2xl">
            {faqs.map((faq, i) => (
              <div key={faq.question} className="mb-2">
                <button
                  onClick={() => setOpenIndex(i === openIndex ? null : i)}
                  className={`
                    w-full text-left text-lg md:text-xl font-semibold px-6 py-4
                    rounded-[2rem]
                    border-2 focus:outline-none transition
                    flex items-center justify-between
                    shadow-none
                    ${
                      openIndex === i
                        ? 'bg-blue-50 border-blue-200 text-blue-800'
                        : 'border-gray-200 bg-white hover:bg-blue-50'
                    }
                  `}
                  style={{ minHeight: 58 }}
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`ml-2 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : 'rotate-0'}`}
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 10l5 5 5-5" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div
                  className={`transition-all overflow-hidden duration-300 px-8 text-gray-600 text-base 
                    ${openIndex === i ? 'max-h-28 py-3' : 'max-h-0'}
                  `}
                  style={{ background: openIndex === i ? "#f1f6fc" : "transparent", borderRadius: openIndex === i ? "0 0 2rem 2rem" : "2rem" }}
                >
                  {openIndex === i && <p>{faq.answer}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
