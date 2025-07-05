import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Code,
  Database,
  Server,
  Globe,
  Cloud,
  GitBranch,
  TestTube,
  Zap,
  Brain,
  Lock,
  Wrench,
  Star,
  Calendar,
  TrendingUp,
  Award,
} from "lucide-react";

interface Skill {
  name: string;
  proficiency: number; // 0-100
  experience: string;
  icon: React.ReactNode;
  color: string;
  category: string;
  projects?: number;
  certifications?: string[];
}

const skillsData: Skill[] = [
  // Frontend
  {
    name: "React.js / Next.js",
    proficiency: 95,
    experience: "4+ years",
    icon: <Code className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    category: "Frontend",
    projects: 25,
    certifications: ["Meta React Developer"],
  },
  {
    name: "TypeScript",
    proficiency: 90,
    experience: "3+ years",
    icon: <Code className="w-6 h-6" />,
    color: "from-blue-600 to-blue-400",
    category: "Frontend",
    projects: 20,
  },
  {
    name: "Tailwind CSS",
    proficiency: 95,
    experience: "3+ years",
    icon: <Globe className="w-6 h-6" />,
    color: "from-teal-500 to-cyan-500",
    category: "Frontend",
    projects: 30,
  },
  {
    name: "Framer Motion",
    proficiency: 85,
    experience: "2+ years",
    icon: <Zap className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    category: "Frontend",
    projects: 15,
  },

  // Backend
  {
    name: "Java / Spring Boot",
    proficiency: 90,
    experience: "4+ years",
    icon: <Server className="w-6 h-6" />,
    color: "from-orange-500 to-red-500",
    category: "Backend",
    projects: 18,
    certifications: ["Oracle Java Certified"],
  },
  {
    name: "Node.js",
    proficiency: 85,
    experience: "3+ years",
    icon: <Server className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
    category: "Backend",
    projects: 22,
  },
  {
    name: "Python",
    proficiency: 80,
    experience: "3+ years",
    icon: <Brain className="w-6 h-6" />,
    color: "from-yellow-500 to-amber-500",
    category: "Backend",
    projects: 15,
  },
  {
    name: "PostgreSQL / MongoDB",
    proficiency: 85,
    experience: "4+ years",
    icon: <Database className="w-6 h-6" />,
    color: "from-indigo-500 to-purple-500",
    category: "Backend",
    projects: 20,
  },

  // DevOps & Tools
  {
    name: "Docker / Kubernetes",
    proficiency: 80,
    experience: "2+ years",
    icon: <Cloud className="w-6 h-6" />,
    color: "from-blue-500 to-indigo-500",
    category: "DevOps",
    projects: 12,
  },
  {
    name: "AWS / GCP",
    proficiency: 75,
    experience: "2+ years",
    icon: <Cloud className="w-6 h-6" />,
    color: "from-orange-500 to-yellow-500",
    category: "DevOps",
    projects: 10,
    certifications: ["AWS Cloud Practitioner"],
  },
  {
    name: "Git / GitHub Actions",
    proficiency: 90,
    experience: "4+ years",
    icon: <GitBranch className="w-6 h-6" />,
    color: "from-gray-600 to-gray-400",
    category: "DevOps",
    projects: 35,
  },
  {
    name: "Testing (Jest, JUnit)",
    proficiency: 85,
    experience: "3+ years",
    icon: <TestTube className="w-6 h-6" />,
    color: "from-red-500 to-pink-500",
    category: "DevOps",
    projects: 25,
  },

  // Cybersecurity & Specializations
  {
    name: "Penetration Testing",
    proficiency: 85,
    experience: "3+ years",
    icon: <Lock className="w-6 h-6" />,
    color: "from-red-600 to-orange-600",
    category: "Cybersecurity",
    projects: 8,
    certifications: ["CyberGhana Advanced Track"],
  },
  {
    name: "Digital Forensics",
    proficiency: 80,
    experience: "2+ years",
    icon: <Brain className="w-6 h-6" />,
    color: "from-purple-600 to-indigo-600",
    category: "Cybersecurity",
    projects: 6,
    certifications: ["National Championship 4th Place"],
  },
  {
    name: "Security Analysis",
    proficiency: 85,
    experience: "3+ years",
    icon: <Lock className="w-6 h-6" />,
    color: "from-orange-600 to-red-600",
    category: "Cybersecurity",
    projects: 12,
  },
  {
    name: "Spam Detection",
    proficiency: 80,
    experience: "2+ years",
    icon: <TestTube className="w-6 h-6" />,
    color: "from-green-600 to-teal-600",
    category: "Cybersecurity",
    projects: 5,
  },
];

const categories = ["Frontend", "Backend", "DevOps", "Cybersecurity"];

interface SkillBarProps {
  skill: Skill;
  index: number;
  isVisible: boolean;
}

