"use client"

import { useState, useMemo } from "react"
import { Search, Plus, MoreHorizontal, Eye, Trash2, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data structure
interface Product {
  id: string
  name: string
  price: number
  images: string[]
  stock: number
  category1: string
  category2: string
  pageType: string
  pages: { title: string; content: string }[]
}

// Mock product data
const mockProducts: Product[] = [
  {
    id: "PRD-001",
    name: "Wireless Bluetooth Headphones with Noise Cancellation",
    price: 199.99,
    images: ["/placeholder.svg?height=200&width=200", "/placeholder.svg?height=200&width=200"],
    stock: 45,
    category1: "Electronics",
    category2: "Audio",
    pageType: "simple",
    pages: [
      { title: "Product Overview", content: "High-quality wireless headphones..." },
      { title: "Specifications", content: "Battery: 30 hours, Range: 30ft..." },
    ],
  },
  {
    id: "PRD-002",
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    images: ["/placeholder.svg?height=200&width=200"],
    stock: 0,
    category1: "Clothing",
    category2: "Shirts",
    pageType: "grouped",
    pages: [{ title: "Material Info", content: "100% organic cotton..." }],
  },
  {
    id: "PRD-003",
    name: "JavaScript: The Definitive Guide",
    price: 49.99,
    images: [
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
      "/placeholder.svg?height=200&width=200",
    ],
    stock: 23,
    category1: "Books",
    category2: "Programming",
    pageType: "simple",
    pages: [
      { title: "Table of Contents", content: "Chapter 1: Introduction..." },
      { title: "Author Bio", content: "David Flanagan is a programmer..." },
    ],
  },
  {
    id: "PRD-004",
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    images: ["/placeholder.svg?height=200&width=200"],
    stock: 156,
    category1: "Home",
    category2: "Kitchen",
    pageType: "simple",
    pages: [{ title: "Care Instructions", content: "Hand wash recommended..." }],
  },
  {
    id: "PRD-005",
    name: "Gaming Mechanical Keyboard",
    price: 129.99,
    images: ["/placeholder.svg?height=200&width=200", "/placeholder.svg?height=200&width=200"],
    stock: 12,
    category1: "Electronics",
    category2: "Computers",
    pageType: "grouped",
    pages: [
      { title: "Key Specifications", content: "Cherry MX switches..." },
      { title: "RGB Lighting", content: "16.7 million colors..." },
    ],
  },
]

const categories = ["All Categories", "Electronics", "Clothing", "Books", "Home"]
const pageTypes = ["All Types", "simple", "grouped"]

export default function AdminProductManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All Categories")
  const [pageTypeFilter, setPageTypeFilter] = useState("All Types")
  const [sortField, setSortField] = useState<keyof Product | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const itemsPerPage = 10

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = mockProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "All Categories" || product.category1 === categoryFilter
      const matchesPageType = pageTypeFilter === "All Types" || product.pageType === pageTypeFilter

      return matchesSearch && matchesCategory && matchesPageType
    })

    if (sortField) {
      filtered.sort((a, b) => {
        const aValue = a[sortField]
        const bValue = b[sortField]

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDirection === "asc" ? aValue - bValue : bValue - aValue
        }

        return 0
      })
    }

    return filtered
  }, [searchTerm, categoryFilter, pageTypeFilter, sortField, sortDirection])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage)
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product)
    setCurrentImageIndex(0)
    setIsModalOpen(true)
  }

  const handleDeleteProduct = (productId: string) => {
    // In a real app, this would make an API call
    console.log("Delete product:", productId)
  }

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    } else if (stock < 20) {
      return <Badge variant="secondary">Low Stock</Badge>
    } else {
      return <Badge variant="default">In Stock</Badge>
    }
  }

  const nextImage = () => {
    if (selectedProduct && currentImageIndex < selectedProduct.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    }
  }

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Product Management</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Button className="sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Top Bar Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by product name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={pageTypeFilter} onValueChange={setPageTypeFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Page Type" />
                </SelectTrigger>
                <SelectContent>
                  {pageTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products ({filteredAndSortedProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">
                    <Button variant="ghost" onClick={() => handleSort("id")} className="h-auto p-0 font-semibold">
                      ID
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("name")} className="h-auto p-0 font-semibold">
                      Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-mono text-sm">{product.id}</TableCell>
                    <TableCell>
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold truncate max-w-[300px]" title={product.name}>
                        {product.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category1}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(product)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Product
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredAndSortedProducts.length)} of{" "}
                {filteredAndSortedProducts.length} products
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Product Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{selectedProduct?.name}</DialogTitle>
          </DialogHeader>

          {selectedProduct && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
              {/* Left Column - Images and Categories */}
              <div className="space-y-4">
                {/* Image Carousel */}
                <div className="relative">
                  <Image
                    src={selectedProduct.images[currentImageIndex] || "/placeholder.svg"}
                    alt={selectedProduct.name}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  {selectedProduct.images.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between p-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={prevImage}
                        disabled={currentImageIndex === 0}
                        className="bg-white/80 hover:bg-white"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={nextImage}
                        disabled={currentImageIndex === selectedProduct.images.length - 1}
                        className="bg-white/80 hover:bg-white"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Image Thumbnails */}
                {selectedProduct.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {selectedProduct.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 border-2 rounded-md ${
                          index === currentImageIndex ? "border-primary" : "border-transparent"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${selectedProduct.name} ${index + 1}`}
                          width={60}
                          height={60}
                          className="rounded-md object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Categories */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Categories</h3>
                  <div className="flex gap-2">
                    <Badge variant="default">{selectedProduct.category1}</Badge>
                    <Badge variant="outline">{selectedProduct.category2}</Badge>
                  </div>
                </div>
              </div>

              {/* Right Column - Product Details */}
              <div className="space-y-4">
                {/* Price */}
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Price</h3>
                  <p className="text-3xl font-bold text-primary">${selectedProduct.price.toFixed(2)}</p>
                </div>

                {/* Stock */}
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Stock Status</h3>
                  <div className="mt-1">
                    {getStockBadge(selectedProduct.stock)}
                    <span className="ml-2 text-sm text-muted-foreground">({selectedProduct.stock} units)</span>
                  </div>
                </div>

                {/* Product ID */}
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Product ID</h3>
                  <code className="bg-muted px-2 py-1 rounded text-sm">{selectedProduct.id}</code>
                </div>

                {/* Page Type */}
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Page Type</h3>
                  <Badge variant="secondary">{selectedProduct.pageType}</Badge>
                </div>

                {/* Pages */}
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-2">Pages</h3>
                  <ScrollArea className="h-32 border rounded-md p-3">
                    {selectedProduct.pages.length > 0 ? (
                      <div className="space-y-3">
                        {selectedProduct.pages.map((page, index) => (
                          <div key={index} className="border-b pb-2 last:border-b-0">
                            <h4 className="font-medium text-sm">{page.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{page.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No pages configured</p>
                    )}
                  </ScrollArea>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
