'use client'

import { useState, useEffect } from 'react'
import { ContactSubmission } from '@/lib/supabase'

interface AdminPageProps {}

interface SubmissionsResponse {
  success: boolean
  data?: ContactSubmission[]
  error?: string
}

export default function AdminLeadsPage({}: AdminPageProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setIsAuthenticated(true)
        fetchSubmissions()
      } else {
        setError('Invalid password')
      }
    } catch (err) {
      setError('Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const fetchSubmissions = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/submissions', {
        headers: {
          'Authorization': `Bearer ${password}`
        }
      })

      const result: SubmissionsResponse = await response.json()

      if (response.ok && result.success && result.data) {
        setSubmissions(result.data)
      } else {
        setError(result.error || 'Failed to fetch submissions')
      }
    } catch (err) {
      setError('Failed to fetch submissions')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'emailed': return 'bg-green-100 text-green-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-yellow-100 text-yellow-800'
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-center mb-6 text-primary-900">
            Admin Access
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-primary-700 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-accent-600 focus:border-accent-600"
                placeholder="Enter admin password"
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-900 text-white py-3 px-4 rounded-lg hover:bg-primary-800 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-primary-900">Contact Form Submissions</h1>
            <div className="flex gap-4">
              <button
                onClick={fetchSubmissions}
                disabled={loading}
                className="bg-accent-600 text-white px-4 py-2 rounded-lg hover:bg-accent-700 disabled:opacity-50"
              >
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="bg-neutral-600 text-white px-4 py-2 rounded-lg hover:bg-neutral-700"
              >
                Logout
              </button>
            </div>
          </div>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {error}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {submissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      {formatDate(submission.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                      {submission.full_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      <a href={`mailto:${submission.email}`} className="text-accent-600 hover:text-accent-800">
                        {submission.email}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      {submission.service_needed || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(submission.status)}`}>
                        {submission.status || 'new'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedSubmission(submission)}
                        className="text-accent-600 hover:text-accent-800"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {submissions.length === 0 && !loading && (
            <div className="text-center py-12 text-neutral-500">
              No submissions found
            </div>
          )}
        </div>

        {/* Modal for viewing submission details */}
        {selectedSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-primary-900">Submission Details</h2>
                  <button
                    onClick={() => setSelectedSubmission(null)}
                    className="text-neutral-400 hover:text-neutral-600 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Full Name</label>
                      <div className="mt-1 text-sm text-neutral-900">{selectedSubmission.full_name}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Email</label>
                      <div className="mt-1 text-sm text-neutral-900">
                        <a href={`mailto:${selectedSubmission.email}`} className="text-accent-600 hover:text-accent-800">
                          {selectedSubmission.email}
                        </a>
                      </div>
                    </div>
                    {selectedSubmission.phone && (
                      <div>
                        <label className="block text-sm font-medium text-neutral-700">Phone</label>
                        <div className="mt-1 text-sm text-neutral-900">
                          <a href={`tel:${selectedSubmission.phone}`} className="text-accent-600 hover:text-accent-800">
                            {selectedSubmission.phone}
                          </a>
                        </div>
                      </div>
                    )}
                    {selectedSubmission.company && (
                      <div>
                        <label className="block text-sm font-medium text-neutral-700">Company</label>
                        <div className="mt-1 text-sm text-neutral-900">{selectedSubmission.company}</div>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Service Needed</label>
                      <div className="mt-1 text-sm text-neutral-900">{selectedSubmission.service_needed || 'N/A'}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700">Status</label>
                      <div className="mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedSubmission.status)}`}>
                          {selectedSubmission.status || 'new'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700">Project Details</label>
                    <div className="mt-1 text-sm text-neutral-900 bg-neutral-50 p-4 rounded-lg whitespace-pre-wrap">
                      {selectedSubmission.project_details}
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">Metadata</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700">Submitted</label>
                        <div className="mt-1 text-neutral-900">{formatDate(selectedSubmission.created_at)}</div>
                      </div>
                      {selectedSubmission.ip && (
                        <div>
                          <label className="block text-sm font-medium text-neutral-700">IP Address</label>
                          <div className="mt-1 text-neutral-900">{selectedSubmission.ip}</div>
                        </div>
                      )}
                      {selectedSubmission.page_url && (
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-neutral-700">Page URL</label>
                          <div className="mt-1 text-neutral-900">
                            <a href={selectedSubmission.page_url} target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:text-accent-800 break-all">
                              {selectedSubmission.page_url}
                            </a>
                          </div>
                        </div>
                      )}
                      {selectedSubmission.user_agent && (
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-neutral-700">User Agent</label>
                          <div className="mt-1 text-neutral-900 text-xs break-all">{selectedSubmission.user_agent}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
