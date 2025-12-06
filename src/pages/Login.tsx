import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';
import { Users, Clock, DollarSign, Briefcase, ChevronDown } from 'lucide-react';
import { SignInButton } from '@/components/ui/signin';
import { useIsAuthenticated } from '@azure/msal-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      });
      navigate('/dashboard');
    }
  }, [isAuthenticated, toast, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const success = await login(username, password);
    
    if (success) {
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      });
      navigate('/dashboard');
    } else {
      toast({
        title: 'Login Failed',
        description: 'Invalid username or password',
        variant: 'destructive',
      });
    }
    
    setLoading(false);
  };

  const demoUsers = [
    { username: 'john.doe', role: 'Employee' },
    { username: 'sarah.manager', role: 'Line Manager' },
    { username: 'hr.admin', role: 'HR Administrator' },
    { username: 'payroll.specialist', role: 'Payroll Specialist' },
    { username: 'system.admin', role: 'System Administrator' },
  ];


  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary/80 p-12 flex-col justify-between text-primary-foreground">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-foreground/20 backdrop-blur">
              <div className="h-8 w-8 rounded-full border-2 border-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold">HRMS Pro</h1>
          </div>
          <h2 className="text-4xl font-bold mb-4">Welcome to Your Workspace</h2>
          <p className="text-lg text-primary-foreground/80">
            Streamline your HR operations with our comprehensive management system
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">Employee Management</p>
              <p className="text-sm text-primary-foreground/70">Comprehensive employee tracking</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">Time & Attendance</p>
              <p className="text-sm text-primary-foreground/70">Real-time attendance monitoring</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">Payroll Processing</p>
              <p className="text-sm text-primary-foreground/70">Automated payroll management</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-6">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <div className="h-8 w-8 rounded-full border-2 border-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold">HRMS Pro</h1>
          </div>

        <Card>
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>Access your HRMS account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center py-2">
              <SignInButton />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <Collapsible className="border rounded-lg">
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between p-3 hover:bg-muted/50 transition-colors rounded-lg">
                  <div className="text-left">
                    <p className="text-sm font-medium">Demo Accounts</p>
                    <p className="text-xs text-muted-foreground">View test credentials</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 [&[data-state=open]]:rotate-180" />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-3 pb-3 space-y-2 pt-1">
                  <p className="text-xs text-muted-foreground mb-2">Use any password</p>
                  {demoUsers.map((user) => (
                    <div key={user.username} className="flex items-center justify-between text-sm py-1">
                      <code className="rounded bg-secondary px-2 py-0.5 text-xs font-mono">
                        {user.username}
                      </code>
                      <span className="text-xs text-muted-foreground">{user.role}</span>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate('/recruitment/jobs')}
          >
            <Briefcase className="h-4 w-4 mr-2" />
            Job Board
          </Button>

          <Button
            variant="ghost"
            className="w-full"
            onClick={() => navigate('/register')}
          >
            <Users className="h-4 w-4 mr-2" />
            Register as Admin/Manager
          </Button>
        </div>
        </div>
      </div>
    </div>
  );
}
