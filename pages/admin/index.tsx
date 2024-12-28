import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Project } from '../../data/types';
import { projects } from '../../data/projects';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const password = localStorage.getItem('adminPassword');
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminPassword', password);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project? This cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/delete?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete project');
      }

      // Refresh the page to show updated list
      window.location.reload();
      alert('Project deleted successfully!');
    } catch (error) {
      console.error('Error deleting project:', error);
      alert(error instanceof Error ? error.message : 'Failed to delete project');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 p-8">
          <h1 className="text-2xl font-light text-center mb-8">Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <button
            type="submit"
            className="w-full px-4 py-2.5 bg-black text-white rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b">
        <div className="container mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32">
          <div className="h-16 flex items-center justify-between">
            <h1 className="text-xl font-light">Admin Dashboard</h1>
            <button
              onClick={() => router.push('/admin/projects/new')}
              className="px-6 py-2.5 bg-black text-white rounded-md"
            >
              Add New Project
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 2xl:px-32 py-12">
        <div className="overflow-hidden border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project: Project) => (
                <tr key={project.id} className="">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <h2 className="text-sm font-medium text-gray-900">{project.title}</h2>
                      <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => router.push(`/admin/projects/${project.id}`)}
                        className="px-3 py-1.5 border border-gray-300 rounded-md hover:bg-black hover:text-white hover:border-black"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="px-3 py-1.5 border border-gray-300 rounded-md hover:bg-red-600 hover:text-white hover:border-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
