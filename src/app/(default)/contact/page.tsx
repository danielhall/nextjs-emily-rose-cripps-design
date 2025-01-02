'use client';

import { useState } from 'react';
import * as RadixLabel from '@radix-ui/react-label';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
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
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6 md:col-span-6 p-6">
          <h2 className="text-2xl font-bold mb-6 mt-5">Hi, I&apos;m Emily!</h2>
          <p>Emily is a multi-disciplined graphic designer focussing in the field Graphic Design for film, television, theatre and prop making although is constantly experimenting in various fields.</p><br/>
          <p>Emily’s work has been showcased around Edinburgh during their ‘Giraffe About Town’ 2022 event, had group work shortlisted for the Creative Conscious Design Award 2022 and has had work exhibited at the ‘Note to Self’ exhibition hosted by Glimpse in 2023.</p><br/>
          <p>An avid musical theatre fan, she is guaranteed to be rocking out to show tunes whilst designing...it’s cooler than it sounds. When not designing, Emily can be found hanging upside down from an aerial hoop, reading or cooing over animals great and small.</p><br/>
          <p>If you are interested in Emily’s work, please use the contact form below to get in touch.</p>
        </div>

        <div className="col-span-6 md:col-span-6 p-6">
          
          <div className="float-right mr-auto max-w-xl w-full p-6 rounded-lg shadow-lg bg-background-50/90 backdrop-blur-lg backdrop-brightness-50"> 
            <h2 className="text-2xl font-bold mb-6">Contact Emily</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <RadixLabel.Root
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  Name
                </RadixLabel.Root>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="mb-4">
                <RadixLabel.Root
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  Email
                </RadixLabel.Root>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="mb-6">
                <RadixLabel.Root
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  Message
                </RadixLabel.Root>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
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

        </div>
      </div>

      
    </>
  );
}
