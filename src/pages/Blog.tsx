
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AuthHeader from "@/components/AuthHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, User, Tag } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "How to Build a Content Strategy that Actually Works",
    excerpt: "Learn the key elements of a successful content strategy and how to implement them for your brand.",
    category: "Content Strategy",
    author: "Sarah Johnson",
    date: "May 10, 2023",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=500"
  },
  {
    id: 2,
    title: "The Ultimate Guide to LinkedIn Marketing in 2023",
    excerpt: "Discover the latest LinkedIn strategies to grow your professional network and business presence.",
    category: "LinkedIn",
    author: "Michael Richards",
    date: "June 5, 2023",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800&h=500"
  },
  {
    id: 3,
    title: "5 Ways AI is Transforming Content Creation",
    excerpt: "Explore how artificial intelligence is revolutionizing the way brands create and distribute content.",
    category: "AI & Technology",
    author: "Priya Patel",
    date: "July 18, 2023",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800&h=500"
  },
  {
    id: 4,
    title: "Creating Engaging Content for Multiple Platforms",
    excerpt: "Learn how to adapt your content for different social media platforms while maintaining your brand voice.",
    category: "Content Creation",
    author: "David Wong",
    date: "August 22, 2023",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800&h=500"
  },
  {
    id: 5,
    title: "Building Your Personal Brand Through Consistent Content",
    excerpt: "Discover strategies for developing a strong personal brand that resonates with your audience.",
    category: "Personal Branding",
    author: "Emily Rodriguez",
    date: "September 15, 2023",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800&h=500"
  }
];

const featuredPost = blogPosts[0];
const recentPosts = blogPosts.slice(1);

const Blog = () => {
  useEffect(() => {
    document.title = "Blog | BrandWise";
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <AuthHeader />
      
      <div className="container mx-auto px-4 py-12">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 gradient-heading">
            The BrandWise Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expert insights, tips, and strategies to help you build your brand,
            create engaging content, and grow your audience.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Featured Article</h2>
          <Card className="overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <CardContent className="p-8 lg:w-1/2 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Tag size={16} />
                  <span>{featuredPost.category}</span>
                </div>
                <h3 className="text-3xl font-bold mb-4">{featuredPost.title}</h3>
                <p className="text-muted-foreground mb-6 text-lg">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <User size={16} />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <Button>Read Article</Button>
              </CardContent>
            </div>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {recentPosts.map(post => (
              <Card key={post.id} className="overflow-hidden card-hover">
                <div className="aspect-video">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Tag size={16} />
                    <span>{post.category}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User size={16} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">Read Article</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-muted rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Get the latest articles, tips, and insights on content marketing and brand building
              delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 rounded-md border border-input bg-background px-3 py-2"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blog;
