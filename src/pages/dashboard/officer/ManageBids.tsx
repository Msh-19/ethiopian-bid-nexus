
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CheckCircle, Clock, Edit, FileText, FilterX, PlusCircle, SortAsc, SortDesc } from "lucide-react";
import { Link } from "react-router-dom";
import { Bid, useBids, useCloseBid } from "@/services/api/bids";
import { Skeleton } from "@/components/ui/skeleton";

export default function ManageBids() {
  const { data: bids, isLoading, isError } = useBids();
  const { mutate: closeBid, isPending: isClosing } = useCloseBid();
  
  // Filter and sort state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof Bid>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  // Format date helper function
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Format currency helper function
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Handle closing a bid
  const handleCloseBid = (bidId: string) => {
    if (window.confirm('Are you sure you want to close this bid? This will prevent new proposals from being submitted.')) {
      closeBid(bidId);
    }
  };
  
  // Toggle sort direction or change sort field
  const handleSort = (field: keyof Bid) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setCategoryFilter("all");
  };
  
  // Filter and sort bids
  const filteredAndSortedBids = bids ? bids
    .filter(bid => {
      const matchesSearch = bid.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || bid.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || bid.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      // Handle different field types
      let valueA = a[sortField];
      let valueB = b[sortField];
      
      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortDirection === "asc" 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      } else {
        return sortDirection === "asc"
          ? (valueA as number) - (valueB as number)
          : (valueB as number) - (valueA as number);
      }
    }) : [];
    
  // Get all unique categories from bids
  const categories = bids ? [...new Set(bids.map(bid => bid.category))] : [];
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Manage Bids</h1>
          <p className="text-muted-foreground">
            View and manage your procurement bids
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/officer/create-bid">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Bid
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Bids</CardTitle>
          <CardDescription>
            All bids you have created, both active and closed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input 
                placeholder="Search bids..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-2 sm:flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="OPEN">Open</SelectItem>
                  <SelectItem value="CLOSED">Closed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={resetFilters}
                title="Reset filters"
              >
                <FilterX className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : isError ? (
            <div className="text-center py-8 text-destructive">
              Error loading bids. Please try again later.
            </div>
          ) : bids && bids.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("title")}>
                    <div className="flex items-center">
                      Title
                      {sortField === "title" && (
                        sortDirection === "asc" ? 
                          <SortAsc className="ml-1 h-3 w-3" /> : 
                          <SortDesc className="ml-1 h-3 w-3" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
                    <div className="flex items-center">
                      Category
                      {sortField === "category" && (
                        sortDirection === "asc" ? 
                          <SortAsc className="ml-1 h-3 w-3" /> : 
                          <SortDesc className="ml-1 h-3 w-3" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("budget")}>
                    <div className="flex items-center">
                      Budget
                      {sortField === "budget" && (
                        sortDirection === "asc" ? 
                          <SortAsc className="ml-1 h-3 w-3" /> : 
                          <SortDesc className="ml-1 h-3 w-3" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("deadline")}>
                    <div className="flex items-center">
                      Deadline
                      {sortField === "deadline" && (
                        sortDirection === "asc" ? 
                          <SortAsc className="ml-1 h-3 w-3" /> : 
                          <SortDesc className="ml-1 h-3 w-3" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("proposals")}>
                    <div className="flex items-center">
                      Proposals
                      {sortField === "proposals" && (
                        sortDirection === "asc" ? 
                          <SortAsc className="ml-1 h-3 w-3" /> : 
                          <SortDesc className="ml-1 h-3 w-3" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedBids.length > 0 ? (
                  filteredAndSortedBids.map((bid: Bid) => (
                    <TableRow key={bid.id}>
                      <TableCell className="font-medium">{bid.title}</TableCell>
                      <TableCell>{bid.category}</TableCell>
                      <TableCell>{formatCurrency(bid.budget)}</TableCell>
                      <TableCell>{formatDate(bid.deadline)}</TableCell>
                      <TableCell>
                        {bid.status === "OPEN" ? (
                          <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-200">
                            <Clock className="h-3 w-3 mr-1" /> Open
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-slate-500/10 text-slate-700 border-slate-200">
                            <CheckCircle className="h-3 w-3 mr-1" /> Closed
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{bid.proposals}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/bids/${bid.id}`}>
                            <FileText className="h-3 w-3 mr-1" />
                            View
                          </Link>
                        </Button>
                        {bid.status === "OPEN" && (
                          <>
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleCloseBid(bid.id)}
                              disabled={isClosing}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Close
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                      No bids found matching your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No bids found. Create your first bid to get started.
            </div>
          )}
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            {filteredAndSortedBids ? 
              `Showing ${filteredAndSortedBids.length} of ${bids?.length} bids` : ''}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
