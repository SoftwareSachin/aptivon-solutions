import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Calendar, User, ArrowRight, Tag, Search, BookOpen, Mail, Heart, MessageCircle, Eye, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { BlogPost } from "@/../../shared/schema";

export default function Blog() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [visiblePosts, setVisiblePosts] = useState(6);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch blog posts from API
  const { data: allPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog?action=posts']
  });

  // Newsletter subscription mutation
  const subscriptionMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest('POST', '/api/blog?action=subscribe', { email });
    },
    onSuccess: () => {
      toast({
        title: "Successfully Subscribed!",
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
    setVisiblePosts(6); // Reset visible posts when changing category
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

  const handleContactUs = () => {
    setLocation("/contact");
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
      );
  }, [allPosts, selectedCategory, searchQuery]);

  // Get unique categories from posts
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(allPosts.map(post => post.category)));
    return ["All Posts", ...uniqueCategories];
  }, [allPosts]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white ">
        <Navigation />
      {/* Navigation Spacer */}
      <div className="h-48"></div>
        <div className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="animate-pulse">
              <div className="h-12 bg-slate-200 rounded mb-8 w-1/2 mx-auto"></div>
              <div className="h-64 bg-slate-200 rounded mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-96 bg-slate-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white ">
      <Navigation />
      {/* Navigation Spacer */}
      <div className="h-48"></div>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Technology Insights
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Expert perspectives on enterprise technology, digital transformation, and industry trends 
              from our team of technology leaders and practitioners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 border-slate-300 focus:border-slate-900"
                />
              </div>
              <Button 
                variant="outline"
                onClick={handleContactUs}
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Request Topic
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Featured Article</h2>
              <Card className="overflow-hidden bg-white border border-slate-200">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="bg-slate-100 flex items-center justify-center p-12">
                      <div className="text-center">
                        <div className="w-32 h-32 bg-slate-300 rounded-lg flex items-center justify-center mb-4 mx-auto">
                          <Tag className="w-12 h-12 text-slate-500" />
                        </div>
                        <Badge className="bg-slate-900 text-white">{featuredPost.category}</Badge>
                      </div>
                    </div>
                    <div className="p-8 lg:p-12">
                      <Badge variant="secondary" className="bg-slate-100 text-slate-700 mb-4">
                        Featured
                      </Badge>
                      <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 leading-tight">
                        {featuredPost.title}
                      </h3>
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {featuredPost.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(featuredPost.createdAt || '').toLocaleDateString()}
                        </div>
                        <div>{featuredPost.readTime}</div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {featuredPost.views || 0}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {featuredPost.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-4">
                        <Button 
                          className="bg-slate-900 hover:bg-slate-800 text-white"
                          onClick={() => handleReadArticle(featuredPost.slug)}
                        >
                          Read Full Article
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Heart className="w-4 h-4" />
                          {featuredPost.likes || 0}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Categories Filter */}
      <section className="py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category ? "bg-slate-900 hover:bg-slate-800 text-white" : "border-slate-300 text-slate-700 hover:bg-slate-50"}
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Latest Articles</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Stay updated with the latest trends, best practices, and insights in enterprise technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts
              .slice(0, visiblePosts)
              .map((post) => (
              <Card 
                key={post.id} 
                className="bg-white border border-slate-200 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
                onClick={() => handleReadArticle(post.slug)}
              >
                <CardContent className="p-0">
                  <div className="bg-slate-100 h-48 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-slate-300 rounded-lg flex items-center justify-center mb-2 mx-auto">
                        <Tag className="w-6 h-6 text-slate-500" />
                      </div>
                      <Badge variant="secondary" className="bg-slate-200 text-slate-700 text-xs">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.createdAt || '').toLocaleDateString()}
                      </div>
                      <div>{post.readTime}</div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {post.views || 0}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <Button 
                        variant="outline" 
                        className="border-slate-300 text-slate-700 hover:bg-slate-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReadArticle(post.slug);
                        }}
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Heart className="w-3 h-3" />
                        {post.likes || 0}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredPosts.length > visiblePosts && (
            <div className="text-center mt-12">
              <Button 
                onClick={handleLoadMore}
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                Load More Articles
              </Button>
            </div>
          )}

          {filteredPosts.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No Articles Found</h3>
              <p className="text-slate-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-8">
            <Mail className="w-16 h-16 text-white mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated with Tech Insights
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Get the latest articles, industry trends, and technology insights delivered to your inbox.
            </p>
          </div>
          
          <form onSubmit={handleNewsletterSignup} className="max-w-md mx-auto">
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white border-slate-300"
                required
              />
              <Button 
                type="submit"
                disabled={subscriptionMutation.isPending}
                className="bg-white text-slate-900 hover:bg-slate-100"
              >
                {subscriptionMutation.isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>
          </form>
          
          <p className="text-sm text-slate-400 mt-4">
            No spam, unsubscribe at any time. Read our{" "}
            <button 
              onClick={() => setLocation("/privacy-policy")}
              className="underline hover:text-slate-300"
            >
              Privacy Policy
            </button>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}