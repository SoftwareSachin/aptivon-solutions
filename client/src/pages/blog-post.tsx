import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Calendar, User, ArrowLeft, Heart, MessageCircle, Share2, BookOpen, Clock, Eye } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import type { BlogPost, BlogComment } from "@/../../shared/schema";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [commentForm, setCommentForm] = useState({
    author: "",
    email: "",
    content: ""
  });
  const [liked, setLiked] = useState(false);

  // Fetch blog post
  const { data: post, isLoading: postLoading } = useQuery<BlogPost>({
    queryKey: [`/api/blog?action=post&slug=${slug}`]
  });

  // Fetch comments
  const { data: comments = [] } = useQuery<BlogComment[]>({
    queryKey: [`/api/blog?action=comments&postId=${post?.id}`],
    enabled: !!post?.id
  });

  // Like post mutation
  const likeMutation = useMutation({
    mutationFn: async () => {
      if (!post) return;
      return apiRequest('POST', '/api/blog?action=like', { postId: post.id });
    },
    onSuccess: () => {
      setLiked(true);
      toast({
        title: "Post Liked!",
        description: "Thank you for your feedback.",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/blog?action=post&slug=${slug}`] });
    }
  });

  // Comment submission mutation
  const commentMutation = useMutation({
    mutationFn: async (commentData: typeof commentForm) => {
      if (!post) return;
      return apiRequest('POST', '/api/blog?action=comment', {
        ...commentData,
        postId: post.id
      });
    },
    onSuccess: () => {
      toast({
        title: "Comment Submitted!",
        description: "Your comment is pending approval.",
      });
      setCommentForm({ author: "", email: "", content: "" });
      queryClient.invalidateQueries({ queryKey: [`/api/blog?action=comments&postId=${post?.id}`] });
    }
  });

  const handleLike = () => {
    if (!liked) {
      likeMutation.mutate();
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentForm.author || !commentForm.email || !commentForm.content) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    commentMutation.mutate(commentForm);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "The post link has been copied to your clipboard.",
      });
    }
  };

  const goBack = () => {
    setLocation('/blog');
  };

  if (postLoading) {
    return (
      <div className="min-h-screen bg-white pt-80">
        <Navigation />
        <div className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 rounded mb-4"></div>
              <div className="h-64 bg-slate-200 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white pt-80">
        <Navigation />
        <div className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Post Not Found</h1>
            <p className="text-xl text-slate-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <Button onClick={goBack} className="bg-slate-900 hover:bg-slate-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-80">
      <Navigation />
      
      {/* Article Header */}
      <article className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={goBack}
              className="mb-6 text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6">
              <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                {post.category}
              </Badge>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.createdAt || '').toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {post.views || 0} views
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Social Actions */}
            <div className="flex items-center gap-4 pb-8 border-b border-slate-200">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLike}
                disabled={liked || likeMutation.isPending}
                className={liked ? "bg-red-50 border-red-200 text-red-600" : ""}
              >
                <Heart className={`w-4 h-4 mr-2 ${liked ? "fill-current" : ""}`} />
                {liked ? "Liked" : "Like"} ({post.likes || 0})
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              
              <Button variant="outline" size="sm" onClick={() => document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' })}>
                <MessageCircle className="w-4 h-4 mr-2" />
                Comments ({comments.length})
              </Button>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-16">
            <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
              {post.content}
            </div>
          </div>

          {/* Comments Section */}
          <div id="comments" className="mt-16">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">
              Comments ({comments.length})
            </h3>

            {/* Comment Form */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Leave a Comment</h4>
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Your Name"
                      value={commentForm.author}
                      onChange={(e) => setCommentForm(prev => ({ ...prev, author: e.target.value }))}
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={commentForm.email}
                      onChange={(e) => setCommentForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <Textarea
                    placeholder="Your comment..."
                    value={commentForm.content}
                    onChange={(e) => setCommentForm(prev => ({ ...prev, content: e.target.value }))}
                    rows={4}
                    required
                  />
                  <Button 
                    type="submit"
                    disabled={commentMutation.isPending}
                    className="bg-slate-900 hover:bg-slate-800"
                  >
                    {commentMutation.isPending ? "Submitting..." : "Submit Comment"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <Card key={comment.id} className="border-slate-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-slate-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h5 className="font-semibold text-slate-900">{comment.author}</h5>
                          <span className="text-sm text-slate-500">
                            {new Date(comment.createdAt || '').toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">{comment.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {comments.length === 0 && (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500">No comments yet. Be the first to share your thoughts!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}