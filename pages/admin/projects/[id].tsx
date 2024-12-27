import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import ImageUpload from '../../../components/ImageUpload';
import { projects } from '../../../data/projects';
import { Project } from '../../../data/types';

const emptyProject: Project = {
  id: '',
  number: '',
  title: '',
  year: new Date().getFullYear().toString(),
  category: '',
  image: '',
  description: '',
  details: {
    location: '',
    year: new Date().getFullYear().toString(),
    status: 'In Progress',
    area: '',
    client: '',
    architect: 'Zaur Baba'
  },
  sections: [],
  images: []
};

export default function EditProject() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    if (id === 'new') {
      const timestamp = Date.now();
      setProject({
        ...emptyProject,
        id: timestamp.toString(),
        number: String(projects.length + 1).padStart(3, '0'),
      });
    } else {
      const existingProject = projects.find(p => p.id === id);
      setProject(existingProject || null);
    }
  }, [id]);

  const handleSave = async () => {
    if (!project) return;

    try {
      setIsLoading(true);
      const response = await fetch('/api/projects/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save project');
      }

      // Show success message
      alert('Project saved successfully!');
      
      // Redirect to admin page
      router.push('/admin');
    } catch (error) {
      console.error('Error saving project:', error);
      alert(error instanceof Error ? error.message : 'Failed to save project');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !project) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-light">
            {id === 'new' ? 'New Project' : 'Edit Project'}
          </h1>
          <div className="space-x-4">
            <button
              onClick={() => router.push('/admin')}
              className="px-4 py-2 border rounded hover:bg-black hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-black text-white rounded"
            >
              Save Project
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Basic Info */}
          <section className="space-y-4">
            <h2 className="text-xl font-light">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <p className="text-sm opacity-50 mb-2">Cover Image</p>
                <ImageUpload
                  projectId={project.id}
                  onUpload={(url) => setProject({ ...project, image: url })}
                  currentImage={project.image}
                />
              </div>
              <input
                type="text"
                value={project.title}
                onChange={(e) => setProject({ ...project, title: e.target.value })}
                placeholder="Project Title"
                className="px-4 py-2 border rounded"
              />
              <input
                type="text"
                value={project.category}
                onChange={(e) => setProject({ ...project, category: e.target.value })}
                placeholder="Category"
                className="px-4 py-2 border rounded"
              />
              <input
                type="text"
                value={project.description}
                onChange={(e) => setProject({ ...project, description: e.target.value })}
                placeholder="Description"
                className="px-4 py-2 border rounded"
              />
              <input
                type="text"
                value={project.year}
                onChange={(e) => setProject({ ...project, year: e.target.value })}
                placeholder="Year"
                className="px-4 py-2 border rounded"
              />
            </div>
          </section>

          {/* Details */}
          <section className="space-y-4">
            <h2 className="text-xl font-light">Project Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(project.details).map(([key, value]) => (
                <input
                  key={key}
                  type="text"
                  value={value}
                  onChange={(e) => setProject({
                    ...project,
                    details: { ...project.details, [key]: e.target.value }
                  })}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  className="px-4 py-2 border rounded"
                />
              ))}
            </div>
          </section>

          {/* Sections */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-light">Sections</h2>
              <button
                onClick={() => setProject({
                  ...project,
                  sections: [
                    ...(project.sections || []),
                    {
                      title: '',
                      content: [''],
                      images: [],
                      layout: 'single'
                    }
                  ]
                })}
                className="px-4 py-2 border rounded hover:bg-black hover:text-white transition-colors"
              >
                Add Section
              </button>
            </div>
            
            <div className="space-y-6">
              {project.sections?.map((section, sectionIndex) => (
                <div key={sectionIndex} className="border p-6 rounded-lg space-y-4">
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => {
                      const newSections = [...(project.sections || [])];
                      newSections[sectionIndex] = {
                        ...section,
                        title: e.target.value
                      };
                      setProject({ ...project, sections: newSections });
                    }}
                    placeholder="Section Title"
                    className="w-full px-4 py-2 border rounded"
                  />
                  
                  <div className="space-y-2">
                    {section.content?.map((paragraph, pIndex) => (
                      <textarea
                        key={pIndex}
                        value={paragraph}
                        onChange={(e) => {
                          const newSections = [...(project.sections || [])];
                          if (newSections[sectionIndex].content) {
                            newSections[sectionIndex].content[pIndex] = e.target.value;
                          }
                          setProject({ ...project, sections: newSections });
                        }}
                        placeholder="Paragraph content"
                        className="w-full px-4 py-2 border rounded"
                        rows={3}
                      />
                    ))}
                    <button
                      onClick={() => {
                        const newSections = [...(project.sections || [])];
                        if (newSections[sectionIndex].content) {
                          newSections[sectionIndex].content.push('');
                        }
                        setProject({ ...project, sections: newSections });
                      }}
                      className="text-sm underline opacity-50 hover:opacity-100"
                    >
                      Add Paragraph
                    </button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm opacity-50">Layout</p>
                    <select
                      value={section.layout}
                      onChange={(e) => {
                        const newSections = [...(project.sections || [])];
                        newSections[sectionIndex] = {
                          ...section,
                          layout: e.target.value as any
                        };
                        setProject({ ...project, sections: newSections });
                      }}
                      className="w-full px-4 py-2 border rounded"
                    >
                      <option value="single">Single</option>
                      <option value="grid">Grid</option>
                      <option value="sideBySide">Side by Side</option>
                      <option value="fullwidth">Full Width</option>
                    </select>
                  </div>

                  <div>
                    <p className="text-sm opacity-50 mb-2">Images</p>
                    {section.images?.map((image, imgIndex) => (
                      <div key={imgIndex} className="space-y-4 mb-8">
                        <ImageUpload
                          projectId={project.id}
                          section={`section-${sectionIndex}`}
                          onUpload={(url) => {
                            const newSections = [...(project.sections || [])];
                            if (newSections[sectionIndex].images) {
                              newSections[sectionIndex].images[imgIndex] = {
                                ...image,
                                src: url
                              };
                            }
                            setProject({ ...project, sections: newSections });
                          }}
                          currentImage={image.src}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={image.alt}
                            onChange={(e) => {
                              const newSections = [...(project.sections || [])];
                              if (newSections[sectionIndex].images) {
                                newSections[sectionIndex].images[imgIndex] = {
                                  ...image,
                                  alt: e.target.value
                                };
                              }
                              setProject({ ...project, sections: newSections });
                            }}
                            placeholder="Alt text"
                            className="px-4 py-2 border rounded"
                          />
                          <input
                            type="text"
                            value={image.caption}
                            onChange={(e) => {
                              const newSections = [...(project.sections || [])];
                              if (newSections[sectionIndex].images) {
                                newSections[sectionIndex].images[imgIndex] = {
                                  ...image,
                                  caption: e.target.value
                                };
                              }
                              setProject({ ...project, sections: newSections });
                            }}
                            placeholder="Caption"
                            className="px-4 py-2 border rounded"
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newSections = [...(project.sections || [])];
                        if (!newSections[sectionIndex].images) {
                          newSections[sectionIndex].images = [];
                        }
                        newSections[sectionIndex].images.push({
                          src: '',
                          alt: '',
                          caption: ''
                        });
                        setProject({ ...project, sections: newSections });
                      }}
                      className="text-sm underline opacity-50 hover:opacity-100"
                    >
                      Add Image
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      const newSections = project.sections?.filter((_, i) => i !== sectionIndex) || [];
                      setProject({ ...project, sections: newSections });
                    }}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Delete Section
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Gallery Images */}
          <section className="space-y-4">
            <h2 className="text-xl font-light">Gallery Images</h2>
            <div className="grid grid-cols-1 gap-8">
              {project.images?.map((image, index) => (
                <div key={index} className="space-y-4">
                  <ImageUpload
                    projectId={project.id}
                    onUpload={(url) => {
                      const newImages = [...(project.images || [])];
                      newImages[index] = url;
                      setProject({ ...project, images: newImages });
                    }}
                    currentImage={image}
                  />
                  <button
                    onClick={() => {
                      const newImages = project.images?.filter((_, i) => i !== index) || [];
                      setProject({ ...project, images: newImages });
                    }}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Remove Image
                  </button>
                </div>
              ))}
              <button
                onClick={() => setProject({
                  ...project,
                  images: [...(project.images || []), '']
                })}
                className="text-sm underline opacity-50 hover:opacity-100"
              >
                Add Gallery Image
              </button>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