function SkillBar({ skill, index, isVisible }: SkillBarProps) {
  const [hovered, setHovered] = useState(false);

  const getProficiencyLevel = (proficiency: number) => {
    if (proficiency >= 90) return { level: "Expert", color: "text-green-400" };
    if (proficiency >= 75) return { level: "Advanced", color: "text-blue-400" };
    if (proficiency >= 60)
      return { level: "Intermediate", color: "text-yellow-400" };
    return { level: "Beginner", color: "text-orange-400" };
  };

  const { level, color } = getProficiencyLevel(skill.proficiency);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 cursor-hover border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${skill.color}`}>
              {skill.icon}
            </div>
            <div>
              <h4 className="font-bold text-white">{skill.name}</h4>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{skill.experience}</span>
                <span className={`ml-2 ${color} font-medium`}>• {level}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">
              {skill.proficiency}%
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={isVisible ? { width: `${skill.proficiency}%` } : {}}
              transition={{
                duration: 1.5,
                delay: index * 0.1 + 0.5,
                ease: "easeOut",
              }}
              className={`h-full bg-gradient-to-r ${skill.color} relative`}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </motion.div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
          <div className="flex items-center gap-4">
            {skill.projects && (
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>{skill.projects} projects</span>
              </div>
            )}
            {skill.certifications && (
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4" />
                <span>{skill.certifications.length} certs</span>
              </div>
            )}
          </div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(skill.proficiency / 20)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Hover Tooltip */}
        {hovered && skill.certifications && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-sm rounded-lg p-4 border border-white/20 z-10"
          >
            <h5 className="font-bold text-white mb-2">Certifications:</h5>
            <ul className="space-y-1">
              {skill.certifications.map((cert, i) => (
                <li
                  key={i}
                  className="text-sm text-gray-300 flex items-center gap-2"
                >
                  <Award className="w-3 h-3 text-yellow-400" />
                  {cert}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

interface CategoryStatsProps {
  category: string;
  skills: Skill[];
  isVisible: boolean;
}

function CategoryStats({ category, skills, isVisible }: CategoryStatsProps) {
  const avgProficiency = Math.round(
    skills.reduce((sum, skill) => sum + skill.proficiency, 0) / skills.length
  );

  const totalProjects = skills.reduce(
    (sum, skill) => sum + (skill.projects || 0),
    0
  );
  const totalCertifications = skills.reduce(
    (sum, skill) => sum + (skill.certifications?.length || 0),
    0
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend":
        return <Globe className="w-8 h-8" />;
      case "Backend":
        return <Server className="w-8 h-8" />;
      case "DevOps":
        return <Cloud className="w-8 h-8" />;
      case "Cybersecurity":
        return <Lock className="w-8 h-8" />;
      default:
        return <Wrench className="w-8 h-8" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Frontend":
        return "from-blue-500 to-cyan-500";
      case "Backend":
        return "from-green-500 to-emerald-500";
      case "DevOps":
        return "from-purple-500 to-pink-500";
      case "Cybersecurity":
        return "from-red-500 to-orange-500";
      default:
        return "from-gray-500 to-gray-400";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
    >
      <div className="text-center">
        <div
          className={`inline-flex p-4 rounded-full bg-gradient-to-r ${getCategoryColor(
            category
          )} mb-4`}
        >
          {getCategoryIcon(category)}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{category}</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-white">
              {avgProficiency}%
            </div>
            <div className="text-sm text-gray-400">Avg Proficiency</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">{totalProjects}</div>
            <div className="text-sm text-gray-400">Projects</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">
              {totalCertifications}
            </div>
            <div className="text-sm text-gray-400">Certifications</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillsShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredSkills = activeCategory
    ? skillsData.filter((skill) => skill.category === activeCategory)
    : skillsData;

  return (
    <div ref={ref} className="space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
          Technical Arsenal
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Battle-tested skills forged through years of building production-grade
          applications
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex justify-center gap-4 flex-wrap"
      >
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-hover ${
            activeCategory === null
              ? "bg-gradient-to-r from-primary to-secondary text-white"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          All Skills
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-hover ${
              activeCategory === category
                ? "bg-gradient-to-r from-primary to-secondary text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Category Stats */}
      {!activeCategory && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryStats
              key={category}
              category={category}
              skills={skillsData.filter((skill) => skill.category === category)}
              isVisible={isInView}
            />
          ))}
        </div>
      )}

      {/* Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSkills.map((skill, index) => (
          <SkillBar
            key={`${skill.name}-${activeCategory || "all"}`}
            skill={skill}
            index={index}
            isVisible={isInView}
          />
        ))}
      </div>

      {/* Overall Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 backdrop-blur-sm rounded-xl p-8 text-center border border-white/10"
      >
        <h3 className="text-2xl font-bold text-white mb-6">
          Professional Journey from Ghana 🇬🇭
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div>
            <div className="text-3xl font-bold text-gradient">4+</div>
            <div className="text-sm text-gray-400">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gradient">50+</div>
            <div className="text-sm text-gray-400">Projects Completed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gradient">16</div>
            <div className="text-sm text-gray-400">Technologies Mastered</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gradient">4th</div>
            <div className="text-sm text-gray-400">Cyber Championship</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gradient">∞</div>
            <div className="text-sm text-gray-400">Lines of Code</div>
          </div>
        </div>

        <div className="mt-8 bg-white/5 rounded-lg p-6 border border-white/10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Lock className="w-6 h-6 text-red-400" />
            <h4 className="text-lg font-bold text-white">
              Cybersecurity Achievements
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-400 mb-1">
                4th Place
              </div>
              <div className="text-sm text-gray-300">
                Ghana National Cybersecurity Championship
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-400 mb-1">
                Advanced
              </div>
              <div className="text-sm text-gray-300">
                CyberGhana Penetration Testing Track
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-400 mb-1">
                Leader
              </div>
              <div className="text-sm text-gray-300">
                Digital Forensics Team
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
