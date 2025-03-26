
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/lib/toast';
import { ArrowLeft, LogIn } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple demo authentication - in a real app, use a proper auth system
    setTimeout(() => {
      if (username === 'admin' && password === 'password') {
        localStorage.setItem('isLoggedIn', 'true');
        toast.success('Login successful');
        navigate('/admin');
      } else {
        toast.error('Invalid credentials');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 md:px-12 py-16 min-h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Button 
            variant="outline" 
            size="sm" 
            asChild
            className="mb-8"
          >
            <motion.div whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }}>
              <a href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to home
              </a>
            </motion.div>
          </Button>
          
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl font-display">Login</CardTitle>
              <CardDescription>
                Enter your credentials to access the admin area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    required
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    required
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Demo credentials: username: <code>admin</code>, password: <code>password</code>
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-muted-foreground">
                This is a demo login page. In a real application, you should implement proper authentication.
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Login;
