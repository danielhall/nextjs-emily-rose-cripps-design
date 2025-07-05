'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

import Stamp from '../../assets/img/stamp.png';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<string | null>(null);
  const [stampAffixed, setStampAffixed] = useState(false);
  const [showStamp, setShowStamp] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleStampClick = () => {
    setShowStamp(true);
    setTimeout(() => setStampAffixed(true), 700);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stampAffixed) {
      setStatus('Please affix the stamp before sending.');
      return;
    }

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
        setStampAffixed(false);
        setShowStamp(false);
      } else {
        setStatus('Error sending message. Please try again.');
      }
    } catch (error) {
      setStatus('Error sending message. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="relative max-w-[1200px] w-full mx-auto bg-postcard bg-contain bg-no-repeat h-[750px]">
      <div className="absolute top-[60px] right-[75px] w-100 h-110 cursor-pointer">
        {!stampAffixed && (
          <div onClick={handleStampClick} className="absolute top-0 right-0 z-10">
            <motion.div
              initial={{ rotate: -20, y: -30, opacity: 0.8 }}
              animate={{ rotate: 0, y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="block h-[110px] w-[100px]"
            >
            </motion.div>
          </div>
        )}

        <AnimatePresence>
          {showStamp && (
            <motion.div
              key="stamp"
              initial={{ rotateX: -120, rotateZ: -15, scale: 1.2, y: -20, opacity: 0 }}
              animate={{ rotateX: 0, rotateZ: 0, scale: 1, y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.65, -0.25, 0.35, 1.25] }}
              className="absolute h-[100px] w-[110px] top-[-5px] right-[-5px] origin-top-right z-20"
            >
              <Image src={Stamp.src} alt="Stamp Affixed" width={110} height={100} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-[330px] pl-[50px] pr-[60px]">
        <div className="p-2">
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full h-full min-h-[200px] p-3 bg-[#AAA] bg-opacity-20 focus:bg-opacity-0 focus:outline-none text-black placeholder-black"
            rows={10}
            placeholder="Write your message here..."
            required
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="p-2">
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-[#AAA] bg-opacity-20 focus:bg-opacity-0 focus:outline-none text-black placeholder-black"
              placeholder="Leave your full name..."
              required
            />
          </div>

          <div className="p-2">
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-[#AAA] bg-opacity-20 focus:bg-opacity-0 focus:outline-none text-black placeholder-black"
              placeholder="And your email address..."
              required
            />
          </div>

          <button
            type="submit"
            className="mt-auto bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Send Postcard
          </button>
        </div>
      </form>

      {status && <p className="text-center text-sm mt-4 text-gray-600">{status}</p>}
    </div>
  );
};

export default ContactForm;