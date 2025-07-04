import { getProjects, getProject, createProject, updateProject, deleteProject } from '@/lib/api'

// Mock fetch globally
global.fetch = jest.fn()

describe('API Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getProjects', () => {
    it('should fetch projects successfully', async () => {
      const mockProjects = [
        {
          id: 1,
          title: 'Test Project',
          description: 'Test Description',
          techStack: ['React', 'TypeScript'],
          githubUrl: 'https://github.com/test',
          demoUrl: 'https://demo.test',
          images: []
        }
      ]

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProjects
      })

      const result = await getProjects()
      expect(result).toEqual(mockProjects)
      expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/projects')
    })

    it('should return empty array on error', async () => {
      ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

      const result = await getProjects()
      expect(result).toEqual([])
    })
  })

  describe('getProject', () => {
    it('should fetch a single project successfully', async () => {
      const mockProject = {
        id: 1,
        title: 'Test Project',
        description: 'Test Description',
        techStack: ['React', 'TypeScript'],
        githubUrl: 'https://github.com/test',
        demoUrl: 'https://demo.test',
        images: []
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProject
      })

      const result = await getProject(1)
      expect(result).toEqual(mockProject)
      expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/projects/1')
    })

    it('should return null on error', async () => {
      ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

      const result = await getProject(1)
      expect(result).toBeNull()
    })
  })

  describe('createProject', () => {
    it('should create a project successfully', async () => {
      const newProject = {
        title: 'New Project',
        description: 'New Description',
        techStack: ['React', 'TypeScript'],
        githubUrl: 'https://github.com/new',
        demoUrl: 'https://demo.new',
        images: []
      }

      const createdProject = { id: 2, ...newProject }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => createdProject
      })

      const result = await createProject(newProject)
      expect(result).toEqual(createdProject)
      expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      })
    })
  })

  describe('updateProject', () => {
    it('should update a project successfully', async () => {
      const updatedProject = {
        id: 1,
        title: 'Updated Project',
        description: 'Updated Description',
        techStack: ['React', 'TypeScript'],
        githubUrl: 'https://github.com/updated',
        demoUrl: 'https://demo.updated',
        images: []
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => updatedProject
      })

      const result = await updateProject(1, updatedProject)
      expect(result).toEqual(updatedProject)
      expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/projects/1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProject),
      })
    })
  })

  describe('deleteProject', () => {
    it('should delete a project successfully', async () => {
      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true
      })

      const result = await deleteProject(1)
      expect(result).toBe(true)
      expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/projects/1', {
        method: 'DELETE',
      })
    })

    it('should return false on error', async () => {
      ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

      const result = await deleteProject(1)
      expect(result).toBe(false)
    })
  })
}) 