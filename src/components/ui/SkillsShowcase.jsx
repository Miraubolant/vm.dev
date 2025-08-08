import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SkillsShowcase = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const skills = [
    {
      category: 'Frontend',
      technologies: [
        { name: 'React', level: 95, color: '#E94560' },
        { name: 'Vue.js', level: 90, color: '#0F3460' },
        { name: 'TypeScript', level: 88, color: '#533483' },
        { name: 'Next.js', level: 92, color: '#F39C12' },
        { name: 'Tailwind CSS', level: 96, color: '#E94560' }
      ]
    },
    {
      category: 'Backend',
      technologies: [
        { name: 'Node.js', level: 90, color: '#0F3460' },
        { name: 'PHP', level: 85, color: '#533483' },
        { name: 'Python', level: 80, color: '#F39C12' },
        { name: 'FastAPI', level: 85, color: '#E94560' },
        { name: 'Symfony', level: 82, color: '#0F3460' }
      ]
    },
    {
      category: 'Database & Hosting',
      technologies: [
        { name: 'MySQL', level: 90, color: '#533483' },
        { name: 'Supabase', level: 88, color: '#E94560' },
        { name: 'Coolify', level: 85, color: '#F39C12' },
        { name: 'Docker', level: 80, color: '#0F3460' },
        { name: 'Netlify', level: 82, color: '#533483' }
      ]
    }
  ];

  const SkillBar = ({ skill, index, categoryIndex }) => {
    return (
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ 
          opacity: inView ? 1 : 0, 
          x: inView ? 0 : -50 
        }}
        transition={{ 
          duration: 0.6, 
          delay: categoryIndex * 0.2 + index * 0.1 
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="font-orbitron font-medium text-white">
            {skill.name}
          </span>
          <span className="text-gray-400 text-sm">
            {skill.level}%
          </span>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: skill.color }}
            initial={{ width: 0 }}
            animate={{ width: inView ? `${skill.level}%` : 0 }}
            transition={{ 
              duration: 1, 
              delay: categoryIndex * 0.2 + index * 0.1 + 0.3,
              ease: 'easeOut'
            }}
          />
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-glass rounded-lg p-8 border-neon" ref={ref}>
      <motion.h3
        className="font-orbitron font-bold text-2xl text-gradient mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: inView ? 1 : 0, 
          y: inView ? 0 : 20 
        }}
        transition={{ duration: 0.6 }}
      >
        STACK TECHNIQUE
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skills.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: inView ? 1 : 0, 
              y: inView ? 0 : 30 
            }}
            transition={{ 
              duration: 0.6, 
              delay: categoryIndex * 0.2 
            }}
          >
            <h4 className="font-orbitron font-bold text-lg text-blue-400 mb-4 border-b border-electric-blue pb-2">
              {category.category}
            </h4>
            
            {category.technologies.map((skill, index) => (
              <SkillBar
                key={skill.name}
                skill={skill}
                index={index}
                categoryIndex={categoryIndex}
              />
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillsShowcase;