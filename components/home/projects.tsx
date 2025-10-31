import React, { useState } from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { PROJECTS } from '../../constants';

// Accept the prop here 👇
interface ProjectsSectionProps {
  isDesktop: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ isDesktop }) => {
  const [activeProject, setActiveProject] = useState(0);

  const techIcons: Record<string, string> = {
    html: "🌐",
    css: "🎨",
    react: "⚛️",
    next: "▲",
    tailwind: "💨",
    gsap: "🎬",
    npm: "📦",
    angular: "🅰️",
    typescript: "📘",
    figma: "🎨",
  };

  return (
    <section
      className={`relative min-h-screen py-20 overflow-hidden bg-slate-950 ${
        isDesktop ? '' : 'px-4'
      }`}
    >
      {/* Subtle background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container relative z-10 px-6 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-6 border rounded-full bg-white/5 border-white/10 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-sm font-bold tracking-widest text-purple-300 uppercase">
              Portfolio
            </span>
          </div>

          <h2 className="mb-6 text-6xl font-black leading-tight text-white md:text-7xl lg:text-8xl">
            Featured{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                Projects
              </span>
              <div className="absolute left-0 right-0 h-3 bottom-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-lg" />
            </span>
          </h2>

          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-slate-400 md:text-xl">
            A showcase of my recent work in web development, featuring modern
            designs, smooth animations, and cutting-edge technologies.
          </p>
        </div>

        {/* Split View */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: Large Active Project Card */}
          <div className="relative group">
            <div className="sticky top-24">
              <div className="relative overflow-hidden rounded-3xl bg-slate-900/50 backdrop-blur-sm">
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={PROJECTS[activeProject].image}
                    alt={PROJECTS[activeProject].name}
                    className="object-cover w-full h-full transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: `linear-gradient(135deg, ${PROJECTS[activeProject].gradient[0]}, ${PROJECTS[activeProject].gradient[1]})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-4xl font-bold text-white">
                      {PROJECTS[activeProject].name}
                    </h3>
                    <span className="font-mono text-sm text-slate-600">
                      {String(activeProject + 1).padStart(2, '0')} /{' '}
                      {String(PROJECTS.length).padStart(2, '0')}
                    </span>
                  </div>

                  <p className="mb-6 text-lg text-slate-400">
                    {PROJECTS[activeProject].description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {PROJECTS[activeProject].tech.map((tech: string, idx: number) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-slate-800/50 text-slate-300"
                      >
                        <span className="text-base">{techIcons[tech] ?? "⚡"}</span>
                        <span className="capitalize">{tech}</span>
                      </span>
                    ))}
                  </div>

                  {/* Visit Button */}
                  <a
                    href={PROJECTS[activeProject].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white transition-all rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/50"
                  >
                    <span>View Live Project</span>
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>

                {/* Glow effect */}
                <div
                  className="absolute inset-0 opacity-50 pointer-events-none rounded-3xl"
                  style={{
                    boxShadow: `0 0 80px ${PROJECTS[activeProject].gradient[0]}40`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right: Project List */}
          <div className="space-y-2">
            {PROJECTS.map((project, index) => (
              <div
                key={index}
                onMouseEnter={() => setActiveProject(index)}
                className={`relative overflow-hidden transition-all duration-500 ease-out rounded-xl cursor-pointer group ${
                  activeProject === index
                    ? 'bg-slate-800/60 scale-[1.02]'
                    : 'bg-slate-900/30 hover:bg-slate-800/40 hover:scale-[1.01]'
                }`}
              >
                {/* Gradient background */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    activeProject === index
                      ? 'opacity-10'
                      : 'opacity-0 group-hover:opacity-5'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
                  }}
                />

                <div className="relative grid gap-3 p-3 md:grid-cols-3">
                  {/* Small thumbnail */}
                  <div className="relative overflow-hidden rounded-lg aspect-video">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 transition-opacity duration-500 opacity-40 group-hover:opacity-50"
                      style={{
                        background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col justify-center md:col-span-2">
                    <div className="flex items-center justify-between mb-1">
                      <h4
                        className={`text-base font-bold transition-colors duration-300 ${
                          activeProject === index
                            ? 'text-white'
                            : 'text-slate-300 group-hover:text-white'
                        }`}
                      >
                        {project.name}
                      </h4>
                      <span className="font-mono text-xs text-slate-600">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <p
                      className={`text-xs leading-relaxed transition-colors duration-300 ${
                        activeProject === index
                          ? 'text-slate-300'
                          : 'text-slate-500 group-hover:text-slate-400'
                      }`}
                    >
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Active indicator */}
                {activeProject === index && (
                  <div
                    className="absolute top-0 bottom-0 left-0 w-1 transition-opacity duration-300 rounded-r-full"
                    style={{
                      background: `linear-gradient(to bottom, ${project.gradient[0]}, ${project.gradient[1]})`,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
