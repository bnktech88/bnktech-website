import { notFound } from 'next/navigation'
import Link from 'next/link'
import { generateSEO } from '@/lib/seo'
import { projects } from '@/content/projects'
import ProjectDetail from '@/components/sections/ProjectDetail'
import NextProject from '@/components/sections/NextProject'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const project = projects.find(p => p.slug === slug)
  
  if (!project) {
    return generateSEO({
      title: 'Project Not Found',
      noIndex: true
    })
  }

  return generateSEO({
    title: project.title,
    description: project.summary,
    url: `/work/${project.slug}`,
    keywords: `${project.category}, ${project.technologies.join(', ')}, web development, technology solutions`
  })
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = projects.find(p => p.slug === slug)
  
  if (!project) {
    notFound()
  }

  const currentIndex = projects.findIndex(p => p.slug === slug)
  const nextProject = projects[currentIndex + 1] || projects[0]

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <section className="py-8 bg-grey-50 border-b border-grey-200">
        <div className="container">
          <nav className="flex items-center space-x-2 text-sm text-grey-600">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/work" className="hover:text-black transition-colors">
              Work
            </Link>
            <span>/</span>
            <span className="text-black">{project.title}</span>
          </nav>
        </div>
      </section>

      {/* Project Header */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-grey-600 bg-grey-100 px-3 py-1 rounded-full">
                {project.category}
              </span>
              <span className="text-sm text-grey-500">{project.year}</span>
              <span className="text-sm text-grey-500">•</span>
              <span className="text-sm text-grey-500">{project.client}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-balance">
              {project.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-grey-700 mb-8 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span 
                  key={tech}
                  className="text-sm font-medium text-grey-700 bg-grey-100 px-3 py-2 rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Image Placeholder */}
      <section className="py-12 bg-grey-100">
        <div className="container">
          <div className="aspect-video bg-gradient-to-br from-grey-200 to-grey-300 rounded-lg flex items-center justify-center">
            <div className="text-grey-600 text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-grey-400 rounded-lg flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9 9h6v6H9z" fill="currentColor"/>
                </svg>
              </div>
              <p className="text-lg font-medium">{project.title} Preview</p>
              <p className="text-sm text-grey-500 mt-1">{project.category} Project</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <ProjectDetail project={project} />

      {/* Next Project */}
      <NextProject project={nextProject} />
    </div>
  )
}
