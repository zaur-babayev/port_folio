import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { projects } from '../../data/projects';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, use a proper authentication system
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
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

      // Show success message
      alert('Project deleted successfully!');
      
      // Refresh the page to show updated list
      window.location.reload();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert(error instanceof Error ? error.message : 'Failed to delete project');
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="px-4 py-2 border rounded"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-black text-white rounded"
            >
              Login
            </button>
          </form>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-light">Portfolio Admin</h1>
          <button
            onClick={() => router.push('/admin/projects/new')}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Add New Project
          </button>
        </div>

        <div className="grid gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between p-6 border rounded-lg"
            >
              <div>
                <p className="text-sm opacity-50 mb-1">#{project.number}</p>
                <h2 className="text-xl mb-2">{project.title}</h2>
                <p className="opacity-70">{project.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => router.push(`/admin/projects/${project.id}`)}
                  className="px-4 py-2 border rounded hover:bg-black hover:text-white transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="px-4 py-2 border rounded hover:bg-black hover:text-white transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
