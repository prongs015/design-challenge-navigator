
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About DesignChallenge</h1>
          <p className="text-xl text-gray-600">Helping designers ace their whiteboard interviews</p>
        </div>
        
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We created DesignChallenge to help product designers prepare for the most challenging part of the interview process: 
              the whiteboard design challenge. By providing realistic scenarios from top technology companies and role-specific feedback, 
              we aim to level the playing field and help designers showcase their true capabilities.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our challenges are crafted based on real interview experiences, industry research, and feedback from designers 
              who have successfully interviewed at companies like Uber, Airbnb, Meta, Google, and more.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">1. Choose a Company Challenge</h3>
                <p className="text-gray-600">
                  Select from our library of challenges based on real interview scenarios from top tech companies.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">2. Select Your Role Level</h3>
                <p className="text-gray-600">
                  Specify whether you're preparing for Junior, Senior, or Lead design positions to get targeted feedback.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">3. Practice With Realistic Constraints</h3>
                <p className="text-gray-600">
                  Use our built-in timer to simulate the time pressure of real interviews while you work through the challenge.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">4. Get Role-Specific Feedback</h3>
                <p className="text-gray-600">
                  Receive guidance tailored to your target role level, helping you understand what interviewers expect.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">Who We're For</h2>
            <ul className="space-y-2 text-gray-700 list-disc pl-5">
              <li>Product designers preparing for job interviews</li>
              <li>Junior designers looking to level up to senior roles</li>
              <li>Senior designers aiming for leadership positions</li>
              <li>Design students preparing to enter the job market</li>
              <li>Career switchers looking to break into product design</li>
              <li>Designers who want to practice their problem-solving skills</li>
            </ul>
          </section>
          
          <section className="bg-gray-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-700 mb-6">
              Start practicing with our library of design challenges and take the next step in your design career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="btn-primary">
                <Link to="/">Start Practicing</Link>
              </Button>
              <Button asChild variant="outline" className="btn-outline">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
