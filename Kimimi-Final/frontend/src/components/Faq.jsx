import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'What is the return policy?',
      answer: 'Goods sold are not returnable. Please ensure you review your order carefully before completing the purchase.',
    },
    {
      question: 'How long does shipping take?',
      answer: 'Shipping typically takes between 3-7 business days, depending on your location and shipping option selected.',
    },
    {
        question: 'Do you ship internationally?',
        answer: 'We currently offer shipping within Ghana and to neighboring countries. International shipping options will be available soon as we expand.',
      },     
    {
      question: 'How can I track my order?',
      answer: 'Once your order has been shipped, we will send you an email with a tracking number and a link to track your package.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept mobile money (MoMo) and Visa card payments.',
    },
  ];

  return (
    <div className="container mx-auto py-8 p-5">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b-2 border-gray-200 pb-4">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full text-left flex justify-between items-center py-3 focus:outline-none"
            >
              <span className="text-xl font-semibold">{faq.question}</span>
              <span className="text-xl">
                {activeIndex === index ? '-' : '+'}
              </span>
            </button>
            <div
              className={`mt-2 text-gray-600 transition-all duration-300 ease-in-out ${
                activeIndex === index ? 'max-h-screen' : 'max-h-0 overflow-hidden'
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
