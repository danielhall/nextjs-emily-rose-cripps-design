'use client';

import { motion } from 'framer-motion';
import ContactForm from '../../components/contact-form';

export default function ContactPage() {
  return (
    <div className="mx-auto px-4 md:px-0 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-12"
      >
        {/* Header Section */}
        <section className="text-center py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-sm text-gray-600 uppercase tracking-wide">Get In Touch</span>
            <h1 className="font-primary text-4xl md:text-5xl font-bold mt-2 mb-6">
              Let&apos;s Work Together
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
              I&apos;m always excited to take on new projects and collaborate with creative teams. 
              Whether you need graphic design, branding, or creative consultation, I&apos;d love to hear about your vision.
            </p>
          </motion.div>
        </section>

        {/* Contact Form Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-8 md:p-12"
          >
            <div className="max-w-2xl mx-auto">
              <h2 className="font-primary text-2xl font-bold mb-6 text-center">
                Send Me a Message
              </h2>
              <ContactForm />
            </div>
          </motion.div>
        </section>

        {/* Additional Info Section */}
        <section className="grid md:grid-cols-2 gap-8 py-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white border-2 border-black rounded-lg p-6"
          >
            <h3 className="font-primary text-xl font-bold mb-4">What I Do</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Brand Identity & Logo Design</li>
              <li>• Print & Digital Graphics</li>
              <li>• Marketing Materials</li>
              <li>• Creative Consultation</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white border-2 border-black rounded-lg p-6"
          >
            <h3 className="font-primary text-xl font-bold mb-4">Let&apos;s Connect</h3>
            <p className="text-gray-700 mb-4">
              Ready to start your project? Send me a message and I&apos;ll get back to you as soon as I can.
            </p>
            <p className="text-sm text-gray-600">
              Based in Wiltshire • Available for remote work
            </p>
          </motion.div>
        </section>
      </motion.div>
    </div>
  );
}
