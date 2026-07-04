import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const projectOptions = [
  'Web Development',
  'Mobile App Development',
  'Machine Learning / AI',
  'Data Science & Analytics',
  'Cloud Computing',
  'Cyber Security',
  'Blockchain',
  'IoT / Embedded Systems',
  'DevOps / CI/CD',
  'UI / UX Design',
];

export default function ProjectForm() {
  const [form, setForm] = useState({
    name: '',
    college: '',
    course: '',
    email: '',
    mobile: '',
    chooseProject: '',
    ownProjectTopic: '',
    projectType: 'with-documentation',
    description: '',
  });

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <div className="bg-dark text-light min-h-screen overflow-x-hidden">
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 text-center" data-aos="fade-up">
            <p className="text-teal text-sm font-bold tracking-[0.3em] uppercase mb-4">Get in Touch</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Let's Talk</h1>
            <p className="text-light/60 text-lg">Tell us about your project and we'll get back to you.</p>
          </div>

          <form className="space-y-6" data-aos="fade-up">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold tracking-widest text-light/50 uppercase mb-2">Name</label>
                <input type="text" value={form.name} onChange={update('name')} className="w-full bg-medium border border-light/10 px-4 py-3 text-light placeholder-light/20 focus:border-teal focus:outline-none transition-colors" placeholder="Your name" required />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-widest text-light/50 uppercase mb-2">College</label>
                <input type="text" value={form.college} onChange={update('college')} className="w-full bg-medium border border-light/10 px-4 py-3 text-light placeholder-light/20 focus:border-teal focus:outline-none transition-colors" placeholder="College name" required />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold tracking-widest text-light/50 uppercase mb-2">Course</label>
                <input type="text" value={form.course} onChange={update('course')} className="w-full bg-medium border border-light/10 px-4 py-3 text-light placeholder-light/20 focus:border-teal focus:outline-none transition-colors" placeholder="e.g. B.E. CSE" required />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-widest text-light/50 uppercase mb-2">Email ID</label>
                <input type="email" value={form.email} onChange={update('email')} className="w-full bg-medium border border-light/10 px-4 py-3 text-light placeholder-light/20 focus:border-teal focus:outline-none transition-colors" placeholder="your@email.com" required />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold tracking-widest text-light/50 uppercase mb-2">Mobile No</label>
              <input type="tel" value={form.mobile} onChange={update('mobile')} className="w-full bg-medium border border-light/10 px-4 py-3 text-light placeholder-light/20 focus:border-teal focus:outline-none transition-colors" placeholder="+91 98765 43210" required />
            </div>

            <div className="border border-light/10 p-6 space-y-6">
              <p className="text-xs font-bold tracking-widest text-light/50 uppercase">Project Type</p>

              <div className="flex items-center gap-8">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="projectType"
                    value="with-documentation"
                    checked={form.projectType === 'with-documentation'}
                    onChange={update('projectType')}
                    className="w-4 h-4 accent-teal"
                  />
                  <span className="text-sm text-light/80 group-hover:text-light transition-colors">Project with Documentation</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="projectType"
                    value="only-documentation"
                    checked={form.projectType === 'only-documentation'}
                    onChange={update('projectType')}
                    className="w-4 h-4 accent-teal"
                  />
                  <span className="text-sm text-light/80 group-hover:text-light transition-colors">Only Documentation</span>
                </label>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold tracking-widest text-light/50 uppercase mb-2">Choose Project</label>
                  <select
                    value={form.chooseProject}
                    onChange={update('chooseProject')}
                    className="w-full bg-medium border border-light/10 px-4 py-3 text-light focus:border-teal focus:outline-none transition-colors appearance-none"
                  >
                    <option value="" className="bg-medium">Select a project</option>
                    {projectOptions.map((p) => (
                      <option key={p} value={p} className="bg-medium">{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-widest text-light/50 uppercase mb-2">Own Project Topic</label>
                  <input
                    type="text"
                    value={form.ownProjectTopic}
                    onChange={update('ownProjectTopic')}
                    className="w-full bg-medium border border-light/10 px-4 py-3 text-light placeholder-light/20 focus:border-teal focus:outline-none transition-colors"
                    placeholder="Enter your own topic"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold tracking-widest text-light/50 uppercase mb-2">Description</label>
              <textarea rows={6} value={form.description} onChange={update('description')} className="w-full bg-medium border border-light/10 px-4 py-3 text-light placeholder-light/20 focus:border-teal focus:outline-none transition-colors resize-none" placeholder="Describe your project in detail..." required />
            </div>

            <button type="submit" className="w-full bg-teal text-dark py-4 font-black uppercase tracking-tight hover:bg-light transition-all duration-300">
              Submit Request
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
