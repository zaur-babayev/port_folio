import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import ImageUpload from '../../../components/ImageUpload';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { projects } from '../../../data/projects';
import { Project, ProjectCategory, ProjectSection, ProjectFeatured } from '../../../data/types';

const emptyProject: Project = {
  id: '',
  number: '',
  title: '',
  category: ProjectCategory.All,
  image: '',
  description: '',
  content: '',
  details: {
    year: new Date().getFullYear().toString(),
    role: '',
    team: []
  },
  sections: [],
  images: [],
  featured: undefined
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
        if (id === 'new') {
          setProject(emptyProject);
          return;
        }

        const response = await fetch(`/api/projects/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch project: ${response.statusText}`);
        }
        const data = await response.json();
        setProject(data);
        setTeamMembers(data.details?.team || []);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
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
    setError('');
    setSuccess('');

    if (!project) return;

    try {
      const projectToSave = {
        ...project,
        id: id === 'new' ? Date.now().toString() : project.id,
        details: {
          ...project.details,
          team: teamMembers
        }
      };

      const response = await fetch('/api/projects/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectToSave),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to save project');
      }

      setSuccess('Project saved successfully');
      
      if (id === 'new') {
        router.push('/admin/projects/' + projectToSave.id);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  if (isLoading || !project) {
    return (
      <div className="min-h-screen bg-white">
        <div className="border-b">
          <div className="container mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32">
            <div className="h-16 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/admin')}
                  className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Admin Panel
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-12">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-8 sm:py-12">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {/* Header with Title */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="w-[calc(100vw-32px)] sm:w-auto max-w-full">
                  <h1 className="text-2xl sm:text-3xl font-light truncate">
                    {id === 'new' ? 'New Project' : project?.title || 'Loading...'}
                  </h1>
                  <div className="mt-1 text-sm text-gray-500 break-all">
                    {id === 'new' ? '' : project?.title || ''}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => router.back()}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : 'Save Project'}
                  </button>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-sm font-medium">Title</span>
                    <input
                      type="text"
                      value={project?.title || ''}
                      onChange={(e) => setProject({ ...project, title: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium">Category</span>
                    <select
                      value={project?.category || ProjectCategory.All}
                      onChange={(e) => setProject({ ...project, category: e.target.value as ProjectCategory })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select Category</option>
                      {Object.values(ProjectCategory).filter(cat => cat !== 'All').map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="space-y-4">
                  <label className="block">
                    <span className="text-sm font-medium">Year</span>
                    <input
                      type="text"
                      value={project.details.year}
                      onChange={(e) => setProject({
                        ...project,
                        details: { ...project.details, year: e.target.value }
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium">Role</span>
                    <input
                      type="text"
                      value={project.details.role}
                      onChange={(e) => setProject({
                        ...project,
                        details: { ...project.details, role: e.target.value }
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </label>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block">
                  <span className="text-sm font-medium">Description</span>
                  <textarea
                    value={project.description}
                    onChange={(e) => setProject({ ...project, description: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </label>
              </div>

              {/* Team Members */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Team Members</h3>
                  <button
                    onClick={addTeamMember}
                    className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add Member
                  </button>
                </div>
                <div className="space-y-4">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="p-4 border rounded-md">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Name"
                          value={member.name}
                          onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Role"
                          value={member.role}
                          onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="URL (optional)"
                          value={member.url || ''}
                          onChange={(e) => updateTeamMember(index, 'url', e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => removeTeamMember(index)}
                          className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Featured On</h3>
                  <button
                    onClick={() => {
                      if (project.featured) {
                        // Remove featured section
                        const { featured, ...rest } = project;
                        setProject({ ...rest, featured: undefined });
                      } else {
                        // Add featured section
                        setProject({
                          ...project,
                          featured: {
                            url: '',
                            platform: '',
                            publication: '',
                            type: '',
                            label: ''
                          }
                        });
                      }
                    }}
                    className={`px-4 py-2 rounded-md text-sm ${
                      project.featured
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {project.featured ? 'Remove Featured' : 'Add Featured'}
                  </button>
                </div>
                {project.featured && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className="block">
                        <span className="text-sm font-medium">URL</span>
                        <input
                          type="text"
                          value={project.featured.url || ''}
                          onChange={(e) => setProject({
                            ...project,
                            featured: { ...project.featured!, url: e.target.value }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </label>
                      <label className="block">
                        <span className="text-sm font-medium">Platform</span>
                        <input
                          type="text"
                          value={project.featured.platform || ''}
                          onChange={(e) => setProject({
                            ...project,
                            featured: { ...project.featured!, platform: e.target.value }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </label>
                      <label className="block">
                        <span className="text-sm font-medium">Publication</span>
                        <input
                          type="text"
                          value={project.featured.publication || ''}
                          onChange={(e) => setProject({
                            ...project,
                            featured: { ...project.featured!, publication: e.target.value }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </label>
                      <label className="block">
                        <span className="text-sm font-medium">Type</span>
                        <input
                          type="text"
                          value={project.featured.type || ''}
                          onChange={(e) => setProject({
                            ...project,
                            featured: { ...project.featured!, type: e.target.value }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </label>
                      <label className="block">
                        <span className="text-sm font-medium">Label</span>
                        <input
                          type="text"
                          value={project.featured.label || ''}
                          onChange={(e) => setProject({
                            ...project,
                            featured: { ...project.featured!, label: e.target.value }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Project Sections */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Project Sections</h3>
                  <button
                    onClick={() => {
                      const newSection: ProjectSection = {
                        title: '',
                        content: [],
                        images: [],
                        layout: 'single'
                      };
                      setProject({
                        ...project,
                        sections: [...(project.sections || []), newSection]
                      });
                    }}
                    className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Add Section
                  </button>
                </div>
                <div className="space-y-6">
                  {project.sections?.map((section, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-lg font-medium">Section {index + 1}</h4>
                        <button
                          onClick={() => {
                            const newSections = project.sections?.filter((_, i) => i !== index) || [];
                            setProject({ ...project, sections: newSections });
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove Section
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <label className="block">
                          <span className="text-sm font-medium">Title</span>
                          <input
                            type="text"
                            value={section.title || ''}
                            onChange={(e) => {
                              const newSections = [...(project.sections || [])];
                              newSections[index] = { ...section, title: e.target.value };
                              setProject({ ...project, sections: newSections });
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </label>

                        <label className="block">
                          <span className="text-sm font-medium">Layout</span>
                          <select
                            value={section.layout || 'single'}
                            onChange={(e) => {
                              const newSections = [...(project.sections || [])];
                              newSections[index] = { ...section, layout: e.target.value as 'single' | 'grid' | 'fullwidth' | 'sideBySide' };
                              setProject({ ...project, sections: newSections });
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          >
                            <option value="single">Single</option>
                            <option value="grid">Grid</option>
                            <option value="fullwidth">Full Width</option>
                            <option value="sideBySide">Side by Side</option>
                          </select>
                        </label>

                        <div>
                          <span className="text-sm font-medium">Content</span>
                          <div className="mt-1">
                            <ReactQuill
                              value={Array.isArray(section.content) ? section.content.map(c => typeof c === 'string' ? c : c.content).join('\n') : ''}
                              onChange={(content) => {
                                const newSections = [...(project.sections || [])];
                                newSections[index] = { ...section, content: [content] };
                                setProject({ ...project, sections: newSections });
                              }}
                              modules={modules}
                              formats={formats}
                              className="h-48 bg-white rounded-md"
                            />
                          </div>
                        </div>

                        <div>
                          <span className="text-sm font-medium">Section Images</span>
                          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ImageUpload
                              projectId={project.id}
                              onUpload={(url) => {
                                const newSections = [...(project.sections || [])];
                                const newImages = [...(section.images || []), { src: url }];
                                newSections[index] = { ...section, images: newImages };
                                setProject({ ...project, sections: newSections });
                              }}
                              className="aspect-video w-full rounded-lg border-2 border-dashed border-gray-300 p-4 hover:border-blue-500 transition-colors"
                            />
                            {section.images?.map((image, imageIndex) => (
                              <div key={imageIndex} className="relative aspect-video group">
                                <img
                                  src={image.src}
                                  alt={image.alt || `Section ${index + 1} image ${imageIndex + 1}`}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                                <button
                                  onClick={() => {
                                    const newSections = [...(project.sections || [])];
                                    const newImages = section.images?.filter((_, i) => i !== imageIndex) || [];
                                    newSections[index] = { ...section, images: newImages };
                                    setProject({ ...project, sections: newSections });
                                  }}
                                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  ×
                                </button>
                                <input
                                  type="text"
                                  placeholder="Image caption"
                                  value={image.caption || ''}
                                  onChange={(e) => {
                                    const newSections = [...(project.sections || [])];
                                    const newImages = [...(section.images || [])];
                                    newImages[imageIndex] = { ...image, caption: e.target.value };
                                    newSections[index] = { ...section, images: newImages };
                                    setProject({ ...project, sections: newSections });
                                  }}
                                  className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-white/80 rounded text-sm"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rich Text Editor */}
              <div>
                <label className="block">
                  <span className="text-sm font-medium">Content</span>
                  <div className="mt-1 prose max-w-none">
                    <ReactQuill
                      value={project.content}
                      onChange={(content) => setProject({ ...project, content })}
                      modules={modules}
                      formats={formats}
                      className="h-64 sm:h-96 bg-white rounded-md"
                    />
                  </div>
                </label>
              </div>

              {/* Image Upload */}
              <div>
                <h3 className="text-lg font-medium mb-4">Project Images</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <ImageUpload
                    projectId={project.id}
                    onUpload={(url) => {
                      const newImages = [...(project.images || [])];
                      newImages.push(url);
                      setProject({ ...project, images: newImages });
                    }}
                    className="aspect-video w-full rounded-lg border-2 border-dashed border-gray-300 p-4 hover:border-blue-500 transition-colors"
                  />
                  {project.images?.map((image, index) => (
                    <div key={index} className="relative aspect-video group">
                      <img
                        src={image}
                        alt={`Project image ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        onClick={() => {
                          const newImages = project.images?.filter((_, i) => i !== index) || [];
                          setProject({ ...project, images: newImages });
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <div className="sticky bottom-0 bg-white border-t py-4 px-4 -mx-4">
                <div className="flex justify-end space-x-4 max-w-4xl mx-auto">
                  <button
                    onClick={() => router.back()}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : 'Save Project'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
