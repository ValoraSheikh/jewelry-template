"use client"

import { useState, useMemo, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  MoreHorizontal,
  Search,
  Truck,
  Trash2,
  DollarSign,
  CreditCard,
  ShoppingCart,
  Calendar,
} from "lucide-react"
import Image from "next/image"

// Mock data for orders
const mockOrders = [
  {
    id: "ORD-2024-001",
    merchantOrderId: "MERCH-001",
    customer: {
      firstName: "John",
      lastName: "Doe",
      phone: "+1-555-0123",
      email: "john.doe@email.com",
      address: {
        street: "123 Main St",
        landmark: "Near Central Park",
        city: "New York",
        state: "NY",
        postalCode: "10001",
        full: "123 Main St, Near Central Park, New York, NY 10001",
      },
    },
    products: [
      {
        id: "PROD-001",
        name: "Premium Notebook",
        quantity: 2,
        price: 29.99,
        pages: 200,
        category1: "Stationery",
        category2: "Notebooks",
        stock: 150,
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        id: "PROD-002",
        name: "Luxury Pen Set",
        quantity: 1,
        price: 89.99,
        pages: 0,
        category1: "Stationery",
        category2: "Pens",
        stock: 75,
        image: "/placeholder.svg?height=50&width=50",
      },
    ],
    totalPrice: 149.97,
    paymentMethod: "UPI",
    paymentStatus: "success",
    orderDate: "2024-01-15T10:30:00Z",
    status: "confirmed",
  },
  {
    id: "ORD-2024-002",
    merchantOrderId: "MERCH-002",
    customer: {
      firstName: "Jane",
      lastName: "Smith",
      phone: "+1-555-0124",
      email: "jane.smith@email.com",
      address: {
        street: "456 Oak Ave",
        landmark: "Opposite Mall",
        city: "Los Angeles",
        state: "CA",
        postalCode: "90210",
        full: "456 Oak Ave, Opposite Mall, Los Angeles, CA 90210",
      },
    },
    products: [
      {
        id: "PROD-003",
        name: "Art Supplies Kit",
        quantity: 1,
        price: 199.99,
        pages: 0,
        category1: "Art",
        category2: "Supplies",
        stock: 25,
        image: "/placeholder.svg?height=50&width=50",
      },
    ],
    totalPrice: 199.99,
    paymentMethod: "COD",
    paymentStatus: "failed",
    orderDate: "2024-01-14T14:20:00Z",
    status: "confirmed",
  },
  {
    id: "ORD-2024-003",
    merchantOrderId: "MERCH-003",
    customer: {
      firstName: "Mike",
      lastName: "Johnson",
      phone: "+1-555-0125",
      email: "mike.johnson@email.com",
      address: {
        street: "789 Pine St",
        landmark: "Near School",
        city: "Chicago",
        state: "IL",
        postalCode: "60601",
        full: "789 Pine St, Near School, Chicago, IL 60601",
      },
    },
    products: [
      {
        id: "PROD-004",
        name: "Office Organizer",
        quantity: 3,
        price: 45.99,
        pages: 0,
        category1: "Office",
        category2: "Organization",
        stock: 100,
        image: "/placeholder.svg?height=50&width=50",
      },
    ],
    totalPrice: 137.97,
    paymentMethod: "Credit Card",
    paymentStatus: "success",
    orderDate: "2024-01-13T09:15:00Z",
    status: "confirmed",
  },
]

