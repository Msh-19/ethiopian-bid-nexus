
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { fetchBids } from "@/services/bidService";
import { Bid } from "@/types";
import { Search, Calendar, Building2, Banknote } from "lucide-react";

export default function Bids() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const { data: bids, isLoading, error } = useQuery({
    queryKey: ["bids"],
    queryFn: fetchBids,
  });

  // List of unique categories for filtering
  const categories = bids ? [...new Set(bids.map(bid => bid.category))] : [];

  // Filtered bids based on search term and category
  const filteredBids = bids?.filter(bid => {
    const matchesSearch = searchTerm === "" || 
      bid.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      bid.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.organizationName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !categoryFilter || bid.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Format date to display in a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'ETB',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Browse Bids</h1>
              <p className="text-muted-foreground">
                Explore available procurement opportunities across Ethiopia
              </p>
            </div>
            <div className="relative mt-4 md:mt-0 w-full md:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bids..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            <Button 
              variant={categoryFilter === null ? "default" : "outline"}
              onClick={() => setCategoryFilter(null)}
              className="text-sm"
            >
              All Categories
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={categoryFilter === category ? "default" : "outline"}
                onClick={() => setCategoryFilter(category)}
                className="text-sm"
              >
                {category}
              </Button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <CardHeader className="bg-muted/30 h-32"></CardHeader>
                  <CardContent className="pt-6">
                    <div className="h-4 bg-muted/50 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-muted/40 rounded w-full mb-2"></div>
                    <div className="h-3 bg-muted/40 rounded w-5/6"></div>
                  </CardContent>
                  <CardFooter className="bg-muted/20 h-16"></CardFooter>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive text-lg">Error loading bids. Please try again later.</p>
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
                className="mt-4"
              >
                Refresh
              </Button>
            </div>
          ) : filteredBids && filteredBids.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBids.map((bid) => (
                <Link to={`/bids/${bid.id}`} key={bid.id} className="group">
                  <Card className="h-full transition-all duration-300 hover:shadow-md">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <Badge variant={bid.status === "OPEN" ? "default" : "secondary"}>
                          {bid.status}
                        </Badge>
                        <Badge variant="outline">{bid.category}</Badge>
                      </div>
                      <CardTitle className="mt-4 line-clamp-2 group-hover:text-primary transition-colors">
                        {bid.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {bid.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Deadline: {formatDate(bid.deadline)}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{bid.organizationName}</span>
                      </div>
                      <div className="flex items-center text-sm font-medium">
                        <Banknote className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{formatCurrency(bid.budget)}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-muted/10">
              <p className="text-xl font-medium mb-2">No bids match your search</p>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
              <Button onClick={() => {
                setSearchTerm("");
                setCategoryFilter(null);
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
