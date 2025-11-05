import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from 'react-toastify';

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields", {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#363636',
          color: '#fff',
        },
        icon: '⚠️',
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address", {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#363636',
          color: '#fff',
        },
        icon: '📧',
      });
      return;
    }
    
    setLoading(true);
    
    // Show loading toast
    const loadingToast = toast.loading('Sending message...', {
      position: 'top-center',
      style: {
        background: '#363636',
        color: '#fff',
      },
    });

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Jeremiah",
          from_email: form.email,
          to_email: "jerydan148@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          
          // Dismiss loading toast and show success
          toast.dismiss(loadingToast);
          toast.success("Message sent successfully! I'll get back to you soon.", {
            duration: 5000,
            position: 'top-center',
            style: {
              background: '#10B981',
              color: '#fff',
            },
            icon: '✅',
          });

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          
          // Dismiss loading toast and show error
          toast.dismiss(loadingToast);
          toast.error("Failed to send message. Please try again.", {
            duration: 5000,
            position: 'top-center',
            style: {
              background: '#EF4444',
              color: '#fff',
            },
            icon: '❌',
          });
        }
      );
  };

  return (
    <>
       <ToastContainer
        position="top-center"
        theme="dark"
        style={{ zIndex: 9999 }}
      />
      
      <div
        className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
      >
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
        >
          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className={styles.sectionHeadText}>Contact.</h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className='mt-12 flex flex-col gap-8'
          >
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>Your Name</span>
              <input
                type='text'
                name='name'
                value={form.name}
                onChange={handleChange}
                placeholder="What's your good name?"
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium transition-all duration-300 focus:ring-2 focus:ring-white/20'
                required
              />
            </label>
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>Your email</span>
              <input
                type='email'
                name='email'
                value={form.email}
                onChange={handleChange}
                placeholder="What's your web address?"
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium transition-all duration-300 focus:ring-2 focus:ring-white/20'
                required
              />
            </label>
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>Your Message</span>
              <textarea
                rows={7}
                name='message'
                value={form.message}
                onChange={handleChange}
                placeholder='What you want to say?'
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium transition-all duration-300 focus:ring-2 focus:ring-white/20'
                required
              />
            </label>

            <button
              type='submit'
              disabled={loading}
              className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:bg-secondary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105'
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
        >
          <EarthCanvas />
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");