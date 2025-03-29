"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { ICPDetailView } from "@/components/icp-detail-view"

interface ICP {
  id: number
  name: string
  industry: string
  companySize: string
  personaTitle: string
  personaResponsibilities: string
  painPoints: string
  goals: string
  challenges: string
  createdAt: string
  updatedAt: string | null
  isFavorite?: boolean
}

export default function ICPDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [icp, setIcp] = useState<ICP | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchICP = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch(`http://localhost:8000/api/v1/icp/icps/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch ICP")
        }

        const data = await response.json()
        setIcp(data)
      } catch (error) {
        console.error("Error fetching ICP:", error)
        toast.error("Failed to load ICP details")
      } finally {
        setIsLoading(false)
      }
    }

    fetchICP()
  }, [params.id])

  const handleDelete = async () => {
    if (!icp) return

    if (!confirm("Are you sure you want to delete this ICP? This action cannot be undone.")) {
      return
    }

    setIsDeleting(true)
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:8000/api/v1/icp/icps/${params.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete ICP")
      }

      toast.success("ICP deleted successfully")
      router.push("/dashboard")
    } catch (error) {
      console.error("Error deleting ICP:", error)
      toast.error("Failed to delete ICP")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleFavoriteToggle = async () => {
    if (!icp) return

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:8000/api/v1/icp/icps/${params.id}/favorite`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isFavorite: !icp.isFavorite }),
      })

      if (!response.ok) {
        throw new Error("Failed to update favorite status")
      }

      setIcp((prev) => prev ? { ...prev, isFavorite: !prev.isFavorite } : null)
      toast.success(icp.isFavorite ? "Removed from favorites" : "Added to favorites")
    } catch (error) {
      console.error("Error updating favorite status:", error)
      toast.error("Failed to update favorite status")
    }
  }

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2dd4bf]"></div>
        </div>
      </DashboardShell>
    )
  }

  if (!icp) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <h2 className="text-xl font-semibold mb-2">ICP not found</h2>
          <p className="text-gray-400 mb-4">The ICP you're looking for doesn't exist or has been deleted.</p>
          <Button variant="outline" onClick={() => router.push("/dashboard")} className="border-gray-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={icp.name} text="View and manage your ICP details">
        <Button variant="outline" onClick={() => router.push("/dashboard")} className="border-gray-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </DashboardHeader>

      <ICPDetailView
        icp={icp}
        onEdit={() => router.push(`/dashboard/icp/${params.id}/edit`)}
        onDelete={handleDelete}
        onFavoriteToggle={handleFavoriteToggle}
      />
    </DashboardShell>
  )
} 