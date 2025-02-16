'use client';

import { useState } from 'react';
import * as RadixLabel from '@radix-ui/react-label';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setStatus('Sending...');
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message sent!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Error sending message. Please try again.');
      }
    } catch (error) {
      setStatus('Error sending message. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="float-right mr-auto max-w-xl w-full p-6 rounded-lg shadow-lg bg-background-50/90 backdrop-blur-lg backdrop-brightness-50">
      <h2 className="text-2xl font-bold mb-6">Contact Emily</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <RadixLabel.Root htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
            Name
          </RadixLabel.Root>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700  rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div className="mb-4">
          <RadixLabel.Root htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
            Email
          </RadixLabel.Root>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700  rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div className="mb-6">
          <RadixLabel.Root htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
            Message
          </RadixLabel.Root>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700  rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary text-black py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Send
        </button>
      </form>

      {status && <p className="text-center text-sm mt-4">{status}</p>}
    </div>
  );
};

export default ContactForm;
