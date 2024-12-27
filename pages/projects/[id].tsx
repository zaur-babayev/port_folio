import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { projects } from '../../data/projects';
import Layout from '../../components/Layout';

export default function ProjectDetail() {
  const router = useRouter();
  const { id } = router.query;
  const project = projects.find(p => p.id === Number(id));

  if (!project) {
    return null;
  }

  return (
    <Layout>
      <Head>
        <title>{project.title} | Zaur Baba</title>
        <meta name="description" content={project.description} />
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Project Content */}
        <div className="container mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 mb-24">
          <div className="grid grid-cols-12 gap-8">
            {/* Project Title and Number */}
            <div className="col-span-12 lg:col-span-4 mb-16 lg:mb-0">
              <div>
                <span className="text-sm tracking-wide opacity-50 block mb-4">{project.number}</span>
                <h1 className="text-4xl font-light mb-6">{project.title}</h1>
                <p className="text-lg leading-relaxed opacity-70 mb-8">
                  {project.description}
                </p>
                {/* Project Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {Object.entries(project.details).map(([key, value]) => (
                    <div key={key} className="border-t border-black/10 pt-4">
                      <p className="text-sm uppercase tracking-wide opacity-50 mb-2">{key}</p>
                      <p className="text-base">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Content */}
            <div className="col-span-12 lg:col-span-8">
              {/* Full Description */}
              <div className="prose prose-lg max-w-none mb-24">
                {project.sections?.map((section, index) => (
                  <div key={index} className="mb-16">
                    {section.title && (
                      <h2 className="text-2xl font-light mb-6">{section.title}</h2>
                    )}
                    {section.content && (
                      <div className="text-lg leading-relaxed opacity-70 space-y-6">
                        {section.content.map((paragraph, pIndex) => (
                          <p key={pIndex}>{paragraph}</p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="container mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32">
          <div className="space-y-24 mb-24">
            {/* Section Images */}
            {project.sections?.map((section, index) => (
              section.image && (
                <div key={`section-image-${index}`}>
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={section.image}
                      alt={section.imageAlt || ''}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500"
                    />
                  </div>
                  {section.imageCaption && (
                    <p className="text-sm tracking-wide opacity-50 mt-4">{section.imageCaption}</p>
                  )}
                </div>
              )
            ))}

            {/* Gallery Images */}
            {project.images.map((image, index) => (
              <div key={`gallery-image-${index}`}>
                <div className="relative aspect-[16/9]">
                  <Image
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Between Projects */}
        <div className="container mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 border-t border-black/10 py-8">
          <div className="flex justify-between items-center">
            {project.id > 1 && (
              <Link href={`/projects/${project.id - 1}`}>
                <span className="text-sm tracking-wide hover:opacity-50 transition-opacity duration-300">
                  Previous Project
                </span>
              </Link>
            )}
            {project.id < projects.length && (
              <Link href={`/projects/${project.id + 1}`}>
                <span className="text-sm tracking-wide hover:opacity-50 transition-opacity duration-300">
                  Next Project
                </span>
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
