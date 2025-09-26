import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms of Service</h1>

      <div className="space-y-4">
        <section>
          <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
          <p className="text-gray-600">
            Welcome to our e-commerce platform. By accessing or using our website, you agree to be bound by these Terms of Service. Please read them carefully.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">2. Account Registration</h2>
          <p className="text-gray-600">
            To access certain features of the site, you may be required to register for an account. You must provide accurate and complete information and keep your account information updated.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">3. Product Information and Pricing</h2>
          <p className="text-gray-600">
            We strive to ensure accuracy in product descriptions, pricing, and availability. However, errors may occur. We reserve the right to correct any inaccuracies or errors and to change or update information without prior notice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">4. Payment and Orders</h2>
          <p className="text-gray-600">
            All payments must be made using the provided payment methods. We reserve the right to cancel any order due to payment issues or product unavailability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">5. Shipping and Delivery</h2>
          <p className="text-gray-600">
            We currently ship to Ghana and neighboring countries. Delivery times and costs will vary based on location and shipping method. We will not be responsible for any delays caused by third-party couriers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">6. Returns and Refunds</h2>
          <p className="text-gray-600">
            Goods sold are not returnable. Exceptions may apply for defective products. For further assistance, contact our customer service team.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">7. Intellectual Property</h2>
          <p className="text-gray-600">
            All content, trademarks, and data on this website are the property of our company or its licensors. Unauthorized use is prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">8. Changes to Terms</h2>
          <p className="text-gray-600">
            We may update these Terms of Service from time to time. Continued use of our website after changes constitutes acceptance of the updated terms.
          </p>
        </section>
        <section>
        <h2 className="text-2xl font-semibold mb-2">9. Contact Us</h2>
        <p className="text-gray-600">
            If you have any questions about these Terms of Service, please{' '}
            <Link to="/contact" className="text-blue-500 hover:underline">
            contact us
            </Link>{' '}
        </p>
        </section>

      </div>
    </div>
  );
};

export default TermsOfService;
