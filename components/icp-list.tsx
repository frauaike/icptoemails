"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Edit, MoreHorizontal, Target, Trash2 } from "lucide-react"
import { mockICPs } from "@/lib/mock-data"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ICPList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockICPs.map((icp) => (
        <Card key={icp.id} className="bg-[#111111] rounded-xl border border-gray-800 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#2dd4bf]/20 flex items-center justify-center text-[#2dd4bf]">
                  <Target className="h-4 w-4" />
                </div>
                <CardTitle className="text-lg">{icp.name}</CardTitle>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardDescription className="flex items-center gap-1">
              <Building className="h-3 w-3" />
              {icp.industry} · {icp.companySize}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-xs font-medium text-gray-400">Target Role</p>
                <p className="text-sm text-gray-300">{icp.personaTitle}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-400">Key Pain Points</p>
                <p className="text-sm text-gray-300 line-clamp-2">{icp.painPoints}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <Button variant="outline" size="sm" className="w-full border-gray-800 hover:bg-[#1a1a1a]">
              <Link href={`/dashboard/icp/${icp.id}`} className="w-full">
                View Details
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}

      <Card className="bg-[#1a1a1a] rounded-xl border border-gray-800 border-dashed shadow-sm flex flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="bg-[#2dd4bf]/20 p-3 rounded-full">
            <Target className="h-6 w-6 text-[#2dd4bf]" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Create New ICP</h3>
            <p className="text-sm text-gray-400">Define your ideal customer profile to improve your cold emails.</p>
          </div>
          <Button asChild className="bg-[#2dd4bf] hover:bg-[#14b8a6] text-black">
            <Link href="/dashboard/icp/new">Create ICP</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}

