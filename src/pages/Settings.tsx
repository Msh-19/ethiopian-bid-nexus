
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { ChevronLeft, User, Mail, Upload, Plus } from "lucide-react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { useToast } from "@/hooks/use-toast";

type ProfileFormData = {
  name: string;
  email: string;
  organization: string;
  bio: string;
};

export default function Settings() {
  const { toast } = useToast();
  const [avatar, setAvatar] = useState<string | null>(null);
  
  const form = useForm<ProfileFormData>({
    defaultValues: {
      name: "John Doe",
      email: "john.doe@example.com",
      organization: "ABC Company",
      bio: ""
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
    console.log("Form submitted:", data);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setAvatar(event.target.result);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Home
          </Link>
          
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          
          <div className="grid gap-8 md:gap-12">
            {/* Profile Section */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Update your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Avatar Upload */}
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="h-20 w-20 rounded-full overflow-hidden bg-muted flex items-center justify-center border">
                          {avatar ? (
                            <img
                              src={avatar}
                              alt="Profile avatar"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <User className="h-10 w-10 text-muted-foreground" />
                          )}
                        </div>
                        <Input
                          type="file"
                          id="avatar-upload"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarChange}
                        />
                        <Label
                          htmlFor="avatar-upload"
                          className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center cursor-pointer"
                        >
                          <Plus className="h-4 w-4 text-primary-foreground" />
                        </Label>
                      </div>
                      <div>
                        <h3 className="font-medium">Profile Picture</h3>
                        <p className="text-sm text-muted-foreground">
                          JPG, PNG or GIF. Max size 2MB.
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="john.doe@example.com"
                                disabled 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Contact administrator to change email
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="organization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization</FormLabel>
                          <FormControl>
                            <Input placeholder="Company or organization name" {...field} />
                          </FormControl>
                          <FormDescription>
                            The organization you represent
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us a little about yourself or your organization"
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit">Save Profile Changes</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            {/* Theme & Appearance */}
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize your theme preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Theme Mode</h3>
                    <p className="text-sm text-muted-foreground">
                      Toggle between light and dark mode
                    </p>
                  </div>
                  <ThemeSwitcher />
                </div>
                
                <div className="border-t mt-6 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium">Language Preferences</h3>
                      <p className="text-sm text-muted-foreground">
                        Select your preferred language
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" className="border-primary">English</Button>
                    <Button variant="outline">አማርኛ (Amharic)</Button>
                    <Button variant="outline">Afaan Oromo</Button>
                    <Button variant="outline">ትግርኛ (Tigrinya)</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>
                  Manage your password and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-1">Change Password</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Update your password regularly to keep your account secure
                  </p>
                  <Button variant="outline">Change Password</Button>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="font-medium mb-1">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add an extra layer of security to your account
                  </p>
                  <Button>Enable 2FA</Button>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-red-600 font-medium mb-1">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Permanent actions for your account
                  </p>
                  <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
