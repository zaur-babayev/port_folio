import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import ImageUpload from '../../../components/ImageUpload';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { projects } from '../../../data/projects';
import { Project, ProjectCategory } from '../../../data/types';

const emptyProject: Project = {
  id: '',
  number: '',
  title: '',
  year: new Date().getFullYear().toString(),
  category: '',
  image: '',
  description: '',
  details: {
    year: new Date().getFullYear().toString(),
    role: '',
    team: []
  },
  sections: [],
  images: [],
  featured: null
};

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const modules = {
  toolbar: [
    // Text styling
    ['bold', 'italic', 'underline', 'strike'],
    
    // Lists
    [{ 'list': 'bullet' }, { 'list': 'ordered' }],
    
    // Indentation
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    
    // Headers
    [{ 'header': [1, 2, 3, false] }],
    
    // Text alignment
    [{ 'align': [] }],
    
    // Links and clean formatting
    ['link', 'clean']
  ]
};

const formats = [
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet', 'indent',
  'header',
  'align',
  'link'
];

export default function EditProject() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState<Array<{ name: string; role: string; url?: string }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch project: ${response.statusText}`);
        }
        const data = await response.json();
        setProject(data);
        setTeamMembers(data.details?.team || []);
      } catch (error) {
        console.error('Error fetching project:', error);
        setError('Failed to fetch project');
      }
    };

    fetchProject();
  }, [id]);

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: '', role: '', url: '' }]);
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const updateTeamMember = (index: number, field: 'name' | 'role' | 'url', value: string) => {
    const updatedTeamMembers = [...teamMembers];
    updatedTeamMembers[index] = { ...updatedTeamMembers[index], [field]: value };
    setTeamMembers(updatedTeamMembers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project || !id) return;

    try {
      setIsLoading(true);
      const updatedProject = {
        ...project,
        details: {
          ...project.details,
          team: teamMembers
        }
      };

      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProject),
      });

      if (!response.ok) {
        throw new Error(`Failed to update project: ${response.statusText}`);
      }

      const data = await response.json();
      setProject(data);
      setIsLoading(false);
      setSuccess('Project saved successfully!');
      setError(null);
    } catch (error) {
      console.error('Error updating project:', error);
      setError(error instanceof Error ? error.message : 'Failed to update project');
      setSuccess(null);
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
      <div className="container mx-auto px-6 py-24">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}
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
              onClick={handleSubmit}
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
              <div className="mb-6">
                <label className="block mb-2 text-sm">Category</label>
                <select
                  value={project.category}
                  onChange={(e) => setProject({ ...project, category: e.target.value as ProjectCategory })}
                  className="w-full p-2 border rounded"
                >
                  {Object.values(ProjectCategory).filter(cat => cat !== 'All').map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                value={project.description}
                onChange={(e) => setProject({ ...project, description: e.target.value })}
                placeholder="Project Description"
                className="px-4 py-2 border rounded md:col-span-2"
              />
            </div>
          </section>

          {/* Featured Publication */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-light">Featured Publication</h2>
              <button
                onClick={() => {
                  if (project.featured) {
                    const { featured, ...rest } = project;
                    setProject(rest);
                  } else {
                    setProject({
                      ...project,
                      featured: {
                        url: '',
                        platform: '',
                        publication: '',
                        type: '',
                        label: 'Published in'
                      }
                    });
                  }
                }}
                className="text-sm px-3 py-1.5 border rounded hover:bg-black hover:text-white transition-colors"
              >
                {project.featured ? 'Remove Featured' : 'Add Featured'}
              </button>
            </div>
            
            {project.featured && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="url"
                  value={project.featured.url}
                  onChange={(e) => setProject({
                    ...project,
                    featured: { ...project.featured!, url: e.target.value }
                  })}
                  placeholder="Publication URL"
                  className="px-4 py-2 border rounded md:col-span-2"
                />
                <input
                  type="text"
                  value={project.featured.platform}
                  onChange={(e) => setProject({
                    ...project,
                    featured: { ...project.featured!, platform: e.target.value }
                  })}
                  placeholder="Platform (e.g., Medium)"
                  className="px-4 py-2 border rounded"
                />
                <input
                  type="text"
                  value={project.featured.publication}
                  onChange={(e) => setProject({
                    ...project,
                    featured: { ...project.featured!, publication: e.target.value }
                  })}
                  placeholder="Publication Name (e.g., Design Bootcamp)"
                  className="px-4 py-2 border rounded"
                />
                <input
                  type="text"
                  value={project.featured.type}
                  onChange={(e) => setProject({
                    ...project,
                    featured: { ...project.featured!, type: e.target.value }
                  })}
                  placeholder="Content Type (e.g., Case Study)"
                  className="px-4 py-2 border rounded"
                />
                <input
                  type="text"
                  value={project.featured.label}
                  onChange={(e) => setProject({
                    ...project,
                    featured: { ...project.featured!, label: e.target.value }
                  })}
                  placeholder="Label (e.g., Published in, Featured in)"
                  className="px-4 py-2 border rounded"
                />
              </div>
            )}
          </section>

          {/* Team Members */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Team Members</h3>
              <button
                type="button"
                onClick={addTeamMember}
                className="px-4 py-2 text-sm bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
              >
                Add Team Member
              </button>
            </div>
            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex gap-4 items-start p-4 bg-white rounded-lg border">
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="block text-sm mb-1">Name</label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                        placeholder="Name"
                        className="w-full px-4 py-2 rounded-lg bg-neutral-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Role</label>
                      <input
                        type="text"
                        value={member.role}
                        onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                        placeholder="Role"
                        className="w-full px-4 py-2 rounded-lg bg-neutral-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Profile URL (optional)</label>
                      <input
                        type="url"
                        value={member.url || ''}
                        onChange={(e) => updateTeamMember(index, 'url', e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full px-4 py-2 rounded-lg bg-neutral-100"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeTeamMember(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove team member"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <section className="space-y-4">
            <h2 className="text-xl font-light">Project Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={project.details.year}
                onChange={(e) => setProject({
                  ...project,
                  details: { ...project.details, year: e.target.value }
                })}
                placeholder="Year"
                className="px-4 py-2 border rounded"
              />
              <input
                type="text"
                value={project.details.role}
                onChange={(e) => setProject({
                  ...project,
                  details: { ...project.details, role: e.target.value }
                })}
                placeholder="Role"
                className="px-4 py-2 border rounded"
              />
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
                      <div key={pIndex} className="w-full">
                        <ReactQuill
                          value={paragraph}
                          onChange={(value) => {
                            const newSections = [...(project.sections || [])];
                            if (newSections[sectionIndex].content) {
                              newSections[sectionIndex].content[pIndex] = value;
                            }
                            setProject({ ...project, sections: newSections });
                          }}
                          modules={modules}
                          formats={formats}
                          className="h-32 mb-12"
                        />
                      </div>
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