export default function AdminOrdersPage() {
  const [orders] = useState(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [filters, setFilters] = useState({
    paymentMethod: "all",
    paymentStatus: "all",
    city: "all",
    dateRange: "all",
  })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const totalOrders = orders.length
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0)
    const paymentMethods = orders.reduce((acc, order) => {
      acc[order.paymentMethod] = (acc[order.paymentMethod] || 0) + 1
      return acc
    }, {})
    const mostUsedPaymentMethod = Object.entries(paymentMethods).reduce((a, b) =>
      paymentMethods[a[0]] > paymentMethods[b[0]] ? a : b,
    )[0]

    const today = new Date().toDateString()
    const ordersToday = orders.filter((order) => new Date(order.orderDate).toDateString() === today).length

    return {
      totalOrders,
      totalRevenue,
      mostUsedPaymentMethod,
      ordersToday,
    }
  }, [orders])

  // Filter and search orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesPaymentMethod = filters.paymentMethod === "all" || order.paymentMethod === filters.paymentMethod
      const matchesPaymentStatus = filters.paymentStatus === "all" || order.paymentStatus === filters.paymentStatus
      const matchesCity = filters.city === "all" || order.customer.address.city === filters.city

      return matchesSearch && matchesPaymentMethod && matchesPaymentStatus && matchesCity
    })
  }, [orders, searchTerm, filters])

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage)

  const handleViewDetails = (order) => {
    setSelectedOrder(order)
    setIsDetailsOpen(true)
  }

  const handleExport = () => {
    // Mock export functionality
    console.log("Exporting orders...")
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getPaymentStatusBadge = (status) => {
    return status === "success" ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Success</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-2 md:p-8 pt-4 md:pt-6">
      {/* Header Section */}
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
          <p className="text-muted-foreground">Manage and review all customer orders</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Orders</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${summaryStats.totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Payment Method</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.mostUsedPaymentMethod}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.ordersToday}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter and search through orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="w-full">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search orders..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <div>
                <Label className="text-xs">Payment Method</Label>
                <Select
                  value={filters.paymentMethod}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, paymentMethod: value }))}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="UPI">UPI</SelectItem>
                    <SelectItem value="COD">COD</SelectItem>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Status</Label>
                <Select
                  value={filters.paymentStatus}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, paymentStatus: value }))}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">City</Label>
                <Select
                  value={filters.city}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, city: value }))}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    <SelectItem value="New York">New York</SelectItem>
                    <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                    <SelectItem value="Chicago">Chicago</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button onClick={handleExport} variant="outline" className="w-full h-9 bg-transparent" size="sm">
                  <Download className="mr-1 h-3 w-3" />
                  <span className="hidden sm:inline">Export</span>
                  <span className="sm:hidden">CSV</span>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table - Desktop */}
      <div className="hidden md:block">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {order.customer.firstName} {order.customer.lastName}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{order.customer.phone}</div>
                      <div className="text-muted-foreground">{order.customer.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {order.customer.address.city}, {order.customer.address.state}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">${order.totalPrice.toFixed(2)}</TableCell>
                  <TableCell>{order.products.length} items</TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>{getPaymentStatusBadge(order.paymentStatus)}</TableCell>
                  <TableCell>{formatDate(order.orderDate)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(order)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Truck className="mr-2 h-4 w-4" />
                          Mark as Shipped
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Orders Cards - Mobile */}
      <div className="md:hidden space-y-4">
        {paginatedOrders.map((order) => (
          <Card key={order.id} className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-sm">{order.id}</h3>
                <p className="text-sm text-muted-foreground">
                  {order.customer.firstName} {order.customer.lastName}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {getPaymentStatusBadge(order.paymentStatus)}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleViewDetails(order)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Truck className="mr-2 h-4 w-4" />
                      Mark as Shipped
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Order
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Total:</span>
                <span className="font-semibold ml-1">${order.totalPrice.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Items:</span>
                <span className="ml-1">{order.products.length}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Payment:</span>
                <span className="ml-1">{order.paymentMethod}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Location:</span>
                <span className="ml-1">{order.customer.address.city}</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t">
              <p className="text-xs text-muted-foreground">{formatDate(order.orderDate)}</p>
              <p className="text-xs text-muted-foreground truncate">{order.customer.email}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Order Details Modal/Sheet */}
      {isMobile ? (
        <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
            <SheetHeader className="pb-4">
              <SheetTitle>Order Details</SheetTitle>
              <SheetDescription>Order {selectedOrder?.id}</SheetDescription>
            </SheetHeader>

            {selectedOrder && (
              <div className="space-y-4">
                {/* Customer Information - Mobile */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Customer</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Name</Label>
                      <p className="text-sm">
                        {selectedOrder.customer.firstName} {selectedOrder.customer.lastName}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Contact</Label>
                      <p className="text-sm">{selectedOrder.customer.phone}</p>
                      <p className="text-sm text-muted-foreground">{selectedOrder.customer.email}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">Address</Label>
                      <p className="text-sm">{selectedOrder.customer.address.full}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Products - Mobile */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Products ({selectedOrder.products.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedOrder.products.map((product) => (
                      <div key={product.id} className="flex space-x-3 p-3 border rounded-lg">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={50}
                          height={50}
                          className="rounded-md flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{product.name}</h4>
                          <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-muted-foreground">
                            <span>Qty: {product.quantity}</span>
                            <span>Price: ${product.price}</span>
                            <span>Stock: {product.stock}</span>
                            <span>ID: {product.id}</span>
                          </div>
                          <div className="mt-1">
                            <Badge variant="outline" className="text-xs">
                              {product.category1}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Payment - Mobile */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Payment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">Method</Label>
                        <p className="text-sm">{selectedOrder.paymentMethod}</p>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">Status</Label>
                        <div className="mt-1">{getPaymentStatusBadge(selectedOrder.paymentStatus)}</div>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">Total</Label>
                        <p className="text-sm font-semibold">${selectedOrder.totalPrice.toFixed(2)}</p>
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">Order ID</Label>
                        <p className="text-xs font-mono">{selectedOrder.merchantOrderId}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
              <DialogDescription>Complete information for order {selectedOrder?.id}</DialogDescription>
            </DialogHeader>

            {selectedOrder && (
              <div className="space-y-6">
                {/* Customer Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Information</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label className="text-sm font-medium">Full Name</Label>
                      <p className="text-sm text-muted-foreground">
                        {selectedOrder.customer.firstName} {selectedOrder.customer.lastName}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Phone Number</Label>
                      <p className="text-sm text-muted-foreground">{selectedOrder.customer.phone}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Email</Label>
                      <p className="text-sm text-muted-foreground">{selectedOrder.customer.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Full Address</Label>
                      <p className="text-sm text-muted-foreground">{selectedOrder.customer.address.full}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Product List */}
                <Card>
                  <CardHeader>
                    <CardTitle>Products ({selectedOrder.products.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Pages</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Product ID</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedOrder.products.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell>
                                <Image
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  width={40}
                                  height={40}
                                  className="rounded-md"
                                />
                              </TableCell>
                              <TableCell className="font-medium">{product.name}</TableCell>
                              <TableCell>{product.quantity}</TableCell>
                              <TableCell>${product.price.toFixed(2)}</TableCell>
                              <TableCell>{product.pages || "N/A"}</TableCell>
                              <TableCell>
                                <div className="text-sm">
                                  <div>{product.category1}</div>
                                  <div className="text-muted-foreground">{product.category2}</div>
                                </div>
                              </TableCell>
                              <TableCell>{product.stock}</TableCell>
                              <TableCell className="font-mono text-sm">{product.id}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label className="text-sm font-medium">Merchant Order ID</Label>
                      <p className="text-sm text-muted-foreground font-mono">{selectedOrder.merchantOrderId}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Payment Method</Label>
                      <p className="text-sm text-muted-foreground">{selectedOrder.paymentMethod}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Payment Status</Label>
                      <div className="mt-1">{getPaymentStatusBadge(selectedOrder.paymentStatus)}</div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Total Price</Label>
                      <p className="text-sm text-muted-foreground font-semibold">
                        ${selectedOrder.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}

      {/* Pagination */}
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 py-4">
        <div className="text-sm text-muted-foreground text-center sm:text-left">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of{" "}
          {filteredOrders.length} orders
        </div>
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">Previous</span>
          </Button>
          <div className="text-sm px-2">
            {currentPage} / {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <span className="hidden sm:inline mr-1">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
