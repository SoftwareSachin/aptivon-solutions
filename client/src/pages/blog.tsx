import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Calendar, User, ArrowRight, Tag, Search, BookOpen, Mail, TrendingUp, Clock, Eye, Heart } from "lucide-react";
import backgroundVideo from "@assets/3130284-uhd_3840_2160_30fps_1755023125702.mp4";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { BlogPost } from "@/../../shared/schema";

export default function Blog() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [visiblePosts, setVisiblePosts] = useState(6);
  const { toast } = useToast();

  // Fetch blog posts from API
  const { data: allPosts = [], isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog', 'posts'],
    queryFn: async () => {
      const response = await fetch('/api/blog?action=posts');
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch posts: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    }
  });

  // Newsletter subscription mutation
  const subscriptionMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest('POST', '/api/blog?action=subscribe', { email });
    },
    onSuccess: () => {
      toast({
        title: "Successfully Subscribed",
        description: "You'll receive our latest tech insights in your inbox.",
      });
      setEmail("");
    },
    onError: () => {
      toast({
        title: "Subscription Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  });

  const handleReadArticle = (slug: string) => {
    setLocation(`/blog/${slug}`);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    setVisiblePosts(6);
  };

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      subscriptionMutation.mutate(email);
    }
  };

  const handleLoadMore = () => {
    setVisiblePosts(prev => prev + 6);
  };

  // Get featured post
  const featuredPost = useMemo(() => {
    return allPosts.find(post => post.featured) || allPosts[0];
  }, [allPosts]);

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    return allPosts
      .filter(post => 
        selectedCategory === "All Posts" || post.category === selectedCategory
      )
      .filter(post => 
        searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .slice(0, visiblePosts);
  }, [allPosts, selectedCategory, searchQuery, visiblePosts]);

  // Get unique categories
  const categories = useMemo(() => {
    if (!allPosts || allPosts.length === 0) {
      return ["All Posts"];
    }
    const uniqueCategories = Array.from(new Set(allPosts.map(post => post.category)));
    return ["All Posts", ...uniqueCategories];
  }, [allPosts]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="h-20 sm:h-24 lg:h-32"></div>
        <div className="pt-16 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 sm:h-10 lg:h-12 bg-slate-200 rounded mb-6 sm:mb-8 w-3/4 sm:w-1/2 mx-auto"></div>
              <div className="h-48 sm:h-56 lg:h-64 bg-slate-200 rounded mb-6 sm:mb-8"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-80 sm:h-96 bg-slate-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="h-20 sm:h-24 lg:h-32"></div>
        <div className="pt-16 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg sm:rounded-xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-red-900 mb-3 sm:mb-4">Unable to Load Articles</h2>
              <p className="text-red-700 mb-4 sm:mb-6 text-sm sm:text-base">There was an error loading the blog articles. Please try again later.</p>
              <Button 
                onClick={() => window.location.reload()} 
                className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
              >
                Retry
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Navigation Spacer */}
      <div className="h-20 sm:h-24 lg:h-32"></div>

      {/* Hero Section with Video Background */}
      <section className="relative bg-slate-50 py-12 sm:py-16 lg:py-20 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-slate-900/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Technology Insights & Expertise
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-100 max-w-3xl mx-auto leading-relaxed px-4">
              Discover the latest trends, best practices, and strategic insights in enterprise technology, 
              digital transformation, and innovative solutions.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12">
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="w-full relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 sm:h-5 sm:w-5" />
                <Input
                  type="text"
                  placeholder="Search articles, topics, technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 sm:pl-12 h-10 sm:h-12 text-sm sm:text-base lg:text-lg border-slate-200 focus:border-blue-500 bg-white w-full"
                />
              </div>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryFilter(category)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white/80 text-slate-600 hover:bg-white"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="py-8 sm:py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 sm:mb-4">Featured Article</h2>
              <div className="w-16 sm:w-24 h-1 bg-blue-600"></div>
            </div>
            
            <Card className="overflow-hidden shadow-lg border-0 bg-gradient-to-br from-slate-50 to-white">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="p-6 sm:p-8 lg:p-12 order-2 lg:order-1">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 font-medium text-xs sm:text-sm">
                        {featuredPost.category}
                      </Badge>
                      <Badge variant="outline" className="text-slate-600 text-xs sm:text-sm">
                        Featured
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight">
                      {featuredPost.title}
                    </h3>
                    
                    <p className="text-slate-600 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                      <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-500">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <User className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{featuredPost.author}</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{featuredPost.readTime}</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{featuredPost.views}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => handleReadArticle(featuredPost.slug)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg group w-full sm:w-auto"
                    >
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-slate-100 p-6 sm:p-8 lg:p-12 flex items-center justify-center order-1 lg:order-2 min-h-[200px] sm:min-h-[250px] lg:min-h-0">
                    <div className="text-center">
                      <TrendingUp className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 text-blue-600 mx-auto mb-3 sm:mb-4" />
                      <p className="text-slate-600 font-medium text-sm sm:text-base">Enterprise Technology Insights</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Articles Grid */}
      <section className="py-8 sm:py-12 lg:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 sm:mb-4">Latest Articles</h2>
              <div className="w-16 sm:w-24 h-1 bg-blue-600"></div>
            </div>
            <div className="text-slate-600 text-sm sm:text-base">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white overflow-hidden h-full">
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="h-40 sm:h-48 bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 sm:h-16 sm:w-16 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                      <Badge className="bg-blue-600 text-white font-medium text-xs sm:text-sm">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-600 mb-3 sm:mb-4 line-clamp-3 leading-relaxed text-sm sm:text-base flex-grow">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs bg-slate-50 text-slate-600 border-slate-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs sm:text-sm text-slate-500 mb-3 sm:mb-4 gap-2">
                      <div className="flex items-center gap-2 sm:gap-4">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="truncate">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{post.likes}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => handleReadArticle(post.slug)}
                      variant="outline"
                      className="w-full group border-slate-200 hover:border-blue-500 hover:text-blue-600 text-sm sm:text-base"
                    >
                      Read Article
                      <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          {visiblePosts < allPosts.filter(post => 
            selectedCategory === "All Posts" || post.category === selectedCategory
          ).length && (
            <div className="text-center">
              <Button 
                onClick={handleLoadMore}
                variant="outline"
                className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg border-slate-300 hover:border-blue-500 hover:text-blue-600"
              >
                Load More Articles
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-slate-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 border">
            <Mail className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-blue-600 mx-auto mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
              Stay Updated with Technology Insights
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Subscribe to our newsletter and receive the latest articles on enterprise technology, 
              digital transformation, and industry best practices directly in your inbox.
            </p>
            
            <form onSubmit={handleNewsletterSignup} className="flex flex-col gap-3 sm:gap-4 max-w-lg mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-10 sm:h-12 text-sm sm:text-base lg:text-lg border-slate-200 focus:border-blue-500"
              />
              <Button 
                type="submit" 
                disabled={subscriptionMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 h-10 sm:h-12 text-sm sm:text-base lg:text-lg w-full sm:w-auto"
              >
                {subscriptionMutation.isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            
            <p className="text-xs sm:text-sm text-slate-500 mt-3 sm:mt-4">
              No spam, unsubscribe at any time. Privacy policy applies.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}